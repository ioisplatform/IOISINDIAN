import React, { useState, useEffect, useRef } from 'react';
import { ioisMasterPlans, aiKnowledgeBase } from '../data/ioisPlansData';
import { PlanDetail, ChatMessage } from '../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  User, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Crown 
} from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onSelectPlanToJoin: (plan: PlanDetail) => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  onSelectPlanToJoin
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `नमस्ते! मैं **IOIS AI मास्टर प्लान सलाहकार** हूँ। 🇮🇳\n\nमैं आपको सभी **7 मास्टर प्लांस (₹10 से ₹999)** के बारे में विस्तार से बता सकता हूँ कि **किस प्लान में क्या मिलेगा, किसे जरूरत है, और आपकी कमाई कितनी होगी।**\n\nआप नीचे दिए गए त्वरित प्रश्नों पर क्लिक कर सकते हैं या अपना सवाल हिंदी/अंग्रेजी में लिख सकते हैं!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'पूरे 7 प्लान का मास्टर प्लान: किसमें क्या मिलेगा और क्या जरूरत है?',
    'मेरे लिए सबसे अच्छा प्लान कौन सा है?',
    '₹10 वाले प्लान में क्या मिलता है और कैसे शुरू करें?',
    '₹999 वाले सुप्रीम मास्टर प्लान के फायदे क्या हैं?',
    'इंसेंटिव का पैसा बैंक खाते में कैसे आता है?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const generateAiResponse = (userText: string): { response: string; plan?: PlanDetail } => {
    const text = userText.toLowerCase();

    // 1. Comprehensive Master Plan Breakdown query
    if (
      text.includes('pure plan') || 
      text.includes('master plan') || 
      text.includes('kya milega') || 
      text.includes('kis plan me') || 
      text.includes('sabhi 7') ||
      text.includes('पूरे 7') ||
      text.includes('मास्टर प्लान तैयार')
    ) {
      return {
        response: `📋 **IOIS 7 मास्टर प्लान्स का संपूर्ण ब्लूप्रिंट:**

1. **PLAN 01: Bal Vikas Access (₹10)**
   • **इंसेंटिव:** ₹7 (70% पेआउट)
   • **क्या मिलेगा:** Class 1-5 NCERT डिजिटल PDF नोट्स, एक्टिविटी शीट्स, और ऑफिशियल वेरिफिकेशन पास।
   • **किसे जरूरत है:** प्राथमिक स्कूली बच्चों, अभिभावकों और मात्र ₹10 में बिना जोखिम डिजिटल नेटवर्क सीखने वाले शुरुआती साथियों को।

2. **PLAN 02: Youth Skill Access (₹49)**
   • **इंसेंटिव:** ₹34 (70% पेआउट)
   • **क्या मिलेगा:** ATS-फ्रेंडली प्रोफेशनल CV/Resume टेम्प्लेट्स, AI प्रॉम्प्ट्स गाइड (200+ Prompts), और जॉब एप्लीकेशन लेटर्स।
   • **किसे जरूरत है:** कॉलेज छात्रों, जॉब सीकर्स और फ्रेशर्स को।

3. **PLAN 03: Career & Job Access (₹99)**
   • **इंसेंटिव:** ₹64 (65% पेआउट)
   • **क्या मिलेगा:** कक्षा 6-12 की संपूर्ण डिजिटल पुस्तकें व हल, करियर गाइड, और सॉफ्ट स्किल्स मॉड्यूल्स।
   • **किसे जरूरत है:** हाई स्कूल, इंटरमीडिएट के विद्यार्थियों और ट्यूटर्स को।

4. **PLAN 04: Family VIP Access (₹199)**
   • **इंसेंटिव:** ₹119 (60% पेआउट)
   • **क्या मिलेगा:** पेरेंटिंग व स्क्रीन कंट्रोल किट, योग व स्वास्थ्य गाइड, और साइबर सेफ्टी/ऑनलाइन फ्रॉड बचाव टूल।
   • **किसे जरूरत है:** जागरूक परिवारों, गृहणियों और समाज कल्याण कार्यकर्ताओं को।

5. **PLAN 05: Student Elite Access (₹299) ⭐ सर्वाधिक लोकप्रिय**
   • **इंसेंटिव:** ₹179 (60% पेआउट)
   • **क्या मिलेगा:** SSC, रेलवे, बैंकिंग, पुलिस के टॉपर्स नोट्स, दैनिक करंट अफेयर्स, 10 साल के सॉल्वड पेपर्स, और एलीट टेलीग्राम डाउट ग्रुप।
   • **किसे जरूरत है:** प्रतियोगी परीक्षा अभ्यर्थियों (Aspirants) को।

6. **PLAN 06: Agency Reseller Hub (₹499)**
   • **इंसेंटिव:** ₹274 (55% पेआउट)
   • **क्या मिलेगा:** डिजिटल रीसेलिंग लाइसेंस, व्हाट्सएप ऑटोमेशन स्क्रिप्ट्स, और हाई-कन्वर्टिंग लैंडिंग पेज किट।
   • **किसे जरूरत है:** डिजिटल क्रिएटर्स, साइबर कैफे संचालकों और फ्रीलांसर्स को।

7. **PLAN 07: SUPREME MASTER LIFETIME ACCESS (₹999) 👑 सर्वोच्च प्लान**
   • **इंसेंटिव:** ₹499 (50% सीधा पेआउट - सबसे बड़ा!)
   • **क्या मिलेगा:** सभी 6 प्लान्स का 100% अनलॉक्ड एक्सेस + भविष्य के सभी अपडेट्स आजीवन फ्री + डायरेक्ट एडमिन मेंटरशिप + मास्टर रीसेलर राइट्स।
   • **किसे जरूरत है:** विजनरी लीडर्स और डिजिटल उद्यमियों को।`,
        plan: ioisMasterPlans[6]
      };
    }

    // 2. Specific Plan 01
    if (text.includes('10') || text.includes('bal vikas') || text.includes('दस') || text.includes('शुरुआत')) {
      const p = ioisMasterPlans[0];
      return {
        response: `🌱 **PLAN 01: Bal Vikas Access (लागत: मात्र ₹10)**\n\n• **इंसेंटिव:** प्रति रेफरल **₹7 (70% पेआउट)**\n• **क्या मिलेगा:**\n  ✓ कक्षा 1 से 5 तक के NCERT डिजिटल नोट्स\n  ✓ गणित व भाषा की इंटरैक्टिव वर्कशीट्स\n  ✓ IOIS आधिकारिक सिस्टम वेरिफिकेशन पास\n• **किसे जरूरत है:** प्राथमिक बच्चों, अभिभावकों और मात्र ₹10 से ऑनलाइन इनकम मॉडल सीखने वाले नए सदस्यों के लिए।\n\n💡 *अमित की सफलता:* मुजफ्फरपुर के अमित ने 100 बच्चों को नोट्स शेयर करके ₹700 तुरंत कमाए!`,
        plan: p
      };
    }

    // 3. Plan 07 Supreme
    if (text.includes('999') || text.includes('supreme') || text.includes('master') || text.includes('संजय') || text.includes('लाइफटाइम')) {
      const p = ioisMasterPlans[6];
      return {
        response: `👑 **PLAN 07: SUPREME MASTER ALL-IN-ONE (₹999)**\n\n• **लागत:** ₹999 (आजीवन एकमुश्त निवेश)\n• **इंसेंटिव:** प्रति रेफरल **₹499 (50% सीधा बैंक ट्रांसफर)**\n• **क्या मिलेगा:**\n  ✓ नीचे के सभी 6 प्लान्स (Plan 01 से Plan 06) का पूरा अनलॉक्ड एक्सेस\n  ✓ आजीवन नए कोर्सेज व अपडेट्स फ्री\n  ✓ वीआईपी डायरेक्ट एडमिन मेंटरशिप\n  ✓ मास्टर रीसेलर लाइसेंस व ऑटोमेशन किट\n• **किसे जरूरत है:** विजनरी कम्युनिटी लीडर्स और पूर्ण डिजिटल उद्यमिता करने वालों को।\n\n💡 *संजय वर्मा का मॉडल:* लखनऊ के संजय ने मात्र 20 लीडर्स को जोड़कर ₹9,980 तुरंत कमाए!`,
        plan: p
      };
    }

    // 4. Competitive / Student Plan 05
    if (text.includes('299') || text.includes('student') || text.includes('ssc') || text.includes('railway') || text.includes('police') || text.includes('exam')) {
      const p = ioisMasterPlans[4];
      return {
        response: `🎯 **PLAN 05: Student Elite Access (₹299)**\n\n• **इंसेंटिव:** प्रति रेफरल **₹179 (60% पेआउट)**\n• **क्या मिलेगा:**\n  ✓ SSC, Railway, Banking, Police टॉपर्स नोट्स\n  ✓ डेली करंट अफेयर्स और 10 साल के सॉल्वड पेपर्स\n  ✓ एलीट टेलीग्राम डाउट सॉल्विंग कम्युनिटी\n• **किसे जरूरत है:** प्रतियोगी परीक्षा की तैयारी कर रहे गंभीर छात्रों के लिए।\n\n💡 *विकास की कहानी:* प्रयागराज के विकास ने 10 साथियों को जोड़कर ₹1,790 कमाए और अपनी कोचिंग फीस खुद निकाली!`,
        plan: p
      };
    }

    // 5. Payment / Incentive transfer
    if (text.includes('paisa') || text.includes('bank') || text.includes('transfer') || text.includes('incentive') || text.includes('upi')) {
      return {
        response: `💳 **IOIS इंसेंटिव ट्रांसफर प्रक्रिया:**\n\n1. जैसे ही कोई सदस्य आपके रेफरल लिंक से एक्टिवेट करता है, संबंधित प्लान का 50% से 70% इंसेंटिव तुरंत आपके डैशबोर्ड में जुड़ जाता है।\n2. आप इसे सीधे अपने PhonePe, Google Pay, Paytm UPI या सीधे बैंक खाते (NEFT/IMPS) में निकाल सकते हैं।\n3. न्यूनतम निकासी की कोई कठोर सीमा नहीं है और कोई गुप्त कटौती नहीं की जाती।`
      };
    }

    // Default intelligent guidance
    return {
      response: `IOIS 7 मास्टर प्लान्स में से आप अपनी रुचि अनुसार चुन सकते हैं:\n\n• **कम बजट से शुरुआत:** Plan 01 (₹10) या Plan 02 (₹49) लें।\n• **पढ़ाई व प्रतियोगी परीक्षा:** Plan 05 (₹299) लें, जिसमें परीक्षा नोट्स और ₹179 इंसेंटिव है।\n• **सम्पूर्ण समाधान व सर्वाधिक कमाई:** Plan 07 (₹999) लें, जिसमें ₹499 प्रति रेफरल मिलता है और सभी 6 प्लान्स शामिल हैं।\n\nआप किस प्लान के बारे में और अधिक जानना चाहते हैं?`,
      plan: ioisMasterPlans[6]
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const { response, plan } = generateAiResponse(text);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPlan: plan ? plan.id : undefined
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  IOIS AI मास्टर प्लान सलाहकार
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-white font-bold">
                  ऑनलाइन 24x7
                </span>
              </div>
              <p className="text-xs text-purple-200">
                किस प्लान में क्या मिलेगा, किसे जरूरत है व कितनी कमाई होगी - AI से पूछें
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-800/50 hover:bg-purple-800 text-purple-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-slate-50 border-b border-slate-200 overflow-x-auto flex gap-1.5 shrink-0">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-purple-300 hover:bg-purple-50 whitespace-nowrap transition-colors shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-purple-600 shrink-0" />
              <span>{p}</span>
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-100/40">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            const suggestedPlanObj = msg.suggestedPlan 
              ? ioisMasterPlans.find(p => p.id === msg.suggestedPlan)
              : null;

            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isAi 
                    ? 'bg-white text-slate-800 border border-slate-200' 
                    : 'bg-purple-700 text-white font-medium'
                }`}>
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {/* If AI recommended a plan, show quick action box */}
                  {isAi && suggestedPlanObj && (
                    <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-purple-950 block">
                          अनुशंसित: {suggestedPlanObj.name} (Plan 0{suggestedPlanObj.planNumber})
                        </span>
                        <span className="text-[11px] text-purple-700 font-semibold">
                          लागत: ₹{suggestedPlanObj.price} • इंसेंटिव: ₹{suggestedPlanObj.incentive} ({suggestedPlanObj.payoutPercent}%)
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectPlanToJoin(suggestedPlanObj);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow"
                      >
                        <span>Join Now</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <span className={`text-[10px] block mt-2 ${isAi ? 'text-slate-400' : 'text-purple-200'} text-right`}>
                    {msg.timestamp}
                  </span>
                </div>

                {!isAi && (
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-2 text-slate-500 text-xs pl-2">
              <Bot className="w-4 h-4 text-purple-600 animate-spin" />
              <span>IOIS AI उत्तर तैयार कर रहा है...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="पूछें: ₹10 वाले प्लान में क्या है? या मेरे लिए कौन सा सही है?..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs sm:text-sm bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all shrink-0"
            >
              <span>भेजें</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
