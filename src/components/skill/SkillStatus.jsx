export default function SkillStatus({ status }) {
    return (
        <div className="flex justify-center">
            <span className={`
                px-5 py-2 rounded-full
                ${status.className}
                text-sm font-bold
                border
            `}>
                {status.label}
            </span>
        </div>
    );
}