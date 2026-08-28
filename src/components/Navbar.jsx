import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, ShoppingBag } from "lucide-react";
import { toggleCart } from "@/redux/slices/cartSlice";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "من نحن", href: "/about" },
  { label: "تواصل معنا", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <nav
      className="w-full bg-white border-b border-gray-100 sticky top-0 z-30 font-ibm"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#111111]">
            أوريليان <span className="text-[#CBA65E]">هيريتيج</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  "text-sm font-medium pb-1 border-b-2 transition-colors duration-200 " +
                  (isActive
                    ? "text-[#CBA65E] border-[#CBA65E]"
                    : "text-gray-700 border-transparent hover:text-[#CBA65E]")
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side: Cart + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(toggleCart())}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-700 hover:text-[#CBA65E] transition-colors duration-200"
            aria-label="سلة المشتريات"
          >
            <ShoppingBag size={22} strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#CBA65E] text-white text-[10px] font-bold">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 text-gray-700 transition-colors duration-200"
            aria-label="فتح القائمة"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-72" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 pb-5 gap-1 border-t border-gray-100 pt-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  "block text-sm font-medium py-2.5 text-end transition-colors duration-200 " +
                  (isActive
                    ? "text-[#CBA65E]"
                    : "text-gray-700 hover:text-[#CBA65E]")
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
