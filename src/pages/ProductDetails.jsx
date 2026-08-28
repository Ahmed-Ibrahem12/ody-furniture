import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import furnitureProducts from "../../data/furnituredata.js"; // تأكد أن الاسم مطابق لملفك بالملي
import { motion } from "framer-motion";
import { addToCart } from "@/redux/slices/cartSlice";

import {
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const product = furnitureProducts.find(
    (item) => String(item.id).trim() === String(id).trim(),
  );

  if (!product) {
    console.log("الـ ID المطلوب من الـ URL هو:", id);
    console.log("المنتجات المتاحة في الداتا هي:", furnitureProducts);

    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 font-ibm text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          المنتج غير موجود!
        </h3>
        <p className="text-gray-500 mb-6 text-sm">
          تأكد من صحة الرابط أو العودة لصفحة المنتجات
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-gray-950 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#CBA65E] transition-colors duration-300 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" /> العودة للرئيسية
        </button>
      </div>
    );
  }

  const hasDiscount = product.discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const relatedProducts = furnitureProducts
    .filter((p) => p.room === product.room && p.id !== product.id)
    .slice(0, 4);

  
  const stockHash = product.id
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const stockCount = 2 + (stockHash % 15); 

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const contentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }, // تسريع ظهور العناصر بالتتابع
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div
      className="min-h-screen bg-gray-50/50 py-16 px-4 md:px-8 lg:px-16 font-ibm"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* زرار العودة */}
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-955 mb-8 font-medium text-sm transition-colors duration-200 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للمنتجات</span>
        </motion.button>

        {/* تفاصيل المنتج */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* قسم الصورة */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center p-6 group">
              <img
                src={product.thumbnail || product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500"
              />
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-[#CBA65E] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  خصم {product.discountPercentage}%
                </span>
              )}
            </div>
          </motion.div>

          {/* قسم معلومات المنتج */}
          <motion.div
            variants={contentContainerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col h-full justify-center"
          >
            {product.room && (
              <motion.span
                variants={itemVariants}
                className="text-xs uppercase tracking-widest text-[#CBA65E] font-bold bg-[#CBA65E]/10 px-3 py-1 rounded-full w-fit mb-4"
              >
                {product.room}
              </motion.span>
            )}

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
            >
              {product.title}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-sm md:text-base leading-relaxed mb-6"
            >
              {product.description}
            </motion.p>

            {/* المواصفات الفنية */}
            {(product.wood_type || product.finish) && (
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-gray-100 mb-6 shadow-2xs"
              >
                {product.wood_type && (
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">نوع الخشب</span>
                    <span className="text-sm font-bold text-gray-800 mt-0.5">
                      {product.wood_type}
                    </span>
                  </div>
                )}
                {product.finish && (
                  <div className="flex flex-col border-r border-gray-100 pr-4">
                    <span className="text-xs text-gray-400">
                      التشطيب والخامة
                    </span>
                    <span className="text-sm font-bold text-gray-800 mt-0.5">
                      {product.finish}
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* السعر والخصم */}
            <motion.div
              variants={itemVariants}
              className="flex items-baseline gap-4 mb-3"
            >
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-black text-[#CBA65E]">
                    {discountedPrice}{" "}
                    <span className="text-sm font-bold">ج.م</span>
                  </span>
                  <span className="text-gray-400 line-through text-base">
                    {product.price} ج.م
                  </span>
                </>
              ) : (
                <span className="text-3xl font-black text-[#CBA65E]">
                  {product.price} <span className="text-sm font-bold">ج.م</span>
                </span>
              )}
            </motion.div>

            {/* مؤشر توفر المخزون */}
            <motion.div variants={itemVariants} className="mb-8">
              {stockCount <= 4 ? (
                <span className="inline-flex items-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  متبقي {stockCount} قطع فقط — اطلب الآن قبل نفاد الكمية
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-green-700 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                  متوفر في المخزون
                </span>
              )}
            </motion.div>

            {/* زر الشراء */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <button
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm cursor-pointer transition-colors duration-250 shadow-md active:scale-98 ${
                  isAdded
                    ? "bg-green-600 text-white"
                    : "bg-gray-900 text-white hover:bg-[#CBA65E]"
                }`}
                onClick={(e) => handleAddToCart(e, product)}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>تمت الإضافة للسلة</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>إضافة إلى سلة المشتريات</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* شارات الجودة والامان */}
            <motion.div
              variants={itemVariants}
              className="border-t border-gray-100 pt-6 grid grid-cols-3 gap-2 text-center text-[10px] md:text-xs text-gray-400 font-medium"
            >
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-gray-400" />
                <span>توصيل وتركيب مجاني</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 border-x border-gray-100 px-2">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span>ضمان لمدة سنتين</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw className="w-5 h-5 text-gray-400" />
                <span>إرجاع سهل خلال 14 يوم</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* منتجات مشابهة */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 relative pb-3 w-fit mx-auto text-center">
              قد يعجبك أيضاً
              <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-14 h-1 bg-[#CBA65E] rounded-full" />
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((related) => {
                const relatedHasDiscount = related.discountPercentage > 0;
                const relatedDiscountedPrice = relatedHasDiscount
                  ? (
                      related.price *
                      (1 - related.discountPercentage / 100)
                    ).toFixed(2)
                  : null;

                return (
                  <Link
                    key={related.id}
                    to={`/products/${related.id}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 p-3 transition-shadow duration-300 group block"
                  >
                    <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-50">
                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        loading="lazy"
                        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {relatedHasDiscount && (
                        <span className="absolute top-2 right-2 bg-[#CBA65E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          خصم {related.discountPercentage}%
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-800 text-sm truncate text-end">
                      {related.title}
                    </h3>

                    <div className="flex items-center justify-end gap-1.5 mt-1">
                      {relatedHasDiscount ? (
                        <>
                          <span className="text-gray-400 text-xs line-through">
                            {related.price} ج.م
                          </span>
                          <span className="text-[#CBA65E] font-black text-sm">
                            {relatedDiscountedPrice} ج.م
                          </span>
                        </>
                      ) : (
                        <span className="text-[#CBA65E] font-black text-sm">
                          {related.price} ج.م
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
