import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { 
  Sparkles, 
  Menu, 
  X, 
  CreditCard, 
  BookOpen, 
  Share2, 
  UserCheck, 
  Bot, 
  Pencil,
  Tv,
  LogOut,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentUser: MemberProfile | null;
  onOpenAiModal: (initialPrompt?: string) => void;
  onOpenRegistrationModal: (planId?: string) => void;
  onOpenLoginModal: () => void;
  onOpenDashboardModal: () => void;
  onOpenIdCardModal: () => void;
  onOpenStudyPage: (planId: string) => void;
  onScrollToSection: (sectionId: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAiModal,
  onOpenRegistrationModal,
  onOpenLoginModal,
  onOpenDashboardModal,
  onOpenIdCardModal,
  onOpenStudyPage,
  onScrollToSection,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  const handleShare = () => {
    const text = "IOIS 7 अध्ययन योजनाएं: कक्षा 1 से 12 व करियर स्किल्स, वीडियो कक्षाएं, डिजिटल ट्रेसिंग पैड व नोट्स। पोर्टल: https://ioisplatform.github.io/";
    if (navigator.share) {
      navigator.share({ title: 'IOIS Student Hub', text: text, url: 'https://ioisplatform.github.io/' });
    } else {
      navigator.clipboard.writeText(text);
      alert('IOIS छात्र पोर्टल लिंक कॉपी हो गया!');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Tricolor National Aesthetic Top Band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white via-blue-700 to-emerald-600" />
      
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded tracking-wide uppercase shrink-0">
              विद्यार्थी पोर्टल
            </span>
            <span className="truncate text-slate-300">
              🇮🇳 IOIS डिजिटल शिक्षा: 7 संपूर्ण अध्ययन योजनाएं • वीडियो कक्षाएं • डिजिटल अक्षर ट्रेसिंग पैड व गृहकार्य चेकिंग सक्रिय!
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4 shrink-0 text-[11px]">
            <button 
              onClick={() => onOpenStudyPage(currentUser ? currentUser.planId : 'plan-01')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>स्टडी हब खोलें</span>
            </button>
            <span>•</span>
            <button 
              onClick={handleShare}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Share2 className="w-3 h-3 text-orange-400" />
              <span>शेयर पोर्टल</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => onScrollToSection('top')}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-600 to-orange-500 flex items-center justify-center font-black text-white text-base shadow-md group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  IOIS <span className="text-orange-600">STUDENT</span>
                </span>
                <span className="hidden sm:inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.5 rounded border border-emerald-300">
                  CLASS 1-12
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium leading-none">
                Indian Online Institution System • डिजिटल शिक्षा मंच
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 text-xs font-bold text-slate-700">
            <button
              onClick={() => onScrollToSection('top')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-orange-600 transition-colors"
            >
              होम
            </button>

            <button
              onClick={() => onScrollToSection('plans')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-orange-600 transition-colors"
            >
              7 अध्ययन योजनाएं
            </button>

            <button
              onClick={() => onOpenStudyPage(currentUser ? currentUser.planId : 'plan-01')}
              className="px-3 py-2 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors flex items-center gap-1.5 font-black border border-orange-200"
            >
              <BookOpen className="w-3.5 h-3.5 text-orange-600" />
              <span>स्टडी नोट्स</span>
            </button>

            <button
              onClick={() => onOpenStudyPage('plan-01')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-red-600 transition-colors flex items-center gap-1.5"
            >
              <Tv className="w-3.5 h-3.5 text-red-500" />
              <span>वीडियो कक्षाएं</span>
            </button>

            <button
              onClick={() => onOpenStudyPage('plan-01')}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-purple-600 transition-colors flex items-center gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5 text-purple-600" />
              <span>ट्रेसिंग पैड</span>
            </button>

            <button
              onClick={onOpenIdCardModal}
              className="px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
              <span>छात्र ID कार्ड</span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            
            {/* AI Tutor Assistant */}
            <button
              onClick={() => onOpenAiModal('छात्र के रूप में पढ़ाई की योजना बताएं')}
              className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Bot className="w-4 h-4 text-purple-600" />
              <span>AI ट्यूटर</span>
            </button>

            {/* Member Session / Auth buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenDashboardModal}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center space-x-1.5 shadow transition-all"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="max-w-[120px] truncate">{currentUser.name}</span>
                </button>
                <button
                  onClick={onLogout}
                  title="लॉगआउट"
                  className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={onOpenLoginModal}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  छात्र लॉगिन
                </button>
                <button
                  onClick={() => onOpenRegistrationModal('plan-01')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-orange-600/20 transition-all hover:scale-105"
                >
                  विद्यार्थी पंजीकरण
                </button>
              </div>
            )}

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onOpenStudyPage(currentUser ? currentUser.planId : 'plan-01')}
              className="p-2 rounded-xl bg-orange-100 text-orange-700"
              title="स्टडी हब"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => handleNavClick(() => onScrollToSection('top'))}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-slate-700 hover:bg-slate-100"
            >
              🏠 होम
            </button>
            <button
              onClick={() => handleNavClick(() => onScrollToSection('plans'))}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-slate-700 hover:bg-slate-100"
            >
              📚 7 अध्ययन योजनाएं (Class 1-12)
            </button>
            <button
              onClick={() => handleNavClick(() => onOpenStudyPage(currentUser ? currentUser.planId : 'plan-01'))}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-orange-700 bg-orange-50 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-orange-600" />
              <span>📖 स्टडी नोट्स व पाठ्यक्रम</span>
            </button>
            <button
              onClick={() => handleNavClick(() => onOpenStudyPage('plan-01'))}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-red-700 bg-red-50 flex items-center gap-2"
            >
              <Tv className="w-4 h-4 text-red-600" />
              <span>🎥 वीडियो कक्षाएं (Flow Video)</span>
            </button>
            <button
              onClick={() => handleNavClick(() => onOpenStudyPage('plan-01'))}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-purple-700 bg-purple-50 flex items-center gap-2"
            >
              <Pencil className="w-4 h-4 text-purple-600" />
              <span>🎨 अक्षर व चित्र ट्रेसिंग पैड</span>
            </button>
            <button
              onClick={() => handleNavClick(onOpenIdCardModal)}
              className="w-full text-left px-3 py-2 rounded-xl font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span>🪪 डिजिटल छात्र ID कार्ड</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => handleNavClick(onOpenDashboardModal)}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold text-center"
                >
                  छात्र डैशबोर्ड ({currentUser.name})
                </button>
                <button
                  onClick={() => handleNavClick(onLogout)}
                  className="w-full py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold text-center"
                >
                  लॉगआउट
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick(onOpenLoginModal)}
                  className="py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold text-center"
                >
                  छात्र लॉगिन
                </button>
                <button
                  onClick={() => handleNavClick(() => onOpenRegistrationModal('plan-01'))}
                  className="py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold text-center shadow"
                >
                  नया पंजीकरण
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
