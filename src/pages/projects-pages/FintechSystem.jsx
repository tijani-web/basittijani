// src/pages/project-pages/FintechSystem.jsx
import ProjectTemplate from "./ProjectTemplate";

function FintechSystem() {
  return (
    <ProjectTemplate
      slug="fintech-system"
      title="Banking & FinTech System (C + Docs UI)"
      description="A complete C-based banking management solution with secure PIN authentication, dual admin/customer roles."
      overview="Banking & FinTech System A complete C-based banking management solution with secure PIN authentication, dual admin/customer roles, transaction tracking, loan management, investment portfolio, and automatic data persistence. Features age verification, financial analytics, and comprehensive account management with robust file storage."
      features={[
        " PIN-secured authentication system (Customer & Admin).",
        " Banking operations: deposits, withdrawals, transfers, and loan management.",
        " Investment handling and account analytics.",
        " Transaction history with the ability to search accounts.",
        " Admin controls: manage accounts, update statuses, view system-wide reports.",
        " Persistent data storage via file system (bank_data.txt)."
      ]}
      tech="C Programming"
      liveLink="https://tijani-web.github.io/fintech-docs-ui/"
      codeLink="https://github.com/tijani-web/banking-fintech-system-c"
    />
  );
}

export default FintechSystem;
