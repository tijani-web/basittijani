// src/pages/project-pages/StackProof.jsx
import ProjectTemplate from "./ProjectTemplate";
function StackProof() {
  return (
    <ProjectTemplate
      slug="stackproof"
      title="StackProof"
      description="A coding challenge platform with live code execution, XP system, and leaderboard — built for developers to practice and prove their skills."
      overview="StackProof is a developer-focused platform where users can solve coding challenges from beginner to advanced levels across multiple programming languages. It features a Monaco-powered code editor with Judge0 API integration for real-time execution, an XP and leaderboard system for gamification, and Firebase for authentication and data storage. The platform provides developers with a professional way to track progress, showcase skills, and compete with peers in a clean React-based dashboard."
      features={[
        "Coding Challenges — beginner to advanced, across multiple programming languages.",
        "Code Editor — powered by Monaco Editor with live code execution.",
        "Judge0 API Integration — run and test code instantly across different languages.",
        "XP System — earn XP based on difficulty & time, level up as you solve challenges.",
        "Leaderboard — compare your progress with other developers (publicly viewable).",
        "History Tracking — see all your completed challenges in your dashboard.",
        "Stats Dashboard — progress charts, XP breakdown by language, and more.",
        "Firebase Auth — secure login & signup (email + Google).",
        "Firestore Database — real-time XP, history, and leaderboard storage.",
        "Custom UI/UX — fully styled React dashboard (raw CSS, no Tailwind).",
      ]}
      tech="Frontend: React (Vite) | Code Editor: Monaco Editor | Code Execution: Judge0 API | Database & Auth: Firebase (Auth + Firestore) | Hosting: GitHub Pages | Styling: Pure CSS (modern dashboard design)"
      liveLink="https://stackproof.vercel.app"
      codeLink="https://github.com/tijani-web/stackproof"
    />
  );
}

export default StackProof;
