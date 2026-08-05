"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Cpu, Terminal, Sparkles, Check, Copy, Move, Camera, RotateCcw, Zap } from "lucide-react";

interface LanyardCardProps {
  user?: string;
  role?: string;
  idCode?: string;
  school?: string;
  status?: string;
  photoUrl?: string;
}

export default function LanyardCard({
  user = "Mohammad Kevin",
  role = "Backend & Fullstack Dev",
  idCode = "DEV-9457-MK",
  school = "SMK Telkom Malang",
  status = "ONLINE",
  photoUrl: initialPhotoUrl = "/images/logo.png",
}: LanyardCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(initialPhotoUrl);
  const [imageError, setImageError] = useState(false);

  // Drag State
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const posStartRef = useRef({ x: 0, y: 0 });

  // Handle Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    // Prevent dragging if clicking buttons or file input
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) {
      return;
    }
    
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    posStartRef.current = { ...position };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const newX = posStartRef.current.x + dx;
    const newY = posStartRef.current.y + dy;

    setPosition({ x: newX, y: newY });

    // Dynamic 3D tilt & rotation while dragging (Fluid 3D Physics)
    const tiltZ = Math.max(-25, Math.min(25, newX * 0.14));
    const tiltY = Math.max(-20, Math.min(20, newX * 0.1));
    const tiltX = Math.max(-15, Math.min(15, -newY * 0.08));

    setRotation({ x: tiltX, y: tiltY, z: tiltZ });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if capture was already released
    }

    // Automatically snap back to original position (0, 0) with elastic spring bounce
    setPosition({ x: 0, y: 0 });
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setRotation({ x: 0, y: 0, z: 0 });
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(idCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Image Upload Handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentPhoto(url);
      setImageError(false);
    }
  };

  // Anchor Coordinates for SVG Strap
  const anchorX = 170; // Center X of container
  const anchorY = 10;  // Top hook point
  const cardHookX = anchorX + position.x;
  const cardHookY = 90 + position.y;

  // Glare Angle Calculation based on Drag Position
  const glareX = 50 + position.x * 0.15;
  const glareY = 50 + position.y * 0.15;

  return (
    <div className="relative flex flex-col items-center justify-center pt-4 pb-12 select-none touch-none w-full max-w-md mx-auto perspective-1000">
      
      {/* DYNAMIC SVG LANYARD STRAP */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none z-10 overflow-visible"
        style={{ width: "340px" }}
      >
        <defs>
          <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="30%" stopColor="#451a03" />
            <stop offset="70%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="strapBorder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </linearGradient>

          <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="3" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Outer Fabric Strap Path */}
        <path
          d={`M ${anchorX - 11} ${anchorY} Q ${anchorX - 11 + position.x * 0.45} ${(anchorY + cardHookY) / 2} ${cardHookX - 9} ${cardHookY} L ${cardHookX + 9} ${cardHookY} Q ${anchorX + 11 + position.x * 0.45} ${(anchorY + cardHookY) / 2} ${anchorX + 11} ${anchorY} Z`}
          fill="url(#lanyardGradient)"
          stroke="url(#strapBorder)"
          strokeWidth="1.5"
          filter="url(#shadow)"
          style={{
            transition: isDragging ? "none" : "d 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        {/* Inner Glowing Stitching Line */}
        <path
          d={`M ${anchorX} ${anchorY + 4} Q ${anchorX + position.x * 0.45} ${(anchorY + cardHookY) / 2} ${cardHookX} ${cardHookY - 4}`}
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="5 4"
          strokeOpacity="0.9"
          fill="none"
          style={{
            transition: isDragging ? "none" : "d 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </svg>

      {/* FIXED TOP ANCHOR HOOK (Wall Mount & Metal Clip) */}
      <div className="relative z-20 flex flex-col items-center pointer-events-none mb-2">
        {/* Wall Mount Titanium Bracket */}
        <div className="w-16 h-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 rounded-t-md border-t border-x border-amber-400/40 shadow-lg flex items-center justify-between px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-700" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-700" />
        </div>
        
        {/* Metal Swivel Ring */}
        <div className="w-8 h-8 rounded-full border-2 border-slate-300 bg-gradient-to-br from-slate-200 via-slate-500 to-slate-800 shadow-xl flex items-center justify-center -mt-1">
          <div className="w-4 h-4 rounded-full bg-slate-950 border border-slate-800" />
        </div>
      </div>

      {/* DRAGGABLE CARD BADGE WITH FLUID 3D PHYSICS */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotate(${rotation.z}deg)`,
          transition: isDragging ? "none" : "transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className={`relative z-20 group transform-gpu ${!isDragging && position.x === 0 && position.y === 0 ? "animate-lanyard-sway" : ""}`}
      >
        {/* Drag Hint Pill / Reset Position Button */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1 bg-slate-950/90 backdrop-blur-md border border-amber-400/40 rounded-full text-[10px] text-amber-300 font-mono shadow-[0_4px_20px_rgba(245,158,11,0.15)] z-30 transition-all duration-300 hover:border-amber-400 hover:scale-105">
          <Move className="w-3 h-3 text-amber-400 animate-pulse" />
          <span className="font-bold tracking-wide">Geser Kartu</span>
          {(position.x !== 0 || position.y !== 0) && (
            <button
              onClick={resetPosition}
              className="ml-1 p-0.5 text-amber-400 hover:text-white transition-colors cursor-pointer"
              title="Reset Posisi"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* OUTER ACRYLIC BADGE SLEEVE (Holographic Glass Frame) */}
        <div className="relative w-[315px] sm:w-[345px] rounded-2xl p-3.5 bg-slate-900/60 backdrop-blur-2xl border border-slate-700/80 shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:border-amber-400/70 group-hover:shadow-[0_30px_70px_rgba(245,158,11,0.25)] overflow-hidden">
          
          {/* Iridescent Rainbow Foil Border Highlight */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-cyan-500/20 blur-xs opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Top Metallic Carabiner Hook Clip */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 border border-slate-600 rounded-full flex items-center justify-center z-10 shadow-md">
            <div className="w-9 h-2.5 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
              <div className="w-5 h-1 rounded-full bg-amber-400/90 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
          </div>

          {/* Dynamic Light Glare Glass Reflection Overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-all duration-300 opacity-60 group-hover:opacity-90"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 45%, transparent 70%)`,
            }}
          />

          {/* INNER ID CARD BODY */}
          <div className="relative rounded-xl bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-slate-950 border border-slate-800/90 overflow-hidden text-slate-200 p-5 font-mono shadow-2xl">
            
            {/* Background Cyber Grid & Glowing Aura */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -left-8 -top-8 w-36 h-36 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            {/* ID Card Header */}
            <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-slate-800/90">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[11px] font-black tracking-widest text-white uppercase leading-none">
                      DEV PASS
                    </h4>
                    <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </div>
                  <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
                    {school}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-[9px] text-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{status}</span>
              </div>
            </div>

            {/* Photo & Identity Section */}
            <div className="relative z-10 mt-4 flex flex-col items-center">
              
              {/* Photo Frame with Cyber Glow */}
              <div className="relative group/photo">
                <div className="relative w-30 h-34 sm:w-34 sm:h-38 rounded-xl border-2 border-amber-400/70 p-1 bg-slate-950 shadow-[0_10px_25px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 group-hover/photo:border-amber-400 group-hover/photo:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  
                  {/* Cyber Corner Marks */}
                  <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-400 z-10 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-400 z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-400 z-10 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-400 z-10 pointer-events-none" />

                  {/* Photo Display */}
                  {!imageError ? (
                    <Image
                      src={currentPhoto}
                      alt={user}
                      fill
                      className="object-cover rounded-lg transition-transform duration-500 group-hover/photo:scale-105"
                      onError={() => setImageError(true)}
                      priority
                      unoptimized={currentPhoto.startsWith("blob:")}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 rounded-lg">
                      <Cpu className="w-8 h-8 text-amber-400 mb-1" />
                      <span className="text-[10px] font-bold">DEV PHOTO</span>
                    </div>
                  )}

                  {/* Change Photo Overlay Button */}
                  <label className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white cursor-pointer z-20 rounded-lg backdrop-blur-xs">
                    <Camera className="w-5 h-5 text-amber-400 mb-1" />
                    <span className="text-[9px] font-bold">Ganti Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />
                </div>

                {/* Verified Shield Badge */}
                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-lg border-2 border-slate-900 z-20" title="Verified Developer">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>

              {/* Developer Details */}
              <div className="mt-3.5 text-center">
                <h3 className="text-base font-extrabold text-white tracking-tight flex items-center justify-center gap-1.5">
                  {user}
                </h3>
                <p className="text-[11px] font-bold text-amber-400 mt-0.5 tracking-wide">
                  {role}
                </p>
                
                {/* ID Code Pill with Copy Button */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[10px] text-slate-300 shadow-sm">
                  <span className="text-slate-500 font-mono">ID:</span>
                  <span className="font-bold text-amber-400 font-mono tracking-wider">{idCode}</span>
                  <button
                    onClick={handleCopyId}
                    className="ml-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy ID"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="relative z-10 mt-4 pt-3.5 border-t border-slate-800/90">
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mb-2">
                AUTHORIZED STACK
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px]">
                {["Next.js", "NestJS", "Express", "Prisma", "PostgreSQL"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-800 text-slate-300 font-medium hover:border-amber-400/50 hover:text-amber-400 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)] transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Barcode & Hologram Section */}
            <div className="relative z-10 mt-4 pt-3.5 border-t border-slate-800/90 flex items-center justify-between">
              
              {/* Barcode Graphic */}
              <div className="flex flex-col items-start gap-0.5">
                <div className="h-6 flex items-center gap-[2px] opacity-80">
                  {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 2].map((w, i) => (
                    <div
                      key={i}
                      className="h-full bg-slate-300 rounded-[0.5px]"
                      style={{ width: `${w}px` }}
                    />
                  ))}
                </div>
                <span className="text-[8px] text-slate-400 tracking-widest font-mono">
                  9457-8832-2026
                </span>
              </div>

              {/* Holographic Security Foil Chip */}
              <div className="relative w-10 h-7 rounded bg-gradient-to-tr from-amber-300 via-emerald-300 to-cyan-400 p-[1px] shadow-md overflow-hidden group/holo">
                <div className="w-full h-full bg-slate-900/90 backdrop-blur-xs rounded-[3px] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover/holo:translate-x-full transition-transform duration-1000" />
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
