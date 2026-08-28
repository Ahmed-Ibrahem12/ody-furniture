import { motion } from "framer-motion";
import img3 from "../assets/kam-idris-U39FPHKfDu0-unsplash.jpg";

const values = [
  {
    title: "جودة لا تُضاهى",
    desc: "نختار أفخر أنواع الأخشاب والجلود الطبيعية، ونرفض أي تنازل عن مستوى الحرفية.",
  },
  {
    title: "استدامة حقيقية",
    desc: "نعتمد مصادر خشب مستدامة ونقلل الهدر في كل مرحلة من مراحل التصنيع.",
  },
  {
    title: "حرفية يدوية",
    desc: "كل قطعة تمر عبر أيدي نجارين خبراء بدل الإنتاج الآلي الجماعي.",
  },
];

const milestones = [
  { year: "2010", text: "بداية الرحلة بورشة صغيرة وحلم كبير" },
  { year: "2015", text: "افتتاح أول معرض وتوسع خط الإنتاج" },
  { year: "2020", text: "إطلاق مجموعة التصاميم المعاصرة" },
  { year: "2026", text: "+50 عام خبرة متراكمة وثقة آلاف العملاء" },
];

const AboutUs = () => {
  return (
    <div className="flex flex-col font-ibm">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center bg-[#111111] overflow-hidden">
        <img
          src={img3}
          alt="من نحن"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold">من نحن</h1>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto">
            قصة حرفة تحولت إلى إرث يُروى عبر الأجيال
          </p>
        </motion.div>
      </div>

      {/* Story */}
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 py-16 px-4 md:px-8 lg:px-16 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1 flex flex-col gap-4 items-end text-end"
        >
          <h2 className="text-3xl font-bold text-gray-800 relative pb-3">
            قصتنا
            <span className="absolute bottom-0 right-0 w-16 h-1 bg-[#CBA65E] rounded-full" />
          </h2>
          <p className="text-gray-600 leading-relaxed">
            بدأت أوريليان هيريتيج كورشة صغيرة تؤمن بأن الأثاث أكثر من مجرد
            وظيفة، بل هو حكاية تُنقش في الخشب وتدوم مع الزمن. على مدار أكثر من
            خمسين عاماً، حافظنا على نفس الشغف الذي بدأنا به، ودمجناه مع رؤية
            عصرية تلبي احتياجات البيوت الحديثة.
          </p>
          <p className="text-gray-600 leading-relaxed">
            اليوم، نفخر بأن كل قطعة تحمل توقيعنا تمر عبر أيدٍ خبيرة، من اختيار
            الخامة وحتى اللمسة الأخيرة، لتصل إليك قطعة تستحق أن تكون جزءاً من
            بيتك لسنوات طويلة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <img
            src={img3}
            alt="ورشتنا"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-16 px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 text-center mb-12"
        >
          قيمنا
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#CBA65E]/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#CBA65E] font-bold text-xl">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white py-16 px-4 md:px-8 lg:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 text-center mb-12"
        >
          رحلتنا عبر الزمن
        </motion.h2>

        <div className="max-w-3xl mx-auto flex flex-col gap-8 relative">
          <div className="absolute right-[7px] top-0 bottom-0 w-0.5 bg-gray-200" />
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-start gap-4 text-end relative pr-6"
            >
              <div className="absolute right-0 top-1.5 w-4 h-4 rounded-full bg-[#CBA65E] border-4 border-white shadow" />
              <div className="flex-1">
                <span className="text-[#CBA65E] font-bold">{m.year}</span>
                <p className="text-gray-600 mt-1">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
