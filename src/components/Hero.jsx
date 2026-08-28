import { motion } from "framer-motion";
import img1 from "../assets/d5-render--_eNaluvWv0-unsplash.jpg";

const Hero = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex justify-end items-center overflow-hidden"
      style={{ backgroundImage: `url(${img1})` }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs" />

      <div className="relative z-10 text-end text-white p-6 md:p-15 font-ibm">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold"
        >
          حياة راقية، أناقة خالدة
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-4 text-lg md:text-xl max-w-2xl mx-auto md:w-md"
        >
          اكتشف مجموعتنا المختارة من الأثاث المصنوع يدوياً، حيث يلتقي التراث
          الفني مع التصميم المعاصر لإنشاء مساحات لا تُنسى.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.05, backgroundColor: "#AF8B47" }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 cursor-pointer bg-[#CBA65E] text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          استكشف المجموعات
        </motion.button>
      </div>
    </div>
  );
};

export default Hero;
