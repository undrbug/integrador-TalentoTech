import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Deals from './components/Deals.jsx';
import { useAuth } from './components/AuthContext.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import ProductAdd from './components/ProductAdd.jsx';
// import ProductList from './components/ProductList';
// import ProductEdit from './components/ProductEdit';

import './App.css'

function App() {
  const { user } = useAuth();
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            {/* <div className="Container">
              <h3>BienHelada.com.ar</h3>
            </div> */}
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas protegidas */}
              <Route path="/deals" element={
                <PrivateRoute>
                  <Deals />
                </PrivateRoute>
              } />

              {/* <Route path="/products" element={<ProductList />} /> */}
              {/* <Route path="/products/add" element={<ProductAdd />} /> */}
              {/* <Route path="/products/edit/:id" element={<ProductEdit />} /> */}

              <Route path="/add-product" element={
                <PrivateRoute>
                  {user && user.role === 'admin' ? <ProductAdd /> : <Navigate to="/" />}
                  {/* <ProductAdd /> */}
                </PrivateRoute>
              } />
              <Route path="/dashboard" element={
                <AdminRoute>
                  {/* {user && user.role === 'admin' ? <Dashboard /> : <Navigate to="/" />} */}
                  <Dashboard />
                </AdminRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App