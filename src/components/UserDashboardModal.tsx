import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { ioisMasterPlans } from '../data/ioisPlansData';
import { updateMemberProfile } from '../services/userService';
import { 
  X, 
  CreditCard, 
  BookOpen, 
  Share2, 
  Edit3, 
  LogOut, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight, 
  Save, 
  Crown,
  GraduationCap,
  Tv,
  Pencil,
  FileCheck2,
  Award
} from 'lucide-react';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: MemberProfile;
  onLogout: () => void;
  onOpenStudyPage: (planId: string) => void;
  onOpenIdCard: () => void;
  onProfileUpdated: (updated: MemberProfile) => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenStudyPage,
  onOpenIdCard,
  onProfileUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'profile'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Edit form state
  const [editName, setEditName] = useState(currentUser.name);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [editEmail, setEditEmail] = useState(currentUser.email || '');
  const [editCity, setEditCity] = useState(currentUser.city);
  const [editState, setEditState] = useState(currentUser.state);
  const [editDesignation, setEditDesignation] = useState(currentUser.designation || 'Student Member');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const currentPlan = ioisMasterPlans.find(p => p.id === currentUser.planId) || ioisMasterPlans[0];

  const handleCopyLink = () => {
    const link = `https://ioisplatform.github.io/?plan=${currentUser.planId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const res = updateMemberProfile({
      memberId: currentUser.memberId,
      name: editName.trim(),
      phone: editPhone.trim(),
      email: editEmail.trim(),
      city: editCity.trim(),
      state: editState.trim(),
      designation: editDesignation.trim()
    });

    if (res.success && res.member) {
      onProfileUpdated(res.member);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white font-black text-xl shadow">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  {currentUser.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  सत्यापित छात्र
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Student ID: {currentUser.memberId} • {currentUser.designation || 'Class 1-12'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">लॉगआउट</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 gap-2 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3.5 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            अध्ययन डैशबोर्ड (Study Hub)
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`py-3 px-3.5 border-b-2 transition-colors ${
              activeTab === 'progress'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            अध्ययन प्रगति व रिकॉर्ड
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3.5 border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            छात्र प्रोफाइल संपादन
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ACTIVE PLAN */}
        {activeTab === 'overview' && (
          <div className="p-6 overflow-y-auto space-y-6">
            
            {saveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>छात्र प्रोफाइल सफलतापूर्वक अपडेट हो गई है!</span>
              </div>
            )}

            {/* Active Plan Card */}
            <div className={`p-6 rounded-3xl border-2 ${
              currentPlan.isSupreme 
                ? 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white border-amber-400 shadow-md' 
                : 'bg-slate-50 border-orange-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-slate-900 text-white font-mono">
                      PLAN 0{currentPlan.planNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                      सक्रिय पाठ्यक्रम (Active)
                    </span>
                  </div>

                  <h4 className="text-xl font-black text-slate-900">
                    {currentPlan.name}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {currentPlan.tagline}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenStudyPage(currentPlan.id);
                    }}
                    className="py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-all hover:scale-105"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>स्टडी हब खोलें →</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenIdCard();
                    }}
                    className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-300 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    <span>डिजिटल ID कार्ड देखें</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick 3 Feature Launch Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div 
                onClick={() => {
                  onClose();
                  onOpenStudyPage(currentPlan.id);
                }}
                className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 hover:border-orange-400 cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h5 className="font-black text-sm text-slate-900 group-hover:text-orange-700">
                  सचित्र स्टडी नोट्स
                </h5>
                <p className="text-xs text-slate-600">
                  NCERT आधारित पाठ, बोलकर सुनने की सुविधा और डाउनलोड नोट्स।
                </p>
              </div>

              <div 
                onClick={() => {
                  onClose();
                  onOpenStudyPage(currentPlan.id);
                }}
                className="p-4 rounded-2xl bg-red-50/70 border border-red-200 hover:border-red-400 cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow">
                  <Tv className="w-5 h-5" />
                </div>
                <h5 className="font-black text-sm text-slate-900 group-hover:text-red-700">
                  वीडियो कक्षाएं
                </h5>
                <p className="text-xs text-slate-600">
                  Google Flow वीडियो व विषयवार दृश्य पाठ देखें व नोट्स बनाएं।
                </p>
              </div>

              <div 
                onClick={() => {
                  onClose();
                  onOpenStudyPage(currentPlan.id);
                }}
                className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 hover:border-purple-400 cursor-pointer transition-all space-y-2 group"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow">
                  <Pencil className="w-5 h-5" />
                </div>
                <h5 className="font-black text-sm text-slate-900 group-hover:text-purple-700">
                  अक्षर व ड्राइंग ट्रेसिंग
                </h5>
                <p className="text-xs text-slate-600">
                  अक्षर, गिनती व डायग्राम्स के ऊपर हाथ से पेंसिल चलाकर अभ्यास करें।
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: STUDY PROGRESS */}
        {activeTab === 'progress' && (
          <div className="p-6 overflow-y-auto space-y-6">
            
            <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                    शैक्षणिक प्रगति विवरण (Academic Progress)
                  </span>
                  <h4 className="text-lg font-black mt-1">
                    {currentPlan.name}
                  </h4>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  सक्रिय सत्र 2026
                </span>
              </div>
              <p className="text-xs text-slate-300">
                आपके सभी मॉड्यूल, वीडियो कक्षाएं, टेस्ट और गृहकार्य का रिकॉर्ड यहाँ सुरक्षित रहता है।
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <BookOpen className="w-5 h-5 text-orange-600 mx-auto" />
                <span className="text-xs font-bold text-slate-600 block mt-1">स्टडी नोट्स</span>
                <span className="text-lg font-black text-slate-900 block mt-0.5">सक्रिय</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Tv className="w-5 h-5 text-red-600 mx-auto" />
                <span className="text-xs font-bold text-slate-600 block mt-1">वीडियो कक्षाएं</span>
                <span className="text-lg font-black text-slate-900 block mt-0.5">उपलब्ध</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <Pencil className="w-5 h-5 text-purple-600 mx-auto" />
                <span className="text-xs font-bold text-slate-600 block mt-1">ट्रेसिंग पैड</span>
                <span className="text-lg font-black text-slate-900 block mt-0.5">लाइव</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <FileCheck2 className="w-5 h-5 text-emerald-600 mx-auto" />
                <span className="text-xs font-bold text-slate-600 block mt-1">दैनिक होमवर्क</span>
                <span className="text-lg font-black text-slate-900 block mt-0.5">जांच सक्रिय</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  onClose();
                  onOpenStudyPage(currentPlan.id);
                }}
                className="py-3 px-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md"
              >
                सीधे अभ्यास व टेस्ट शुरू करें →
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: EDIT PROFILE */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="p-6 overflow-y-auto space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700">विद्यार्थी का नाम</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">कक्षा / स्तर</label>
                <input
                  type="text"
                  value={editDesignation}
                  onChange={(e) => setEditDesignation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">मोबाइल नंबर</label>
                <input
                  type="tel"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">ईमेल आईडी</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">शहर / जिला</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">राज्य</label>
                <input
                  type="text"
                  value={editState}
                  onChange={(e) => setEditState(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="submit"
                className="py-2.5 px-5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>प्रोफाइल सेव करें</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
};
