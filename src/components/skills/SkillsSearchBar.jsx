import { HiMagnifyingGlass, HiBarsArrowDown } from "react-icons/hi2";
import { SORT_OPTIONS } from "../../constants/sortOptions";

export default function SkillsSearchBar({
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
}) {
    return (
        <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
                <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                    type="text"
                    placeholder="جستجو بین مهارت‌ها..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 focus:border-cyan-400/30 focus:outline-none text-white placeholder-zinc-500 text-sm transition-colors"
                />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
                <HiBarsArrowDown size={16} className="text-zinc-500" />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/[0.03] border border-white/5 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-400/30"
                >
                    {SORT_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}