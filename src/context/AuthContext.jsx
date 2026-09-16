import { createContext, useEffect, useState, useCallback } from "react";

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
        // حصول اطمینان از وجود مقدار متغیر xp
        setUser({
          ...parsedUser,
          xp: parsedUser.xp ?? 0,
        });
      } catch {
        localStorage.removeItem("devcompass_user");
      }
    }

    setLoading(false);
  }, []);

  // ========================================
  // UPDATE USER DATA
  // ========================================
  const updateUser = useCallback((updatedData) => {
    setUser((previousUser) => {
      if (!previousUser && !updatedData) return null;

      const newUserData = {
        ...previousUser,
        ...updatedData,
        xp: updatedData?.xp ?? previousUser?.xp ?? 0, // حفظ مقدار XP
      };

      localStorage.setItem("devcompass_user", JSON.stringify(newUserData));
      return newUserData;
    });
  }, []);

  // ========================================
  // ADD XP (افزایش امتیاز کاربر)
  // ========================================
  const addXp = useCallback((amount = 50) => {
    setUser((previousUser) => {
      if (!previousUser) return null;

      const currentXp = Number(previousUser.xp || 0);
      const newXp = currentXp + amount;

      const updatedUser = {
        ...previousUser,
        xp: newXp,
      };

      // ذخیره در localStorage برای پایدار ماندن تغییرات
      localStorage.setItem("devcompass_user", JSON.stringify(updatedUser));
      
      // در صورت نیاز می‌توانید درخواست fetch به API هم ارسال کنید
      // fetch("http://localhost/devcompass-api/api/update-xp.php", { ... });

      return updatedUser;
    });
  }, []);

  // ========================================
  // REGISTER
  // ========================================
  async function register(username, email, password) {
    const response = await fetch(
      "http://localhost/devcompass-api/api/register.php",
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

    const registeredUser = {
      ...data.data.user,
      xp: data.data.user.xp ?? 0,
    };
    updateUser(registeredUser);

    return registeredUser;
  }

  // ========================================
  // LOGIN
  // ========================================
  async function login(email, password) {
    const response = await fetch(
      "http://localhost/devcompass-api/api/login.php",
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

    const loggedUser = {
      ...data.data.user,
      xp: data.data.user.xp ?? 0,
    };
    updateUser(loggedUser);

    return loggedUser;
  }

  // ========================================
  // UPDATE PROFILE
  // ========================================
  async function updateProfile(username, email, password = "") {
    if (!user?.id) {
      throw new Error("کاربر وارد نشده است");
    }

    const response = await fetch(
      "http://localhost/devcompass-api/api/update-profile.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(user.id),
          username,
          email,
          password,
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
        addXp, // خروجی دادن تابع افزایش XP
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;