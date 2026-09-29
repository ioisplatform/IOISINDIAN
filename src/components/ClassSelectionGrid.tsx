import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Pencil, 
  Tv, 
  Bot, 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Zap,
  Briefcase
} from 'lucide-react';

interface ClassSelectionGridProps {
  onOpenStudyPage: (planId: string) => void;
  onOpenAiTeacher: (initialPrompt?: string) => void;
  onScrollToPlans: () => void;
}

export const ClassSelectionGrid: React.FC<ClassSelectionGridProps> = ({
  onOpenStudyPage,
  onOpenAiTeacher,
  onScrollToPlans
}) => {
  return (
    <section id="class-grid" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>स्मार्ट स्टूडेंट डैशबोर्ड • अपनी कक्षा चुनें</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            अपनी कक्षा या कोर्स चुनें और <span className="text-orange-600">तुरंत पढ़ाई शुरू करें</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600">
            मोबाइल पर अंगूठे से सिर्फ 1-क्लिक करें — आपकी कक्षा के अनुसार सचित्र नोट्स, वीडियो कक्षाएं, डिजिटल ट्रेसिंग और गृहकार्य तुरंत उपलब्ध होंगे।
          </p>
        </div>

        {/* 3 COLORFUL TOUCH-FRIENDLY CLASS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* CARD 1: 🧒 नर्सरी से कक्षा 5 (AI Teacher & Fun Learning) */}
          <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-amber-50 via-orange-50/50 to-white border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
            
            <div className="space-y-4">
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-sm">
                  फाउंडेशन स्तर (Class 1-5)
                </span>
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🧒
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-700 transition-colors">
                  नर्सरी से कक्षा 5
                </h3>
                <p className="text-xs font-bold text-amber-700 mt-0.5">
                  AI Teacher & Fun Learning Zone
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                नन्हे बच्चों के लिए चंचल कार्टून कैरेक्टर्स, सचित्र वर्णमाला (अ-ज्ञ), ABC फोनिक्स, 1-100 गिनती, पहाड़ा और स्क्रीन पर हाथ से लिखने का डिजिटल ट्रेसिंग पैड।
              </p>

              {/* Key Highlights List */}
              <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>सचित्र वर्णमाला:</strong> क से कबूतर, A for Apple</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>डिजिटल ट्रेसिंग:</strong> स्क्रीन पर उंगली से लिखना</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>AI टीचर:</strong> बोलकर सुनने और सीखने की सुविधा</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button */}
            <div className="pt-6 space-y-2">
              <button
                onClick={() => onOpenStudyPage('plan-01')}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>नर्सरी-5वीं शुरू करें (Plan 01)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenAiTeacher('कक्षा 1 से 5 के लिए आसान हिंदी व गणित कैसे सीखें?')}
                className="w-full py-2 text-xs font-bold text-amber-800 hover:text-amber-900 text-center flex items-center justify-center gap-1"
              >
                <Bot className="w-3.5 h-3.5 text-amber-600" />
                <span>AI टीचर से सवाल पूछें</span>
              </button>
            </div>

          </div>

          {/* CARD 2: 📚 कक्षा 6 से 12 (NCERT & Study Material) */}
          <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-white border-2 border-blue-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
            
            <div className="space-y-4">
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-600 text-white shadow-sm">
                  माध्यमिक व बोर्ड परीक्षा (Class 6-12)
                </span>
                <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-300 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  📚
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                  कक्षा 6 से 12
                </h3>
                <p className="text-xs font-bold text-blue-700 mt-0.5">
                  NCERT & Comprehensive Study Material
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                गणित, विज्ञान, हिंदी, सामाजिक विज्ञान व अंग्रेजी के अध्यायवार NCERT नोट्स, ऑडियो वाचन (Text-to-Speech), वीडियो कक्षाएं व दैनिक गृहकार्य चेकिंग।
              </p>

              {/* Key Highlights List */}
              <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>NCERT नोट्स:</strong> अध्यायवार सरल व सचित्र व्याख्या</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>10th & 12th बोर्ड:</strong> मॉडल पेपर्स व फॉर्मूला शीट्स</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>दैनिक गृहकार्य:</strong> सबमिट करें और मार्क्स पाएं</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button */}
            <div className="pt-6 space-y-2">
              <button
                onClick={() => onOpenStudyPage('plan-03')}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>कक्षा 6-12 नोट्स खोलें</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenStudyPage('plan-05')}
                className="w-full py-2 text-xs font-bold text-blue-800 hover:text-blue-900 text-center flex items-center justify-center gap-1"
              >
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>10वीं/12वीं बोर्ड स्पेशल देखें</span>
              </button>
            </div>

          </div>

          {/* CARD 3: 🚀 करियर और जॉब गाइडेंस (Career Access) */}
          <div className="relative rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-purple-50 via-fuchsia-50/50 to-white border-2 border-purple-400 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
            
            <div className="space-y-4">
              {/* Badge & Icon */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-600 text-white shadow-sm">
                  कौशल व रोजगार (Career & Skills)
                </span>
                <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-300 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🚀
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-purple-700 transition-colors">
                  करियर और जॉब गाइडेंस
                </h3>
                <p className="text-xs font-bold text-purple-700 mt-0.5">
                  Career Access & Modern IT Skills
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                कंप्यूटर बेसिक, टाइपिंग, स्पोकन इंग्लिश, रिज्यूम मेकिंग, प्रतियोगी परीक्षा (SSC, Railway, Police) एवं डिजिटल सरकारी सेवाओं की संपूर्ण ट्रेनिंग।
              </p>

              {/* Key Highlights List */}
              <ul className="space-y-2 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>कंप्यूटर व AI टूल्स:</strong> बेसिक से एडवांस कोडिंग</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>प्रतियोगी परीक्षा:</strong> GK/GS, रीजनिंग व मैथ्स ट्रिक्स</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center font-bold text-[10px]">✓</span>
                  <span><strong>करियर गाइडेंस:</strong> रिज्यूम व इंटरव्यू तैयारी</span>
                </li>
              </ul>
            </div>

            {/* Bottom Button */}
            <div className="pt-6 space-y-2">
              <button
                onClick={() => onOpenStudyPage('plan-02')}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>करियर स्किल्स शुरू करें</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToPlans}
                className="w-full py-2 text-xs font-bold text-purple-800 hover:text-purple-900 text-center flex items-center justify-center gap-1"
              >
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>सभी पैकेज व प्लान्स देखें</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
