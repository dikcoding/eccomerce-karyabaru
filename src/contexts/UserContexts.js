import React, { createContext, useState, useEffect } from "react";

// Membuat context untuk user
export const UserContext = createContext();

// UserProvider untuk membungkus komponen lain yang membutuhkan akses ke context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Cek token dari localStorage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fungsi reusable untuk fetch API dengan token
  const fetchWithToken = async (url, options = {}) => {
    if (!token) {
      console.error("Token is missing. Cannot proceed with the request.");
      logout(); // Hapus user & token jika tidak valid
      throw new Error("No token found. Please login again.");
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        console.warn("Unauthorized (401). Logging out...");
        logout(); // Token kadaluarsa, hapus sesi
        throw new Error("Session expired. Please login again.");
      }

      if (!response.ok) {
        throw new Error(`Request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("fetchWithToken Error:", error.message);
      setError(error.message);
      throw error;
    }
  };

  // Fungsi untuk mendapatkan informasi user saat ini
  const fetchUserData = async () => {
    try {
      const data = await fetchWithToken(
        "http://localhost:8000/api/users/current"
      );
      console.log("User Data:", data); // Log data user untuk pengecekan
      if (data && data.data) {
        setUser(data.data);
      } else {
        throw new Error("User data is missing.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data user saat pertama kali render
  useEffect(() => {
    console.log("Token on load:", token); // Log token saat aplikasi pertama kali dijalankan
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Fungsi login
  const login = async (username, password) => {
    setLoading(true);
    setError(null); // Reset error before login attempt

    try {
      const response = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Handle errors gracefully
        if (response.status === 401) {
          setError(
            "Invalid credentials. Please check your username and password."
          );
        } else {
          const errorData = await response.json();
          const errorMessage =
            errorData.message || `Login failed with status ${response.status}`;
          throw new Error(errorMessage);
        }
      }

      // Periksa respons untuk data
      const data = await response.json();
      console.log("Login Response Data:", data.data); // Log data login untuk pengecekan

      // Pastikan bahwa data dan data.data ada
      if (data && data.data && data.data.token) {
        const userData = data.data;

        // Pastikan username dan name ada dalam data
        if (userData.username && userData.name) {
          setUser(userData);
          setToken(userData.token || ""); // Ambil token jika ada dalam data

          localStorage.setItem("token", userData.token || ""); // Simpan token ke localStorage
        } else {
          throw new Error("Username or name is missing in response.");
        }
      } else {
        throw new Error("Invalid response from server: Missing data or token.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message); // Set user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  // Fungsi register
  const register = async (username, password, name) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });

      if (!response.ok) {
        throw new Error("Registration failed.");
      }

      const data = await response.json();
      console.log("Register Response Data:", data); // Log data register untuk pengecekan
      console.log(data);

      setToken(data.data.token);
      localStorage.setItem("token", data.data.token); // Simpan token
      setUser(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi update user
  const updateUser = async (name, password) => {
    try {
      const updatedData = await fetchWithToken(
        "http://localhost:8000/api/users/current",
        {
          method: "PATCH",
          body: JSON.stringify({ name, password }),
        }
      );
      setUser(updatedData.data);
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  // Fungsi logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        updateUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
