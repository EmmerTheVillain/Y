import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './UI/Nav.jsx';
import Home from './pages/Home.jsx'

function App() {

  return (
    <div className="app">
      <header>
        <Nav />
      </header>
      <main>
        <Home />
      </main>
      <footer>
        {/* Add footer here */}
      </footer>
    </div>
  );
}

export default App
