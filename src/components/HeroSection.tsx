import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Tv, 
  Pencil, 
  FileCheck2, 
  Play, 
  ExternalLink, 
  GraduationCap, 
  CheckCircle2, 
  Bot,
  UserCheck
} from 'lucide-react';
import heroTeacherImg from '../assets/images/iois_hero_teacher_kids_1790679268428.jpg';

interface HeroSectionProps {
  onOpenStudyPage: (planId: string) => void;
  onOpenAiAdvisor: () => void;
  onOpenLoginModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

const FLOW_GOOGLE_VIDEO_URL = 'https://flow.google.com/shared/video/52fc05e3-5a11-4930-9a32-34ea84151637';

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenStudyPage,
  onOpenAiAdvisor,
  onOpenLoginModal,
  onScrollToSection
}) => {
  return (
    <section className="relative bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-white pt-6 pb-12 sm:pb-16 border-b border-slate-200 overflow-hidden">
      
      {/* Decorative Warm Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-200/25 rounded-full blur-3xl pointer-events-none -ml-20" />
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Motivational Announcement Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-orange-200 text-orange-950 shadow-sm font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>🇮🇳 भारत का अपना डिजिटल शिक्षा मंच • कक्षा 1 से 12 एवं आधुनिक कौशल</span>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 px-3.5 py-1.5 rounded-full text-xs font-bold text-orange-950 border border-orange-200">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span><strong>आज का सुविचार:</strong> "ज्ञान ही वह शक्ति है जो हर सपने को सच करती है।"</span>
          </div>
        </div>

        {/* HERO MAIN ROW: Mobile (Image on Top, Text Below), Desktop (Text Left, Image Right) */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: TITLE, BADGES & CALL-TO-ACTIONS */}
          <div className="w-full lg:w-7/12 space-y-5 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/90 text-orange-800 text-xs font-black tracking-wide border border-orange-200">
              <GraduationCap className="w-4 h-4 text-orange-600" />
              <span>ऑल-डिवाइस फ्रेंडली • मोबाइल, टैबलेट व कंप्यूटर पर त्वरित</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Indian Online Income Supporting System{' '}
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-1.5 bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-600 bg-clip-text text-transparent">
                डिजिटल शिक्षा और भविष्य की ओर कदम
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              नन्हे बच्चों (नर्सरी से 5वीं) के लिए सचित्र बाल-वर्णमाला, कविताएं और डिजिटल अक्षर ट्रेसिंग पैड, तथा कक्षा 6 से 12 एवं कॉलेज छात्रों के लिए NCERT नोट्स, वीडियो कक्षाएं, दैनिक गृहकार्य व करियर स्किल्स।
            </p>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 max-w-lg mx-auto lg:mx-0">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2 text-left">
                <BookOpen className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">सचित्र नोट्स</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2 text-left">
                <Tv className="w-4 h-4 text-red-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">वीडियो कक्षाएं</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2 text-left">
                <Pencil className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">ट्रेसिंग पैड</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center gap-2 text-left">
                <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">दैनिक होमवर्क</span>
              </div>
            </div>

            {/* ACTION BUTTONS (Touch-friendly & Big for Mobile) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                onClick={() => onScrollToSection('class-grid')}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>कक्षा चुनें (Start Learning)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLoginModal}
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-100 text-slate-800 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-2 border-slate-300 shadow-sm transition-all active:scale-95"
              >
                <UserCheck className="w-4 h-4 text-blue-600" />
                <span>Student Login / स्मार्ट ID</span>
              </button>

              <button
                onClick={onOpenAiAdvisor}
                className="w-full sm:w-auto px-4 py-3.5 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-purple-200 transition-colors"
              >
                <Bot className="w-4 h-4 text-purple-600" />
                <span>AI Teacher से बात करें</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% छात्र अनुकूल
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                NCERT पाठ्यक्रम
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-purple-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                ऑडियो उच्चारण सपोर्ट
              </span>
            </div>

          </div>

          {/* RIGHT COLUMN: ATTRACTIVE SMILING TEACHER & KIDS ILLUSTRATION */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-orange-400 via-amber-300 to-emerald-400 rounded-3xl blur-xl opacity-35 animate-pulse" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white aspect-[4/3]">
                <img
                  src={heroTeacherImg}
                  alt="मुस्कुराते हुए बच्चे और डिजिटल टीचर - IOIS डिजिटल शिक्षा"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />

                {/* Floating Badge 1: Top Right */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-orange-200 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                    🧒
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-black text-slate-900 block leading-tight">नर्सरी से 5वीं</span>
                    <span className="text-[9px] text-orange-600 font-bold block">Fun Learning</span>
                  </div>
                </div>

                {/* Floating Badge 2: Bottom Left */}
                <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl shadow-xl border border-white/20 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                    📚
                  </div>
                  <div className="text-left">
                    <span className="text-[11px] font-black text-white block leading-tight">Class 6-12 & Skills</span>
                    <span className="text-[9px] text-emerald-400 font-mono block">NCERT & Career Kit</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* GOOGLE FLOW VIDEO PREVIEW BAR */}
        <div className="mt-10 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-red-600/90 text-white flex items-center justify-center shrink-0 shadow-md">
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-black block">
                Google Flow Official Video Session
              </span>
              <h3 className="text-sm sm:text-base font-black text-white">
                डिजिटल शिक्षा, दृश्य पाठ एवं स्मार्ट स्टडी गाइड
              </h3>
              <p className="text-[11px] text-slate-300">
                12:45 Min HD वीडियो • वर्णमाला, नोट्स, ट्रेसिंग व गृहकार्य का संपूर्ण ट्यूटोरियल
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <a
              href={FLOW_GOOGLE_VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-transform hover:scale-105"
            >
              <span>वीडियो देखें</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onOpenStudyPage('plan-01')}
              className="flex-1 sm:flex-none px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-colors"
            >
              स्टडी हब में खोलें
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
