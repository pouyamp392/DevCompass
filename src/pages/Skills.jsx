import Scene from "../components/ui/Scene";
import { useSkills } from "../hooks/useSkills";

import SkillsHero from "../components/skills/SkillsHero";
import SkillsContinue from "../components/skills/SkillsContinue";
import SkillsSearchBar from "../components/skills/SkillsSearchBar";
import SkillsCategory from "../components/skills/SkillsCategory";
import SkillsEmptyState from "../components/skills/SkillsEmptyState";

export default function Skills() {
    const {
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        expandedCategories,
        hoveredSkill,
        setHoveredSkill,
        skillsMap,
        getSkillStatus,
        getPrerequisiteDetails,
        buildSkillPath,
        toggleCategory,
        currentSkills,
        categorizedSkills,
        globalStats,
        progress,
    } = useSkills();

    return (
        <>
            <Scene variant="result" />
            <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 text-white space-y-8">
                <SkillsHero globalStats={globalStats} />

                <SkillsContinue
                    currentSkills={currentSkills}
                    getSkillStatus={getSkillStatus}
                    getPrerequisiteDetails={getPrerequisiteDetails}
                    progress={progress}
                    hoveredSkill={hoveredSkill}
                    setHoveredSkill={setHoveredSkill}
                />

                <SkillsSearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                <div className="space-y-4">
                    {categorizedSkills.map(category => (
                        <SkillsCategory
                            key={category.id}
                            category={category}
                            isExpanded={expandedCategories[category.id]}
                            onToggle={toggleCategory}
                            skillsMap={skillsMap}
                            getSkillStatus={getSkillStatus}
                            getPrerequisiteDetails={getPrerequisiteDetails}
                            buildSkillPath={buildSkillPath}
                            progress={progress}
                            hoveredSkill={hoveredSkill}
                            setHoveredSkill={setHoveredSkill}
                        />
                    ))}
                </div>

                {categorizedSkills.length === 0 && (
                    <SkillsEmptyState onClearSearch={() => setSearchTerm("")} />
                )}
            </section>
        </>
    );
}