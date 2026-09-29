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
  GraduationCap,
  Store,
  ExternalLink
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
          
          {/* Brand & Mission & DFGS Digital Point Reference */}
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
                  Indian Online Income Supporting System • डिजिटल शिक्षा मंच
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              भारत के सभी विद्यार्थियों के लिए समर्पित ऑल-डिवाइस फ्रेंडली शिक्षा मंच। नर्सरी से 5वीं के लिए सचित्र वर्णमाला व ट्रेसिंग पैड, तथा कक्षा 6 से 12 तक के NCERT नोट्स, वीडियो लेक्चर्स व दैनिक गृहकार्य।
            </p>

            {/* DFGS Digital Point Authorized Store Box */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1.5 max-w-sm">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                <Store className="w-4 h-4 text-amber-400 shrink-0" />
                <span>अधिकृत स्टोर: DFGS Digital Point</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                <strong>DFGS Digital Point</strong> — डिजिटल रजिस्ट्रेशन, छात्र सहायता व अध्ययन सामग्री वेरिफिकेशन का विश्वसनीय केंद्र।
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-1 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% सुरक्षित • मोबाइल फ्रेंडली • छात्र सत्यापित</span>
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
              हेल्पलाइन व संपर्क (Support)
            </span>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a 
                href="tel:8298324215"
                className="flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-white tracking-wide">8298324215 (कॉल / WhatsApp)</span>
              </a>

              <a 
                href="mailto:ioisplatform@gmail.com"
                className="flex items-center space-x-2 text-slate-300 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>ioisplatform@gmail.com</span>
              </a>

              <div className="flex items-start space-x-2 text-slate-400">
                <Store className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>DFGS Digital Point • अधिकृत स्टोर</span>
              </div>

              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>डिजिटल शिक्षा प्रकोष्ठ, भारत</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAiModal}
                className="w-full py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>24x7 AI स्टूडेंट सलाहकार</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} IOIS Platform • DFGS Digital Point. समस्त अधिकार सुरक्षित।</p>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={onScrollToTop} 
              className="hover:text-white transition-colors flex items-center space-x-1"
            >
              <span>ऊपर जाएं</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
};
