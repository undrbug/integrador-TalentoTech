import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Section from './components/Section'
import Article from './components/Article'
import Aside from './components/Aside'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <Router>
      <div className="Container">
        <h3>BienHelada.com.ar</h3>
      </div>
      <Header />
      <Main>
        <Section title="Bienvenidos a BienHelada.com.ar">
          <Article title="Artículo 2" content="mostrar los productos" />
        </Section>
      </Main>
      <Footer />
    </Router>
  )
}

export default App
