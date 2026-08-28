import { getProducts } from "@/redux/slices/Products";
import { addToCart } from "@/redux/slices/cartSlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingCart, Check, ArrowUpDown } from "lucide-react";

const ITEMS_PER_PAGE = 16;

const SORT_OPTIONS = [
  { value: "default", label: "الترتيب الافتراضي" },
  { value: "price-asc", label: "السعر: من الأقل للأعلى" },
  { value: "price-desc", label: "السعر: من الأعلى للأقل" },
  { value: "newest", label: "الأحدث أولاً" },
];

const SkeletonCard = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-4">
    <div className="w-full h-48 rounded-lg bg-gray-200 animate-pulse mb-4" />
    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
    <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse mb-3" />
    <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mr-auto" />
  </div>
);

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get("room") || "الكل";
  const [activeRoom, setActiveRoom] = useState(initialRoom);
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [addedIds, setAddedIds] = useState(new Set());

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const rooms = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.room).filter(Boolean))];
    return ["الكل", ...unique];
  }, [products]);

  const roomCounts = useMemo(() => {
    const counts = { الكل: products.length };
    products.forEach((p) => {
      if (!p.room) return;
      counts[p.room] = (counts[p.room] || 0) + 1;
    });
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result =
      activeRoom === "الكل"
        ? [...products]
        : products.filter((p) => p.room === activeRoom);

    const getEffectivePrice = (p) =>
      p.discountPercentage > 0
        ? p.price - (p.price * p.discountPercentage) / 100
        : p.price;

    if (sortBy === "price-asc") {
      result.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => getEffectivePrice(b) - getEffectivePrice(a));
    } else if (sortBy === "newest") {
      result.reverse();
    }

    return result;
  }, [products, activeRoom, sortBy]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleRoomChange = (room) => {
    setActiveRoom(room);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1200);
  };

  if (error)
    return (
      <div className="text-center py-32 text-red-500 font-ibm">
        حدث خطأ: {error}
      </div>
    );

  return (
    <div className="py-16 bg-gray-50 font-ibm px-4 md:px-8 lg:px-16" dir="rtl">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4 relative pb-3 w-fit mx-auto">
        أحدث قطع الأثاث المتاحة
        <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-16 h-1 bg-[#CBA65E] rounded-full" />
      </h2>

      <p className="text-gray-500 text-center mb-10 max-w-lg mx-auto">
        تصفح مجموعتنا الكاملة، أو اختر قسماً معيناً لتشاهد قطعه بسهولة
      </p>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {rooms.map((room) => (
              <button
                key={room}
                type="button"
                onClick={() => handleRoomChange(room)}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-150 flex items-center gap-1.5 ${
                  activeRoom === room
                    ? "bg-[#111111] text-white"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200"
                }`}
              >
                {room}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeRoom === room
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {roomCounts[room] || 0}
                </span>
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">
              لا توجد منتجات في هذا القسم حالياً
            </p>
          ) : (
            <>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 max-w-7xl mx-auto">
                <p className="text-gray-500 text-sm">
                  عرض {visibleProducts.length} من {filteredProducts.length} منتج
                </p>

                <div className="relative">
                  <ArrowUpDown
                    size={15}
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-400 pointer-events-none"
                  />
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none bg-white border border-gray-200 rounded-lg text-sm text-gray-700 pr-9 pl-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#CBA65E] cursor-pointer"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleProducts.map((product) => {
                  const hasDiscount = product.discountPercentage > 0;
                  const discountedPrice = hasDiscount
                    ? (
                        product.price -
                        (product.price * product.discountPercentage) / 100
                      ).toFixed(2)
                    : null;
                  const isAdded = addedIds.has(product.id);

                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      style={{
                        contentVisibility: "auto",
                        containIntrinsicSize: "0 320px",
                      }}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 p-4 transition-shadow duration-150 cursor-pointer group block"
                    >
                      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-50">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="192"
                          className="w-full h-48 object-cover"
                        />
                        {hasDiscount && (
                          <span className="absolute top-2 right-2 bg-[#CBA65E] text-white text-xs font-bold px-2 py-1 rounded">
                            خصم {product.discountPercentage}%
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, product)}
                          className={`absolute bottom-2 left-2 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors duration-150 ${
                            isAdded
                              ? "bg-green-600 text-white"
                              : "bg-white text-gray-700 hover:bg-[#CBA65E] hover:text-white"
                          }`}
                          aria-label="أضف إلى السلة"
                        >
                          {isAdded ? (
                            <Check size={16} />
                          ) : (
                            <ShoppingCart size={16} />
                          )}
                        </button>
                      </div>

                      <h3 className="font-bold text-gray-800 text-base truncate text-end">
                        {product.title}
                      </h3>

                      <p className="text-gray-400 text-xs mt-1 text-end">
                        {product.wood_type} · {product.finish}
                      </p>

                      

                      <div className="flex items-center justify-end gap-2 mt-2">
                        {hasDiscount ? (
                          <>
                            <span className="text-gray-400 text-sm line-through">
                              {product.price} ج.م
                            </span>
                            <span className="text-[#CBA65E] font-black">
                              {discountedPrice} ج.م
                            </span>
                          </>
                        ) : (
                          <span className="text-[#CBA65E] font-black">
                            {product.price} ج.م
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount((prev) => prev + ITEMS_PER_PAGE)
                    }
                    className="bg-[#111111] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#CBA65E] transition-colors duration-150"
                  >
                    عرض المزيد ({filteredProducts.length - visibleCount} متبقي)
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
