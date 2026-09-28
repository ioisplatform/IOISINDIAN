import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { getStoredMembers, saveMembers } from '../services/userService';
import { ioisMasterPlans } from '../data/ioisPlansData';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Search, 
  Download, 
  UserPlus, 
  Eye, 
  EyeOff,
  AlertCircle,
  ExternalLink,
  Crown
} from 'lucide-react';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUsersUpdated?: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onUsersUpdated
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'Verified' | 'Pending'>('all');
  const [members, setMembers] = useState<MemberProfile[]>(() => getStoredMembers());

  // Add/Edit user state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserPlan, setNewUserPlan] = useState('plan-07');
  const [newUserCity, setNewUserCity] = useState('पटना');

  if (!isOpen) return null;

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Strict master password verification - IOISSYSTEM
    if (passwordInput.trim() === 'IOISSYSTEM') {
      setIsAuthenticated(true);
      setPasswordInput('');
      setMembers(getStoredMembers());
    } else {
      setAuthError('गलत एडमिन पासवर्ड! कृपया सही अधिकृत मास्टर पासवर्ड दर्ज करें।');
    }
  };

  const handleToggleStatus = (memberId: string) => {
    const updated = members.map(m => {
      if (m.memberId === memberId) {
        return {
          ...m,
          status: m.status === 'Verified' ? 'Pending' as const : 'Verified' as const
        };
      }
      return m;
    });
    setMembers(updated);
    saveMembers(updated);
    if (onUsersUpdated) onUsersUpdated();
  };

  const handleDeleteMember = (memberId: string) => {
    if (!confirm(`क्या आप सदस्य ${memberId} को हटाना चाहते हैं?`)) return;
    const updated = members.filter(m => m.memberId !== memberId);
    setMembers(updated);
    saveMembers(updated);
    if (onUsersUpdated) onUsersUpdated();
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserPhone.trim()) return;

    const chosenPlan = ioisMasterPlans.find(p => p.id === newUserPlan) || ioisMasterPlans[6];
    
    // Generate unique ID
    const cleanName = newUserName.trim().toUpperCase().replace(/[^A-Z\s]/g, '');
    const parts = cleanName.split(/\s+/).filter(Boolean);
    const initials = parts.length >= 2 ? (parts[0][0] + parts[1][0]) : (cleanName.slice(0, 2) || 'IO');
    const seq = members.length + 1;
    const seqStr = seq < 10 ? `0${seq}` : `${seq}`;
    const newId = `IOIS${chosenPlan.price}${initials}${seqStr}`;

    const now = new Date();
    const joined = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

    const newM: MemberProfile = {
      name: newUserName.trim(),
      phone: newUserPhone.trim(),
      city: newUserCity.trim() || 'पटना',
      state: 'बिहार',
      memberId: newId,
      planId: newUserPlan,
      joinedDate: joined,
      status: 'Verified',
      payoutUpi: `${newUserPhone.trim()}@upi`,
      designation: 'Admin Enrolled Member'
    };

    const updated = [newM, ...members];
    setMembers(updated);
    saveMembers(updated);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserPhone('');
    if (onUsersUpdated) onUsersUpdated();
  };

  const exportCsv = () => {
    const headers = 'MemberId,Name,Phone,City,State,Plan,Status,JoinedDate,PayoutUpi\n';
    const rows = members.map(m => 
      `"${m.memberId}","${m.name}","${m.phone}","${m.city}","${m.state}","${m.planId}","${m.status}","${m.joinedDate}","${m.payoutUpi || ''}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IOIS_Members_Export_${Date.now()}.csv`;
    a.click();
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.phone.includes(searchTerm);
    const matchesFilter = selectedFilter === 'all' || m.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div className="bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[92vh] text-slate-100">
        
        {/* Header */}
        <div className="bg-slate-950 p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">
                  IOIS मास्टर एडमिन कंसोल (Master Admin Console)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  {isAuthenticated ? 'अनलॉक्ड' : 'सुरक्षित'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                सदस्य सत्यापन, UTR पेमेंट अप्रूवल, डेटा प्रबंधन एवं आधिकारिक नियंत्रण
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="p-8 max-w-md mx-auto my-12 w-full space-y-6 text-center">
            
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 mx-auto flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">मास्टर एडमिन सत्यापन</h4>
              <p className="text-xs text-slate-400">
                एडमिन पैनल तक पहुँचने के लिए अपना अधिकृत मास्टर पासवर्ड दर्ज करें।
              </p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  एडमिन पासवर्ड:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-[1.01]"
              >
                एडमिन पैनल खोलें (Unlock Dashboard)
              </button>
            </form>

            <span className="text-[11px] text-slate-500 block">
              सुरक्षित 256-Bit एन्क्रिप्टेड एडमिन सत्र
            </span>

          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 block">कुल पंजीकृत सदस्य</span>
                <span className="text-2xl font-black text-white font-mono">{members.length}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-emerald-400 block">सत्यापित (Verified)</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {members.filter(m => m.status === 'Verified').length}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-amber-400 block">समीक्षाधीन (Pending)</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {members.filter(m => m.status === 'Pending').length}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-bold text-purple-400 block">मास्टर सदस्य (Plan 07)</span>
                <span className="text-2xl font-black text-purple-400 font-mono">
                  {members.filter(m => m.planId === 'plan-07').length}
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="खोजें: नाम, ID, मोबाइल..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Filters and Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as any)}
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-bold outline-none"
                >
                  <option value="all">सभी सदस्य ({members.length})</option>
                  <option value="Verified">केवल Verified</option>
                  <option value="Pending">केवल Pending</option>
                </select>

                <button
                  onClick={() => setShowAddUserModal(true)}
                  className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ नया सदस्य जोड़ें</span>
                </button>

                <button
                  onClick={exportCsv}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV बैकअप</span>
                </button>
              </div>

            </div>

            {/* Add User Modal */}
            {showAddUserModal && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-orange-500/50 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-orange-400">नया सदस्य सीधा पंजीकरण</h4>
                  <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white text-xs font-bold">
                    ✕ रद्द करें
                  </button>
                </div>
                <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="पूरा नाम (Full Name)"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="10 अंकों का मोबाइल नंबर"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  />
                  <select
                    value={newUserPlan}
                    onChange={(e) => setNewUserPlan(e.target.value)}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                  >
                    {ioisMasterPlans.map(p => (
                      <option key={p.id} value={p.id}>PLAN 0{p.planNumber} (₹{p.price})</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
                  >
                    सहेजें व एक्टिवेट करें
                  </button>
                </form>
              </div>
            )}

            {/* Members Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs">
                
                <thead className="bg-slate-900 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3">User ID</th>
                    <th className="p-3">सदस्य नाम</th>
                    <th className="p-3">मोबाइल व शहर</th>
                    <th className="p-3">प्लान स्तर</th>
                    <th className="p-3">पेआउट UPI</th>
                    <th className="p-3">स्टेटस</th>
                    <th className="p-3 text-center">एक्शन</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredMembers.map((m) => {
                    const planObj = ioisMasterPlans.find(p => p.id === m.planId);
                    return (
                      <tr key={m.memberId} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 font-mono font-bold text-orange-400">
                          {m.memberId}
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-white block">{m.name}</span>
                          <span className="text-[10px] text-slate-500 block">शामिल: {m.joinedDate}</span>
                        </td>
                        <td className="p-3">
                          <span className="block text-slate-300">{m.phone}</span>
                          <span className="text-[10px] text-slate-500 block">{m.city}, {m.state}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200 block truncate">
                            {planObj ? `P0${planObj.planNumber}: ₹${planObj.price}` : m.planId}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-slate-400">
                          {m.payoutUpi || '—'}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black inline-block ${
                            m.status === 'Verified'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleStatus(m.memberId)}
                              title={m.status === 'Verified' ? 'लंबित करें' : 'स्वीकृत करें'}
                              className={`p-1.5 rounded-lg text-xs font-bold ${
                                m.status === 'Verified'
                                  ? 'bg-amber-900/40 text-amber-300 hover:bg-amber-900'
                                  : 'bg-emerald-900/40 text-emerald-300 hover:bg-emerald-900'
                              }`}
                            >
                              {m.status === 'Verified' ? 'Revoke' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleDeleteMember(m.memberId)}
                              title="हटाएं"
                              className="p-1.5 rounded-lg bg-red-950 text-red-400 hover:bg-red-900"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs flex items-center justify-between">
          <span className="text-slate-500">
            IOIS Security Protocol • एडमिन पासवर्ड कभी सार्वजनिक रूप से साझा न करें
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold"
          >
            बंद करें
          </button>
        </div>

      </div>

    </div>
  );
};
