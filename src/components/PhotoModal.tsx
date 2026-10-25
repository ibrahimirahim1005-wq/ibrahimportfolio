import React from 'react';
import { X, Upload, Camera, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  customPhotoUrl: string | null;
  onUpdatePhoto: (url: string | null) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  customPhotoUrl,
  onUpdatePhoto,
}) => {
  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpdatePhoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-[#1e293b] p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-[#1e293b] hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Close photo modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-[#06b6d4] text-slate-950 font-black flex items-center justify-center text-xs shadow-[0_0_8px_#06b6d4]">
            <Camera className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
            Portrait Photo Manager
          </h3>
        </div>

        <p className="text-xs text-slate-400 font-mono mb-6">
          Portrait preview with clean cyan outline &bull; Mohamed Sathak College
        </p>

        {/* Cutout Portrait Preview with Clean Cyan Outline */}
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-60 bg-gradient-to-b from-[#0b1329] via-[#0f172a] to-[#020617] border-2 border-[#06b6d4] shadow-[0_0_25px_rgba(6,182,212,0.4)] overflow-hidden flex items-end justify-center">
            {customPhotoUrl ? (
              <img
                src={customPhotoUrl}
                alt="Ibrahim S - Cutout Portrait"
                className="w-full h-full object-contain object-bottom p-2"
                style={{
                  filter:
                    'drop-shadow(0 0 14px rgba(6, 182, 212, 0.45)) drop-shadow(0 6px 18px rgba(2, 6, 23, 0.8))',
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 space-y-2 my-auto">
                <div className="w-16 h-16 border-2 border-[#06b6d4] bg-[#0f172a] flex items-center justify-center text-white font-display font-black text-3xl shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                  I
                </div>
                <span className="font-display font-black text-white text-sm uppercase tracking-wider">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] font-mono text-[#facc15] uppercase font-bold">
                  BCA 2024–2027
                </span>
              </div>
            )}

            {/* Corner Notch */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-[#facc15]" />
          </div>

          {/* Student Badges */}
          <div className="mt-4 text-center space-y-1">
            <h4 className="font-display font-black text-base text-white uppercase tracking-wide">
              {PERSONAL_INFO.name}
            </h4>
            <p className="text-xs text-[#22d3ee] font-mono font-bold uppercase">
              BCA 3rd Year &bull; Graduating 2027
            </p>
            <p className="text-xs text-slate-400">{PERSONAL_INFO.college}</p>
          </div>

          {/* Project File Storage Guidance */}
          <div className="mt-4 w-full p-3 bg-[#020617] border border-cyan-500/30 text-left space-y-1 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold uppercase text-[10px]">
              <span className="w-1.5 h-1.5 bg-[#facc15]" />
              <span>Project Asset Path</span>
            </div>
            <p className="text-slate-300">
              Folder: <span className="text-white font-semibold">public/assets/</span>
            </p>
            <p className="text-slate-300">
              Expected file: <span className="text-[#facc15] font-semibold">portrait.png</span>
            </p>
            <p className="text-slate-400 text-[10px] pt-0.5">
              Drop your cutout portrait photo into this location, and the website will automatically
              display it.
            </p>
          </div>

          {/* Upload / Replace Controls */}
          <div className="mt-4 w-full space-y-2.5">
            <label className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#06b6d4] hover:bg-[#22d3ee] text-slate-950 text-xs font-mono font-extrabold uppercase tracking-wider cursor-pointer transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Upload className="w-4 h-4 stroke-[2.5]" />
              <span>Upload Photo In Browser</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {customPhotoUrl && (
              <button
                onClick={() => onUpdatePhoto(PERSONAL_INFO.portraitAsset || null)}
                className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-mono text-slate-400 hover:text-white bg-[#020617] border border-[#1e293b] transition-colors cursor-pointer uppercase tracking-wider hover:border-cyan-400"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Default Project Asset</span>
              </button>
            )}

            <div className="pt-1 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 justify-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Active in live preview &amp; local storage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
