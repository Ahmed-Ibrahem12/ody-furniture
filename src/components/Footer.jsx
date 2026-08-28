import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

/* ===== أيقونات SVG مباشرة (من غير أي مكتبة خارجية) ===== */
const PhoneIcon = ({ size = 16 }) => (
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

const MailIcon = ({ size = 16 }) => (
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

const MapPinIcon = ({ size = 16 }) => (
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

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
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
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);
/* ========================================================= */

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-end">
          {/* لوجو ووصف */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 items-end"
          >
            <NavLink to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">
                أوريليان <span className="text-[#CBA65E]">هيريتيج</span>
              </span>
            </NavLink>
            <p className="text-gray-400 leading-relaxed text-sm">
              أثاث يدوي الصنع يجمع بين التراث الفني والتصميم المعاصر، لإنشاء
              مساحات تُروى فيها القصص عبر الأجيال.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.linkedin.com/in/ahmed-ibrahem122/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#CBA65E] hover:text-[#CBA65E] transition-colors duration-300"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#CBA65E] hover:text-[#CBA65E] transition-colors duration-300"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-700 hover:border-[#CBA65E] hover:text-[#CBA65E] transition-colors duration-300"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </motion.div>

          {/* روابط سريعة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-3 items-end"
          >
            <h3 className="text-lg font-bold mb-2">
              روابط سريعة
              <span className="block w-10 h-0.5 bg-[#CBA65E] mt-2 mr-0" />
            </h3>
            {["الرئيسية", "المجموعات", "من نحن", "تواصل معنا"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-gray-400 hover:text-[#CBA65E] transition-colors duration-300 text-sm"
              >
                {link}
              </a>
            ))}
          </motion.div>

          {/* تواصل معنا */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3 items-end"
          >
            <h3 className="text-lg font-bold mb-2">
              تواصل معنا
              <span className="block w-10 h-0.5 bg-[#CBA65E] mt-2 mr-0" />
            </h3>

            <a
              href="tel:01153025370"
              dir="ltr"
              className="flex items-center gap-2 text-gray-400 hover:text-[#CBA65E] transition-colors duration-300 text-sm"
            >
              01153025370
              <PhoneIcon size={16} />
            </a>

            <a
              href="mailto:ahmedibrahem8642@gmail.com"
              dir="ltr"
              className="flex items-center gap-2 text-gray-400 hover:text-[#CBA65E] transition-colors duration-300 text-sm"
            >
              ahmedibrahem8642@gmail.com
              <MailIcon size={16} />
            </a>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              مصر، دمياط
              <MapPinIcon size={16} />
            </div>
          </motion.div>
        </div>

        {/* خط فاصل */}
        <div className="w-full h-px bg-gray-800" />

        {/* حقوق الملكية */}
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-3 text-gray-500 text-xs">
          <p>
            © {new Date().getFullYear()} أوريليان هيريتيج. جميع الحقوق محفوظة.
          </p>
          <p>تصميم وتطوير بشغف ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
