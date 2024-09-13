import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/website/Home";
import Shop from "./page/website/Shop";
import Blogs from "./page/website/Blogs";
import About from "./page/website/About";
import Kontakt from "./page/website/Kontak";
import Oferta from "./page/website/Oferta";
import Rozwiazania from "./page/website/Rozwiazania";
import Footer from "./components/Footer";

import Admin from "./page/admin/Admin";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<About />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/oferta" element={<Oferta />} />
          <Route path="/rozwiazania" element={<Rozwiazania />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
