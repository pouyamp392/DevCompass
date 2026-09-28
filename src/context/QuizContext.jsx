import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import AuthContext from "./AuthContext";
import generateRoadmap from "../engine/generateRoadmap";
import generateStages from "../engine/generateStages";

const QuizContext = createContext();

// ========================================
// NORMALIZE PROGRESS
// ========================================
function normalizeProgress(rawProgress) {
  if (!rawProgress || typeof rawProgress !== "object") {
    return {};
  }

  const normalized = {};

  for (const [key, value] of Object.entries(rawProgress)) {
    normalized[Number(key)] = value;
  }

  return normalized;
}

export function QuizProvider({ children }) {
  const { user, updateUser } = useContext(AuthContext);

  // ========================================
  // STATE
  // ========================================
  const [result, setResult] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [progress, setProgress] = useState({});

  // Skills State
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);

  // ========================================
  // LOAD USER PROGRESS
  // ========================================
  useEffect(() => {
    if (!user?.id) {
      setProgress({});
      return;
    }

    let cancelled = false;

    async function loadProgress() {
      try {
        const response = await fetch(
          `http://localhost/devcompass-api/api/progress.php?user_id=${user.id}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "خطا در دریافت پیشرفت کاربر");
        }

        if (!cancelled) {
          setProgress(normalizeProgress(data.data));
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load user progress:", error);
          setProgress({});
        }
      }
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  // ========================================
  // LOAD ALL SKILLS
  // ========================================
  useEffect(() => {
    let cancelled = false;

    async function loadSkills() {
      try {
        setSkillsLoading(true);
        setSkillsError(null);

        const response = await fetch(
          "http://localhost/devcompass-api/api/skills.php"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "خطا در دریافت لیست مهارت‌ها");
        }

        if (!cancelled) {
          const skillsData = Array.isArray(data.data) ? data.data : [];
          setSkills(skillsData);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load skills:", error);
          setSkillsError(error.message || "خطا در دریافت مهارت‌ها");
          setSkills([]);
        }
      } finally {
        if (!cancelled) {
          setSkillsLoading(false);
        }
      }
    }

    loadSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  // ========================================
  // GENERATE USER ROADMAP
  // ========================================
  // roadmap از روی user.roadmap_goal و skills محاسبه می‌شه.
  // نیازی به fetch از سرور نیست — AuthContext منبع حقیقته.
  useEffect(() => {
    if (skillsLoading || skills.length === 0) {
      setRoadmap([]);
      return;
    }

    const goal = user?.roadmap_goal;

    if (!goal) {
      setRoadmap([]);
      return;
    }

    const roadmapSkills = generateRoadmap(goal, skills);
    const generatedRoadmap = generateStages(roadmapSkills);

    setRoadmap(generatedRoadmap);
  }, [user?.roadmap_goal, skills, skillsLoading]);

  // ========================================
  // ROADMAP PROGRESS CALCULATIONS
  // ========================================
  const progressData = useMemo(() => {
    const allRoadmapSkills = roadmap.flatMap((stage) => stage.skills || []);
    const totalSkills = allRoadmapSkills.length;

    const completedSkills = allRoadmapSkills.filter(
      (skill) => Number(progress?.[skill.id] || 0) >= 100
    );

    const completedSkillsCount = completedSkills.length;

    const roadmapProgress =
      totalSkills === 0
        ? 0
        : Math.round((completedSkillsCount / totalSkills) * 100);

    return {
      allSkills: allRoadmapSkills,
      totalSkills,
      completedSkills,
      completedSkillsCount,
      roadmapProgress,
    };
  }, [roadmap, progress]);

  // ========================================
  // UPDATE SKILL PROGRESS
  // ========================================
  const updateProgress = useCallback(
    async (skillId, value) => {
      const userId = Number(user?.id);
      const numericSkillId = Number(skillId);
      const numericValue = Number(value);

      if (!userId || !numericSkillId) {
        throw new Error(
          `شناسه نامعتبر است: user_id=${user?.id}, skill_id=${skillId}`
        );
      }

      if (
        Number.isNaN(numericValue) ||
        numericValue < 0 ||
        numericValue > 100
      ) {
        throw new Error(`مقدار پیشرفت نامعتبر است: ${value}`);
      }

      const response = await fetch(
        "http://localhost/devcompass-api/api/update-progress.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            skill_id: numericSkillId,
            progress: numericValue,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "خطا در ذخیره پیشرفت");
      }

      // Update local progress state
      setProgress((previous) => ({
        ...previous,
        [numericSkillId]: numericValue,
      }));

      // Update user state if API returned new user info
      if (data.data?.user) {
        updateUser(data.data.user);
      }

      return data;
    },
    [user?.id, updateUser]
  );

  // ========================================
  // MEMOIZED CONTEXT VALUE
  // ========================================
  const contextValue = useMemo(
    () => ({
      result,
      setResult,
      skills,
      setSkills,
      skillsLoading,
      skillsError,
      roadmap,
      setRoadmap,
      progress,
      setProgress,
      allSkills: progressData.allSkills,
      totalSkills: progressData.totalSkills,
      completedSkills: progressData.completedSkills,
      completedSkillsCount: progressData.completedSkillsCount,
      roadmapProgress: progressData.roadmapProgress,
      updateProgress,
    }),
    [
      result,
      skills,
      skillsLoading,
      skillsError,
      roadmap,
      progress,
      progressData,
      updateProgress,
    ]
  );

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
}

// ========================================
// CUSTOM HOOK
// ========================================
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz باید داخل QuizProvider استفاده شود");
  }
  return context;
}

export default QuizContext;