import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  User,
  MessageCircle,
  ShoppingBag,
  Mail,
} from "lucide-react";
import { clearCart } from "@/redux/slices/cartSlice";

const WHATSAPP_NUMBER = "201153025370";
const CONTACT_EMAIL = "ahmedibrahem8642@gmail.com";

const getItemPrice = (item) =>
  item.discountPercentage > 0
    ? item.price - (item.price * item.discountPercentage) / 100
    : item.price;

const Checkout = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const subtotal = items.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0,
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "من فضلك أدخل الاسم";
    if (!form.phone.trim()) newErrors.phone = "من فضلك أدخل رقم الهاتف";
    else if (!/^01[0-9]{9}$/.test(form.phone.trim()))
      newErrors.phone = "رقم الهاتف غير صحيح (لازم يبدأ بـ 01 و11 رقم)";
    if (!form.address.trim()) newErrors.address = "من فضلك أدخل العنوان";
    if (!form.city.trim()) newErrors.city = "من فضلك أدخل المحافظة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildWhatsappMessage = () => {
    const lines = [];
    lines.push("طلب جديد من موقع أوريليان هيريتيج");
    lines.push("");
    lines.push(`الاسم: ${form.name}`);
    lines.push(`الهاتف: ${form.phone}`);
    lines.push(`المحافظة: ${form.city}`);
    lines.push(`العنوان: ${form.address}`);
    if (form.notes.trim()) lines.push(`ملاحظات: ${form.notes}`);
    lines.push("");
    lines.push("تفاصيل الطلب:");
    items.forEach((item, i) => {
      const price = getItemPrice(item);
      lines.push(
        `${i + 1}. ${item.title} × ${item.quantity} = ج.م ${(
          price * item.quantity
        ).toFixed(2)}`,
      );
    });
    lines.push("");
    lines.push(`الإجمالي: ج.م ${subtotal.toFixed(2)}`);
    return lines.join("\n");
  };

  const handleWhatsapp = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    const message = encodeURIComponent(buildWhatsappMessage());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, "_blank");
    dispatch(clearCart());
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;

    const subject = encodeURIComponent(
      `طلب جديد من ${form.name} - أوريليان هيريتيج`,
    );
    const body = encodeURIComponent(buildWhatsappMessage());
    const url = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    window.location.href = url;
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 font-ibm px-4 text-center">
        <ShoppingBag size={56} strokeWidth={1.5} className="text-gray-300" />
        <h2 className="text-xl font-bold text-gray-800">سلتك فارغة</h2>
        <p className="text-gray-500 text-sm max-w-xs">
          أضف بعض القطع الرائعة من مجموعتنا قبل إتمام الشراء
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 font-ibm bg-gray-50" dir="rtl">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 text-center mb-2"
      >
        إتمام الشراء
      </motion.h1>
      <p className="text-gray-500 text-center mb-12 max-w-md mx-auto">
        أدخل بياناتك وهنجهزلك الطلب، وهيتفتحلك واتساب فيه كل تفاصيل طلبك جاهزة
        لتأكيده معانا
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={(e) => e.preventDefault()}
          className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 justify-end">
              الاسم بالكامل
              <User size={15} className="text-gray-400" />
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="أدخل اسمك"
              className={`w-full px-4 py-2.5 rounded-lg border text-end focus:outline-none focus:ring-2 focus:ring-[#CBA65E] transition-colors ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs text-end">
                {errors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 justify-end">
              رقم الهاتف
              <Phone size={15} className="text-gray-400" />
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="01xxxxxxxxx"
              dir="ltr"
              className={`w-full px-4 py-2.5 rounded-lg border text-end focus:outline-none focus:ring-2 focus:ring-[#CBA65E] transition-colors ${
                errors.phone ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs text-end">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5 justify-end">
              المحافظة
              <MapPin size={15} className="text-gray-400" />
            </label>
            <input
              type="text"
              value={form.city}
              onChange={handleChange("city")}
              placeholder="مثال: القاهرة، دمياط..."
              className={`w-full px-4 py-2.5 rounded-lg border text-end focus:outline-none focus:ring-2 focus:ring-[#CBA65E] transition-colors ${
                errors.city ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.city && (
              <span className="text-red-500 text-xs text-end">
                {errors.city}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 justify-end flex">
              العنوان بالتفصيل
            </label>
            <textarea
              value={form.address}
              onChange={handleChange("address")}
              rows={3}
              placeholder="اسم الشارع، رقم العمارة، علامة مميزة..."
              className={`w-full px-4 py-2.5 rounded-lg border text-end focus:outline-none focus:ring-2 focus:ring-[#CBA65E] transition-colors resize-none ${
                errors.address ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.address && (
              <span className="text-red-500 text-xs text-end">
                {errors.address}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700 justify-end flex">
              ملاحظات (اختياري)
            </label>
            <textarea
              value={form.notes}
              onChange={handleChange("notes")}
              rows={2}
              placeholder="أي تفاصيل إضافية تحب تضيفها..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-end focus:outline-none focus:ring-2 focus:ring-[#CBA65E] transition-colors resize-none"
            />
          </div>

          <div className="mt-2 flex flex-col gap-3">
            <p className="text-gray-400 text-xs text-end">
              اختر الطريقة الأنسب لإرسال طلبك:
            </p>

            <button
              type="button"
              onClick={handleWhatsapp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white py-3.5 rounded-lg font-medium transition-colors duration-300"
            >
              <MessageCircle size={20} />
              إرسال الطلب عبر واتساب
            </button>

            <button
              type="button"
              onClick={handleEmail}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white py-3 rounded-lg font-medium transition-colors duration-300"
            >
              <Mail size={20} />
              إرسال الطلب عبر الإيميل
            </button>
          </div>
        </motion.form>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 h-fit"
        >
          <h3 className="font-bold text-gray-800 mb-5 text-end">
            ملخص الطلب ({totalItems})
          </h3>

          <div className="flex flex-col gap-4 mb-5 max-h-80 overflow-y-auto">
            {items.map((item) => {
              const price = getItemPrice(item);
              return (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-14 h-14 object-cover rounded-lg bg-gray-50 flex-shrink-0"
                  />
                  <div className="flex-1 text-end">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      الكمية: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-black text-[#CBA65E] whitespace-nowrap">
                    ج.م {(price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <span className="text-xl font-black text-gray-800">
              ج.م {subtotal.toFixed(2)}
            </span>
            <span className="text-gray-500 font-medium">الإجمالي</span>
          </div>

          <p className="text-gray-400 text-xs mt-4 text-end leading-relaxed">
            الدفع عند الاستلام. اختر واتساب أو الإيميل لإرسال الطلب، وهنأكد معاك
            بسرعة.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
