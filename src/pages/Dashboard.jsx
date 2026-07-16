import Scene from "../components/ui/Scene";
import { useDashboardData } from "../hooks/useDashboardData";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardContinue from "../components/dashboard/DashboardContinue";
import DashboardQuickActions from "../components/dashboard/DashboardQuickActions";
import DashboardRecentSkills from "../components/dashboard/DashboardRecentSkills";
import DashboardAchievements from "../components/dashboard/DashboardAchievements";
import DashboardDailyGoal from "../components/dashboard/DashboardDailyGoal";
import DashboardDistribution from "../components/dashboard/DashboardDistribution";
import DashboardQuickStats from "../components/dashboard/DashboardQuickStats";
import DashboardQuote from "../components/dashboard/DashboardQuote";

export default function Dashboard() {
    const {
        allSkills,
        completedSkills,
        inProgressSkills,
        lockedSkills,
        currentSkill,
        nextSkill,
        totalXP,
        roadmapProgress,
        currentStage,
        recentSkills,
        skillProgress,
        achievements,
        unlockedAchievements,
        nextAchievement,
        dailyProgress,
        setDailyProgress,
        streakDays,
        progress
    } = useDashboardData();

    return (
        <>
            <Scene variant="result" />

            <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-white space-y-10">
                <DashboardHeader streakDays={streakDays} />
                
                <DashboardStats 
                    roadmapProgress={roadmapProgress}
                    completedSkills={completedSkills}
                    allSkills={allSkills}
                    inProgressSkills={inProgressSkills}
                    totalXP={totalXP}
                />
                
                <DashboardContinue 
                    currentSkill={currentSkill}
                    nextSkill={nextSkill}
                    allSkills={allSkills}
                    skillProgress={skillProgress}
                    completedSkills={completedSkills}
                    progress={progress}
                    allSkillsCount={allSkills.length}
                />
                
                <DashboardQuickActions 
                    unlockedAchievements={unlockedAchievements}
                    achievements={achievements}
                />
                
                <div className="grid md:grid-cols-3 gap-6">
                    <DashboardRecentSkills 
                        recentSkills={recentSkills}
                        progress={progress}
                    />
                    
                    <div className="space-y-6">
                        <DashboardDailyGoal 
                            dailyProgress={dailyProgress}
                            setDailyProgress={setDailyProgress}
                        />
                        
                        <DashboardAchievements 
                            achievements={achievements}
                            unlockedAchievements={unlockedAchievements}
                            nextAchievement={nextAchievement}
                        />
                    </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <DashboardDistribution 
                        completedSkills={completedSkills}
                        inProgressSkills={inProgressSkills}
                        lockedSkills={lockedSkills}
                        allSkills={allSkills}
                    />
                    
                    <DashboardQuickStats 
                        allSkills={allSkills}
                        completedSkills={completedSkills}
                        totalXP={totalXP}
                        currentStage={currentStage}
                    />
                </div>
                
                <DashboardQuote />
            </section>
        </>
    );
}