import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "../../context/AuthContext";

export default function PublicRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-cyan-400">
                در حال بررسی حساب...
            </div>
        );
    }

    // کاربر لاگین‌شده → نمی‌تونه صفحات public رو ببینه
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}