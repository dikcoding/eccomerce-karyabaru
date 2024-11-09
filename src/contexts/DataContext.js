import React, { createContext, useState, useContext } from "react";

// Buat context untuk DataPelanggannya
const DataContext = createContext();

// Provider untuk membungkus aplikasi dan memberikan akses ke context
export const DataProvider = ({ children }) => {
  const [dataPelanggan, setDataPelanggan] = useState([]);

  const addDataPelanggan = (data) => {
    setDataPelanggan((prevData) => [...prevData, data]);
  };

  return (
    <DataContext.Provider value={{ dataPelanggan, addDataPelanggan }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook untuk mengakses context
export const useDataContext = () => {
  return useContext(DataContext);
};
