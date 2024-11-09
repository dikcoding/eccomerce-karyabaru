import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DataProvider } from "./contexts/DataContext"; // Impor DataProvider

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import DataPelanggan from "./components/DataPelanggan";

const App = () => {
  return (
    <DataProvider>
      {" "}
      {/* Bungkus aplikasi dengan DataProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
                <Sidebar />
                <Footer />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <Header />
                <ProductDetails />
                <Sidebar />
                <Footer />
              </>
            }
          />
          <Route
            path="/datapelanggan"
            element={
              <>
                <DataPelanggan />
              </>
            }
          />
        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
