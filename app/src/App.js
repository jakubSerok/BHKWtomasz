import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Shop from "./page/Shop";
import Blogs from "./page/Blogs";
import About from "./page/About";
import Kontakt from "./page/Kontak";
import Oferta from "./page/Oferta";
import Rozwiazania from "./page/Rozwiazania";
import Footer from "./components/Footer";

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
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
