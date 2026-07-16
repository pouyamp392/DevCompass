export default function SkillActionButton({ 
    getButtonText, 
    isButtonDisabled 
}) {
    return (
        <div className="text-center">
            <button 
                className={`
                    px-10 py-4 rounded-2xl font-bold 
                    transition-all duration-300 
                    ${isButtonDisabled 
                        ? 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed' 
                        : 'bg-cyan-400 text-black hover:bg-cyan-300 active:scale-[0.98]'
                    }
                `}
                disabled={isButtonDisabled}
            >
                {getButtonText()}
            </button>
        </div>
    );
}