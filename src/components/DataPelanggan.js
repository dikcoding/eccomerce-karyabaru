import React, { useState } from "react";
import { useDataContext } from "../contexts/DataContext"; // Impor useDataContext

function DataPelanggan() {
  const { addDataPelanggan } = useDataContext(); // Ambil fungsi addDataPelanggan dari context

  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    noTelp: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Pelanggan:", formData);
    addDataPelanggan(formData); // Kirim data ke context
    setFormData({
      nama: "",
      alamat: "",
      noTelp: "",
      email: "",
    }); // Reset form setelah submit
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Data Diri Pelanggan
        </h2>

        <div className="mb-4">
          <label
            htmlFor="nama"
            className="block text-sm font-semibold text-gray-700"
          >
            Nama
          </label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="alamat"
            className="block text-sm font-semibold text-gray-700"
          >
            Alamat
          </label>
          <input
            type="text"
            id="alamat"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="noTelp"
            className="block text-sm font-semibold text-gray-700"
          >
            Nomor Telepon
          </label>
          <input
            type="text"
            id="noTelp"
            name="noTelp"
            value={formData.noTelp}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}

export default DataPelanggan;
