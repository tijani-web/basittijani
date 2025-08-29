// src/pages/project-pages/WanderMind.jsx
import ProjectTemplate from "./ProjectTemplate";


function WanderMind() {
  return (
    <ProjectTemplate
      slug="wandermind"
      title="WanderMind"
      description="A mindfulness web app for tracking moods, journaling, exploring calming activities, and chatting with an empathetic AI companion."
      overview="WanderMind is a digital wellness companion built to promote emotional awareness and mindfulness. It allows users to log moods, keep private journal entries, and discover calming activities, while also providing an AI-driven chat for empathetic support. With Firebase authentication, secure Firestore storage, and a smooth React interface enhanced by Framer Motion, WanderMind blends technology with mental wellness in an accessible and engaging way."
      features={[
        "AI Companion Chat – empathetic conversations powered by GPT-4o-mini.",
        "Mood Tracker – log and visualize emotions over time.",
        "Journaling – secure personal entries stored with Firebase Firestore.",
        "Mindful Escapes – curated calming activities to revisit anytime.",
        "Authentication – email & Google login with Firebase Authentication.",
        "Responsive UI – modern React 19 + Framer Motion for seamless experience."
      ]}
      tech="Frontend: Reactjs, Framer Motion | Database & Auth: Firebase (Authentication + Firestore) | AI Integration: OpenAI GPT-4o-mini | Deployment: Vercel"
      liveLink="https://wandermind-app.vercel.app/"
      codeLink="https://github.com/tijani-web/wandermind"
    />
  );
}

export default WanderMind;
