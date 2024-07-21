import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Pages/Login/Login';
import AdminConf from './Pages/Admin/AdminConf';
import AdminUser from './Pages/Admin/AdminUser';
import ConsultConf from './Pages/ConsultConf/ConsultConf';

import AddConf from './Pages/AddConf/AddConf';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/user" element={<AdminUser />} />
          <Route path="/admin/conf" element={<AdminConf />} />
          <Route path="/conference/:id" element={<ConsultConf />} />
          <Route path="/conference/add" element={<AddConf />} />
        </Routes>
    </Router>
  </React.StrictMode>
)

