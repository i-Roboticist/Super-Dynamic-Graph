import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaticSidebar from './components/StaticSidebar/StaticSidebar';
import HomePage from './components/HomeComponents/Home';
import LearnPage from './components/GraphComponents/Graph';
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <StaticSidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/progress" element={<div>Progress Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;