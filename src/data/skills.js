export const skills = [
  {
    id: "html",
    title: "HTML",
    requires: [],
    difficulty: 1,
    time: 7,
    goals: ["frontend"]
  },

  {
    id: "css",
    title: "CSS",
    requires: ["html"],
    difficulty: 2,
    time: 14,
    goals: ["frontend"]
  },

  {
    id: "javascript",
    title: "JavaScript",
    requires: ["html", "css"],
    difficulty: 3,
    time: 45,
    goals: ["frontend", "backend"]
  },

  {
    id: "react",
    title: "React",
    requires: ["html" , "css" ,"javascript"],
    difficulty: 4,
    time: 30,
    goals: ["frontend"]
  }
];