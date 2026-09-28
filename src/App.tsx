import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { PlanCard } from './components/PlanCard';
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
import { Sparkles, ArrowRight, BookOpen, Tv, Pencil, FileCheck2, GraduationCap } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'starter' | 'career' | 'master'>('all');
  
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
    setRegistrationModalOpen(false);
    setIdCardModalOpen(true);
  };

  const handleSuccessLogin = (member: MemberProfile) => {
    setCurrentUser(member);
    setLoginModalOpen(false);
    setDashboardModalOpen(true);
  };

  const handleLogout = () => {
    setCurrentSessionUser(null);
    setCurrentUser(null);
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

  // Filter plans based on active pill
  const filteredPlans = ioisMasterPlans.filter(plan => {
    if (selectedCategory === 'all') return true;
    return plan.category === selectedCategory;
  });

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
      
      {/* 1. Global Student Navbar */}
      <Navbar
        currentUser={currentUser}
        onOpenAiModal={handleOpenAi}
        onOpenRegistrationModal={handleOpenRegistration}
        onOpenLoginModal={() => setLoginModalOpen(true)}
        onOpenDashboardModal={() => setDashboardModalOpen(true)}
        onOpenIdCardModal={handleOpenIdCardModal}
        onOpenStudyPage={handleOpenStudyPage}
        onScrollToSection={handleScrollToSection}
        onLogout={handleLogout}
      />

      {/* CONDITIONAL: DEDICATED STUDENT PLAN STUDY & WORK PAGE */}
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
      ) : (
        /* MAIN LANDING & ALL 7 STUDY PLANS */
        <>
          {/* 2. Hero Banner with Official Google Flow Video */}
          <HeroBanner
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenAiAdvisor={() => handleOpenAi('कक्षा और विषय के अनुसार मुझे अध्ययन की रूपरेखा समझाएं')}
            onOpenStudyPage={handleOpenStudyPage}
          />

          {/* 3. 7 Master Plans Student Learning Hub Section */}
          <section id="plans" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100/80 px-2.5 py-1 rounded-md">
                  अध्ययन योजनाएं (Class 1 to 12 & Skills)
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
                  {selectedCategory === 'all' && 'सभी 7 अध्ययन योजनाएं (कक्षा 1 से 12 एवं स्किल्स)'}
                  {selectedCategory === 'starter' && 'शुरुआती स्तर: बाल विकास (Class 1-5) व यूथ स्किल (Class 6-8)'}
                  {selectedCategory === 'career' && 'माध्यमिक व उच्च स्तर: करियर, सामान्य ज्ञान व बोर्ड परीक्षा'}
                  {selectedCategory === 'master' && 'मास्टर स्तर: डिजिटल स्किल्स, कोडिंग व ऑल-इन-वन किट'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  प्रत्येक योजना में NCERT आधारित सचित्र नोट्स, ऑडियो वाचन, वीडियो कक्षाएं, डिजिटल अक्षर ट्रेसिंग पैड और दैनिक गृहकार्य चेकिंग शामिल हैं।
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenStudyPage('plan-01')}
                  className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900 hover:bg-orange-200 text-xs font-black flex items-center gap-1.5 transition-colors border border-orange-200"
                >
                  <BookOpen className="w-4 h-4 text-orange-600" />
                  <span>प्लान 01 स्टडी हब खोलें</span>
                </button>

                <button
                  onClick={() => handleScrollToSection('comparison')}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>पाठ्यक्रम तालिका</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onJoinPlan={(p) => handleOpenRegistration(p.id)}
                  onAskAi={(name) => handleOpenAi(`${name} के पाठ्यक्रम और विषयों के बारे में बताएं`)}
                  onOpenStudyWorkPage={(p) => handleOpenStudyPage(p.id)}
                />
              ))}
            </div>

          </section>

          {/* 4. Complete Plan Curriculum Comparison Table */}
          <PlanComparisonMatrix
            onJoinPlan={(plan) => handleOpenRegistration(plan.id)}
            onAskAi={(prompt) => handleOpenAi(prompt)}
            onOpenStudyPage={(pId) => handleOpenStudyPage(pId)}
          />

        </>
      )}

      {/* 5. Clean Student Footer */}
      <Footer
        onScrollToTop={() => handleScrollToSection('top')}
        onOpenAiModal={() => handleOpenAi()}
        onOpenIdCardModal={handleOpenIdCardModal}
        onOpenRegistration={() => handleOpenRegistration('plan-01')}
        onOpenStudyPage={handleOpenStudyPage}
      />

      {/* MODALS */}
      {/* Ask IOIS AI Tutor Dialog */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialPrompt={aiInitialPrompt}
        onSelectPlanToJoin={(plan) => handleOpenRegistration(plan.id)}
      />

      {/* Student Registration Modal */}
      <RegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        initialPlanId={selectedPlanForReg}
        onSuccessRegistration={handleSuccessRegistration}
        onSwitchToLogin={() => {
          setRegistrationModalOpen(false);
          setLoginModalOpen(true);
        }}
      />

      {/* Student Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccessLogin={handleSuccessLogin}
        onSwitchToRegister={() => {
          setLoginModalOpen(false);
          setRegistrationModalOpen(true);
        }}
      />

      {/* Student Dashboard Modal */}
      {currentUser && (
        <UserDashboardModal
          isOpen={dashboardModalOpen}
          onClose={() => setDashboardModalOpen(false)}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenStudyPage={(pId) => {
            setDashboardModalOpen(false);
            handleOpenStudyPage(pId);
          }}
          onOpenIdCard={() => {
            setDashboardModalOpen(false);
            setIdCardModalOpen(true);
          }}
          onProfileUpdated={(updated) => {
            setCurrentUser(updated);
          }}
        />
      )}

      {/* Digital Smart Student ID Card Modal */}
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
