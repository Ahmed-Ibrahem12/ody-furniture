import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img3 from "../assets/austin-ramsey-rbi4q0-b-8g-unsplash (2).jpg";
import furnitureProducts from "@/data/furnitureData";
import Testimonials from "./Testimonials";

const roomOrder = ["صالون", "غرفة نوم", "غرفة سفرة", "مكتب", "إضاءة وديكور"];

const collections = roomOrder
  .map((room) => {
    const product = furnitureProducts.find((p) => p.room === room);
    if (!product) return null;
    return { room, title: room, src: product.thumbnail };
  })
  .filter(Boolean)
  .slice(0, 3);

const bestSellers = furnitureProducts
  .slice()
  .sort((a, b) => b.discountPercentage - a.discountPercentage)
  .slice(0, 8);

const stats = [
  { number: "+50", label: "عام من الخبرة" },
  { number: "100%", label: "مواد طبيعية" },
  { number: "يدوي", label: "التصنيع" },
];

const Featured = () => {
  return (
    <div className="flex flex-col font-ibm">
      {/* المجموعات المختارة */}
      <div className="flex flex-col bg-white py-16 px-4 md:px-8 lg:px-16 gap-8 items-end">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 relative pb-3"
        >
          مجموعاتنا المختارة
          <span className="absolute bottom-0 right-0 w-16 h-1 bg-[#CBA65E] rounded-full" />
        </motion.h1>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          dir="rtl"
        >
          {collections.map((item, index) => (
            <motion.div
              key={item.room}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <Link
                to={`/products?room=${encodeURIComponent(item.room)}`}
                className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-md bg-gray-900 block"
              >
                <motion.img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-80 object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                <div className="absolute bottom-0 right-0 p-6 w-full text-right pointer-events-none">
                  <h2 className="text-white text-2xl font-extrabold drop-shadow-md tracking-tight">
                    {item.title}
                  </h2>
                  <div className="h-1 w-0 bg-[#CBA65E] mt-2 rounded-full group-hover:w-20 transition-all duration-500 ease-out" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* الأكثر مبيعاً */}
      <div className="flex flex-col bg-gray-50 py-16 px-4 md:px-8 lg:px-16 gap-8 items-end">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 relative pb-3"
        >
          الأكثر مبيعاً
          <span className="absolute bottom-0 right-0 w-16 h-1 bg-[#CBA65E] rounded-full" />
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full" dir="rtl">
          {bestSellers.map((product, index) => {
            const hasDiscount = product.discountPercentage > 0;
            const discountedPrice = hasDiscount
              ? (
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)
              : null;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
              >
                <Link
                  to={`/products?room=${encodeURIComponent(product.room)}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 p-3 transition-shadow duration-300 cursor-pointer group block"
                >
                  <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-50">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {hasDiscount && (
                      <span className="absolute top-2 right-2 bg-[#CBA65E] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        خصم {product.discountPercentage}%
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-800 text-sm truncate text-end">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    {hasDiscount ? (
                      <>
                        <span className="text-gray-400 text-xs line-through">
                          ${product.price}
                        </span>
                        <span className="text-[#CBA65E] font-black text-sm">
                          ${discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#CBA65E] font-black text-sm">
                        ${product.price}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <Link
          to="/products"
          className="mx-auto mt-2 text-[#CBA65E] font-medium text-sm hover:underline"
        >
          تصفح كل المنتجات ←
        </Link>
      </div>

      <Testimonials />

      {/* فن الصناعة اليدوية */}
      <div className="flex flex-col md:flex-row-reverse justify-around bg-white w-full py-16 px-4 md:px-8 lg:px-16 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-5 items-end text-end max-w-xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative pb-3">
            فن الصناعة اليدوية
            <span className="absolute bottom-0 right-0 w-16 h-1 bg-[#CBA65E] rounded-full" />
          </h1>

          <p className="text-gray-600 leading-relaxed">
            في أوريليان هيريتيج، نحن نؤمن بأن الأثاث ليس مجرد قطع خشبية، بل هو
            قصص تُروى عبر الأجيال. نكرس أنفسنا لاستخدام أفخر أنواع الأخشاب
            المستدامة والجلود الطبيعية والمعادن المصقولة يدوياً.
          </p>

          <p className="text-gray-800 font-medium italic border-r-4 border-[#CBA65E] pr-4">
            "كل قطعة ننتجها تمر عبر أيدي خبراء يجمعون بين التقنيات التقليدية
            والرؤية العصرية."
          </p>

          <div className="flex flex-row gap-8 items-center mt-4 w-full justify-end">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-bold text-2xl text-[#CBA65E]">
                  {stat.number}
                </p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-auto"
        >
          <img
            src={img3}
            alt="Craftsmanship"
            className="w-full md:w-[420px] h-80 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      {/* انضم الى تراثنا */}
      <div className="flex flex-col gap-4 items-center justify-center py-16 px-4 bg-gray-50 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          انضم الى تراثنا
        </h1>
        <p className="text-gray-600 max-w-xl">
          اشترك لتصلك آخر أخبار المجموعات الحصرية، والنصائح التصميمية،
          والفعاليات الخاصة بأوريليان.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mt-4 w-full max-w-md">
          <input
            type="email"
            placeholder="بريدك الإلكتروني"
            className="w-full sm:flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-end focus:outline-none focus:ring-2 focus:ring-[#CBA65E]"
          />
          <button className="w-full sm:w-auto bg-[#CBA65E] text-white px-6 py-2.5 rounded-lg hover:bg-[#b38f4c] transition-colors duration-300">
            اشترك الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
