import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { authenticateMember } from '../services/userService';
import { 
  X, 
  UserCheck, 
  Lock, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (member: MemberProfile) => void;
  onSwitchToRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin,
  onSwitchToRegister
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('कृपया अपनी User ID, मोबाइल नंबर या ईमेल दर्ज करें।');
      return;
    }

    if (!password) {
      setError('कृपया अपना पासवर्ड दर्ज करें।');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = authenticateMember(identifier, password);
      setLoading(false);
      if (res.success && res.member) {
        onSuccessLogin(res.member);
      } else {
        setError(res.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">
                IOIS सदस्य लॉगिन (Member Login)
              </h3>
              <p className="text-xs text-slate-300">
                अपने डैशबोर्ड, डिजिटल ID कार्ड व स्टडी पेज में प्रवेश करें
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              User ID, मोबाइल नंबर या ईमेल *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="पंजीकृत मोबाइल नंबर या User ID दर्ज करें"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">
                सुरक्षित पासवर्ड (Password) *
              </label>
              <button
                type="button"
                onClick={() => alert('पासवर्ड रीसेट करने के लिए कृपया अपनी पंजीकृत User ID और मोबाइल नंबर के साथ आधिकारिक व्हाट्सएप हेल्पलाइन (+91 8877490845) पर संपर्क करें।')}
                className="text-[11px] text-orange-600 hover:underline font-bold"
              >
                पासवर्ड भूल गए?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="अपना पासवर्ड दर्ज करें..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs sm:text-sm bg-slate-50"
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

          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>सत्यापन हो रहा है...</span>
            ) : (
              <>
                <span>लॉगिन करें (LOGIN NOW)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">नया खाता बनाना चाहते हैं?</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onSwitchToRegister();
              }}
              className="font-bold text-orange-600 hover:underline"
            >
              नया रजिस्ट्रेशन करें →
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
