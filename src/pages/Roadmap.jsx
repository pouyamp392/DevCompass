import { useContext, useState } from "react";

import QuizContext from "../context/QuizContext";

import SkillCard from "../components/roadmap/SkillCard";
import SkillModal from "../components/roadmap/SkillModal";
import Scene from "../components/ui/Scene";

export default function Roadmap() {
    const {
        roadmap,
        progress,
        roadmapGoal,
        totalSkills,
        completedSkillsCount,
        roadmapProgress,
    } = useContext(QuizContext);

    const [selectedSkill, setSelectedSkill] = useState(null);

    const goalTitles = {
        frontend: "Frontend Developer",
        backend: "Backend Developer",
        ai: "AI Developer",
        devops: "DevOps Developer",
        softSkills: "Soft Skills Developer",
    };

    // --------------------------------
    // Skill status
    // --------------------------------

    function getSkillStatus(skill) {
        const value =
            Number(progress?.[skill.id]) || 0;

        // Completed
        if (value >= 100) {
            return "completed";
        }

        // Currently learning
        if (value > 0) {
            return "current";
        }

        // Check prerequisites
        const requires = skill.requires || [];

        const hasUncompletedPrerequisite =
            requires.some(
                (requiredId) =>
                    (Number(
                        progress?.[requiredId]
                    ) || 0) < 100
            );

        if (hasUncompletedPrerequisite) {
            return "locked";
        }

        // Available to start
        return "current";
    }

    // --------------------------------
    // Empty roadmap
    // --------------------------------

    if (!roadmap?.length) {
        return (
            <>
                <Scene variant="result" />

                <main className="relative z-10 flex min-h-screen items-center justify-center text-white">
                    <div className="text-center">
                        <div className="text-6xl">
                            🗺️
                        </div>

                        <h1 className="mt-4 text-3xl font-black">
                            هنوز نقشه راهی ساخته نشده
                        </h1>
                    </div>
                </main>
            </>
        );
    }

    // --------------------------------
    // Render
    // --------------------------------

    return (
        <>
            <Scene variant="result" />

            <main className="relative z-10 mx-auto max-w-2xl px-6 pb-24 pt-12 text-white">

                {/* Header */}
                <div className="mb-10 space-y-3 text-center">
                    <p className="text-[10px] font-mono uppercase tracking-[12px] text-cyan-400/60">
                        Your Path
                    </p>

                    <h1 className="text-5xl font-black tracking-tight md:text-6xl">
                        {goalTitles[roadmapGoal] ||
                            "Developer Roadmap"}
                    </h1>
                </div>

                {/* Progress */}
                <section className="mb-12 rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl">

                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-[8px] text-cyan-400/70">
                            Progress
                        </span>

                        <span className="text-sm font-mono font-bold text-cyan-400">
                            {roadmapProgress}%
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_0_15px_rgba(34,211,238,.4)] transition-all duration-700 ease-out"
                            style={{
                                width: `${roadmapProgress}%`,
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between">

                        <p className="text-xs text-zinc-500">
                            {completedSkillsCount} of{" "}
                            {totalSkills} skills completed
                        </p>

                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />

                            <span className="text-[10px] uppercase tracking-wider text-zinc-600">
                                In Progress
                            </span>
                        </div>

                    </div>
                </section>

                {/* Stages */}
                <div className="space-y-16">

                    {roadmap.map((stage) => (
                        <section
                            key={stage.stage}
                            className="space-y-5"
                        >

                            {/* Stage title */}
                            <div className="flex items-center gap-3">

                                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.08] text-sm font-bold text-cyan-400 backdrop-blur-sm">
                                    {stage.stage}
                                </div>

                                <span className="text-xs font-mono uppercase tracking-[4px] text-zinc-600">
                                    Stage
                                </span>

                            </div>

                            {/* Skills */}
                            <div className="space-y-3">

                                {stage.skills?.map((skill) => (
                                    <SkillCard
                                        key={skill.id}
                                        skill={skill}
                                        status={getSkillStatus(skill)}
                                        progress={
                                            Number(
                                                progress?.[
                                                    skill.id
                                                ]
                                            ) || 0
                                        }
                                        onClick={
                                            setSelectedSkill
                                        }
                                    />
                                ))}

                            </div>

                        </section>
                    ))}

                </div>
            </main>

            <SkillModal
                skill={selectedSkill}
                onClose={() =>
                    setSelectedSkill(null)
                }
            />
        </>
    );
}
