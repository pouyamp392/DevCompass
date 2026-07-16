export default function DashboardDailyGoal({ dailyProgress, setDailyProgress }) {
    const goal = 60;
    const percentage = Math.min(100, Math.floor((dailyProgress / goal) * 100));
    const circumference = 2 * Math.PI * 34;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-zinc-500 text-sm">🎯 هدف روزانه</p>
                    <h3 className="text-2xl font-black text-yellow-400">
                        {dailyProgress} دقیقه
                    </h3>
                    <p className="text-zinc-600 text-xs">از {goal} دقیقه</p>
                </div>
                <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 -rotate-90">
                        <circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="url(#dailyGradient)"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={`${circumference} ${circumference}`}
                            strokeDashoffset={offset}
                            className="transition-all duration-700"
                        />
                        <defs>
                            <linearGradient id="dailyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#f59e0b" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-yellow-400">
                        {percentage}%
                    </span>
                </div>
            </div>
            {dailyProgress < goal && (
                <button 
                    onClick={() => setDailyProgress(prev => Math.min(60, prev + 15))}
                    className="w-full mt-4 py-2 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-sm font-bold hover:bg-yellow-400/20 transition-colors"
                >
                    ⏱ +۱۵ دقیقه
                </button>
            )}
        </div>
    );
}