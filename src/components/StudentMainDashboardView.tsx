import React, { useState } from 'react';
import { MemberProfile, PlanDetail } from '../types';
import { ioisMasterPlans } from '../data/ioisPlansData';
import { 
  Sparkles, 
  BookOpen, 
  Bot, 
  Volume2, 
  Mic, 
  FileText, 
  Download, 
  Share2, 
  Award, 
  CheckCircle2, 
  Star, 
  Copy, 
  ExternalLink, 
  LogOut, 
  CreditCard, 
  User, 
  Layers, 
  ArrowRight, 
  Compass, 
  Briefcase, 
  Calendar, 
  Shield, 
  Heart, 
  Cloud, 
  Crown, 
  Eye, 
  Lock,
  GraduationCap,
  Store,
  ChevronDown
} from 'lucide-react';

interface StudentMainDashboardViewProps {
  currentUser: MemberProfile;
  onLogout: () => void;
  onOpenStudyPage: (planId: string) => void;
  onOpenIdCard: () => void;
  onViewHomepage: () => void;
}

export const StudentMainDashboardView: React.FC<StudentMainDashboardViewProps> = ({
  currentUser,
  onLogout,
  onOpenStudyPage,
  onOpenIdCard,
  onViewHomepage
}) => {
  // Selected Plan Tab - default to user's registered plan or plan-01
  const [activePlanId, setActivePlanId] = useState<string>(currentUser.planId || 'plan-01');

  // Plan 01 State: AI Teacher Voice & Story
  const [aiVoiceQuery, setAiVoiceQuery] = useState('');
  const [aiVoiceResponse, setAiVoiceResponse] = useState('नमस्ते प्यारे बच्चे! आप माइक दबाकर मुझसे कुछ भी पूछ सकते हैं, जैसे: "क से क्या होता है?" या "A for Apple की कविता सुनाएं!"');
  const [isAiListening, setIsAiListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [selectedBalVikasSlide, setSelectedBalVikasSlide] = useState(0);

  // Plan 02 State: Resume & AI Tools
  const [copiedPromptKey, setCopiedPromptKey] = useState<string | null>(null);

  // Plan 03 State: Class Dropdown & Stream
  const [selectedNcertClass, setSelectedNcertClass] = useState('10');
  const [selectedNcertSubject, setSelectedNcertSubject] = useState('विज्ञान (Science)');

  // Plan 06 State: Referral Link Share
  const [copiedReferral, setCopiedReferral] = useState(false);

  // Voice Functionality
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('स्पीच वाचन आपके ब्राउज़र में उपलब्ध नहीं है।');
      return;
    }
    window.speechSynthesis.cancel();
    if (isAiSpeaking) {
      setIsAiSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.9;
    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    utterance.onerror = () => setIsAiSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('ब्राउज़र स्पीच रिकग्निशन उपलब्ध नहीं है। कृपया गूगल क्रोम का उपयोग करें या प्रश्नों पर क्लिक करें।');
      return;
    }
    const rec = new SpeechRecognition();
    rec.lang = 'hi-IN';
    rec.onstart = () => setIsAiListening(true);
    rec.onend = () => setIsAiListening(false);
    rec.onerror = () => setIsAiListening(false);
    rec.onresult = (e: any) => {
      const q = e.results[0][0].transcript;
      setAiVoiceQuery(q);
      handleVoiceQuery(q);
    };
    rec.start();
  };

  const handleVoiceQuery = (query: string) => {
    const q = query.toLowerCase();
    let ans = '';
    if (q.includes('a for') || q.includes('ए फॉर')) {
      ans = 'A for Apple! Apple का अर्थ सेब होता है, जो लाल रंग का और बहुत मीठा होता है!';
    } else if (q.includes('क से') || q.includes('कबूतर')) {
      ans = 'क से कबूतर, ख से खरगोश, ग से गमला और घ से घड़ी! खूब मन लगाकर पढ़ाई करें!';
    } else if (q.includes('पहाड़ा') || q.includes('table')) {
      ans = 'दो एकम दो, दो दूनी चार, दो तिया छह, दो चौके आठ, दो पंजे दस!';
    } else {
      ans = `वाह! आपने पूछा: "${query}"। आपका AI टीचर कहता है कि प्रतिदिन 30 मिनट अभ्यास से आप हमेशा कक्षा में प्रथम आएंगे!`;
    }
    setAiVoiceResponse(ans);
    speakText(ans);
  };

  const handleCopyPrompt = (prompt: string, key: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPromptKey(key);
    setTimeout(() => setCopiedPromptKey(null), 2000);
  };

  const referralUrl = `https://ioisplatform.github.io/student/?ref=${currentUser.memberId}`;
  const referralShareText = `🇮🇳 नमस्ते! मैं IOIS डिजिटल शिक्षा पोर्टल से जुड़ा हूँ। यहाँ कक्षा 1 से 12 तक के सचित्र NCERT नोट्स, Google Flow वीडियो कक्षाएं, डिजिटल ट्रेसिंग पैड और दैनिक गृहकार्य जांच उपलब्ध है।
मेरा रेफरल लिंक: ${referralUrl}
हेल्पलाइन: 8877490845`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralShareText);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const balVikasSlides = [
    { title: 'हिंदी वर्णमाला (अ से अः)', emoji: '🍎', sample: 'अ - अनार, आ - आम, इ - इमली, ई - ईख, उ - उल्लू' },
    { title: 'अंग्रेजी अल्फाबेट्स (A to Z)', emoji: '🔤', sample: 'A for Apple, B for Ball, C for Cat, D for Dog' },
    { title: 'संख्या व पहाड़ा (1 से 20)', emoji: '🔢', sample: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10 | 2x1=2, 2x2=4...' },
    { title: 'रंग व फल पहचान', emoji: '🎨', sample: 'लाल (Red), पीला (Yellow), हरा (Green), नीला (Blue)' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* TOP DASHBOARD NAVIGATION BAR */}
      <header className="bg-slate-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-black text-white shadow">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base tracking-tight">IOIS छात्र डैशबोर्ड</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-400/30">
                  सत्यापित छात्र
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                स्वागत है, <strong className="text-orange-400">{currentUser.name}</strong> • ID: <strong className="text-white font-mono">{currentUser.memberId}</strong>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            <button
              onClick={onOpenIdCard}
              className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 font-bold transition-colors flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">आईडी कार्ड</span>
            </button>

            <button
              onClick={onViewHomepage}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>मुख्य होमपेज</span>
            </button>

            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/40 font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>लॉगआउट</span>
            </button>
          </div>

        </div>
      </header>

      {/* DASHBOARD BODY */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* WELCOME BANNER */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="px-3 py-0.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider inline-block">
              🌟 ऑल-इन-वन छात्र शिक्षण कंसोल
            </span>
            <h1 className="text-xl sm:text-2xl font-black">
              नमस्ते, {currentUser.name}! आपकी अध्ययन योजनाएं तैयार हैं
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 max-w-xl">
              नीचे दिए गए 7 कार्ड्स में से किसी भी प्लान पर क्लिक करें। उसी स्क्रीन पर उसका संपूर्ण स्टडी मटेरियल, AI टूल्स व सुविधाएं तुरंत लोड हो जाएंगी!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenStudyPage(activePlanId)}
              className="px-4 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-colors shadow flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>फुल स्क्रीन स्टडी मोड</span>
            </button>
          </div>
        </div>

        {/* 7 COLORFUL BIG CARDS / TABS (पुराने 7 नामों के अनुसार) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-600" />
              <span>7 अध्ययन योजनाएं (Select Plan to Open View):</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">1-क्लिक में सामग्री बदलें</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3">
            
            {/* 1. PLAN 01: Bal Vikas Access */}
            <button
              onClick={() => setActivePlanId('plan-01')}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden border-2 shadow-sm ${
                activePlanId === 'plan-01'
                  ? 'bg-emerald-600 text-white border-emerald-500 ring-4 ring-emerald-300 scale-105 z-10'
                  : 'bg-white hover:bg-emerald-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">🧒</span>
              <span className="text-[10px] font-black uppercase opacity-75 block">Plan 01</span>
              <h3 className="font-black text-xs leading-tight">Bal Vikas Access</h3>
              <p className={`text-[10px] mt-1 line-clamp-1 ${activePlanId === 'plan-01' ? 'text-emerald-100' : 'text-slate-500'}`}>
                AI टीचर व ई-बुक्स
              </p>
            </button>

            {/* 2. PLAN 02: Youth Skill Access */}
            <button
              onClick={() => setActivePlanId('plan-02')}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden border-2 shadow-sm ${
                activePlanId === 'plan-02'
                  ? 'bg-blue-600 text-white border-blue-500 ring-4 ring-blue-300 scale-105 z-10'
                  : 'bg-white hover:bg-blue-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">💼</span>
              <span className="text-[10px] font-black uppercase opacity-75 block">Plan 02</span>
              <h3 className="font-black text-xs leading-tight">Youth Skill Access</h3>
              <p className={`text-[10px] mt-1 line-clamp-1 ${activePlanId === 'plan-02' ? 'text-blue-100' : 'text-slate-500'}`}>
                रिज्यूम व AI टूल्स
              </p>
            </button>

            {/* 3. PLAN 03: Career & Job Access */}
            <button
              onClick={() => setActivePlanId('plan-03')}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden border-2 shadow-sm ${
                activePlanId === 'plan-03'
                  ? 'bg-indigo-600 text-white border-indigo-500 ring-4 ring-indigo-300 scale-105 z-10'
                  : 'bg-white hover:bg-indigo-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">🎯</span>
              <span className="text-[10px] font-black uppercase opacity-75 block">Plan 03</span>
              <h3 className="font-black text-xs leading-tight">Career & Job Access</h3>
              <p className={`text-[10px] mt-1 line-clamp-1 ${activePlanId === 'plan-03' ? 'text-indigo-100' : 'text-slate-500'}`}>
                6-12 NCERT वॉल्ट
              </p>
            </button>

            {/* 4. PLAN 04: Family VIP Access */}
            <button
              onClick={() => setActivePlanId('plan-04')}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden border-2 shadow-sm ${
                activePlanId === 'plan-04'
                  ? 'bg-rose-600 text-white border-rose-500 ring-4 ring-rose-300 scale-105 z-10'
                  : 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">🏡</span>
              <span className="text-[10px] font-black uppercase opacity-75 block">Plan 04</span>
              <h3 className="font-black text-xs leading-tight">Family VIP Access</h3>
              <p className={`text-[10px] mt-1 line-clamp-1 ${activePlanId === 'plan-04' ? 'text-rose-100' : 'text-slate-500'}`}>
                पेरेंट्स कॉर्नर व पंचांग
              </p>
            </button>

            {/* 5. PLAN 05: Student & Exam Access */}
            <button
              onClick={() => setActivePlanId('plan-05')}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden border-2 shadow-sm ${
                activePlanId === 'plan-05'
                  ? 'bg-amber-600 text-white border-amber-500 ring-4 ring-amber-300 scale-105 z-10'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">📚</span>
              <span className="text-[10px] font-black uppercase opacity-75 block">Plan 05</span>
              <h3 className="font-black text-xs leading-tight">Student & Exam Access</h3>
              <p className={`text-[10px] mt-1 line-clamp-1 ${activePlanId === 'plan-05' ? 'text-amber-100' : 'text-slate-500'}`}>
                प्रतियोगी परीक्षा नोट्स
              </p>
            </button>

            {/* 6. PLAN 06: Agency Reseller Access */}
            <button
              onClick={() => setActivePlanId('plan-06')}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden border-2 shadow-sm ${
                activePlanId === 'plan-06'
                  ? 'bg-purple-600 text-white border-purple-500 ring-4 ring-purple-300 scale-105 z-10'
                  : 'bg-white hover:bg-purple-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">🚀</span>
              <span className="text-[10px] font-black uppercase opacity-75 block">Plan 06</span>
              <h3 className="font-black text-xs leading-tight">Agency Reseller Access</h3>
              <p className={`text-[10px] mt-1 line-clamp-1 ${activePlanId === 'plan-06' ? 'text-purple-100' : 'text-slate-500'}`}>
                रेफरल लिंक व शेयर
              </p>
            </button>

            {/* 7. PLAN 07: Lifetime Master Access */}
            <button
              onClick={() => setActivePlanId('plan-07')}
              className={`p-3 rounded-2xl text-left transition-all relative overflow-hidden border-2 shadow-sm ${
                activePlanId === 'plan-07'
                  ? 'bg-gradient-to-tr from-amber-500 to-orange-600 text-white border-amber-400 ring-4 ring-amber-300 scale-105 z-10'
                  : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-200'
              }`}
            >
              <span className="text-2xl block mb-1">👑</span>
              <span className="text-[10px] font-black uppercase opacity-75 block">Plan 07</span>
              <h3 className="font-black text-xs leading-tight">Lifetime Master Access</h3>
              <p className={`text-[10px] mt-1 line-clamp-1 ${activePlanId === 'plan-07' ? 'text-amber-100' : 'text-slate-500'}`}>
                सिक्योर क्लाउड ड्राइव
              </p>
            </button>

          </div>
        </div>

        {/* ACTIVE PLAN DETAIL VIEW CONTAINER (बिना पेज लोड हुए उसी स्क्रीन पर) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-7">
          
          {/* ------------------------------------------------------------- */}
          {/* TAB 1: PLAN 01 - Bal Vikas Access */}
          {/* ------------------------------------------------------------- */}
          {activePlanId === 'plan-01' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                    Plan 01 • Active Module
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    PLAN 01: Bal Vikas Access (नर्सरी से क्लास 5)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Google AI Studio पावर्ड AI Teacher Window, वॉइस माइक व सचित्र ई-बुक्स व्यूअर।
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudyPage('plan-01')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>बाल विकास पूरा हब खोलें →</span>
                </button>
              </div>

              {/* 1. AI TEACHER WINDOW (बोलकर बात करें) */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl shadow-lg">
                      🤖
                    </div>
                    <div>
                      <h4 className="font-black text-base text-white">
                        AI Teacher Window (Google AI Studio)
                      </h4>
                      <p className="text-xs text-emerald-200">
                        माइक दबाकर सवाल पूछें, AI सीधे हिंदी में उत्तर व कविता सुनाएगा!
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-400 text-slate-950 uppercase">
                    Live Active
                  </span>
                </div>

                {/* Mic & Interactive Bar */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={startVoiceInput}
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all shadow-lg ${
                        isAiListening 
                          ? 'bg-red-600 animate-ping ring-4 ring-red-300' 
                          : 'bg-emerald-500 hover:bg-emerald-600 hover:scale-105 active:scale-95'
                      }`}
                    >
                      <Mic className="w-6 h-6" />
                    </button>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        {isAiListening ? '🔴 ध्यान से सुन रहे हैं... बोलिए!' : 'माइक दबाकर बोलें (Voice Mic)'}
                      </span>
                      <span className="text-[11px] text-emerald-200">
                        उदा: "A for क्या होता है?", "क से कबूतर"
                      </span>
                    </div>
                  </div>

                  {/* Sample Quick Voice Questions */}
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
                    {['A for Apple', 'क से कबूतर', '2 का पहाड़ा'].map((sample, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setAiVoiceQuery(sample);
                          handleVoiceQuery(sample);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold transition-colors"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Response Display */}
                {aiVoiceResponse && (
                  <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-md space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-emerald-600" />
                        <span>AI शिक्षक का उत्तर:</span>
                      </span>
                      <button
                        onClick={() => speakText(aiVoiceResponse)}
                        className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isAiSpeaking ? 'रोकें' : 'बोलकर सुनें'}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-800">
                      {aiVoiceResponse}
                    </p>
                  </div>
                )}
              </div>

              {/* 2. E-BOOKS, POEMS & ABCD SLIDES VIEWER */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>नर्सरी से क्लास 5 की ई-बुक्स, कविताएं व स्लाइड्स व्यूअर:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {balVikasSlides.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedBalVikasSlide(idx)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                        selectedBalVikasSlide === idx
                          ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200'
                          : 'border-slate-200 hover:border-emerald-300 bg-slate-50'
                      }`}
                    >
                      <span className="text-3xl block mb-1">{slide.emoji}</span>
                      <h5 className="font-bold text-xs text-slate-900">{slide.title}</h5>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{slide.sample}</p>
                    </button>
                  ))}
                </div>

                {/* Active Slide Viewer Preview */}
                <div className="p-5 rounded-3xl bg-emerald-50/70 border-2 border-emerald-200 text-center space-y-3">
                  <span className="text-5xl">{balVikasSlides[selectedBalVikasSlide].emoji}</span>
                  <h4 className="text-lg font-black text-emerald-950">
                    {balVikasSlides[selectedBalVikasSlide].title}
                  </h4>
                  <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-inner max-w-lg mx-auto">
                    <p className="text-sm font-bold text-slate-800 leading-relaxed font-sans">
                      {balVikasSlides[selectedBalVikasSlide].sample}
                    </p>
                  </div>
                  <button
                    onClick={() => speakText(balVikasSlides[selectedBalVikasSlide].sample)}
                    className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow inline-flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>यह पाठ बोलकर सुनाएं</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: PLAN 02 - Youth Skill Access */}
          {/* ------------------------------------------------------------- */}
          {activePlanId === 'plan-02' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-wider">
                    Plan 02 • Active Module
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    PLAN 02: Youth Skill Access
                  </h3>
                  <p className="text-xs text-slate-500">
                    सीधे Resume Pack डाउनलोड करें व Free AI Tools Guide का उपयोग करें।
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudyPage('plan-02')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>यूथ स्किल पूरा हब खोलें →</span>
                </button>
              </div>

              {/* 1. RESUME PACK (Downloadable Ready-to-use Templates) */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Resume Pack (ATS-Friendly Ready Templates):</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'कॉलेज फ्रेशर रिज्यूम फॉर्मेट', tag: 'Freshers ATS 2026', desc: '12वीं व कॉलेज पास छात्रों के लिए सरल व आकर्षक फॉर्मेट।' },
                    { title: 'कंप्यूटर ऑपरेटर व डाटा एंट्री CV', tag: 'Office Jobs', desc: 'MS Office, हिंदी/इंग्लिश टाइपिंग और डाटा एंट्री फॉर्मेट।' },
                    { title: 'टीचिंग व प्राइवेट ट्यूटर रिज्यूम', tag: 'Teacher Standard', desc: 'होम ट्यूटर्स और स्कूल टीचर भर्ती हेतु विशेष प्रोफाइल।' }
                  ].map((res, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                          {res.tag}
                        </span>
                        <h5 className="font-bold text-xs text-slate-900 mt-2">{res.title}</h5>
                        <p className="text-[11px] text-slate-600 mt-1">{res.desc}</p>
                      </div>

                      <button
                        onClick={() => {
                          const dummyContent = `IOIS RESUME TEMPLATE - ${res.title}\n\nName: ${currentUser.name}\nContact: ${currentUser.phone}\nDesignation: Professional Candidate\nEducation: 12th Pass / Graduate\nSkills: Computer Basics, Communication, Office Tools\nIOIS Certified Member: ${currentUser.memberId}`;
                          const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `IOIS_Resume_${res.tag.replace(/\s+/g, '_')}.txt`;
                          a.click();
                        }}
                        className="w-full mt-3 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>टेम्पलेट डाउनलोड करें</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. FREE AI TOOLS GUIDE LIST */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Free AI Tools Guide (ChatGPT & Gemini Prompts):</span>
                </h4>

                <div className="space-y-2.5">
                  {[
                    { tool: 'ChatGPT & Gemini', title: 'असाइनमेंट व प्रोजेक्ट रिपोर्ट लिखवाने का मास्टर प्रॉम्प्ट', prompt: 'कृपया कक्षा 12 के विज्ञान प्रोजेक्ट "सौर ऊर्जा का महत्व" पर 500 शब्दों की एक आकर्षक रिपोर्ट तैयार करें, जिसमें परिचय, कार्यप्रणाली और निष्कर्ष शामिल हों।' },
                    { tool: 'Job AI', title: 'कंपनी के लिए जॉब एप्लीकेशन कवर लेटर प्रॉम्प्ट', prompt: 'मैं फ्रेशर हूँ और डाटा एंट्री ऑपरेटर पद के लिए आवेदन कर रहा हूँ। मेरे लिए एक प्रभावशाली और विनम्र कवर लेटर हिंदी व अंग्रेजी में लिखें।' },
                    { tool: 'Exam AI', title: 'किसी भी कठिन विषय को 5 मिनट में समझने का प्रॉम्प्ट', prompt: 'मुझे प्रकाश संश्लेषण (Photosynthesis) की प्रक्रिया को कक्षा 10 के स्तर पर सबसे सरल उदाहरण और 5 मुख्य बिंदुओं में समझाएं।' }
                  ].map((guide, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                            {guide.tool}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{guide.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-mono mt-1 bg-white p-2 rounded-lg border border-slate-200">
                          "{guide.prompt}"
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopyPrompt(guide.prompt, `prompt-${idx}`)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedPromptKey === `prompt-${idx}` ? '✓ कॉपी हुआ' : 'प्रॉम्प्ट कॉपी'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: PLAN 03 - Career & Job Access */}
          {/* ------------------------------------------------------------- */}
          {activePlanId === 'plan-03' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-wider">
                    Plan 03 • Active Module
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    PLAN 03: Career & Job Access (कक्षा 6 से 12)
                  </h3>
                  <p className="text-xs text-slate-500">
                    NCERT Material Dropdown से क्लास चुनें व करियर रोडमैप्स पढ़ें।
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudyPage('plan-03')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>कक्षा 6-12 पूरा हब खोलें →</span>
                </button>
              </div>

              {/* 1. NCERT MATERIAL DROPDOWN */}
              <div className="p-5 rounded-3xl bg-indigo-50/70 border-2 border-indigo-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-indigo-950 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-700" />
                    <span>कक्षा 6 से 12 NCERT Material Dropdown:</span>
                  </span>
                  <span className="text-xs text-indigo-700 font-bold">तुरंत नोट्स पढ़ें</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      अपनी कक्षा चुनें (Select Class):
                    </label>
                    <select
                      value={selectedNcertClass}
                      onChange={(e) => setSelectedNcertClass(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="6">कक्षा 6 (Class 6)</option>
                      <option value="7">कक्षा 7 (Class 7)</option>
                      <option value="8">कक्षा 8 (Class 8)</option>
                      <option value="9">कक्षा 9 (Class 9)</option>
                      <option value="10">कक्षा 10 (Class 10 - बोर्ड)</option>
                      <option value="11">कक्षा 11 (Class 11)</option>
                      <option value="12">कक्षा 12 (Class 12 - बोर्ड)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      विषय चुनें (Select Subject):
                    </label>
                    <select
                      value={selectedNcertSubject}
                      onChange={(e) => setSelectedNcertSubject(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="विज्ञान (Science)">विज्ञान (Science)</option>
                      <option value="गणित (Mathematics)">गणित (Mathematics)</option>
                      <option value="सामाजिक विज्ञान (Social Studies)">सामाजिक विज्ञान (Social Studies)</option>
                      <option value="हिंदी (Hindi)">हिंदी (Hindi)</option>
                      <option value="अंग्रेजी (English)">अंग्रेजी (English)</option>
                    </select>
                  </div>
                </div>

                {/* Instant Reader Preview Card */}
                <div className="p-4 rounded-2xl bg-white border border-indigo-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-900">
                      📖 कक्षा {selectedNcertClass} • {selectedNcertSubject} नोट्स सारांश
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      100% NCERT Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    यह अध्याय कक्षा {selectedNcertClass} के नवीनतम NCERT सिलेबस पर आधारित है। इसमें मुख्य परिभाषाएं, फॉर्मूले, डायग्राम्स और पिछले 5 वर्षों के बोर्ड परीक्षा प्रश्नों के सटीक उत्तर शामिल हैं।
                  </p>
                  <button
                    onClick={() => onOpenStudyPage('plan-03')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline flex items-center gap-1"
                  >
                    <span>पूरी पुस्तक और अध्याय-वार हल खोलें →</span>
                  </button>
                </div>
              </div>

              {/* 2. CAREER GUIDANCE & JOB ROADMAPS */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  <span>करियर गाइडेंस और नौकरी के रोडमैप्स (Career Radars):</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: '10वीं के बाद स्ट्रीम चयन', badge: 'Science/Commerce/Arts', desc: 'अपनी रुचि व क्षमताओं के अनुसार सही विषय चुनने का वैज्ञानिक तरीका।' },
                    { title: '12वीं के बाद टॉप सरकारी नौकरियां', badge: 'SSC, Railway, Police', desc: 'कम उम्र में बिना लाखों खर्च किए सरकारी नौकरी पाने के विकल्प।' },
                    { title: 'IT व डिजिटल स्किल्स करियर', badge: 'Web, Coding, AI', desc: 'घर बैठे फ्रीलांसिंग और टेक कंपनियों में हाई-पेइंग जॉब का रोडमैप।' }
                  ].map((cr, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                        {cr.badge}
                      </span>
                      <h5 className="font-bold text-xs text-slate-900 mt-1">{cr.title}</h5>
                      <p className="text-[11px] text-slate-600">{cr.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: PLAN 04 - Family VIP Access */}
          {/* ------------------------------------------------------------- */}
          {activePlanId === 'plan-04' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase tracking-wider">
                    Plan 04 • Active Module
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    PLAN 04: Family VIP Access (पेरेंट्स कॉर्नर)
                  </h3>
                  <p className="text-xs text-slate-500">
                    डेली पंचांग, सुविचार, बच्चों की पढ़ाई ट्रैक करने का विकल्प व पारिवारिक सुरक्षा।
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudyPage('plan-04')}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>फैमिली हब खोलें →</span>
                </button>
              </div>

              {/* 1. DAILY PANCHANG & SUVICHAR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-3xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-xs">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    <span>दैनिक पंचांग (Daily Panchang):</span>
                  </div>
                  <div className="text-xs text-slate-800 space-y-1">
                    <p><strong>तिथि:</strong> शुक्ल पक्ष, पंचमी</p>
                    <p><strong>वार:</strong> शुभ दिन • विक्रम संवत 2082</p>
                    <p><strong>सूर्योदय:</strong> प्रातः 06:12 AM | <strong>सूर्यास्त:</strong> सायं 06:18 PM</p>
                    <p className="text-[11px] text-amber-800 font-semibold pt-1">
                      आज का शुभ समय (अभिजीत मुहूर्त): 11:45 AM - 12:35 PM
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200 space-y-2">
                  <div className="flex items-center gap-2 text-rose-900 font-black text-xs">
                    <Heart className="w-4 h-4 text-rose-700" />
                    <span>आज का प्रेरणादायक सुविचार:</span>
                  </div>
                  <blockquote className="text-xs text-slate-800 italic leading-relaxed pt-1">
                    "विद्या ददाति विनयं, विनयाद् याति पात्रताम्।<br />
                    शिक्षा केवल किताबों तक सीमित नहीं है, यह अच्छे संस्कारों और आत्म-निर्भरता की बुनियाद है।"
                  </blockquote>
                  <span className="text-[10px] text-rose-700 font-bold block pt-1">— IOIS संस्कार वाटिका</span>
                </div>

              </div>

              {/* 2. CHILD STUDY TRACKER & SCREEN SAFETY */}
              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>बच्चों की पढ़ाई और मोबाइल स्क्रीन टाइम ट्रैकिंग (Parent Control):</span>
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xl font-black text-emerald-700 block">45 मिनट</span>
                    <span className="text-[11px] text-slate-600">दैनिक सुझाई गई डिजिटल पढ़ाई</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xl font-black text-blue-700 block">100% Safe</span>
                    <span className="text-[11px] text-slate-600">विज्ञापन-मुक्त सुरक्षित कंटेंट</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center">
                    <span className="text-xl font-black text-purple-700 block">दैनिक जांच</span>
                    <span className="text-[11px] text-slate-600">अक्षर ट्रेसिंग व गृहकार्य स्कोर</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 5: PLAN 05 - Student & Exam Access */}
          {/* ------------------------------------------------------------- */}
          {activePlanId === 'plan-05' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-wider">
                    Plan 05 • Active Module
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    PLAN 05: Student & Exam Access
                  </h3>
                  <p className="text-xs text-slate-500">
                    कॉम्पिटिटिव एग्जाम्स (प्रतियोगी परीक्षाओं) के शॉर्ट नोट्स की डायरेक्ट लाइब्रेरी।
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudyPage('plan-05')}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>प्रतियोगी परीक्षा लाइब्रेरी खोलें →</span>
                </button>
              </div>

              {/* 1. COMPETITIVE EXAM SHORT NOTES DIRECT LIBRARY */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>प्रतियोगी परीक्षाओं के शॉर्ट नोट्स डायरेक्ट लाइब्रेरी:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { exam: 'SSC CGL / CHSL', icon: '🏛️', topics: 'Maths शॉर्ट ट्रिक्स, Reasoning, GS कैप्सूल' },
                    { exam: 'Railway NTPC & Group D', icon: '🚆', topics: 'सामान्य विज्ञान, 10 वर्षों के हल प्रश्न' },
                    { exam: 'Police & Defense Exams', icon: '👮', topics: 'UP/Bihar पुलिस कांस्टेबल, NDA, अग्निवीर नोट्स' },
                    { exam: 'Banking PO & Clerk', icon: '🏦', topics: 'बैंकिंग अवेयरनेस, स्पीड कैलकुलेशन ट्रिक्स' }
                  ].map((ex, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-2xl block mb-1">{ex.icon}</span>
                        <h5 className="font-bold text-xs text-slate-900">{ex.exam}</h5>
                        <p className="text-[11px] text-slate-600 mt-1">{ex.topics}</p>
                      </div>

                      <button
                        onClick={() => onOpenStudyPage('plan-05')}
                        className="w-full mt-2 py-1.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>नोट्स पढ़ें</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. DAILY CURRENT AFFAIRS & GK CAPSULE */}
              <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-black text-slate-900 block">
                  ⚡ दैनिक करंट अफेयर्स व स्टेटिक GK कम्पेंडियम:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  रोजाना सुबह अपडेट होने वाले राष्ट्रीय व अंतरराष्ट्रीय घटनाक्रम, महत्वपूर्ण दिवस, नई नियुक्तियां और खेल पुरस्कारों के 10 मुख्य बिंदु।
                </p>
                <div className="pt-1 flex items-center gap-3 text-xs text-amber-800 font-bold">
                  <span>• 10 साल के सॉल्व्ड पेपर्स उपलब्ध</span>
                  <span>• टेलीग्राम स्टडी सर्कल सपोर्ट</span>
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 6: PLAN 06 - Agency Reseller Access */}
          {/* ------------------------------------------------------------- */}
          {activePlanId === 'plan-06' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-black uppercase tracking-wider">
                    Plan 06 • Active Module
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    PLAN 06: Agency Reseller Access
                  </h3>
                  <p className="text-xs text-slate-500">
                    यूनिक रेफरल लिंक जेनरेट करें, 1-क्लिक शेयर करें और मार्केटिंग इमेजेस डाउनलोड करें।
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudyPage('plan-06')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>एजेंसी रीसेलर हब खोलें →</span>
                </button>
              </div>

              {/* 1. UNIQUE REFERRAL LINK GENERATOR BOX */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    आपका पर्सनल रेफरल लिंक (Unique Referral Box)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black">
                    70% तक इंस्टेंट पेआउट
                  </span>
                </div>

                {/* Link Field */}
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={referralUrl}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs font-mono text-white outline-none"
                  />
                  <button
                    onClick={handleCopyReferral}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shrink-0 flex items-center justify-center gap-1.5 transition-colors shadow"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedReferral ? '✓ कॉपी हुआ!' : 'कॉपी करें'}</span>
                  </button>
                </div>

                {/* 1-Click WhatsApp & Telegram Share Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => {
                      const enc = encodeURIComponent(referralShareText);
                      window.open(`https://api.whatsapp.com/send?text=${enc}`, '_blank');
                    }}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow transition-transform hover:scale-105"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>व्हाट्सएप पर 1-क्लिक शेयर</span>
                  </button>

                  <button
                    onClick={() => {
                      const enc = encodeURIComponent(referralShareText);
                      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${enc}`, '_blank');
                    }}
                    className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition-colors"
                  >
                    <span>टेलीग्राम पर 1-क्लिक शेयर</span>
                  </button>
                </div>
              </div>

              {/* 2. MARKETING FLYERS & IMAGES DOWNLOAD */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>मार्केटिंग इमेजेस और कैटलॉग (Marketing Flyers):</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'बाल विकास (₹10) पोस्टर', size: '1080x1080 (Insta/WhatsApp)', tag: 'Plan 01 Flyer' },
                    { title: '7 प्लांस सम्पूर्ण कैटलॉग', size: 'PDF / Image Format', tag: 'Master Catalog' },
                    { title: '70% पेआउट इंसेंटिव बैनर', size: 'Social Media Banner', tag: 'Income Banner' }
                  ].map((flyer, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-600 text-white">
                          {flyer.tag}
                        </span>
                        <h5 className="font-bold text-xs text-slate-900 mt-2">{flyer.title}</h5>
                        <p className="text-[11px] text-slate-500">{flyer.size}</p>
                      </div>

                      <button
                        onClick={() => {
                          const flyerData = `IOIS MARKETING FLYER\nTitle: ${flyer.title}\nReferral Link: ${referralUrl}\nHelpline: 8877490845\nIOIS India Official`;
                          const blob = new Blob([flyerData], { type: 'text/plain;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `IOIS_${flyer.tag.replace(/\s+/g, '_')}.txt`;
                          a.click();
                        }}
                        className="w-full mt-2 py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>पोस्टर डाउनलोड</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 7: PLAN 07 - Lifetime Master Access */}
          {/* ------------------------------------------------------------- */}
          {activePlanId === 'plan-07' && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    Plan 07 • Supreme Master
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">
                    PLAN 07: Lifetime Master Access
                  </h3>
                  <p className="text-xs text-slate-500">
                    सिक्योर क्लाउड ड्राइव का मास्टर एक्सेस लिंक व VIP पार्टनर गोल्डन बैज।
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudyPage('plan-07')}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-xs rounded-xl transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>लाइफटाइम मास्टर हब खोलें →</span>
                </button>
              </div>

              {/* 1. SECURE CLOUD DRIVE ACCESS LINK */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 text-white space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-white text-slate-950 flex items-center justify-center text-3xl shadow-inner">
                      👑
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-white">
                        Secure Cloud Drive Master Link (10 लाख+ पेज)
                      </h4>
                      <p className="text-xs text-amber-100">
                        कक्षा 1 से 12 एवं समस्त 6 प्लांस का पूरा स्टडी मटेरियल आजीवन अनलॉक्ड!
                      </p>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-white text-slate-950 text-xs font-black uppercase shadow">
                    VIP UNLOCKED
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/40 backdrop-blur-md border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-amber-300 block">
                      📁 मास्टर रिपॉजिटरी ड्राइव यूआरएल:
                    </span>
                    <span className="text-xs font-mono text-slate-200">
                      https://ioisplatform.github.io/student/master-vault/all-access
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenStudyPage('plan-07')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-slate-950 font-black text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4 text-orange-600" />
                    <span>क्लाउड ड्राइव खोलें (Open Cloud Drive)</span>
                  </button>
                </div>
              </div>

              {/* 2. VIP PARTNER GOLDEN BADGE & DIRECT ADMIN SUPPORT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 space-y-2 text-center">
                  <div className="text-4xl">🌟</div>
                  <h4 className="font-black text-base text-amber-950">
                    VIP Partner Verified Badge
                  </h4>
                  <p className="text-xs text-slate-600">
                    सदस्य: <strong>{currentUser.name}</strong> • ID: <strong>{currentUser.memberId}</strong>
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
                    🥇 ऑफिशियल लाइफटाइम पार्टनर
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>डायरेक्ट एडमिन टीम सपोर्ट (Priority 15-Min SLA):</span>
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    प्लान 07 के सदस्यों को मुख्य डेवलपर एवं एडमिन टीम से सीधा संपर्क प्राप्त होता है।
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800">
                    📞 VIP हेल्पलाइन: <a href="tel:8877490845" className="text-emerald-700 underline">+91 8877490845</a>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </main>

      {/* DASHBOARD BOTTOM STRIP */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-4 px-4 text-center">
        <p>© {new Date().getFullYear()} IOIS Platform • IOIS India. समस्त अधिकार सुरक्षित। • छात्र हेल्पलाइन: 8877490845</p>
      </footer>

    </div>
  );
};
