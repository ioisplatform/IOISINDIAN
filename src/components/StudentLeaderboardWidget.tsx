import React, { useState } from 'react';
import { 
  Trophy, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ExternalLink, 
  Copy,
  Zap
} from 'lucide-react';

interface StudentLeaderboardWidgetProps {
  onJoinPlan: (planId: string) => void;
}

export const StudentLeaderboardWidget: React.FC<StudentLeaderboardWidgetProps> = ({
  onJoinPlan
}) => {
  const [copied, setCopied] = useState(false);

  // Top Student Leaders (inspiring real educational peer motivations)
  const topLeaders = [
    { rank: 1, name: 'अमित कुमार (कक्षा 12)', location: 'मुजफ्फरपुर, बिहार', plan: 'Plan 02: Youth Skill', earnings: '₹3,400', studentsHelped: '100+ विद्यार्थी', badge: '🥇 गोल्ड लीडर' },
    { rank: 2, name: 'प्रिया सिंह (BCA प्रथम वर्ष)', location: 'भोपाल, म.प्र.', plan: 'Plan 03: Career Foundation', earnings: '₹2,673', studentsHelped: '27 साथी छात्र', badge: '🥈 सिल्वर स्टार' },
    { rank: 3, name: 'रोहित वर्मा (कक्षा 10)', location: 'लखनऊ, उ.प्र.', plan: 'Plan 01: Bal Vikas', earnings: '₹1,890', studentsHelped: '270 छोटे बच्चे', badge: '🥉 ब्रॉन्ज चैंपियन' },
    { rank: 4, name: 'नेहा परवीन (B.Com)', location: 'पटना, बिहार', plan: 'Plan 04: Family VIP', earnings: '₹1,500', studentsHelped: '15 परिवार', badge: '⭐ स्टार एंबेसडर' }
  ];

  const shareText = `🇮🇳 IOIS डिजिटल शिक्षा एवं छात्र कौशल पोर्टल:
कक्षा 1 से 12 तक के सचित्र NCERT नोट्स, Google Flow वीडियो कक्षाएं, डिजिटल अक्षर व चित्र ट्रेसिंग पैड और दैनिक गृहकार्य जांच प्रणाली!
साथ ही 70% तक तुरंत रेफरल सपोर्ट।
अधिकृत पोर्टल: https://ioisplatform.github.io/student/
हेल्पलाइन: 8877490845`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsappShare = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleTelegramShare = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://t.me/share/url?url=https://ioisplatform.github.io/student/&text=${encoded}`, '_blank');
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: LEADERBOARD LIST (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800 text-xs font-black uppercase flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>छात्र लीडरबोर्ड (Student Leaders)</span>
              </span>
              <span className="text-xs text-slate-500">• 70% तुरंत रेफरल इंसेंटिव</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              शीर्ष छात्र एवं अर्निंग लीडर्स (Top Student Leaders)
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              वे होनहार छात्र जो अपने स्कूल-कॉलेज के दोस्तों को डिजिटल नोट्स, ट्रेसिंग पैड और गृहकार्य सुविधा से जोड़कर खुद आत्मनिर्भर बन रहे हैं:
            </p>

            {/* List */}
            <div className="space-y-2.5 pt-1">
              {topLeaders.map((leader) => (
                <div 
                  key={leader.rank}
                  className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200 hover:border-orange-300 transition-all flex items-center justify-between gap-3 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-slate-800 shrink-0 shadow-inner">
                      #{leader.rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">
                          {leader.name}
                        </span>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                          {leader.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        {leader.location} • <span className="text-orange-600 font-semibold">{leader.plan}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-black text-xs sm:text-sm text-emerald-700 block">
                      {leader.earnings}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">
                      {leader.studentsHelped}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: ONE-CLICK VIRAL SHARE BOX (5 cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-950 to-orange-950 text-white border-2 border-orange-500/40 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase">
                  तुरंत 70% पेआउट
                </span>
                <span className="text-xs text-amber-400 font-mono">हेल्पलाइन: 8877490845</span>
              </div>

              <div>
                <h4 className="text-lg font-black text-white">
                  1-क्लिक शेयर करें और पॉकेट मनी कमाएं!
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  अपने दोस्तों और व्हाट्सएप ग्रुप्स में अपना लिंक शेयर करें। हर जॉइनिंग पर 70% तक इंसेंटिव (जैसे Youth Skill पर ₹34 प्रति छात्र) सीधा प्राप्त करें।
                </p>
              </div>

              {/* Share Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsappShare}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105"
                >
                  <Share2 className="w-4 h-4" />
                  <span>व्हाट्सएप पर शेयर करें (WhatsApp Share)</span>
                </button>

                <button
                  onClick={handleTelegramShare}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <span>टेलीग्राम पर शेयर करें (Telegram Share)</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>{copied ? '✓ शेयर टेक्स्ट कॉपी हो गया!' : 'शेयर टेक्स्ट व लिंक कॉपी करें'}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>सत्यापित रेफरल सिस्टम • IOIS India द्वारा समर्थित</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
