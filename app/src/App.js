import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/website/Home";
import Shop from "./page/website/Shop";
import Blogs from "./page/website/Blogs";
import About from "./page/website/About";
import Kontakt from "./page/website/Kontak";
import Oferta from "./page/website/Oferta";
import Rozwiazania from "./page/website/Rozwiazania";
import Footer from "./components/Footer";
import Cart from "./page/website/Cart";
import Admin from "./page/admin/Admin";
import Login from "./page/website/Login";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute"; // Import the protected route
import img from "./assets/tlo.png";
import ShopContextProvider from "./components/Context/ShopContext";
import Product from "./page/website/Product";

function App() {
  const location = useLocation();

  return (
    <div
      style={{
        backgroundImage: `url(${"img"})`,
        backgroundPosition: "center",
      }}
    >
      {/* Only render Navbar and Footer if not on the /admin route */}

      {location.pathname.startsWith("/admin") === false && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/oferta" element={<Oferta />} />
        <Route path="/rozwiazania" element={<Rozwiazania />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>

        {/* Protect the /admin route with AdminProtectedRoute */}
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      {/* Only render Footer if not on the /admin route */}
      {location.pathname.startsWith("/admin") === false && <Footer />}
    </div>
  );
}

export default function MainApp() {
  return (
    <ShopContextProvider>
      <Router>
        <App />
      </Router>
    </ShopContextProvider>
  );
}
