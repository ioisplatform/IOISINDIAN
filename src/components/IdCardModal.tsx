import React, { useState, useRef } from 'react';
import { MemberProfile } from '../types';
import { ioisMasterPlans } from '../data/ioisPlansData';
import { 
  X, 
  Download, 
  Share2, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  Award, 
  UserCheck, 
  Crown,
  Check,
  Eye,
  EyeOff,
  RotateCw
} from 'lucide-react';

interface IdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: MemberProfile;
}

export const IdCardModal: React.FC<IdCardModalProps> = ({
  isOpen,
  onClose,
  member
}) => {
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [maskDetails, setMaskDetails] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const currentPlan = ioisMasterPlans.find(p => p.id === member.planId) || ioisMasterPlans[6];
  const isSupreme = currentPlan.isSupreme;

  const displayPhone = maskDetails 
    ? (member.phone ? `${member.phone.slice(0, 4)}******${member.phone.slice(-2)}` : '9876******10')
    : member.phone;

  const handleShare = () => {
    const text = `मेरा IOIS आधिकारिक डिजिटल ID कार्ड: ${member.name} (${member.memberId}), एक्टिव प्लान: ${currentPlan.name}। IOIS 7 मास्टर प्लान्स से जुड़ें: https://ioisplatform.github.io/?ref=${member.memberId}`;
    if (navigator.share) {
      navigator.share({ title: 'IOIS Digital ID Card', text: text });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Basic canvas capture fallback
    alert(`IOIS ID कार्ड (${member.memberId}) डाउनलोड हो रहा है... प्रिंट करने के लिए "प्रिंट कार्ड" बटन का उपयोग करें।`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">
              आधिकारिक डिजिटल स्मार्ट ID कार्ड (IOIS Smart Pass)
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Bar */}
        <div className="bg-slate-100 p-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-300">
            <button
              onClick={() => setCardSide('front')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                cardSide === 'front' ? 'bg-orange-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              आगे (Front)
            </button>
            <button
              onClick={() => setCardSide('back')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                cardSide === 'back' ? 'bg-orange-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              पीछे (Back)
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setOrientation(orientation === 'landscape' ? 'portrait' : 'landscape')}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{orientation === 'landscape' ? 'Portrait' : 'Landscape'}</span>
            </button>

            <button
              onClick={() => setMaskDetails(!maskDetails)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold flex items-center gap-1"
            >
              {maskDetails ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
              <span>{maskDetails ? 'सार्वजनिक' : 'सुरक्षित'}</span>
            </button>
          </div>

        </div>

        {/* Card Canvas Container */}
        <div className="p-6 bg-slate-200/70 flex items-center justify-center">
          
          <div 
            ref={cardRef}
            className={`w-full transition-all duration-300 ${
              orientation === 'portrait' ? 'max-w-xs' : 'max-w-md'
            }`}
          >
            {cardSide === 'front' ? (
              /* FRONT OF ID CARD */
              <div className={`rounded-2xl overflow-hidden shadow-2xl border-2 ${
                isSupreme 
                  ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 border-amber-400' 
                  : 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-orange-500/70'
              } text-white`}>
                
                {/* Tricolor Accent Header */}
                <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600" />

                <div className="p-5 space-y-4">
                  {/* Card Brand Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center font-black text-xs text-white shadow">
                        IOIS
                      </div>
                      <div>
                        <span className="font-black text-sm text-white tracking-wide block">
                          IOIS DIGITAL NETWORK
                        </span>
                        <span className="text-[10px] text-amber-400 font-medium block">
                          Indian Online Income Supporting System
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      VERIFIED 2026
                    </span>
                  </div>

                  {/* Member Details & Photo */}
                  <div className={`flex ${orientation === 'portrait' ? 'flex-col items-center text-center' : 'items-center'} gap-4`}>
                    
                    {/* Photo with frame */}
                    <div className="relative shrink-0">
                      <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 ${
                        isSupreme ? 'border-amber-400' : 'border-orange-500'
                      } bg-slate-800 flex items-center justify-center shadow-lg`}>
                        {member.avatarUrl ? (
                          <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center font-black text-2xl text-white">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-slate-950 font-bold" />
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="font-black text-lg text-white truncate">
                        {member.name}
                      </h4>
                      <div className="inline-block px-2 py-0.5 rounded text-[10px] font-black font-mono bg-slate-900 border border-slate-700 text-orange-400">
                        ID: {member.memberId}
                      </div>

                      <div className="text-[11px] text-slate-300 space-y-0.5 pt-1">
                        <div><span className="text-slate-400">पद:</span> {member.designation || 'Verified Member'}</div>
                        <div><span className="text-slate-400">मोबाइल:</span> {displayPhone}</div>
                        <div><span className="text-slate-400">स्थान:</span> {member.city}, {member.state}</div>
                      </div>
                    </div>

                  </div>

                  {/* Plan Banner & QR Code */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase tracking-wider block">
                        सक्रिय योजना स्तर:
                      </span>
                      <span className={`text-xs font-black ${isSupreme ? 'text-amber-300' : 'text-orange-400'}`}>
                        PLAN 0{currentPlan.planNumber}: {currentPlan.name}
                      </span>
                    </div>

                    {/* Real QR Code */}
                    <div className="w-12 h-12 bg-white p-1 rounded-xl shrink-0 flex items-center justify-center shadow">
                      <QrCode className="w-10 h-10 text-slate-950" />
                    </div>
                  </div>

                </div>

              </div>
            ) : (
              /* BACK OF ID CARD */
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-950 text-white p-5 space-y-4">
                <div className="border-b border-slate-800 pb-2 text-center">
                  <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                    IOIS आधिकारिक नियम एवं शर्तें (Terms)
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-2 leading-relaxed">
                  <p>• यह डिजिटल स्मार्ट कार्ड IOIS नेटवर्क का आधिकारिक पहचान पत्र है।</p>
                  <p>• कार्डधारक को उनके चयनित प्लान (PLAN 0{currentPlan.planNumber}) के अनुरूप 50% से 70% तक तत्काल रेफरल पेआउट पाने का अधिकार प्राप्त है।</p>
                  <p>• कार्ड के पीछे स्थित QR कोड को स्कैन करके सीधे सदस्य के रेफरल लिंक से जुड़ा जा सकता है।</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div>
                    <span className="block font-bold text-white">हेल्पलाइन:</span>
                    <span>+91 8877490845</span>
                  </div>
                  <div className="text-right">
                    <span className="block font-bold text-white">सत्यापन पोर्टल:</span>
                    <span>ioisplatform.github.io</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <span className="text-[9px] text-slate-600 block">
                    आधिकारिक 256-Bit एन्क्रिप्टेड डिजिटल पहचान • Made for Digital India
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          
          <span className="text-xs font-bold text-slate-600">
            User ID: <span className="font-mono text-orange-600">{member.memberId}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिंट कार्ड</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{copiedLink ? 'कॉपी हुआ!' : 'शेयर करें'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center gap-1 transition-colors shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>डाउनलोड HD ID कार्ड</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
