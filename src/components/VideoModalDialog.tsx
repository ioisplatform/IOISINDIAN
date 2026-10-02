import React from 'react';
import { X, Tv } from 'lucide-react';
import { StudentVideoLessonPlayer } from './StudentVideoLessonPlayer';

interface VideoModalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: string;
}

export const VideoModalDialog: React.FC<VideoModalDialogProps> = ({
  isOpen,
  onClose,
  planId = 'plan-01'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col font-sans">
        
        {/* Top Header */}
        <div className="p-4 bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-red-700 flex items-center justify-center shadow font-black">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-red-200 block">
                IOIS Official Video Classroom
              </span>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                IOIS आधिकारिक वीडियो कक्षाएं
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50">
          <StudentVideoLessonPlayer
            planId={planId}
            planNumber={1}
            planName="Bal Vikas Access"
          />
        </div>

      </div>
    </div>
  );
};
