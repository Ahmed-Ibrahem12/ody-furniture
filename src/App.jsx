import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import AboutUs from "./pages/AboutUs"
import Contact from "./pages/Contact"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import CartDrawer from "./components/CartDrawer"
import Checkout from "./pages/Checkout"
import NotFound from "./pages/NotFound"
import ScrollToTop from "./components/Scrolltotop"
import ToTop from "./components/ToTop"



const App = () => {
  return (
    <router>
      <Navbar />
      <ToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CartDrawer />
      <ScrollToTop />
      <Footer />
    </router>
  );
}

export default App