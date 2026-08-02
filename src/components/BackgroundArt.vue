<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#81d4fa] via-[#b2ebf2] to-[#e0f7fa]">
    <!-- Floating Pixel Clouds -->
    <div class="absolute top-6 left-10 opacity-80 animate-pulse">
      <svg width="120" height="48" viewBox="0 0 120 48" fill="none">
        <rect x="20" y="24" width="80" height="16" fill="white" />
        <rect x="36" y="12" width="48" height="28" fill="white" />
        <rect x="12" y="32" width="96" height="8" fill="white" opacity="0.9" />
      </svg>
    </div>
    <div class="absolute top-16 right-1/3 opacity-70">
      <svg width="160" height="56" viewBox="0 0 160 56" fill="none">
        <rect x="24" y="24" width="112" height="24" fill="white" />
        <rect x="48" y="8" width="64" height="40" fill="white" />
        <rect x="16" y="32" width="128" height="16" fill="white" opacity="0.95" />
      </svg>
    </div>

    <!-- Cherry Blossom Branches (Top Right) -->
    <div class="absolute top-0 right-0 w-80 md:w-96 h-80 z-0 opacity-90">
      <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <!-- Branch -->
        <path d="M300 0 C240 40 200 100 160 80 C130 65 100 90 80 120" stroke="#5d4037" stroke-width="8" stroke-linecap="round" />
        <path d="M220 50 C180 80 150 70 120 110" stroke="#5d4037" stroke-width="5" stroke-linecap="round" />
        <path d="M170 85 C140 120 110 130 90 150" stroke="#5d4037" stroke-width="4" stroke-linecap="round" />

        <!-- Petal Clusters -->
        <circle cx="160" cy="80" r="18" fill="#f8bbd0" />
        <circle cx="150" cy="75" r="14" fill="#f48fb1" />
        <circle cx="170" cy="85" r="12" fill="#ff4081" opacity="0.8" />

        <circle cx="120" cy="110" r="22" fill="#f8bbd0" />
        <circle cx="110" cy="105" r="16" fill="#f48fb1" />

        <circle cx="220" cy="50" r="25" fill="#f8bbd0" />
        <circle cx="210" cy="45" r="18" fill="#f48fb1" />

        <circle cx="80" cy="120" r="16" fill="#f8bbd0" />
        <circle cx="90" cy="150" r="20" fill="#f48fb1" />

        <!-- Falling Petals -->
        <ellipse cx="140" cy="160" rx="4" ry="7" fill="#f48fb1" transform="rotate(25 140 160)" class="animate-bounce" />
        <ellipse cx="100" cy="200" rx="5" ry="8" fill="#f8bbd0" transform="rotate(-15 100 200)" />
        <ellipse cx="60" cy="240" rx="4" ry="6" fill="#f48fb1" transform="rotate(40 60 240)" />
      </svg>
    </div>

    <!-- Green Hills & Pixel Grass (Bottom) -->
    <div class="absolute bottom-0 left-0 right-0 h-24 md:h-32 pointer-events-none">
      <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
        <path d="M0 120 L0 60 Q 200 20 400 50 Q 600 80 800 30 Q 1000 70 1200 40 L1200 120 Z" fill="#7cb342" />
        <path d="M0 120 L0 80 Q 300 40 600 70 Q 900 30 1200 60 L1200 120 Z" fill="#558b2f" opacity="0.8" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
