import { MemberProfile } from '../types';
import { secretPlanPasswords } from '../data/studyWorkData';

const USERS_STORAGE_KEY = 'iois_registered_members_v3';
const CURRENT_USER_KEY = 'iois_current_active_session_v3';
const UNLOCKED_PLANS_KEY = 'iois_unlocked_study_plans_v3';

// No fake seeded members - genuine registrations only
const initialMembers: MemberProfile[] = [];

export const getStoredMembers = (): MemberProfile[] => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

export const saveMembers = (members: MemberProfile[]) => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(members));
  } catch (e) {
    console.error('Failed to save members to localStorage:', e);
  }
};

export const generateUniqueUserId = (fullName: string, planPrice: number, allMembers: MemberProfile[]): string => {
  // Extract initials: e.g. "Rahul Kumar" -> "RK", "Amit" -> "AM"
  const cleanName = fullName.trim().toUpperCase().replace(/[^A-Z\s]/g, '');
  const parts = cleanName.split(/\s+/).filter(Boolean);
  let initials = 'IO';
  if (parts.length >= 2) {
    initials = (parts[0][0] || 'X') + (parts[1][0] || 'Y');
  } else if (parts.length === 1 && parts[0].length >= 2) {
    initials = parts[0].substring(0, 2);
  } else if (parts.length === 1) {
    initials = parts[0] + 'X';
  }

  // Count existing users with this plan price
  const prefix = `IOIS${planPrice}${initials}`;
  const existingCount = allMembers.filter(m => m.memberId.startsWith(`IOIS${planPrice}`)).length + 1;
  const sequenceStr = existingCount < 10 ? `0${existingCount}` : `${existingCount}`;

  let candidateId = `${prefix}${sequenceStr}`;
  // Ensure absolute uniqueness
  let counter = existingCount;
  while (allMembers.some(m => m.memberId === candidateId)) {
    counter++;
    const nextSeq = counter < 10 ? `0${counter}` : `${counter}`;
    candidateId = `${prefix}${nextSeq}`;
  }

  return candidateId;
};

export const registerNewMember = (
  data: Omit<MemberProfile, 'memberId' | 'joinedDate' | 'status'> & { planPrice: number }
): { success: boolean; member?: MemberProfile; message: string } => {
  const members = getStoredMembers();

  // Check duplicate phone
  const cleanPhone = data.phone.trim().replace(/\D/g, '').slice(-10);
  if (members.some(m => m.phone.replace(/\D/g, '').slice(-10) === cleanPhone)) {
    return {
      success: false,
      message: 'यह मोबाइल नंबर पहले से पंजीकृत है! कृपया अपने मौजूदा नंबर से लॉगिन करें।'
    };
  }

  // Check duplicate email if provided
  if (data.email && data.email.trim()) {
    const cleanEmail = data.email.trim().toLowerCase();
    if (members.some(m => m.email && m.email.trim().toLowerCase() === cleanEmail)) {
      return {
        success: false,
        message: 'यह ईमेल आईडी पहले से पंजीकृत है! कृपया लॉगिन करें।'
      };
    }
  }

  const newId = generateUniqueUserId(data.name, data.planPrice, members);
  const now = new Date();
  const joinedDate = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

  const newMember: MemberProfile = {
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || '',
    city: data.city.trim(),
    state: data.state.trim(),
    memberId: newId,
    planId: data.planId,
    joinedDate: joinedDate,
    status: 'Verified',
    avatarUrl: data.avatarUrl || '',
    sponsorId: data.sponsorId?.trim() || '',
    payoutUpi: data.payoutUpi?.trim() || '',
    utrNumber: data.utrNumber?.trim() || '',
    screenshotUrl: data.screenshotUrl || '',
    password: data.password || '',
    designation: data.designation || 'Student Member'
  };

  const updatedMembers = [newMember, ...members];
  saveMembers(updatedMembers);
  setCurrentSessionUser(newMember);

  // Auto unlock this plan for user
  unlockPlanAccess(newMember.planId);

  return {
    success: true,
    member: newMember,
    message: 'रजिस्ट्रेशन सफलतापूर्वक पूर्ण हुआ! आपका खाता सक्रिय कर दिया गया है।'
  };
};

export const authenticateMember = (
  identifier: string,
  pass: string
): { success: boolean; member?: MemberProfile; message: string } => {
  const members = getStoredMembers();
  const cleanId = identifier.trim().toLowerCase();
  const cleanPhone = identifier.replace(/\D/g, '').slice(-10);

  const matched = members.find(m => {
    const matchId = m.memberId.toLowerCase() === cleanId;
    const matchPhone = cleanPhone.length === 10 && m.phone.replace(/\D/g, '').slice(-10) === cleanPhone;
    const matchEmail = m.email && m.email.toLowerCase() === cleanId;
    return matchId || matchPhone || matchEmail;
  });

  if (!matched) {
    return {
      success: false,
      message: 'खाता नहीं मिला! कृपया सही User ID, मोबाइल नंबर या ईमेल दर्ज करें।'
    };
  }

  if (matched.password && matched.password !== pass) {
    return {
      success: false,
      message: 'गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।'
    };
  }

  setCurrentSessionUser(matched);
  unlockPlanAccess(matched.planId);
  if (matched.planId === 'plan-07') {
    // Supreme master unlocks all 7 plans
    ['plan-01', 'plan-02', 'plan-03', 'plan-04', 'plan-05', 'plan-06', 'plan-07'].forEach(unlockPlanAccess);
  }

  return {
    success: true,
    member: matched,
    message: 'सफलतापूर्वक लॉगिन हो गया!'
  };
};

export const getCurrentSessionUser = (): MemberProfile | null => {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setCurrentSessionUser = (member: MemberProfile | null) => {
  try {
    if (!member) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(member));
    }
  } catch (e) {
    console.error('Failed to set current user:', e);
  }
};

export const updateMemberProfile = (
  updatedData: Partial<MemberProfile> & { memberId: string }
): { success: boolean; member?: MemberProfile; message: string } => {
  const members = getStoredMembers();
  const idx = members.findIndex(m => m.memberId === updatedData.memberId);
  if (idx === -1) {
    return { success: false, message: 'सदस्य रिकॉर्ड नहीं मिला।' };
  }

  // Prevent modifying the unique memberId
  const current = members[idx];
  const updated: MemberProfile = {
    ...current,
    ...updatedData,
    memberId: current.memberId // Immutable
  };

  members[idx] = updated;
  saveMembers(members);

  const activeUser = getCurrentSessionUser();
  if (activeUser && activeUser.memberId === updated.memberId) {
    setCurrentSessionUser(updated);
  }

  return {
    success: true,
    member: updated,
    message: 'प्रोफाइल विवरण सफलतापूर्वक अपडेट हो गया!'
  };
};

// Plan Password Access verification
export const verifyAndUnlockPlanWithPassword = (
  planId: string,
  enteredPassword: string
): { success: boolean; message: string } => {
  const expectedPassword = secretPlanPasswords[planId];
  if (!expectedPassword) {
    return { success: false, message: 'अमान्य प्लान चयन।' };
  }

  if (enteredPassword.trim() === expectedPassword.trim()) {
    unlockPlanAccess(planId);
    return { success: true, message: 'सत्यापन सफल! यह प्लान अनलॉक्ड हो गया है।' };
  }

  return { success: false, message: 'गलत पासवर्ड! कृपया अधिकृत पासवर्ड दर्ज करें।' };
};

export const getUnlockedPlans = (): string[] => {
  try {
    const raw = localStorage.getItem(UNLOCKED_PLANS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const unlockPlanAccess = (planId: string) => {
  try {
    const current = getUnlockedPlans();
    if (!current.includes(planId)) {
      const updated = [...current, planId];
      localStorage.setItem(UNLOCKED_PLANS_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Failed to unlock plan:', e);
  }
};

export const isPlanUnlockedForUser = (planId: string, user: MemberProfile | null): boolean => {
  if (user) {
    // Plan 07 unlocks all plans
    if (user.planId === 'plan-07') return true;
    // Same plan
    if (user.planId === planId) return true;
  }
  // Check local unlocked cache
  const unlocked = getUnlockedPlans();
  return unlocked.includes(planId);
};
