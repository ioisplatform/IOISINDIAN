import React from 'react';
import { 
  ShieldCheck, 
  Bot, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Sparkles, 
  ArrowUp,
  BookOpen,
  Tv,
  Pencil,
  FileCheck2,
  CreditCard,
  GraduationCap
} from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenAiModal: () => void;
  onOpenIdCardModal: () => void;
  onOpenRegistration: () => void;
  onOpenStudyPage: (planId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onOpenAiModal,
  onOpenIdCardModal,
  onOpenRegistration,
  onOpenStudyPage
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 text-xs border-t border-slate-800">
      
      {/* Tricolor Ribbon Top Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white via-blue-700 to-emerald-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Student Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center font-black text-white text-base shadow">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-lg text-white tracking-tight">
                  IOIS STUDENT PORTAL
                </span>
                <p className="text-[11px] text-orange-400 font-medium leading-none">
                  Indian Online Institution System • डिजिटल शिक्षा मंच
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              भारत के विद्यार्थियों के लिए समर्पित संपूर्ण डिजिटल शिक्षण मंच। कक्षा 1 से 12 तक के सचित्र अध्ययन नोट्स, इंटरएक्टिव वीडियो कक्षाएं, डिजिटल अक्षर ट्रेसिंग पैड, दैनिक गृहकार्य और छात्र पहचान प्रणाली।
            </p>

            <div className="flex items-center space-x-2 pt-1 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% छात्र-अनुकूल • सत्यापित अध्ययन सामग्री • सुरक्षित वातावरण</span>
            </div>
          </div>

          {/* Quick Links 1: 7 Study Plans */}
          <div className="space-y-3">
            <span className="font-extrabold text-white text-xs uppercase tracking-wider block">
              7 अध्ययन योजनाएं
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenStudyPage('plan-01')} className="hover:text-orange-400 transition-colors">
                  Plan 01: बाल विकास (Class 1-5)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-02')} className="hover:text-orange-400 transition-colors">
                  Plan 02: यूथ स्किल (Class 6-8 + AI)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-03')} className="hover:text-orange-400 transition-colors">
                  Plan 03: करियर फाउंडेशन (Class 9-10)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-04')} className="hover:text-orange-400 transition-colors">
                  Plan 04: फैमिली व छात्र (Class 11-12)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-05')} className="hover:text-orange-400 transition-colors">
                  Plan 05: स्टूडेंट एलीट (Board Prep)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-06')} className="hover:text-orange-400 transition-colors">
                  Plan 06: डिजिटल स्किल व कोडिंग
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-07')} className="text-amber-400 font-bold hover:text-amber-300 transition-colors">
                  Plan 07: सुप्रीम मास्टर (All-in-One)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Student Learning Features */}
          <div className="space-y-3">
            <span className="font-extrabold text-white text-xs uppercase tracking-wider block">
              छात्र शिक्षण टूल्स
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenStudyPage('plan-01')} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                  <span>सचित्र NCERT स्टडी नोट्स</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-01')} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5 text-red-400" />
                  <span>Google Flow वीडियो कक्षाएं</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-01')} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Pencil className="w-3.5 h-3.5 text-purple-400" />
                  <span>डिजिटल अक्षर ट्रेसिंग पैड</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-01')} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>दैनिक गृहकार्य (Homework)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenIdCardModal} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                  <span>डिजिटल छात्र ID कार्ड</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenStudyPage('plan-01')} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>प्रैक्टिस क्विज़ व टेस्ट</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Student Helpline */}
          <div className="space-y-3">
            <span className="font-extrabold text-white text-xs uppercase tracking-wider block">
              छात्र सहायता केंद्र
            </span>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>ioisplatform@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 8877490845 (हेल्पलाइन)</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>डिजिटल शिक्षा प्रकोष्ठ, भारत</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAiModal}
                className="w-full py-2.5 px-3 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-700 text-purple-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span>24x7 AI छात्र सलाहकार</span>
              </button>
            </div>
          </div>

        </div>

        {/* Educational Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>अध्ययन निर्देश (Educational Note):</strong> IOIS पोर्टल भारत के छात्रों के लिए NCERT आधारित पाठ्यक्रम, डिजिटल अक्षर ट्रेसिंग, ऑडियो-विजुअल कक्षाएं और गृहकार्य अभ्यास प्रदान करता है। सभी सामग्री विद्यार्थियों के शैक्षणिक विकास और कौशल संवर्धन के उद्देश्य से निर्मित की गई है।
          </p>
          <div className="flex flex-wrap gap-4 text-slate-400 text-xs pt-1">
            <span className="hover:text-white cursor-pointer">गोपनीयता नीति (Privacy Policy)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">अध्ययन शर्तें (Terms of Use)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">छात्र आचार संहिता (Student Code)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">हेल्पलाइन व संपर्क (Support Desk)</span>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-3">
          <span>
            © 2026 IOIS Student Learning Platform. All Rights Reserved. • Made with love for Indian Students.
          </span>
          <button
            onClick={onScrollToTop}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1 transition-colors shrink-0"
          >
            <span>शीर्ष पर जाएं</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </footer>
  );
};
