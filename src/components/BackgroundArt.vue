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

    <!-- Floating Cute Daifuku (5 Clouds-like Pieces) -->
    <div class="absolute inset-0 z-5 pointer-events-none">
      <!-- Daifuku 1: Strawberry Daifuku (Top Left-Center) -->
      <div class="absolute top-12 left-[25%] w-20 h-16 md:w-24 md:h-20 daifuku-float-1 opacity-90">
        <svg viewBox="0 0 120 100" class="w-full h-full drop-shadow-md">
          <!-- Main Mochi Shape -->
          <path d="M 20 60 C 15 30, 40 15, 60 15 C 80 15, 105 30, 100 60 C 95 85, 25 85, 20 60 Z" fill="#ffffff" stroke="#f8bbd0" stroke-width="3" />
          <!-- Strawberry Top Accent -->
          <path d="M 50 18 Q 60 8 70 18 C 65 30 55 30 50 18 Z" fill="#ff5252" />
          <path d="M 56 12 L 60 6 L 64 12" stroke="#4caf50" stroke-width="3" stroke-linecap="round" fill="none" />
          <!-- Cute Face -->
          <ellipse cx="45" cy="50" rx="3" ry="4" fill="#3e2723" />
          <ellipse cx="75" cy="50" rx="3" ry="4" fill="#3e2723" />
          <circle cx="38" cy="55" r="4" fill="#ff80ab" opacity="0.6" />
          <circle cx="82" cy="55" r="4" fill="#ff80ab" opacity="0.6" />
          <path d="M 56 56 Q 60 60 64 56" stroke="#3e2723" stroke-width="2" fill="none" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Daifuku 2: Matcha Green Tea Daifuku (Top Center-Right) -->
      <div class="absolute top-24 left-[55%] w-18 h-14 md:w-22 md:h-18 daifuku-float-2 opacity-85">
        <svg viewBox="0 0 120 100" class="w-full h-full drop-shadow-md">
          <!-- Soft Green Body -->
          <path d="M 20 60 C 15 30, 40 15, 60 15 C 80 15, 105 30, 100 60 C 95 85, 25 85, 20 60 Z" fill="#c8e6c9" stroke="#81c784" stroke-width="3" />
          <!-- Leaf Top -->
          <path d="M 60 12 C 50 2 70 2 60 12" stroke="#388e3c" stroke-width="4" stroke-linecap="round" fill="none" />
          <!-- Cute Winking Face -->
          <path d="M 40 48 Q 45 42 50 48" stroke="#2e7d32" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <ellipse cx="72" cy="48" rx="3" ry="4" fill="#2e7d32" />
          <circle cx="35" cy="53" r="4" fill="#a5d6a7" />
          <circle cx="78" cy="53" r="4" fill="#a5d6a7" />
          <path d="M 58 54 Q 60 58 62 54" stroke="#2e7d32" stroke-width="2" fill="none" stroke-linecap="round" />
        </svg>
      </div>

      <!-- Daifuku 3: Anko Red Bean Daifuku (Top Right) -->
      <div class="absolute top-8 right-[12%] w-16 h-14 md:w-20 md:h-16 daifuku-float-3 opacity-90">
        <svg viewBox="0 0 120 100" class="w-full h-full drop-shadow-md">
          <!-- White Body with Powder Sheen -->
          <path d="M 20 60 C 15 30, 40 15, 60 15 C 80 15, 105 30, 100 60 C 95 85, 25 85, 20 60 Z" fill="#f5f5f5" stroke="#e0e0e0" stroke-width="3" />
          <!-- Little Bean Accent -->
          <ellipse cx="60" cy="18" rx="6" ry="4" fill="#4e342e" transform="rotate(-15 60 18)" />
          <!-- Sleeping Cute Face -->
          <path d="M 40 50 Q 45 54 50 50" stroke="#4e342e" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <path d="M 70 50 Q 75 54 80 50" stroke="#4e342e" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <circle cx="35" cy="55" r="3.5" fill="#ff80ab" opacity="0.5" />
          <circle cx="85" cy="55" r="3.5" fill="#ff80ab" opacity="0.5" />
        </svg>
      </div>

      <!-- Daifuku 4: Chocolate Daifuku (Mid Left) -->
      <div class="absolute top-36 left-[8%] w-18 h-14 md:w-22 md:h-18 daifuku-float-4 opacity-85">
        <svg viewBox="0 0 120 100" class="w-full h-full drop-shadow-md">
          <!-- Brown Body -->
          <path d="M 20 60 C 15 30, 40 15, 60 15 C 80 15, 105 30, 100 60 C 95 85, 25 85, 20 60 Z" fill="#d7ccc8" stroke="#a1887f" stroke-width="3" />
          <!-- Cocoa Powder Dots -->
          <circle cx="45" cy="25" r="2" fill="#5d4037" opacity="0.6" />
          <circle cx="60" cy="20" r="2.5" fill="#5d4037" opacity="0.6" />
          <circle cx="72" cy="26" r="2" fill="#5d4037" opacity="0.6" />
          <!-- Happy Surprised Face -->
          <circle cx="45" cy="48" r="3.5" fill="#3e2723" />
          <circle cx="75" cy="48" r="3.5" fill="#3e2723" />
          <ellipse cx="60" cy="55" rx="3" ry="4" fill="#3e2723" />
        </svg>
      </div>

      <!-- Daifuku 5: Sakura Pink Daifuku (Mid Right) -->
      <div class="absolute top-40 right-[28%] w-18 h-14 md:w-22 md:h-18 daifuku-float-5 opacity-90">
        <svg viewBox="0 0 120 100" class="w-full h-full drop-shadow-md">
          <!-- Pink Mochi Body -->
          <path d="M 20 60 C 15 30, 40 15, 60 15 C 80 15, 105 30, 100 60 C 95 85, 25 85, 20 60 Z" fill="#f8bbd0" stroke="#f48fb1" stroke-width="3" />
          <!-- Sakura Petal on Top -->
          <path d="M 60 10 C 55 18, 65 25, 60 30 C 55 25, 65 18, 60 10 Z" fill="#ff4081" opacity="0.8" />
          <!-- Smile Face -->
          <circle cx="42" cy="50" r="3" fill="#880e4f" />
          <circle cx="78" cy="50" r="3" fill="#880e4f" />
          <circle cx="35" cy="54" r="4" fill="#ff80ab" />
          <circle cx="85" cy="54" r="4" fill="#ff80ab" />
          <path d="M 55 54 Q 60 60 65 54" stroke="#880e4f" stroke-width="2" fill="none" stroke-linecap="round" />
        </svg>
      </div>
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

    <!-- 8 Jumping Cats Layer -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <!-- Cat 1: Orange Tabby Cat (Left Low) -->
      <div class="absolute bottom-[8%] left-[5%] w-16 h-16 md:w-20 md:h-20 cat-jump-1">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Ears -->
          <polygon points="20,35 35,10 45,35" fill="#ff9800" />
          <polygon points="25,32 35,15 42,32" fill="#ffb74d" />
          <polygon points="80,35 65,10 55,35" fill="#ff9800" />
          <polygon points="75,32 65,15 58,32" fill="#ffb74d" />
          <!-- Body & Head -->
          <ellipse cx="50" cy="65" rx="30" ry="25" fill="#ff9800" />
          <circle cx="50" cy="45" r="25" fill="#ffb74d" />
          <!-- Stripes -->
          <path d="M45,22 L50,28 L55,22" stroke="#e65100" stroke-width="3" stroke-linecap="round" fill="none" />
          <!-- Face -->
          <circle cx="40" cy="42" r="3.5" fill="#212121" />
          <circle cx="60" cy="42" r="3.5" fill="#212121" />
          <ellipse cx="50" cy="48" rx="2" ry="1.5" fill="#e91e63" />
          <!-- Paws -->
          <ellipse cx="35" cy="82" rx="7" ry="5" fill="#fff" />
          <ellipse cx="65" cy="82" rx="7" ry="5" fill="#fff" />
        </svg>
      </div>

      <!-- Cat 2: Calico Kitten (Left-Center Mid) -->
      <div class="absolute bottom-[18%] left-[18%] w-14 h-14 md:w-16 md:h-16 cat-jump-2">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Ears -->
          <polygon points="25,30 35,10 50,30" fill="#3e2723" />
          <polygon points="75,30 65,10 50,30" fill="#ff9800" />
          <!-- Head & Calico Spots -->
          <circle cx="50" cy="45" r="24" fill="#ffffff" />
          <path d="M30,30 Q40,25 45,40 Q30,50 26,40 Z" fill="#3e2723" />
          <path d="M70,30 Q60,25 55,40 Q70,50 74,40 Z" fill="#ff9800" />
          <!-- Body -->
          <ellipse cx="50" cy="68" rx="22" ry="20" fill="#ffffff" />
          <ellipse cx="40" cy="65" rx="10" ry="12" fill="#ff9800" />
          <!-- Face -->
          <ellipse cx="38" cy="44" rx="3" ry="4" fill="#2e7d32" />
          <ellipse cx="62" cy="44" rx="3" ry="4" fill="#2e7d32" />
          <polygon points="48,50 52,50 50,52" fill="#ff80ab" />
        </svg>
      </div>

      <!-- Cat 3: Black Cat with Yellow Eyes (Center Low) -->
      <div class="absolute bottom-[10%] left-[32%] w-14 h-14 md:w-18 md:h-18 cat-jump-3">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Ears -->
          <polygon points="20,30 30,5 45,28" fill="#212121" />
          <polygon points="80,30 70,5 55,28" fill="#212121" />
          <polygon points="25,28 30,10 40,26" fill="#424242" />
          <polygon points="75,28 70,10 60,26" fill="#424242" />
          <!-- Head & Body -->
          <ellipse cx="50" cy="65" rx="25" ry="22" fill="#212121" />
          <circle cx="50" cy="42" r="23" fill="#212121" />
          <!-- Big Yellow Eyes -->
          <circle cx="38" cy="40" r="6" fill="#ffeb3b" />
          <circle cx="62" cy="40" r="6" fill="#ffeb3b" />
          <ellipse cx="38" cy="40" rx="1.5" ry="4" fill="#000" />
          <ellipse cx="62" cy="40" rx="1.5" ry="4" fill="#000" />
          <!-- Whiskers -->
          <line x1="15" y1="44" x2="30" y2="45" stroke="#fff" stroke-width="1.5" opacity="0.6" />
          <line x1="85" y1="44" x2="70" y2="45" stroke="#fff" stroke-width="1.5" opacity="0.6" />
        </svg>
      </div>

      <!-- Cat 4: Fluffy White Kitten (Center High) -->
      <div class="absolute bottom-[22%] left-[48%] w-16 h-16 md:w-20 md:h-20 cat-jump-4">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Ears -->
          <polygon points="20,35 32,8 46,32" fill="#eceff1" />
          <polygon points="25,32 32,14 42,30" fill="#f8bbd0" />
          <polygon points="80,35 68,8 54,32" fill="#eceff1" />
          <polygon points="75,32 68,14 58,30" fill="#f8bbd0" />
          <!-- Body & Head -->
          <circle cx="50" cy="66" r="24" fill="#ffffff" />
          <circle cx="50" cy="42" r="24" fill="#ffffff" />
          <!-- Cheeks / Blush -->
          <circle cx="32" cy="48" r="5" fill="#ff80ab" opacity="0.4" />
          <circle cx="68" cy="48" r="5" fill="#ff80ab" opacity="0.4" />
          <!-- Eyes & Mouth -->
          <path d="M35,40 Q40,36 43,41" stroke="#37474f" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <path d="M65,40 Q60,36 57,41" stroke="#37474f" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <path d="M47,48 Q50,52 53,48" stroke="#37474f" stroke-width="2" fill="none" />
        </svg>
      </div>

      <!-- Cat 5: Grey Striped Tabby (Right-Center Low) -->
      <div class="absolute bottom-[12%] right-[32%] w-14 h-14 md:w-18 md:h-18 cat-jump-5">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Ears -->
          <polygon points="22,32 32,10 45,30" fill="#78909c" />
          <polygon points="78,32 68,10 55,30" fill="#78909c" />
          <!-- Head & Body -->
          <ellipse cx="50" cy="65" rx="26" ry="22" fill="#90a4ae" />
          <circle cx="50" cy="43" r="23" fill="#90a4ae" />
          <!-- Tabby Stripes -->
          <path d="M50,22 L50,28 M42,24 L45,29 M58,24 L55,29" stroke="#37474f" stroke-width="2.5" stroke-linecap="round" />
          <!-- Eyes & Nose -->
          <circle cx="38" cy="42" r="3.5" fill="#00e676" />
          <circle cx="62" cy="42" r="3.5" fill="#00e676" />
          <polygon points="48,47 52,47 50,50" fill="#37474f" />
        </svg>
      </div>

      <!-- Cat 6: Odd-Eyed White Cat (Right Mid) -->
      <div class="absolute bottom-[20%] right-[18%] w-14 h-14 md:w-16 md:h-16 cat-jump-6">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Ears -->
          <polygon points="20,30 30,8 45,28" fill="#fff" />
          <polygon points="25,28 30,14 40,26" fill="#ffcdd2" />
          <polygon points="80,30 70,8 55,28" fill="#fff" />
          <polygon points="75,28 70,14 60,26" fill="#ffcdd2" />
          <!-- Head & Body -->
          <ellipse cx="50" cy="64" rx="23" ry="20" fill="#fff" />
          <circle cx="50" cy="42" r="22" fill="#fff" />
          <!-- Odd Eyes (Blue & Yellow) -->
          <circle cx="38" cy="41" r="4" fill="#29b6f6" />
          <circle cx="62" cy="41" r="4" fill="#ffee58" />
          <circle cx="39" cy="40" r="1.5" fill="#fff" />
          <circle cx="63" cy="40" r="1.5" fill="#fff" />
          <path d="M46,47 Q50,51 54,47" stroke="#e91e63" stroke-width="1.5" fill="none" />
        </svg>
      </div>

      <!-- Cat 7: Pink Fantasy Kitten (Far Right Low) -->
      <div class="absolute bottom-[8%] right-[5%] w-16 h-16 md:w-20 md:h-20 cat-jump-7">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Ears -->
          <polygon points="20,32 32,8 45,30" fill="#f48fb1" />
          <polygon points="80,32 68,8 55,30" fill="#f48fb1" />
          <!-- Head & Body -->
          <ellipse cx="50" cy="65" rx="25" ry="22" fill="#f8bbd0" />
          <circle cx="50" cy="43" r="23" fill="#f8bbd0" />
          <!-- Sleeping Winking Eyes -->
          <path d="M33,42 Q38,46 43,42" stroke="#880e4f" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <path d="M57,42 Q62,46 67,42" stroke="#880e4f" stroke-width="2.5" fill="none" stroke-linecap="round" />
          <circle cx="50" cy="47" r="2.5" fill="#ad1457" />
        </svg>
      </div>

      <!-- Cat 8: Pixel Style Cat (Center Foreground) -->
      <div class="absolute bottom-[6%] left-[42%] w-14 h-14 md:w-16 md:h-16 cat-jump-8">
        <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-md">
          <!-- Pixel Style Grid (3d271d & ffa726) -->
          <rect x="20" y="10" width="15" height="25" fill="#e65100" />
          <rect x="65" y="10" width="15" height="25" fill="#e65100" />
          <rect x="15" y="30" width="70" height="40" fill="#ffa726" />
          <rect x="25" y="40" width="10" height="10" fill="#000" />
          <rect x="65" y="40" width="10" height="10" fill="#000" />
          <rect x="45" y="50" width="10" height="8" fill="#e91e63" />
          <rect x="20" y="70" width="60" height="20" fill="#fb8c00" />
        </svg>
      </div>
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

<style scoped>
/* Animation สำหรับแมวกระโดด */
@keyframes catJump {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
  }
  50% {
    transform: translateY(-45px) scale(1.08) rotate(6deg);
  }
}

.cat-jump-1 { animation: catJump 2.2s infinite ease-in-out 0.0s; }
.cat-jump-2 { animation: catJump 1.8s infinite ease-in-out 0.3s; }
.cat-jump-3 { animation: catJump 2.5s infinite ease-in-out 0.7s; }
.cat-jump-4 { animation: catJump 2.0s infinite ease-in-out 0.2s; }
.cat-jump-5 { animation: catJump 2.3s infinite ease-in-out 0.9s; }
.cat-jump-6 { animation: catJump 1.9s infinite ease-in-out 0.4s; }
.cat-jump-7 { animation: catJump 2.6s infinite ease-in-out 0.1s; }
.cat-jump-8 { animation: catJump 2.1s infinite ease-in-out 0.6s; }

/* Animation สำหรับไดฟุกุลอยคล้ายเมฆ */
@keyframes daifukuFloat {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(-3deg);
  }
  50% {
    transform: translateY(-18px) translateX(10px) rotate(4deg);
  }
}

.daifuku-float-1 { animation: daifukuFloat 4.2s infinite ease-in-out 0.0s; }
.daifuku-float-2 { animation: daifukuFloat 5.0s infinite ease-in-out 0.8s; }
.daifuku-float-3 { animation: daifukuFloat 3.8s infinite ease-in-out 1.5s; }
.daifuku-float-4 { animation: daifukuFloat 4.6s infinite ease-in-out 0.4s; }
.daifuku-float-5 { animation: daifukuFloat 4.0s infinite ease-in-out 1.0s; }
</style>