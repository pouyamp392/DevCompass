export default function DashboardHeader({ streakDays }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
                <h1 className="text-5xl font-black bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                    سلام پویا 👋
                </h1>
                <p className="text-zinc-500 text-lg">
                    Frontend Developer Journey
                </p>
            </div>
            <div className="flex items-center gap-3">
                <span className="px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold">
                    📅 {new Date().toLocaleDateString('fa-IR')}
                </span>
                <span className="px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold">
                    🔥 {streakDays} روز
                </span>
            </div>
        </div>
    );
}