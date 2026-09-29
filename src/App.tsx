import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ClassSelectionGrid } from './components/ClassSelectionGrid';
import { KidsLearningCorner } from './components/KidsLearningCorner';
import { KidsAiTeacherZone } from './components/KidsAiTeacherZone';
import { MembershipPlansSection } from './components/MembershipPlansSection';
import { StudentLeaderboardWidget } from './components/StudentLeaderboardWidget';
import { StudentMainDashboardView } from './components/StudentMainDashboardView';
import { PlanComparisonMatrix } from './components/PlanComparisonMatrix';
import { AiAssistantModal } from './components/AiAssistantModal';
import { RegistrationModal } from './components/RegistrationModal';
import { LoginModal } from './components/LoginModal';
import { UserDashboardModal } from './components/UserDashboardModal';
import { IdCardModal } from './components/IdCardModal';
import { StudentPlanHubPage } from './components/StudentPlanHubPage';
import { Footer } from './components/Footer';
import { ioisMasterPlans } from './data/ioisPlansData';
import { PlanDetail, MemberProfile } from './types';
import { 
  getCurrentSessionUser, 
  setCurrentSessionUser 
} from './services/userService';

export default function App() {
  // User session state - genuine student session
  const [currentUser, setCurrentUser] = useState<MemberProfile | null>(() => {
    return getCurrentSessionUser() || null;
  });

  // Dedicated Study Page state (if non-null, shows the full study & learning hub for that plan)
  const [activeStudyPlanId, setActiveStudyPlanId] = useState<string | null>(null);

  // Modals state
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedPlanForReg, setSelectedPlanForReg] = useState<string>('plan-01');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);
  const [idCardModalOpen, setIdCardModalOpen] = useState(false);
  const [kidsAiZoneOpen, setKidsAiZoneOpen] = useState(false);
  const [isDashboardView, setIsDashboardView] = useState<boolean>(() => !!getCurrentSessionUser());

  // Auto-sync current user session
  useEffect(() => {
    const user = getCurrentSessionUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleOpenAi = (prompt?: string) => {
    setAiInitialPrompt(prompt);
    setAiModalOpen(true);
  };

  const handleOpenRegistration = (planId?: string) => {
    if (planId) setSelectedPlanForReg(planId);
    setRegistrationModalOpen(true);
  };

  const handleSuccessRegistration = (newProfile: MemberProfile) => {
    setCurrentUser(newProfile);
    setIsDashboardView(true);
    setRegistrationModalOpen(false);
    setIdCardModalOpen(true);
  };

  const handleSuccessLogin = (member: MemberProfile) => {
    setCurrentUser(member);
    setIsDashboardView(true);
    setLoginModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentSessionUser(null);
    setCurrentUser(null);
    setIsDashboardView(false);
    setDashboardModalOpen(false);
  };

  const handleOpenStudyPage = (planId: string) => {
    setActiveStudyPlanId(planId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (sectionId: string) => {
    if (activeStudyPlanId) {
      setActiveStudyPlanId(null);
    }
    setTimeout(() => {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  const activePlanObj = activeStudyPlanId 
    ? (ioisMasterPlans.find(p => p.id === activeStudyPlanId) || ioisMasterPlans[0])
    : null;

  const handleOpenIdCardModal = () => {
    if (!currentUser) {
      setLoginModalOpen(true);
    } else {
      setIdCardModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white font-sans antialiased">
      
      {/* 1. Global Student Navbar (shown on landing page) */}
      {!isDashboardView && (
        <Navbar
          currentUser={currentUser}
          onOpenAiModal={handleOpenAi}
          onOpenRegistrationModal={handleOpenRegistration}
          onOpenLoginModal={() => {
            if (currentUser) {
              setIsDashboardView(true);
            } else {
              setLoginModalOpen(true);
            }
          }}
          onOpenDashboardModal={() => setIsDashboardView(true)}
          onOpenIdCardModal={handleOpenIdCardModal}
          onOpenStudyPage={handleOpenStudyPage}
          onScrollToSection={handleScrollToSection}
          onLogout={handleLogout}
        />
      )}

      {/* CONDITIONAL VIEWS:
          1. Dedicated Full-screen Plan Study Hub (activePlanObj)
          2. Logged-in Student Main Dashboard View (isDashboardView && currentUser)
          3. Main Landing Homepage (5 Responsive Sections)
      */}
      {activePlanObj ? (
        <StudentPlanHubPage
          plan={activePlanObj}
          currentUser={currentUser}
          onBack={() => setActiveStudyPlanId(null)}
          onSwitchPlan={(newPlanId) => {
            setActiveStudyPlanId(newPlanId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenRegistration={(pId) => handleOpenRegistration(pId)}
          onOpenLogin={() => setLoginModalOpen(true)}
        />
      ) : isDashboardView && currentUser ? (
        <StudentMainDashboardView
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenStudyPage={handleOpenStudyPage}
          onOpenIdCard={handleOpenIdCardModal}
          onViewHomepage={() => setIsDashboardView(false)}
        />
      ) : (
        /* MAIN LANDING: 5 PERFECT HOME SECTIONS */
        <main className="flex-1">
          {/* SECTION 1: HEADER & HERO SECTION */}
          <HeroSection
            onOpenStudyPage={handleOpenStudyPage}
            onOpenAiAdvisor={() => handleOpenAi('कक्षा और विषय के अनुसार मुझे अध्ययन की रूपरेखा समझाएं')}
            onOpenLoginModal={() => {
              if (currentUser) {
                setIsDashboardView(true);
              } else {
                setLoginModalOpen(true);
              }
            }}
            onScrollToSection={handleScrollToSection}
          />

          {/* SECTION 2: SMART STUDENT DASHBOARD / CLASS SELECTION GRID */}
          <ClassSelectionGrid
            onOpenStudyPage={handleOpenStudyPage}
            onOpenAiTeacher={(prompt) => handleOpenAi(prompt)}
            onScrollToPlans={() => handleScrollToSection('plans')}
          />

          {/* SECTION 3: KIDS SPECIAL E-LEARNING & AI TEACHER CORNER */}
          <KidsLearningCorner
            onOpenStudyPage={handleOpenStudyPage}
            onOpenAiTeacher={(prompt) => handleOpenAi(prompt)}
            onOpenKidsAiZone={() => setKidsAiZoneOpen(true)}
          />

          {/* SECTION 4: MEMBERSHIP PLANS & PACKAGES SECTION */}
          <MembershipPlansSection
            onJoinPlan={(planId) => handleOpenRegistration(planId)}
            onOpenStudyPage={handleOpenStudyPage}
            onOpenAiAdvisor={() => handleOpenAi('मुझे मेरे बजट और कक्षा के अनुसार सही प्लान बताएं')}
          />

          {/* INSPIRING STUDENT LEADERBOARD & 1-CLICK VIRAL SHARE */}
          <StudentLeaderboardWidget
            onJoinPlan={(planId) => handleOpenRegistration(planId)}
          />

          {/* BONUS CURRICULUM COMPARISON TABLE */}
          <PlanComparisonMatrix
            onJoinPlan={(plan) => handleOpenRegistration(plan.id)}
            onAskAi={(prompt) => handleOpenAi(prompt)}
            onOpenStudyPage={(pId) => handleOpenStudyPage(pId)}
          />
        </main>
      )}

      {/* SECTION 5: FOOTER AND SUPPORT (Landing View only) */}
      {!activePlanObj && !isDashboardView && (
        <Footer
          onScrollToTop={() => handleScrollToSection('top')}
          onOpenAiModal={() => handleOpenAi()}
          onOpenIdCardModal={handleOpenIdCardModal}
          onOpenRegistration={() => handleOpenRegistration('plan-01')}
          onOpenStudyPage={handleOpenStudyPage}
        />
      )}

      {/* MODALS */}
      
      {/* 0. Dedicated Kids AI Teacher Zone (Story Generator, Voice Mic, Quiz & Star Certificate) */}
      <KidsAiTeacherZone
        isOpen={kidsAiZoneOpen}
        onClose={() => setKidsAiZoneOpen(false)}
        onOpenStudyPage={handleOpenStudyPage}
      />

      {/* 1. Student AI Advisor Modal */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialPrompt={aiInitialPrompt}
        onSelectPlanToJoin={(plan) => {
          setAiModalOpen(false);
          handleOpenRegistration(plan.id);
        }}
      />

      {/* 2. Registration & Activation Modal */}
      <RegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        initialPlanId={selectedPlanForReg}
        onSuccess={handleSuccessRegistration}
        onOpenLogin={() => {
          setRegistrationModalOpen(false);
          setLoginModalOpen(true);
        }}
      />

      {/* 3. Member Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleSuccessLogin}
        onOpenRegister={() => {
          setLoginModalOpen(false);
          setRegistrationModalOpen(true);
        }}
      />

      {/* 4. Student Academic Dashboard Modal */}
      {currentUser && (
        <UserDashboardModal
          isOpen={dashboardModalOpen}
          onClose={() => setDashboardModalOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenStudyPage={handleOpenStudyPage}
          onOpenIdCard={() => {
            setDashboardModalOpen(false);
            setIdCardModalOpen(true);
          }}
          onProfileUpdated={(updated) => setCurrentUser(updated)}
        />
      )}

      {/* 5. Digital Smart ID Card Modal */}
      {currentUser && (
        <IdCardModal
          isOpen={idCardModalOpen}
          onClose={() => setIdCardModalOpen(false)}
          member={currentUser}
        />
      )}

    </div>
  );
}
