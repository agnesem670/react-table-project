import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BasicTablePage from './pages/BasicTablePage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="home/table" element={<BasicTablePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
