import { motion } from "framer-motion";

const PhoneIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedinIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
  </svg>
);

const MapPinIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const contactMethods = [
  {
    icon: PhoneIcon,
    label: "اتصل بنا",
    value: "01153025370",
    href: "tel:01153025370",
    dir: "ltr",
  },
  {
    icon: MailIcon,
    label: "راسلنا",
    value: "ahmedibrahem8642@gmail.com",
    href: "mailto:ahmedibrahem8642@gmail.com",
    dir: "ltr",
  },
  {
    icon: LinkedinIcon,
    label: "تابعنا",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-ibrahem122/",
    dir: "ltr",
    external: true,
  },
  {
    icon: MapPinIcon,
    label: "موقعنا",
    value: "مصر، دمياط",
    href: null,
  },
];

const Contact = () => {
  return (
    <div className="flex flex-col font-ibm">
      {/* Hero */}
      <div className="bg-[#111111] py-20 px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold"
        >
          تواصل معنا
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-gray-400 mt-4 max-w-lg mx-auto"
        >
          يسعدنا تواصلك معنا في أي وقت، فريقنا جاهز للرد على استفساراتك
        </motion.p>
      </div>

      {/* Contact cards */}
      <div className="bg-white py-16 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {contactMethods.map((item, i) => {
            const Icon = item.icon;
            const Wrapper = item.href ? motion.a : motion.div;

            return (
              <Wrapper
                key={i}
                {...(item.href && {
                  href: item.href,
                  target: item.external ? "_blank" : undefined,
                  rel: item.external ? "noopener noreferrer" : undefined,
                })}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={item.href ? { y: -6 } : {}}
                className={`flex flex-col items-center text-center gap-3 p-8 rounded-lg border border-gray-100 shadow-sm transition-shadow duration-300 ${
                  item.href ? "cursor-pointer hover:shadow-lg" : ""
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-[#CBA65E]/10 flex items-center justify-center text-[#CBA65E]">
                  <Icon size={24} />
                </div>
                <h3 className="text-gray-800 font-bold">{item.label}</h3>
                <p className="text-gray-500 text-sm" dir={item.dir}>
                  {item.value}
                </p>
              </Wrapper>
            );
          })}
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-gray-50 py-16 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-gray-800"
        >
          جاهزون للإجابة على كل استفساراتك
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-500 mt-3 max-w-lg mx-auto"
        >
          سواء كان استفسار عن منتج، طلبية خاصة، أو تعاون، احنا هنا عشانك
        </motion.p>
        <motion.a
          href="mailto:ahmedibrahem8642@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, backgroundColor: "#AF8B47" }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-6 bg-[#CBA65E] text-white px-8 py-3 rounded-lg font-medium"
        >
          راسلنا الآن
        </motion.a>
      </div>
    </div>
  );
};

export default Contact;
