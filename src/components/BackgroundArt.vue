<template>
  <div class="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#fce7f3]">

    <!-- Minimal Cute Sun -->
    <div class="absolute top-6 left-10 md:left-16 sun-traverse">
      <div class="relative w-16 h-16 md:w-20 md:h-20">
        <svg viewBox="0 0 100 100" class="w-full h-full filter drop-shadow-sm">
          <!-- Sun Rays (Soft Dash Ring) -->
          <circle cx="50" cy="50" r="42" stroke="#fde047" stroke-width="3" stroke-dasharray="6 8" fill="none" class="sun-rays-spin origin-center" />
          <!-- Sun Body -->
          <circle cx="50" cy="50" r="30" fill="#fef08a" />
          <!-- Eyes & Cheek -->
          <circle cx="42" cy="48" r="2.5" fill="#713f12" />
          <circle cx="58" cy="48" r="2.5" fill="#713f12" />
          <circle cx="36" cy="53" r="3.5" fill="#fbcfe8" opacity="0.8" />
          <circle cx="64" cy="53" r="3.5" fill="#fbcfe8" opacity="0.8" />
          <!-- Cute Smile -->
          <path d="M 46 54 Q 50 58 54 54" stroke="#713f12" stroke-width="2" stroke-linecap="round" fill="none" />
        </svg>
      </div>
    </div>

    <!-- Minimal Soft Floating Clouds -->
    <div class="absolute top-12 left-[20%] opacity-80 cloud-float-slow hidden md:block">
      <svg width="100" height="40" viewBox="0 0 100 40" fill="#ffffff" class="drop-shadow-sm">
        <path d="M 20 35 A 15 15 0 0 1 30 15 A 20 20 0 0 1 70 15 A 15 15 0 0 1 80 35 Z" />
      </svg>
    </div>

    <div class="absolute top-8 right-[25%] opacity-90 cloud-float-fast">
      <svg width="120" height="48" viewBox="0 0 120 48" fill="#ffffff" class="drop-shadow-sm">
        <path d="M 20 40 A 18 18 0 0 1 35 18 A 22 22 0 0 1 85 18 A 18 18 0 0 1 100 40 Z" />
      </svg>
    </div>

    <!-- Minimal Floating Strawberry Daifuku -->
    <div class="absolute top-28 right-[10%] w-16 h-14 daifuku-float hidden md:block opacity-90">
      <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
        <path d="M 15 50 C 10 25, 35 15, 50 15 C 65 15, 90 25, 85 50 C 80 70, 20 70, 15 50 Z" fill="#ffffff" />
        <!-- Cute Face -->
        <circle cx="40" cy="45" r="2" fill="#475569" />
        <circle cx="60" cy="45" r="2" fill="#475569" />
        <circle cx="34" cy="49" r="3" fill="#fbcfe8" />
        <circle cx="66" cy="49" r="3" fill="#fbcfe8" />
        <path d="M 47 48 Q 50 51 53 48" stroke="#475569" stroke-width="1.5" stroke-linecap="round" fill="none" />
        <!-- Small Strawberry Top -->
        <circle cx="50" cy="18" r="4" fill="#f43f5e" />
      </svg>
    </div>

    <!-- Minimal Cute Cats (Reduced to 2 subtle accent cats to avoid clutter) -->
    <!-- Cat 1: Left Bottom Floating/Peeking -->
    <div class="absolute bottom-[10%] left-[8%] w-14 h-14 cat-bounce-1 hidden md:block">
      <svg viewBox="0 0 80 80" class="w-full h-full drop-shadow-sm">
        <polygon points="18,30 28,12 38,28" fill="#fed7aa" />
        <polygon points="62,30 52,12 42,28" fill="#fed7aa" />
        <circle cx="40" cy="42" r="22" fill="#ffedd5" />
        <circle cx="32" cy="40" r="2" fill="#7c2d12" />
        <circle cx="48" cy="40" r="2" fill="#7c2d12" />
        <circle cx="26" cy="44" r="3" fill="#fca5a5" opacity="0.6" />
        <circle cx="54" cy="44" r="3" fill="#fca5a5" opacity="0.6" />
        <path d="M 38 45 Q 40 48 42 45" stroke="#7c2d12" stroke-width="1.5" stroke-linecap="round" fill="none" />
      </svg>
    </div>

    <!-- Cat 2: Right Bottom Sleeping Cat -->
    <div class="absolute bottom-[12%] right-[12%] w-14 h-12 cat-bounce-2 hidden md:block">
      <svg viewBox="0 0 80 70" class="w-full h-full drop-shadow-sm">
        <polygon points="20,25 28,10 36,24" fill="#e2e8f0" />
        <polygon points="60,25 52,10 44,24" fill="#e2e8f0" />
        <ellipse cx="40" cy="38" rx="22" ry="18" fill="#f8fafc" />
        <!-- Sleeping Eyes -->
        <path d="M 30 38 Q 33 42 36 38" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" fill="none" />
        <path d="M 44 38 Q 47 42 50 38" stroke="#64748b" stroke-width="1.5" stroke-linecap="round" fill="none" />
        <circle cx="25" cy="41" r="2.5" fill="#fbcfe8" />
        <circle cx="55" cy="41" r="2.5" fill="#fbcfe8" />
      </svg>
    </div>

    <!-- Soft Curved Minimal Hills (Bottom) -->
    <div class="absolute bottom-0 left-0 right-0 h-20 md:h-28 pointer-events-none opacity-80">
      <svg class="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
        <path d="M0 120 L0 50 Q 300 20 600 60 Q 900 100 1200 40 L1200 120 Z" fill="#bbf7d0" />
        <path d="M0 120 L0 70 Q 400 40 800 80 Q 1000 60 1200 75 L1200 120 Z" fill="#86efac" opacity="0.6" />
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes sunTraverse {
  0% { left: -5%; }
  100% { left: 105%; }
}

@keyframes sunRaysSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes floatSoft {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes bounceSoft {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-6px) scale(1.02); }
}

.sun-traverse {
  animation: sunTraverse 240s linear infinite;
}

.sun-rays-spin {
  animation: sunRaysSpin 20s linear infinite;
}

.cloud-float-slow {
  animation: floatSoft 6s ease-in-out infinite;
}

.cloud-float-fast {
  animation: floatSoft 4s ease-in-out infinite 1s;
}

.daifuku-float {
  animation: floatSoft 5s ease-in-out infinite 0.5s;
}

.cat-bounce-1 {
  animation: bounceSoft 3s ease-in-out infinite;
}

.cat-bounce-2 {
  animation: bounceSoft 3.5s ease-in-out infinite 0.5s;
}
</style>