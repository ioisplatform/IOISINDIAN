import React, { useState } from 'react';
import { ioisMasterPlans } from '../data/ioisPlansData';
import { PlanDetail, MemberProfile } from '../types';
import { registerNewMember } from '../services/userService';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Lock,
  Smartphone,
  AlertCircle,
  Eye,
  EyeOff,
  GraduationCap,
  BookOpen,
  User
} from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
  onSuccessRegistration: (profile: MemberProfile) => void;
  onSwitchToLogin: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialPlanId = 'plan-01',
  onSuccessRegistration,
  onSwitchToLogin
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlanId);
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('कक्षा 1-5 (Primary)');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const currentPlan = ioisMasterPlans.find(p => p.id === selectedPlanId) || ioisMasterPlans[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('कृपया विद्यार्थी का पूरा नाम दर्ज करें।');
      return;
    }
    const cleanP = phone.replace(/\D/g, '');
    if (cleanP.length < 10) {
      setErrorMessage('कृपया मान्य 10-अंकों का मोबाइल नंबर दर्ज करें।');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('कृपया कम से कम 4 अक्षरों का सुरक्षित पासवर्ड बनाएं।');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const res = registerNewMember({
        name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: city.trim() || 'भारत',
        state: state.trim() || '',
        planId: currentPlan.id,
        planPrice: currentPlan.price,
        sponsorId: 'STUDENT_PORTAL',
        payoutUpi: '',
        utrNumber: '',
        screenshotUrl: '',
        password: password,
        designation: `${grade} - Student`
      });

      setIsProcessing(false);

      if (res.success && res.member) {
        onSuccessRegistration(res.member);
      } else {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
                <span>नया विद्यार्थी पंजीकरण (Student Registration)</span>
              </h3>
              <p className="text-xs text-slate-300">
                अध्ययन सामग्री, वीडियो कक्षाएं, ट्रेसिंग पैड व डिजिटल ID कार्ड प्राप्त करें
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Plan Selector Ribbon */}
        <div className="bg-slate-100 p-2.5 border-b border-slate-200 overflow-x-auto scrollbar-none flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            योजना चुनें:
          </span>
          {ioisMasterPlans.map((p) => {
            const isSelected = p.id === selectedPlanId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlanId(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <span>P0{p.planNumber}</span>
                <span>•</span>
                <span>{p.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Form Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800">
          
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Friendly Student Banner */}
            <div className="p-3 bg-blue-50/80 rounded-2xl border border-blue-200 text-xs text-blue-950 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                चयनित योजना: <strong>{currentPlan.name}</strong> • पंजीकरण पूर्ण होते ही सभी पाठ और डिजिटल ID कार्ड तुरंत सक्रिय हो जाएंगे।
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">विद्यार्थी का पूरा नाम (Full Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल कुमार"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Class / Grade Selection */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">कक्षा / स्तर (Class / Grade) *</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-bold text-slate-800"
                >
                  <option value="कक्षा 1-2 (Foundation)">कक्षा 1-2 (Foundation)</option>
                  <option value="कक्षा 3-5 (Primary)">कक्षा 3-5 (Primary)</option>
                  <option value="कक्षा 6-8 (Middle School)">कक्षा 6-8 (Middle School)</option>
                  <option value="कक्षा 9-10 (Secondary Board)">कक्षा 9-10 (Secondary Board)</option>
                  <option value="कक्षा 11-12 (Senior Secondary)">कक्षा 11-12 (Senior Secondary)</option>
                  <option value="डिजिटल कौशल / कोडिंग">डिजिटल कौशल / कोडिंग</option>
                  <option value="प्रतियोगी परीक्षा / सामान्य ज्ञान">प्रतियोगी परीक्षा / सामान्य ज्ञान</option>
                </select>
              </div>

              {/* Mobile Phone */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">मोबाइल नंबर (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="10 अंकों का मोबाइल नंबर"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                />
              </div>

              {/* Email (Optional) */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">ईमेल आईडी (वैकल्पिक)</label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* City */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">शहर / जिला (City / District)</label>
                <input
                  type="text"
                  placeholder="अपना शहर या जिला दर्ज करें"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* State */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">राज्य (State)</label>
                <input
                  type="text"
                  placeholder="अपना राज्य दर्ज करें"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Password */}
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-slate-700">सुरक्षित पासवर्ड बनाएं (Password) *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="कम से कम 4 अक्षरों का पासवर्ड"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 pr-10 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>पंजीकरण हो रहा है...</span>
                ) : (
                  <>
                    <span>विद्यार्थी खाता बनाएं व पढ़ाई शुरू करें</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Switch to login */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">पहले से खाता बना हुआ है?</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitchToLogin();
                }}
                className="font-bold text-orange-600 hover:underline"
              >
                छात्र लॉगिन करें →
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};
