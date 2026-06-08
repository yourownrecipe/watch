'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveWatchViewerProps {
  imageUrl: string;
  productName: string;
}

export default function InteractiveWatchViewer({ imageUrl, productName }: InteractiveWatchViewerProps) {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [activeView, setActiveView] = useState<'front' | 'side' | 'caseback'>('front');

  const views = {
    front: { rotate: 0, label: 'Front' },
    side: { rotate: 90, label: 'Side' },
    caseback: { rotate: 180, label: 'Caseback' },
  };

  const handleViewChange = (view: 'front' | 'side' | 'caseback') => {
    setActiveView(view);
    setRotation(views[view].rotate);
  };

  const handleDrag = (event: any, info: any) => {
    setRotation((prev) => (prev + info.delta.x * 0.8) % 360);
  };

  const resetView = () => {
    setRotation(0);
    setScale(1);
    setActiveView('front');
  };

  return (
    <div className="relative w-full">
      <div className="viewer-container relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex items-center justify-center">
        <motion.div
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          onDrag={handleDrag}
          animate={{ rotate: rotation, scale }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        >
          <img 
            src={imageUrl} 
            alt={productName} 
            className="max-h-[380px] object-contain select-none pointer-events-none" 
            draggable={false}
          />
        </motion.div>

        {/* Overlay Info */}
        <div className="absolute top-4 left-4 bg-black/70 text-xs px-3 py-1.5 rounded-full tracking-[1.5px] border border-[#C9A962]/30">
          DRAG TO ROTATE
        </div>
      </div>

      {/* View Controls */}
      <div className="flex justify-center gap-2 mt-6">
        {(['front', 'side', 'caseback'] as const).map((view) => (
          <button
            key={view}
            onClick={() => handleViewChange(view)}
            className={`px-6 py-2 text-xs tracking-[1.5px] rounded-full border transition ${
              activeView === view 
                ? 'bg-[#C9A962] text-black border-[#C9A962]' 
                : 'border-white/20 hover:bg-white/5'
            }`}
          >
            {views[view].label}
          </button>
        ))}
        
        <button 
          onClick={resetView}
          className="px-5 py-2 text-xs tracking-[1.5px] rounded-full border border-white/20 hover:bg-white/5"
        >
          RESET
        </button>
      </div>

      <p className="text-center text-[10px] text-white/40 mt-3 tracking-widest">
        DRAG HORIZONTALLY • TAP PRESETS FOR DIFFERENT ANGLES
      </p>
    </div>
  );
}
