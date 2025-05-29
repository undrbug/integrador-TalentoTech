import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx';
import Register from './components/Register.jsx';
import About from './components/About.jsx';
import Shop from './components/Shop.jsx';
import { ProductProvider } from './components/ProductContext.jsx';
import { CartProvider } from './components/CartContext.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import './App.css'

function App() {

  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
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
              <Route path="/about" element={<About />} />
              {/* <Route path="/checkout" element={<Checkout />} /> */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App