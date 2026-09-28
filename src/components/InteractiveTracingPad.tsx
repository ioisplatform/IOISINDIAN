import React, { useRef, useState, useEffect } from 'react';
import { 
  Pencil, 
  Eraser, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  EyeOff,
  Palette,
  Type
} from 'lucide-react';

interface InteractiveTracingPadProps {
  planId: string;
  planNumber: number;
  onTracingCompleted?: () => void;
}

// Tracing Templates by Plan
const TRACING_TEMPLATES: Record<string, { id: string; label: string; guideText: string; hint: string }[]> = {
  'plan-01': [
    { id: 'swar-a', label: 'स्वर: अ (अनार)', guideText: 'अ', hint: 'बाईं ओर दो घुमाव बनाएं, फिर बीच में छोटी रेखा और खड़ी रेखा खींचें।' },
    { id: 'swar-aa', label: 'स्वर: आ (आम)', guideText: 'आ', hint: 'अ बनाकर दाईं तरफ एक और खड़ी मात्रा (ा) लगाएं।' },
    { id: 'swar-i', label: 'स्वर: इ (इमली)', guideText: 'इ', hint: 'छोटी खड़ी रेखा से शुरू करके अंग्रेजी का S जैसा घुमाव बनाएं।' },
    { id: 'vyanjan-ka', label: 'व्यंजन: क (कमल)', guideText: 'क', hint: 'बीच में खड़ी रेखा खींचें, बाईं ओर गोल वृत्त और दाईं ओर नीचे मुड़ा हुआ चाप बनाएं।' },
    { id: 'num-123', label: 'गिनती: १ २ ३ (1 2 3)', guideText: '1 2 3', hint: 'संख्याओं के ऊपर सावधानी से अपनी पेंसिल चलाएं।' },
    { id: 'eng-abc', label: 'English: A B C', guideText: 'A B C', hint: 'कैपिटल अक्षरों के डॉट्स पर हाथ फेरें।' }
  ],
  'plan-02': [
    { id: 'flowchart', label: 'कंप्यूटर फ्लोचार्ट (Start → Process → End)', guideText: 'START → [CODE] → END', hint: 'प्रोग्रामिंग लॉजिक फ्लोचार्ट बनाएं।' },
    { id: 'keyboard-shortcuts', label: 'शॉर्टकट कीज: Ctrl+C, Ctrl+V', guideText: 'Ctrl+C / Ctrl+V', hint: 'कंप्यूटर शॉर्टकट का हाथ से अभ्यास करें।' },
    { id: 'binary-code', label: 'बाइनरी कोड: 1 0 1 0 1', guideText: '1 0 1 0 1', hint: 'कंप्यूटर की मूल भाषा 0 और 1 का अभ्यास।' }
  ],
  'plan-03': [
    { id: 'cursive-sentence', label: 'Cursive: Practice Makes Perfect', guideText: 'Practice Makes Perfect', hint: 'अंग्रेजी में सुंदर करसिव हैंडराइटिंग का अभ्यास करें।' },
    { id: 'signature-prep', label: 'प्रोफेशनल सिग्नेचर अभ्यास', guideText: 'Professional Signature', hint: 'अपना आधिकारिक हस्ताक्षर सुंदर बनाएं।' },
    { id: 'self-intro', label: 'Interview Intro: Hello Sir/Ma\'am', guideText: 'Hello Sir / Ma\'am', hint: 'स्पष्ट और आत्मविश्वास से भरा हैंडराइटिंग अभ्यास।' }
  ],
  'plan-04': [
    { id: 'family-budget', label: 'बजट ट्री (आय → बचत → व्यय)', guideText: 'Income = Save + Spend', hint: 'पारिवारिक वित्तीय योजना का आरेख बनाएं।' },
    { id: 'gk-map', label: 'भारत का प्रतीक (सत्यमेव जयते)', guideText: 'सत्यमेव जयते', hint: 'राष्ट्रीय आदर्श वाक्य का सुलेख।' }
  ],
  'plan-05': [
    { id: 'math-formula', label: 'बीजगणित: (a+b)² = a² + 2ab + b²', guideText: '(a+b)² = a² + 2ab + b²', hint: 'गणितीय सूत्र को लिखकर याद करें।' },
    { id: 'physics-diagram', label: 'ओम का नियम: V = I × R', guideText: 'V = I × R (Ohm\'s Law)', hint: 'भौतिकी सूत्र व सर्किट आरेख बनाएं।' }
  ],
  'plan-06': [
    { id: 'agency-workflow', label: 'डिजिटल सर्विस प्रोसेस मैप', guideText: 'Client → Work → Delivery', hint: 'सर्विस सेंटर का कार्यप्रवाह आरेखित करें।' },
    { id: 'rtps-steps', label: 'RTPS आवेदन प्रक्रिया', guideText: 'Apply → Verify → Download', hint: 'ऑनलाइन सेवा के चरणों का प्रवाह चार्ट।' }
  ],
  'plan-07': [
    { id: 'leadership-vision', label: 'लीडरशिप रोडमैप: Vision 2030', guideText: 'Vision → Action → Success', hint: 'अपने जीवन और करियर का मास्टर रोडमैप बनाएं।' },
    { id: 'master-swot', label: 'SWOT एनालिसिस: S W O T', guideText: 'STRENGTH • WEAKNESS • GOAL', hint: 'आत्म-विश्लेषण एवं रणनीतिक चार्ट बनाएं।' }
  ]
};

export const InteractiveTracingPad: React.FC<InteractiveTracingPadProps> = ({
  planId,
  planNumber,
  onTracingCompleted
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#2563eb'); // Royal blue
  const [brushSize, setBrushSize] = useState(4);
  const [showGuide, setShowGuide] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const templates = TRACING_TEMPLATES[planId] || TRACING_TEMPLATES['plan-01'];
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  // Handle template switch
  useEffect(() => {
    const list = TRACING_TEMPLATES[planId] || TRACING_TEMPLATES['plan-01'];
    setSelectedTemplate(list[0]);
    clearCanvas();
  }, [planId]);

  // Set up canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth || 700;
    canvas.height = 320;
    redrawGuide();
  }, [selectedTemplate, showGuide]);

  const redrawGuide = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ruled lines (like student school notebook)
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let y = 40; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Top red margin line
    ctx.strokeStyle = '#fecaca';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, canvas.height);
    ctx.stroke();

    // Dotted guide text if enabled
    if (showGuide && selectedTemplate) {
      ctx.save();
      ctx.font = 'bold 54px "Noto Sans Devanagari", "Segoe UI", sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Draw dotted text outline
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.strokeText(selectedTemplate.guideText, canvas.width / 2 + 20, canvas.height / 2);
      ctx.fillText(selectedTemplate.guideText, canvas.width / 2 + 20, canvas.height / 2);
      ctx.restore();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = brushSize * 4;
    } else {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    redrawGuide();
    setIsDone(false);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `IOIS_Tracing_Plan0${planNumber}_${selectedTemplate.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleMarkCompleted = () => {
    setIsDone(true);
    if (onTracingCompleted) {
      onTracingCompleted();
    }
  };

  const colors = [
    { label: 'नीली स्याही (Blue)', hex: '#2563eb' },
    { label: 'काली पेंसिल (Black)', hex: '#0f172a' },
    { label: 'हरी स्याही (Green)', hex: '#059669' },
    { label: 'लाल स्याही (Red)', hex: '#dc2626' },
    { label: 'केसरिया (Orange)', hex: '#ea580c' },
    { label: 'बैंगनी (Purple)', hex: '#7c3aed' }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-100 text-orange-700">
              <Pencil className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <span>डिजिटल अक्षर व चित्र ट्रेसिंग पैड (Tracing Canvas)</span>
                {isDone && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> पूर्ण हुआ!
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-500">
                ट्रेसिंग गाइड के ऊपर माउस या उंगली से पेंसिल चलाएं और अपनी हैंडराइटिंग सुधारें
              </p>
            </div>
          </div>
        </div>

        {/* Template Select Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600 shrink-0">ट्रेसिंग विषय:</label>
          <select
            value={selectedTemplate.id}
            onChange={(e) => {
              const found = templates.find(t => t.id === e.target.value);
              if (found) {
                setSelectedTemplate(found);
                clearCanvas();
              }
            }}
            className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {templates.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Guide hint */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-900 gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span><strong>अभ्यास निर्देश:</strong> {selectedTemplate.hint}</span>
        </div>
        <button
          type="button"
          onClick={() => setShowGuide(!showGuide)}
          className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 bg-amber-100/70 px-2.5 py-1 rounded-lg shrink-0"
        >
          {showGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showGuide ? 'गाइड छुपाएं' : 'गाइड दिखाएं'}</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
        
        {/* Tool selector */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTool('pen')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              tool === 'pen'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>पेंसिल</span>
          </button>

          <button
            type="button"
            onClick={() => setTool('eraser')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              tool === 'eraser'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span>रबर (Eraser)</span>
          </button>
        </div>

        {/* Color picker */}
        {tool === 'pen' && (
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 mr-1 hidden sm:inline">रंग:</span>
            {colors.map(c => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setColor(c.hex)}
                title={c.label}
                className={`w-6 h-6 rounded-full transition-transform ${
                  color === c.hex ? 'scale-125 ring-2 ring-offset-2 ring-slate-800' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        {/* Thickness */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500">मोटाई:</span>
          <div className="flex items-center gap-1">
            {[2, 4, 8].map(size => (
              <button
                key={size}
                type="button"
                onClick={() => setBrushSize(size)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  brushSize === size
                    ? 'bg-orange-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-300'
                }`}
              >
                {size === 2 ? 'बारीक' : size === 4 ? 'मध्यम' : 'मोटी'}
              </button>
            ))}
          </div>
        </div>

        {/* Reset & Download */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearCanvas}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-500" />
            <span>मिटाएं (Clear)</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>सेव करें (.png)</span>
          </button>
        </div>

      </div>

      {/* Canvas Area */}
      <div className="relative border-2 border-slate-300 rounded-2xl overflow-hidden bg-white shadow-inner touch-none cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full block"
          style={{ height: '320px' }}
        />
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-500">
          💡 <strong>टिप:</strong> मोबाइल या टैबलेट पर उंगली या टच-पेन से सीधे आसानी से लिख सकते हैं।
        </div>

        <button
          type="button"
          onClick={handleMarkCompleted}
          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
            isDone 
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
              : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white hover:scale-105'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isDone ? '✓ ट्रेसिंग टास्क सत्यापित' : 'मैंने ट्रेसिंग पूरी कर ली (Complete Task)'}</span>
        </button>
      </div>

    </div>
  );
};
