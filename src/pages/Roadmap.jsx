import { useContext, useState } from "react";

import QuizContext from "../context/QuizContext";

import SkillCard from "../components/roadmap/SkillCard";
import RoadmapHeader from "../components/roadmap/RoadmapHeader";
import RoadmapProgress from "../components/roadmap/RoadmapProgress";
import SkillModal from "../components/roadmap/SkillModal";
import Scene from "../components/ui/Scene";

export default function Roadmap() {

    const { roadmap, progress } = useContext(QuizContext);
    const allSkills = roadmap?.flatMap(stage => stage.skills) || [];
    const [selectedSkill, setSelectedSkill] = useState(null);

    function getSkillStatus(skill, index) {
        const value = progress?.[skill.id] || 0;
        if (value >= 100) return "completed";
        if (index === 0) return "current";
        const prev = allSkills[index - 1];
        if ((progress?.[prev.id] || 0) >= 100) return "current";
        return "locked";
    }

    const totalSkills = roadmap?.reduce((acc, stage) => acc + stage.skills.length, 0) || 0;
    const completedSkills = Object.values(progress || {}).filter(v => v >= 100).length;
    const roadmapProgress = totalSkills === 0 ? 0 : Math.round((completedSkills / totalSkills) * 100);

    return (
        <>
            <Scene variant="result" />

            <div className="relative z-10 max-w-2xl mx-auto px-6 pt-12 pb-24 space-y-10">

                {/* Header */}
                <div className="text-center space-y-3">
                    <p className="text-cyan-400/60 text-[10px] tracking-[12px] font-mono uppercase">
                        Your Path
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                        Frontend Developer
                    </h1>
                </div>

                {/* Progress Card */}
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-cyan-400/70 text-[10px] tracking-[8px] font-mono uppercase">
                            Progress
                        </span>
                        <span className="text-cyan-400 text-sm font-mono font-bold">
                            {roadmapProgress}%
                        </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(34,211,238,.4)]"
                            style={{ width: `${roadmapProgress}%` }}
                        />
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <p className="text-zinc-500 text-xs">
                            {completedSkills} of {totalSkills} skills completed
                        </p>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                            <span className="text-zinc-600 text-[10px] uppercase tracking-wider">In Progress</span>
                        </div>
                    </div>
                </div>

                {/* Stages */}
                <div className="space-y-16">
                    {roadmap.map((stage) => (
                        <div key={stage.stage} className="space-y-5">
                            
                            {/* Stage Title */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-cyan-400/[0.08] border border-cyan-400/20 flex items-center justify-center text-cyan-400 font-bold text-sm backdrop-blur-sm">
                                    {stage.stage}
                                </div>
                                <span className="text-zinc-600 text-xs tracking-[4px] font-mono uppercase">
                                    Stage
                                </span>
                            </div>

                            {/* Skills */}
                            <div className="space-y-3">
                                {stage.skills.map((skill) => (
                                    <SkillCard
                                        key={skill.id}
                                        skill={skill}
                                        status={getSkillStatus(
                                            skill,
                                            allSkills.findIndex(s => s.id === skill.id)
                                        )}
                                        progress={progress?.[skill.id] || 0}
                                        onClick={setSelectedSkill}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        </>
    );
}