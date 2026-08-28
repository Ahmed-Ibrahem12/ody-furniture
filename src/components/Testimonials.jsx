import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "منى الشربيني",
    role: "القاهرة",
    text: "الجودة فعلاً مختلفة عن أي حاجة جربتها قبل كده. الكنبة اللي اشتريتها لسه زي أول يوم بعد أكتر من سنة استخدام.",
    rating: 5,
  },
  {
    name: "كريم عبد الوهاب",
    role: "الإسكندرية",
    text: "التعامل كان محترم جداً من الطلب لحد التوصيل، والتشطيبات فعلاً فاخرة زي ما كانت موصوفة بالظبط.",
    rating: 5,
  },
  {
    name: "سارة يوسف",
    role: "دمياط",
    text: "أثثت غرفة نومي كاملة من عندهم، وكل قطعة حسيت إنها مصممة بعناية. أنصح بيهم لأي حد بيدور على جودة حقيقية.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-8 lg:px-16 font-ibm" dir="rtl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-3"
      >
        آراء عملائنا
      </motion.h2>
      <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
        ثقة عملائنا هي أساس رحلتنا، وده جزء بسيط مما قالوه عن تجربتهم معنا
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4 border border-gray-100"
          >
            <Quote className="text-[#CBA65E]/30" size={32} />

            <p className="text-gray-600 text-sm leading-relaxed text-end">
              {t.text}
            </p>

            <div className="flex items-center gap-1 justify-end">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < t.rating
                      ? "text-[#CBA65E] fill-[#CBA65E]"
                      : "text-gray-200 fill-gray-200"
                  }
                />
              ))}
            </div>

            <div className="flex items-center gap-3 justify-end pt-2 border-t border-gray-100">
              <div className="text-end">
                <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs">{t.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#CBA65E]/10 flex items-center justify-center text-[#CBA65E] font-bold text-sm flex-shrink-0">
                {t.name.charAt(0)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
