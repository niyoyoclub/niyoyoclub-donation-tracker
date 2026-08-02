<template>
  <div class="relative min-h-screen text-slate-900 font-sans pb-12 overflow-x-hidden">
    
    <!-- Retro Pixel Canvas Background -->
    <BackgroundArt />

    <!-- Main Content Container -->
    <div class="relative z-10">
      
      <!-- Top Pixel Header -->
      <PixelHeader />

      <!-- Navigation Tabs Row -->
      <div class="max-w-4xl mx-auto px-2 sm:px-4 my-3">
        <div class="bg-white/90 backdrop-blur border-3 border-[#1e293b] rounded-2xl p-1.5 flex items-center justify-around gap-1 shadow-[4px_4px_0px_#1e293b] font-['Chakra_Petch',sans-serif] text-xs font-bold">
          
          <button 
            @click="activeTab = 'overview'" 
            class="flex-1 py-2 px-2 rounded-xl border-2 transition-all flex items-center justify-center gap-1.5"
            :class="activeTab === 'overview' ? 'bg-pink-500 text-white border-[#1e293b] shadow-[2px_2px_0px_#1e293b]' : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'"
          >
            <PieChart class="w-4 h-4" />
            <span class="hidden sm:inline">ความคืบหน้า &amp; QR</span>
            <span class="sm:hidden">ภาพรวม</span>
          </button>

          <button 
            @click="activeTab = 'transactions'" 
            class="flex-1 py-2 px-2 rounded-xl border-2 transition-all flex items-center justify-center gap-1.5"
            :class="activeTab === 'transactions' ? 'bg-pink-500 text-white border-[#1e293b] shadow-[2px_2px_0px_#1e293b]' : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'"
          >
            <List class="w-4 h-4" />
            <span class="hidden sm:inline">รายการบริจาค</span>
            <span class="sm:hidden">รายการ</span>
          </button>

          <button 
            @click="activeTab = 'leaderboard'" 
            class="flex-1 py-2 px-2 rounded-xl border-2 transition-all flex items-center justify-center gap-1.5"
            :class="activeTab === 'leaderboard' ? 'bg-pink-500 text-white border-[#1e293b] shadow-[2px_2px_0px_#1e293b]' : 'bg-transparent text-slate-700 border-transparent hover:bg-slate-100'"
          >
            <Trophy class="w-4 h-4" />
            <span>Top Donors</span>
          </button>

          <!--<button 
            @click="showSettingsModal = true" 
            class="py-2 px-3 bg-slate-100 hover:bg-slate-200 border-2 border-[#1e293b] rounded-xl text-slate-800 transition-all flex items-center justify-center gap-1"
            title="ตั้งค่า"
          >
            <Settings class="w-4 h-4" />
          </button>-->

        </div>
      </div>

      <!-- Google Sheets Live Sync Banner -->
      <GoogleSheetsSyncBar />

      <!-- Main Layout Content Grid (with Side Niya Character Frame on XL Desktop) -->
      <main class="max-w-6xl mx-auto px-2 sm:px-4">
        <div class="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          <!-- Main Content Area -->
          <div class="xl:col-span-8 space-y-4">
            
            <!-- Overview Tab View -->
            <div v-show="activeTab === 'overview'" class="space-y-4">
              <DonationProgressCard @openSlipModal="showSlipModal = true" />
              <TransactionFilterSection />
              <TransactionTable />
            </div>

            <!-- Transactions List Tab View -->
            <div v-show="activeTab === 'transactions'" class="space-y-4">
              <TransactionFilterSection />
              <TransactionTable />
            </div>

            <!-- Leaderboard Tab View -->
            <div v-show="activeTab === 'leaderboard'">
              <TopSupportersLeaderboard />
            </div>

          </div>

          <!-- Desktop Right Side Niya Frame (Matches Screenshot Right Side Idol Portrait) -->
          <div class="hidden xl:block xl:col-span-4 sticky top-6">
            <div class="bg-[#fefae0] border-4 border-[#1e293b] rounded-3xl p-4 shadow-[8px_8px_0px_#1e293b] text-center relative overflow-hidden">
              <!-- Niya Card Header -->
              <div class="bg-pink-500 text-white text-xs font-extrabold uppercase py-1 px-3 rounded-full border border-[#1e293b] inline-block shadow-[2px_2px_0px_#1e293b] mb-3">
                GENERAL ELECTION 2026
              </div>

              <!-- Vector/Illustration Idol Photo Canvas Frame -->
              <div class="relative mx-auto rounded-2xl border-3 border-[#1e293b] overflow-hidden bg-gradient-to-b from-pink-200 via-rose-100 to-amber-100 p-2 shadow-inner group">
                <div class="w-full h-80 rounded-xl bg-pink-100 relative flex flex-col items-center justify-center overflow-hidden border border-pink-300">
                  
                  <!-- Vector Niya Idol Graphic -->
                  <img src="/assets/niya_profile.png" />

                  <div class="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur p-2 rounded-xl border border-[#1e293b] text-center">
                    <div class="text-xs font-black text-[#1e293b] font-['Chakra_Petch']">NIYA BNK48</div>
                    <div class="text-[10px] text-pink-600 font-bold">#NiyaFirstStepToSenbatsu</div>
                  </div>
                </div>
              </div>

              <!-- Support Note -->
              <div class="mt-4 text-xs font-bold text-slate-700 font-['Prompt']">
                "ขอบคุณทุกๆ คนที่ร่วมเดินทางไปด้วยกันเพื่อส่งน้องนีญ่าเป็นเซ็มบัสซึเพลงหลักครั้งแรก ในครั้งนี้มากๆ นะคะ! ♥"
              </div>

              <!--<button 
                @click="showSlipModal = true" 
                class="mt-3 w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl border-2 border-[#1e293b] shadow-[3px_3px_0px_#1e293b] active:translate-y-0.5 transition-all"
              >
                ร่วมบริจาคให้โมเน่ต์
              </button>-->
            </div>
          </div>

        </div>
      </main>

    </div>

    <!-- Modals -->
    <DonationSlipModal v-if="showSlipModal" @close="showSlipModal = false" />
    <SettingsModal v-if="showSettingsModal" @close="showSettingsModal = false" />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BackgroundArt from './components/BackgroundArt.vue';
import PixelHeader from './components/PixelHeader.vue';
import DonationProgressCard from './components/DonationProgressCard.vue';
import GoogleSheetsSyncBar from './components/GoogleSheetsSyncBar.vue';
import TransactionFilterSection from './components/TransactionFilterSection.vue';
import TransactionTable from './components/TransactionTable.vue';
import TopSupportersLeaderboard from './components/TopSupportersLeaderboard.vue';
import DonationSlipModal from './components/DonationSlipModal.vue';
import SettingsModal from './components/SettingsModal.vue';

import { PieChart, List, Trophy, Settings } from 'lucide-vue-next';

const activeTab = ref<'overview' | 'transactions' | 'leaderboard'>('overview');
const showSlipModal = ref(false);
const showSettingsModal = ref(false);
</script>

<style>
/* Custom scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
