import { Link } from "react-router-dom";
import SkillActionButton from "../components/skills/SkillActionButton";
import SkillEstimate from "../components/skills/SkillEstimate";
import SkillExercise from "../components/skills/SkillExercise";
import SkillHeader from "../components/skills/SkillHeader";
import SkillNextSteps from "../components/skills/SkillNextSteps";
import SkillOverallProgress from "../components/skills/SkillOverallProgress";
import SkillPrerequisites from "../components/skills/SkillPrerequisites";
import SkillProgress from "../components/skills/SkillProgress";
import SkillProject from "../components/skills/SkillProject";
import SkillResources from "../components/skills/SkillResources";
import SkillStats from "../components/skills/SkillStats";
import SkillStatus from "../components/skills/SkillStatus";
import SkillSuggestions from "../components/skills/SkillSuggestions";
import Scene from "../components/ui/Scene";
import { useSkillData } from "../hooks/useSkillData";



export default function Skill() {
    const {
        skill,
        skillProgress,
        overallProgress,
        status,
        getButtonText,
        isButtonDisabled,
        estimateEndDate,
        requires,
        progress,
        nextSkillsInStage,
        nextStage,
        currentStage,
        suggestedSkills,
        roadmap,
        diffText
    } = useSkillData();

    if (!skill) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <span className="text-6xl">🪐</span>
                    <h1 className="text-4xl font-black text-white">مهارت پیدا نشد</h1>
                    <Link to="/roadmap" className="text-cyan-400 text-sm hover:underline">
                        بازگشت به نقشه راه
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <>
            <Scene variant="result" />
            <section className="relative z-10 max-w-2xl mx-auto px-6 pt-16 pb-24 text-white space-y-12">
                
                <SkillHeader skill={skill} />
                <SkillStatus status={status} />
                <SkillOverallProgress overallProgress={overallProgress} />
                <SkillProgress skillProgress={skillProgress} skillTitle={skill.title} />
                <SkillStats skill={skill} roadmap={roadmap} diffText={diffText} />
                <SkillEstimate estimateEndDate={estimateEndDate} />
                
                <SkillProject project={skill.project} />
                <SkillExercise exercise={skill.exercise} />
                
                <SkillPrerequisites requires={requires} progress={progress} />
                <SkillNextSteps 
                    nextSkillsInStage={nextSkillsInStage}
                    nextStage={nextStage}
                    currentStage={currentStage}
                />
                
                <SkillResources resources={skill.resources} />
                <SkillSuggestions 
                    suggestedSkills={suggestedSkills} 
                    skillProgress={skillProgress} 
                />
                
                <SkillActionButton 
                    getButtonText={getButtonText}
                    isButtonDisabled={isButtonDisabled}
                />
            </section>
        </>
    );
}
