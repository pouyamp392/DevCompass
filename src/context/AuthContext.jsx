import { createContext, useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../config";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================================
  // LOAD SAVED SESSION
  // ========================================
  useEffect(() => {
    const savedUser = localStorage.getItem("devcompass_user");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem("devcompass_user");
      }
    }

    setLoading(false);
  }, []);

  const updateUser = useCallback((updatedData) => {
    setUser((previousUser) => {
      if (!previousUser && !updatedData) return null;

      const newUserData = {
        ...previousUser,
        ...updatedData,
      };

      localStorage.setItem("devcompass_user", JSON.stringify(newUserData));
      return newUserData;
    });
  }, []);
  // ========================================
  // ADD XP (افزایش امتیاز کاربر)
  // ========================================
  // TODO: در فاز ۴-۵ یکپارچه‌سازی می‌شود.
  // این تابع فعلاً از context خارج شده تا کسی به‌اشتباه
  // XP محلی را بدون همگام‌سازی با سرور تغییر ندهد.
  const addXp = useCallback((amount = 50) => {
    setUser((previousUser) => {
      if (!previousUser) return null;

      const currentXp = Number(previousUser.xp || 0);
      const newXp = currentXp + amount;

      const updatedUser = {
        ...previousUser,
        xp: newXp,
      };

      localStorage.setItem("devcompass_user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  }, []);

  // ========================================
  // REGISTER
  // ========================================
  async function register(username, email, password) {
    const response = await fetch(
      `${API_BASE_URL}/api/register.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "ثبت‌نام ناموفق بود");
    }

    const registeredUser = data.data.user;
    
    updateUser(registeredUser);

    return registeredUser;
  }

  // ========================================
  // LOGIN
  // ========================================
  async function login(email, password) {
    const response = await fetch(
      `${API_BASE_URL}/api/login.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "ورود ناموفق بود");
    }

    const loggedUser = data.data.user;
    updateUser(loggedUser);

    return loggedUser;
  }

  // ========================================
  // UPDATE PROFILE
  // ========================================
  async function updateProfile(username, email) {
    if (!user?.id) {
      throw new Error("کاربر وارد نشده است");
    }

    const response = await fetch(
      `${API_BASE_URL}/api/update-profile.php`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(user.id),
          username,
          email,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "ویرایش پروفایل ناموفق بود");
    }

    const updatedUser = data.data.user;
    updateUser(updatedUser);

    return updatedUser;
  }

  // ========================================
  // LOGOUT
  // ========================================
  function logout() {
    setUser(null);
    localStorage.removeItem("devcompass_user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;