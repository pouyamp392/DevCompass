import { useState, useContext, useMemo, useCallback } from "react";
import QuizContext from "../context/QuizContext";
import { skills } from "../data/skills";
import { CATEGORIES } from "../constants/categories";

export function useSkills() {
    const { progress } = useContext(QuizContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("progress");
    const [expandedCategories, setExpandedCategories] = useState(
        CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: false }), {})
    );
    const [hoveredSkill, setHoveredSkill] = useState(null);

    // ===== DATA =====
    const allSkills = useMemo(() => skills, []);

    const skillsMap = useMemo(() => {
        return Object.fromEntries(allSkills.map(s => [s.id, s]));
    }, [allSkills]);

    // ===== SKILL STATUS =====
    const getSkillStatus = useCallback((skill) => {
        const value = progress?.[skill.id] || 0;
        if (value >= 100) return "completed";
        if (value > 0) return "in-progress";

        const requires = skill.requires || [];
        if (requires.length === 0) return "available";

        const hasUncompletedRequired = requires.some(
            reqId => (progress?.[reqId] || 0) < 100
        );

        return hasUncompletedRequired ? "locked" : "available";
    }, [progress]);

    // ===== PREREQUISITES =====
    const getPrerequisiteDetails = useCallback((skill) => {
        const required = (skill.requires || []).map(reqId => ({
            id: reqId,
            title: skillsMap[reqId]?.title || reqId,
            icon: skillsMap[reqId]?.icon || "📘",
            completed: (progress?.[reqId] || 0) >= 100,
            type: "required",
        }));

        const recommended = (skill.recommended || []).map(recId => ({
            id: recId,
            title: skillsMap[recId]?.title || recId,
            icon: skillsMap[recId]?.icon || "📘",
            completed: (progress?.[recId] || 0) >= 100,
            type: "recommended",
        }));

        return { required, recommended };
    }, [skillsMap, progress]);

    // ===== SKILL PATH =====
    const buildSkillPath = useCallback((skillId) => {
        const path = [];
        let currentId = skillId;
        const visited = new Set();

        while (currentId && !visited.has(currentId)) {
            visited.add(currentId);
            const skill = skillsMap[currentId];
            if (!skill) break;

            path.unshift({
                id: skill.id,
                title: skill.title,
                icon: skill.icon || "📘",
                completed: (progress?.[skill.id] || 0) >= 100,
                inProgress: (progress?.[skill.id] || 0) > 0 && (progress?.[skill.id] || 0) < 100,
            });

            if (skill.requires?.length > 0) {
                currentId = skill.requires[0];
            } else {
                break;
            }
        }

        return path;
    }, [skillsMap, progress]);

    // ===== CURRENT SKILLS =====
    const currentSkills = useMemo(() => {
        return allSkills
            .filter(s => {
                const status = getSkillStatus(s);
                return status === "in-progress" || status === "available";
            })
            .slice(0, 3);
    }, [allSkills, getSkillStatus]);

    // ===== CATEGORIZED SKILLS =====
    const categorizedSkills = useMemo(() => {
        const result = CATEGORIES.map(cat => {
            const skills = allSkills.filter(skill => {
                const matchesCategory = cat.skillCategories.includes(skill.category);
                const matchesGoal = skill.goals?.some(g => cat.goals.includes(g));
                return matchesCategory || matchesGoal;
            });

            const filtered = searchTerm
                ? skills.filter(s =>
                    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                : skills;

            const sorted = [...filtered].sort((a, b) => {
                switch (sortBy) {
                    case "progress":
                        return (progress?.[b.id] || 0) - (progress?.[a.id] || 0);
                    case "difficulty":
                        return (b.difficulty || 0) - (a.difficulty || 0);
                    case "xp":
                        return (b.xp || 0) - (a.xp || 0);
                    case "name":
                        return a.title.localeCompare(b.title);
                    default:
                        return 0;
                }
            });

            const completed = sorted.filter(s => getSkillStatus(s) === "completed").length;
            const inProgress = sorted.filter(s => getSkillStatus(s) === "in-progress").length;
            const locked = sorted.filter(s => getSkillStatus(s) === "locked").length;

            return {
                ...cat,
                skills: sorted,
                stats: {
                    total: sorted.length,
                    completed,
                    inProgress,
                    locked,
                    available: sorted.length - completed - inProgress - locked,
                    progress: sorted.length > 0 ? Math.round((completed / sorted.length) * 100) : 0,
                },
            };
        });

        return result.filter(cat => cat.skills.length > 0);
    }, [allSkills, progress, searchTerm, sortBy, getSkillStatus]);

    // ===== GLOBAL STATS =====
    const globalStats = useMemo(() => {
        const completed = allSkills.filter(s => getSkillStatus(s) === "completed").length;
        const inProgress = allSkills.filter(s => getSkillStatus(s) === "in-progress").length;
        const total = allSkills.length;
        const earnedXP = allSkills
            .filter(s => getSkillStatus(s) === "completed")
            .reduce((acc, s) => acc + (s.xp || s.difficulty * 100 || 100), 0);
        const totalXP = allSkills.reduce((acc, s) => acc + (s.xp || s.difficulty * 100 || 100), 0);
        const level = Math.floor(completed / 3) + 1;

        return { completed, inProgress, total, earnedXP, totalXP, level };
    }, [allSkills, getSkillStatus]);

    // ===== TOGGLE =====
    const toggleCategory = useCallback((categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId],
        }));
    }, []);

    return {
        // State
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        expandedCategories,
        hoveredSkill,
        setHoveredSkill,
        // Data
        allSkills,
        skillsMap,
        // Functions
        getSkillStatus,
        getPrerequisiteDetails,
        buildSkillPath,
        toggleCategory,
        // Derived
        currentSkills,
        categorizedSkills,
        globalStats,
    };
}