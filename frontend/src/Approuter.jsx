import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // your login component
import Dashboard from './Dashboard'; // after login page

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
