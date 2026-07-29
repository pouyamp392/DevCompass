export default function SkillProject({ project }) {
    if (!project) return null;

    return (
        <div className="space-y-3">
            <h2 className="text-lg font-bold">پروژه</h2>
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                <h3 className="font-bold text-cyan-400">
                    {project.title}
                </h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                    {project.description}
                </p>
            </div>
        </div>
    );
}