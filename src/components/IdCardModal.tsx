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
  Copy,
  Eye,
  EyeOff,
  RotateCw
} from 'lucide-react';

interface IdCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: MemberProfile | null;
  member?: MemberProfile | null;
}

export const IdCardModal: React.FC<IdCardModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  member
}) => {
  const [cardSide, setCardSide] = useState<'front' | 'back'>('front');
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [maskDetails, setMaskDetails] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const activeUser = member || currentUser;

  if (!isOpen || !activeUser) return null;

  const currentPlan = ioisMasterPlans.find(p => p.id === activeUser.planId) || ioisMasterPlans[0];
  const isSupreme = activeUser.planId === 'plan-07';

  const displayPhone = maskDetails 
    ? (activeUser.phone ? `${activeUser.phone.slice(0, 4)}******${activeUser.phone.slice(-2)}` : '9876******10')
    : activeUser.phone;

  const userIdentifier = activeUser.rollNumber || activeUser.memberId;

  const handleCopyMemberId = () => {
    navigator.clipboard.writeText(userIdentifier);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleShare = () => {
    const text = `मेरा IOIS आधिकारिक डिजिटल ID कार्ड: ${activeUser.name} (User ID: ${userIdentifier}), एक्टिव प्लान: ${currentPlan.name}। IOIS पोर्टल: https://ioisplatform.github.io/student/`;
    if (navigator.share) {
      navigator.share({ title: 'IOIS Student ID Card', text: text });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePremiumDownload = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>IOIS Premium Student ID Card - ${activeUser.name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800;900&display=swap');
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              background: #f1f5f9;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .card {
              width: 480px;
              background: linear-gradient(135deg, #090d16 0%, #1e3a8a 50%, #0f172a 100%);
              border-radius: 20px;
              border: 3px solid #d4af37;
              box-shadow: 0 20px 40px rgba(0,0,0,0.3);
              color: white;
              overflow: hidden;
              position: relative;
            }
            .ribbon {
              height: 6px;
              background: linear-gradient(90deg, #f97316 0%, #ffffff 50%, #10b981 100%);
            }
            .header {
              padding: 16px 20px;
              background: rgba(0,0,0,0.4);
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid rgba(212,175,55,0.3);
            }
            .header-title {
              font-size: 15px;
              font-weight: 900;
              letter-spacing: 0.5px;
            }
            .badge {
              background: #d4af37;
              color: #0f172a;
              font-size: 10px;
              font-weight: 900;
              padding: 4px 8px;
              border-radius: 6px;
            }
            .body {
              padding: 20px;
              display: flex;
              gap: 16px;
            }
            .avatar {
              width: 90px;
              height: 110px;
              background: #1e293b;
              border: 2px solid #d4af37;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
            }
            .info {
              flex: 1;
            }
            .name {
              font-size: 18px;
              font-weight: 900;
              color: white;
              margin-bottom: 6px;
            }
            .id-pill {
              display: inline-block;
              background: #1e3a8a;
              border: 1px solid #60a5fa;
              color: #fef08a;
              font-family: monospace;
              font-weight: 900;
              font-size: 12px;
              padding: 3px 8px;
              border-radius: 6px;
              margin-bottom: 10px;
            }
            .details {
              font-size: 11px;
              color: #cbd5e1;
              line-height: 1.6;
            }
            .details strong {
              color: white;
            }
            .footer {
              padding: 12px 20px;
              background: rgba(0,0,0,0.5);
              border-top: 1px solid rgba(255,255,255,0.1);
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 10px;
              color: #94a3b8;
            }
            .print-btn {
              margin-top: 20px;
              padding: 10px 24px;
              background: #1e3a8a;
              color: white;
              border: none;
              border-radius: 10px;
              font-weight: 800;
              cursor: pointer;
            }
            @media print {
              .print-btn { display: none; }
              body { background: white; }
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="ribbon"></div>
            <div class="header">
              <div>
                <div class="header-title">🇮🇳 IOIS PLATFORM</div>
                <div style="font-size: 9px; color: #fef08a;">Indian Online Income Supporting System</div>
              </div>
              <div class="badge">100% VERIFIED ID</div>
            </div>
            <div class="body">
              <div class="avatar">👨‍🎓</div>
              <div class="info">
                <div class="name">${activeUser.name}</div>
                <div class="id-pill">USER ID: ${userIdentifier}</div>
                <div class="details">
                  <div>कक्षा / स्तर: <strong>${activeUser.grade || 'Primary'}</strong></div>
                  <div>सक्रिय प्लान: <strong style="color: #4ade80;">${activeUser.planName || currentPlan.name} (₹${activeUser.amountPaid || currentPlan.price})</strong></div>
                  <div>मोबाइल: <strong>${activeUser.phone}</strong></div>
                  <div>शहर / राज्य: <strong>${activeUser.city}, ${activeUser.state}</strong></div>
                </div>
              </div>
            </div>
            <div class="footer">
              <div>पंजीकरण तिथि: ${activeUser.joinedDate}</div>
              <div style="color: #facc15; font-weight: bold;">OFFICIAL STUDENT DIGITAL ID</div>
            </div>
          </div>
          <button class="print-btn" onclick="window.print()">📥 सेव / प्रिंट करें (Save as PDF)</button>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn font-sans">
      
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border-2 border-slate-300 overflow-hidden flex flex-col">
        
        {/* Tricolor Ribbon on top */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white via-blue-800 to-emerald-600" />

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0f172a] to-blue-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              🪪
            </div>
            <div>
              <h3 className="font-black text-base text-white">
                आधिकारिक डिजिटल स्मार्ट छात्र ID कार्ड
              </h3>
              <p className="text-[11px] text-[#f3e5ab]">
                सुरक्षित एवं गैर-संपादन योग्य रोल नंबर (Non-Editable Roll No)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
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
                cardSide === 'front' ? 'bg-[#1e3a8a] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              आगे (Front)
            </button>
            <button
              onClick={() => setCardSide('back')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                cardSide === 'back' ? 'bg-[#1e3a8a] text-white' : 'text-slate-600 hover:text-slate-900'
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
              {maskDetails ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{maskDetails ? 'अनमास्क' : 'मास्क फोन'}</span>
            </button>
          </div>

        </div>

        {/* ID Card Display Stage */}
        <div className="p-6 bg-slate-200/80 flex items-center justify-center">
          
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
                  : 'bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 border-[#d4af37]'
              } text-white`}>
                
                {/* Tricolor Accent Header */}
                <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600" />

                <div className="p-5 space-y-4">
                  {/* Card Brand Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-xs shadow">
                        IOIS
                      </div>
                      <div>
                        <span className="font-black text-sm text-white tracking-wide block">
                          IOIS DIGITAL CLASSROOM
                        </span>
                        <span className="text-[10px] text-amber-400 font-medium block">
                          भारत का आधिकारिक छात्र शिक्षा कंसोल
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
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 bg-slate-800 flex items-center justify-center shadow-lg">
                        <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center font-black text-2xl text-white">
                          {activeUser.name.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-slate-950 font-bold" />
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <h4 className="font-black text-lg text-white truncate">
                        {activeUser.name}
                      </h4>
                      
                      {/* Non-Editable Official Roll Number with Copy ID Button */}
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-black font-mono bg-blue-900/60 border border-blue-400 text-[#f3e5ab]">
                          <span>ID / ROLL NO:</span>
                          <span>{userIdentifier}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyMemberId}
                          title="Copy Member ID to Clipboard"
                          className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1 transition-colors shadow-xs"
                        >
                          {copiedId ? <Check className="w-3 h-3 text-slate-950" /> : <Copy className="w-3 h-3 text-slate-950" />}
                          <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-300 space-y-0.5 pt-1">
                        <div>कक्षा: <strong className="text-white">{activeUser.grade || 'Primary'}</strong></div>
                        <div>प्लान: <strong className="text-emerald-400">{activeUser.planName || currentPlan.name} (₹{activeUser.amountPaid || currentPlan.price})</strong></div>
                        <div>मोबाइल: <span className="font-mono">{displayPhone}</span></div>
                        <div>शहर / राज्य: <span>{activeUser.city}, {activeUser.state}</span></div>
                      </div>
                    </div>

                  </div>

                  {/* Card Bottom Bar */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <div>पंजीकरण तिथि: {activeUser.joinedDate}</div>
                    <div className="text-amber-400 font-bold">100% NON-EDITABLE ID</div>
                  </div>

                </div>

              </div>
            ) : (
              /* BACK OF ID CARD */
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-900 text-white p-5 space-y-4">
                <div className="text-center space-y-1">
                  <h5 className="font-black text-xs uppercase tracking-wider text-amber-400">
                    अधिकृत छात्र नियम एवं दिशा-निर्देश
                  </h5>
                  <p className="text-[10px] text-slate-400">
                    यह डिजिटल छात्र पहचान पत्र IOIS शैक्षिक मंच द्वारा जारी किया गया है।
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-300 space-y-1.5 leading-relaxed">
                  <div>1. यह पास केवल पंजीकृत विद्यार्थी के निजी अध्ययन के लिए मान्य है।</div>
                  <div>2. जारी किया गया रोल नंबर अपरिवर्तनीय (Non-Editable) और स्थायी है।</div>
                  <div>3. केवल उसी प्लान की किट अनलॉक होगी जिसका सत्यापन शुल्क भुगतान किया गया है।</div>
                  <div>4. हेल्पलाइन एवं तकनीकी सहायता: <strong>+91 8877490845</strong></div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px]">
                  <div className="font-mono text-slate-400">
                    REF: {activeUser.paymentRef || 'VERIFIED-UPI'}
                  </div>
                  <div className="text-emerald-400 font-bold">
                    STATUS: {activeUser.status}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="text-[11px] text-slate-500 font-medium">
            रोल नंबर: <strong className="text-[#1e3a8a] font-mono">{activeUser.rollNumber || activeUser.memberId}</strong>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'लिंक कॉपी हुआ!' : 'शेयर करें'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>प्रिंट कार्ड</span>
            </button>

            <button
              onClick={handlePremiumDownload}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-[#d4af37] to-amber-600 hover:brightness-105 text-slate-950 font-black flex items-center gap-1.5 shadow-md transition-all tracking-wide"
            >
              <Download className="w-4 h-4" />
              <span>डाउनलोड प्रीमियम ID कार्ड (HD)</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
