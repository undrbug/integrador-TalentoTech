import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx';
import Register from './components/Register.jsx';
import Shop from './components/Shop.jsx';
import { ProductProvider } from './components/ProductContext.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import './App.css'

function App() {

  return (
    <ProductProvider>
      <Router>
        <div className="Container">
          <h3>BienHelada.com.ar</h3>
        </div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/deals" element={<Deals />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* ruta privada, falta implementar */}
          {/* <Route path="/checkout" element={<Checkout />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </ProductProvider>
  )
}

export default App

// <Main>
//   <Section title="Bienvenidos a BienHelada.com.ar">
//     <Article content={<Card />} />
//     <Article content={<Card />} />
//     <Article content={<Card />} />
//     <Article content={<Card />} />
//   </Section>
// </Main>