import { Routes, Route } from "react-router-dom";
import University from './routes/UniversityRoutes'
import './App.css';

function App() {
  return (
   <Routes>
    <Route path='/*' element={<University/>} />
   </Routes>
  );
}

export default App;
