<template>
  <header class="relative z-10 pt-4 pb-2 px-3 max-w-6xl mx-auto">
    <!-- Top Flex Row -->
    <div class="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
      
      <!-- Left Header Title Block -->
      <div class="flex flex-col items-center lg:items-start text-center lg:text-left">
        <!-- Badge -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ff5252] border-2 border-[#1e293b] rounded-full text-white font-bold text-xs uppercase tracking-wider shadow-[2px_2px_0px_#1e293b] mb-1.5 animate-bounce">
          <span class="w-2 h-2 rounded-full bg-white animate-ping"></span>
          <span>{{ state.config.projectName }}</span>
        </div>

        <!-- Main Hashtag Title -->
        <h1 class="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1e293b] font-['Pixelify_Sans','Press_Start_2P',sans-serif] tracking-tight uppercase leading-none drop-shadow-[2px_2px_0px_#ff80ab]">
          {{ state.config.hashtag }}
        </h1>

        <!-- Subtitle Motto with Pixel Character -->
        <div class="mt-2 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-semibold text-[#1e293b] font-['Chakra_Petch','Prompt',sans-serif]">
          <span class="bg-[#e0f7fa] px-2 py-0.5 border border-[#1e293b] rounded shadow-[1px_1px_0px_#1e293b]">
            {{ state.config.motto }}
          </span>
          <!-- Pixel Mascot Icon -->
          <span class="inline-block px-1.5 py-0.5 bg-amber-300 text-amber-900 border border-[#1e293b] rounded font-mono text-xs">
            🌸 ฅ^•ﻌ•^ฅ
          </span>
        </div>
      </div>

      <!-- Right Bonus Tier Cards Block -->
      <div class="flex flex-col sm:flex-row lg:flex-col gap-2 justify-center items-center lg:items-end font-['Chakra_Petch',sans-serif]">
        
        <!-- Active Bonus Tier Card -->
        <div class="w-full sm:w-auto min-w-[240px] bg-gradient-to-r from-pink-400 to-rose-400 border-2 border-[#1e293b] rounded-xl p-2 shadow-[3px_3px_0px_#1e293b] text-center text-white relative overflow-hidden group">
          <div class="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-pink-100 font-['Press_Start_2P']">
            {{ state.config.activeBonusTierText.split(' ')[0] }} {{ state.config.activeBonusTierText.split(' ')[1] }}
          </div>
          <div class="text-xs sm:text-sm font-extrabold uppercase mt-0.5 text-yellow-200 drop-shadow-[1px_1px_0px_#1e293b]">
            {{ state.config.activeBonusTierText.replace(/\[NOW\]\s*/i, '') }}
          </div>
          <div class="absolute -right-2 -bottom-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <Sparkles class="w-10 h-10 text-white" />
          </div>
        </div>

        <!-- Next Bonus Tier Card -->
        <div class="w-full sm:w-auto min-w-[240px] bg-amber-300 border-2 border-[#1e293b] rounded-xl p-2 shadow-[3px_3px_0px_#1e293b] text-center text-[#1e293b] relative">
          <div class="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-amber-900">
            NEXT TARGET
          </div>
          <div class="text-xs sm:text-sm font-bold uppercase text-[#1e293b]">
            {{ state.config.nextBonusTierText }}
          </div>
        </div>

      </div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { state, currentTierText, nextTierText } from '../store/donationStore';
import { Sparkles } from 'lucide-vue-next';

console.log('currentTierText=',currentTierText.value);
console.log('nextTierText=',nextTierText.value);
</script>
