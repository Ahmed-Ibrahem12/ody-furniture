import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4 text-center font-ibm bg-white"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <span className="text-[120px] md:text-[160px] font-black text-gray-100 leading-none select-none">
          404
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-bold text-gray-800">
          الصفحة غير موجودة
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="text-gray-500 max-w-md"
      >
        يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تحقق من الرابط أو
        عد إلى الصفحة الرئيسية لمتابعة تصفح مجموعاتنا.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 mt-2"
      >
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-[#111111] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#CBA65E] transition-colors duration-300"
        >
          <Home size={18} />
          العودة للرئيسية
        </Link>
        <Link
          to="/products"
          className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-[#CBA65E] hover:text-[#CBA65E] transition-colors duration-300"
        >
          <Search size={18} />
          تصفح المنتجات
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
