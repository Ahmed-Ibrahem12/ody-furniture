import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  closeCart,
  removeFromCart,
  incrementQty,
  decrementQty,
} from "@/redux/slices/cartSlice";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const getItemPrice = (item) =>
  item.discountPercentage > 0
    ? item.price - (item.price * item.discountPercentage) / 100
    : item.price;

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  const subtotal = items.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0,
  );
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => dispatch(closeCart())}
            className="fixed inset-0 bg-black/50 z-40"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col font-ibm shadow-2xl"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <button
                type="button"
                onClick={() => dispatch(closeCart())}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors duration-200"
              >
                <X size={20} />
              </button>
              <h2 className="text-lg font-bold text-gray-800">
                سلة المشتريات ({totalItems})
              </h2>
            </div>

            {/* Items */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-gray-300 px-6">
                <ShoppingBag size={56} />
                <p className="text-gray-400 text-sm">سلتك فارغة حالياً</p>
                <button
                  type="button"
                  onClick={() => dispatch(closeCart())}
                  className="text-[#CBA65E] text-sm font-medium hover:underline"
                >
                  تصفح المنتجات
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                {items.map((item) => {
                  const price = getItemPrice(item);
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 pb-4 border-b border-gray-50 last:border-0"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg bg-gray-50 flex-shrink-0"
                      />

                      <div className="flex-1 flex flex-col text-end">
                        <div className="flex items-start justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-gray-300 hover:text-red-500 transition-colors duration-200 mt-0.5"
                          >
                            <Trash2 size={15} />
                          </button>
                          <h3 className="font-bold text-gray-800 text-sm truncate">
                            {item.title}
                          </h3>
                        </div>

                        <p className="text-[#CBA65E] font-black text-sm mt-1">
                          ج.م {price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-end gap-2 mt-auto">
                          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-1">
                            <button
                              type="button"
                              onClick={() => dispatch(incrementQty(item.id))}
                              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#CBA65E]"
                            >
                              <Plus size={15} />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => dispatch(decrementQty(item.id))}
                              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#CBA65E]"
                            >
                              <Minus size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between text-gray-800">
                  <span className="font-black text-lg">
                    ج.م {subtotal.toFixed(2)}
                  </span>
                  <span className="font-medium">الإجمالي</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => dispatch(closeCart())}
                  className="w-full block text-center bg-[#111111] text-white py-3.5 rounded-lg font-medium hover:bg-[#CBA65E] transition-colors duration-300"
                >
                  إتمام الشراء
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
