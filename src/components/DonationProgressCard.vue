<template>
  <div class="relative z-10 my-4 max-w-4xl mx-auto px-2 sm:px-4 font-['Prompt','Chakra_Petch',sans-serif]">
    <!-- Outer Card Frame -->
    <div class="bg-[#fefae0] border-4 border-[#1e293b] rounded-3xl p-4 sm:p-6 shadow-[8px_8px_0px_#1e293b] relative overflow-hidden">
      
      <!-- Section Title -->
      <div class="text-center mb-4">
        <span class="inline-block text-xs sm:text-sm font-extrabold uppercase text-[#1e293b] tracking-widest bg-pink-100 border border-[#1e293b] px-3 py-1 rounded-full shadow-[2px_2px_0px_#1e293b]">
          . SUPPORT NIYA ซื้อ {{ formatMoney(state.config.token.target) }} Tokens • ราคา ฿{{ state.config.token.price }} ต่อ 1 Token .
        </span>
      </div>
      <div class="text-center mb-4">
        <span class="inline-block text-xs sm:text-sm font-extrabold uppercase text-[#1e293b] tracking-widest bg-pink-300 border border-[#1e293b] px-3 py-1 rounded-full shadow-[2px_2px_0px_#1e293b]">
          . ซื้อครบทุกๆ {{ formatMoney(state.config.token.rechargeTokenLevel) }} Tokens • ผู้สนับสนุนทบให้อีก {{ formatMoney(state.config.token.rechargeToken) }} Tokens • ทบสูงสุด {{ formatMoney(state.config.token.maxRechargeToken) }} Tokens .
        </span>
      </div>

      <!-- Tier Progress Bar -->
      <div class="relative mb-6">
        <!-- Progress Bar Track -->
        <div class="relative w-full h-8 sm:h-10 bg-pink-100 border-3 border-[#1e293b] rounded-full p-1 overflow-hidden shadow-[inner_2px_2px_4px_rgba(0,0,0,0.1)]">
          <!-- Animated Bar Fill -->
          <div 
            class="h-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-full transition-all duration-700 ease-out relative flex items-center justify-end pr-2 overflow-hidden"
            :style="{ width: `${Math.min(100, Math.max(8, progressPercent))}%` }"
          >
            <!-- Striped Overlay Pattern -->
            <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.25)_75%,transparent_75%,transparent)] bg-[length:16px_16px] animate-[stripe_1s_linear_infinite]"></div>
            
            <!-- Glow dot on tip -->
            <div class="w-3 h-3 bg-white rounded-full shadow-md animate-ping"></div>
          </div>

          <!-- Percent Label Callout -->
          <div class="absolute right-3 top-1/2 -translate-y-1/2 font-['Pixelify_Sans',sans-serif] font-bold text-sm sm:text-lg text-pink-700 drop-shadow-[1px_1px_0px_#ffffff]">
            {{ progressPercent }}%
          </div>
        </div>

        <!-- Tier Marker Ticks Below Bar -->
        <div class="flex justify-between items-center px-2 mt-1 text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase">
          <span style="width: 8.82%; text-align: center;" :class="totalAmount >= 3000 ? 'text-pink-600 font-extrabold' : 'opacity-60'">Tier 1</span>
          <span style="width: 8.82%; text-align: left;" :class="totalAmount >= 6000 ? 'text-pink-600 font-extrabold' : 'opacity-60'">Tier 2</span>
          <span style="width: 17.65%; text-align: left;" :class="totalAmount >= 12000 ? 'text-pink-600 font-extrabold' : 'opacity-60'">Tier 3</span>
          <span style="width: 35.29%; text-align: left;" :class="totalAmount >= 24000 ? 'text-pink-600 font-extrabold' : 'opacity-60'">Tier 4</span>
          <span style="width: 24.41%; text-align: left;" :class="totalAmount >= 48000 ? 'text-pink-600 font-extrabold' : 'opacity-60'">Tier 5</span>
          <span style="width: 9.41%; text-align: right;" :class="totalAmount >= 68000 ? 'text-pink-600 font-extrabold' : 'opacity-60'">Tier 6</span>
        </div>
      </div>

      <!-- Current Tier Status Badge -->
      <div class="text-center mb-3">
        <div class="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-300 border-2 border-[#1e293b] rounded-full text-xs sm:text-sm font-extrabold text-[#1e293b] shadow-[3px_3px_0px_#1e293b]">
          <span>🏆 CURRENT {{ currentTierObject.name.toUpperCase() }} • ฿{{ formatMoney(totalAmount) }} • {{ currentTierObject.description }}</span>
        </div>
      </div>

      <!-- Next Tier Status Badge -->
      <div v-show="nextTierObject.targetAmount != 0" class="text-center mb-3">
        <div class="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-200 border-2 border-[#1e293b] rounded-full text-xs sm:text-sm font-extrabold text-[#1e293b] shadow-[3px_3px_0px_#1e293b]">
          <span>🏆 NEXT {{ nextTierObject.name.toUpperCase() }} • ฿{{ formatMoney(nextTierObject.targetAmount) }} • {{ nextTierObject.description }} </span>
        </div>
      </div>

      <!-- Main Raised Big Amount Display -->
      <div class="text-center my-4">
        <div class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#e63946] font-['Pixelify_Sans','Press_Start_2P',sans-serif] tracking-tight drop-shadow-[3px_3px_0px_#1e293b] leading-none">
          ฿{{ formatMoney(totalAmount) }}
        </div>
        <div class="text-sm sm:text-base font-bold text-[#457b9d] font-mono mt-1">
          / ฿{{ formatMoney(state.config.targetGoal) }}
        </div>
        <div class="text-sm sm:text-base font-bold text-[#457b9d] font-mono mt-1">
          <span class="ml-2 inline-block px-2 py-0.5 bg-emerald-300 text-emerald-800 border border-emerald-600 rounded text-xs" style="text-align: left;">
            • กิจกรรมบ้านใหม่น้องนีญ่า จำนวนสมาชิก 191 ท่าน ทบท่านละ 5 Tokens สิ้นสุด 30 Jun 26 23:59 ได้ 191 x 5 = 955 Tokens<br/>
            • กิจกรรมส่งลิ้งค์แฟนแคมน้องนีญ่า จำนวนลิ้งค์ 75 ลิ้งค์ ทบลิ้งค์ละ 10 Tokens สิ้นสุด 31 Jul 26 20:00 ได้ 75 x 10 = 750 Tokens<br/>
            • รวม 2 กิจกรรม ผู้สนับสนุนทบให้ {{ formatMoney(state.config.token.start) }} Tokens
          </span>
        </div>
        <div class="text-sm sm:text-base font-bold text-[#457b9d] font-mono mt-1">
          <span class="ml-2 inline-block px-2 py-0.5 bg-emerald-200 text-emerald-800 border border-emerald-600 rounded text-xs">
            จำนวน Token เริ่มต้นจากการทบ ของผู้สนับสนุน {{ formatMoney(state.config.token.start) }} Tokens
          </span>
        </div>
        <div class="text-sm sm:text-base font-bold text-[#457b9d] font-mono mt-1">
          <span v-if="activeBonusTierMultiplier >= 0" class="ml-2 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-600 rounded text-xs">
            กิจกรรม {{ formatMoney(state.config.token.start) }} Tokens •
            ปลดล็อค {{ formatMoney(activeBonusTierMultiplier) }} Tokens •
            Donate {{ formatMoney(getBuyToken(totalAmount, state.config.token.price))}} ทบ {{ formatMoney(donateTokenPlus) }} Tokens •
            รวม Vote {{ formatMoney(state.config.token.start + activeBonusTierMultiplier + getBuyToken(totalAmount, state.config.token.price) + donateTokenPlus) }} Tokens
          </span>
        </div>
      </div>

      <!-- 3 Key Metric Pills Row -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        
        <!-- Goal Pill -->
        <div class="bg-[#ff80ab] border-2 border-[#1e293b] rounded-2xl p-2.5 text-center text-white shadow-[3px_3px_0px_#1e293b]">
          <div class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-pink-100 flex items-center justify-center gap-1">
            <Target class="w-3.5 h-3.5" />
            <span>GOAL</span>
          </div>
          <div class="text-lg sm:text-xl font-extrabold font-['Pixelify_Sans',sans-serif] mt-0.5">
            ฿{{ formatMoney(state.config.targetGoal) }}
          </div>
        </div>

        <!-- Remaining Pill -->
        <div class="bg-[#ffd166] border-2 border-[#1e293b] rounded-2xl p-2.5 text-center text-[#1e293b] shadow-[3px_3px_0px_#1e293b]">
          <div class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center justify-center gap-1">
            <Hourglass class="w-3.5 h-3.5" />
            <span>REMAINING</span>
          </div>
          <div class="text-lg sm:text-xl font-extrabold font-['Pixelify_Sans',sans-serif] mt-0.5">
            ฿{{ formatMoney(remainingAmount) }}
          </div>
        </div>

        <!-- Supporters Pill -->
        <div class="bg-[#70a2ff] border-2 border-[#1e293b] rounded-2xl p-2.5 text-center text-white shadow-[3px_3px_0px_#1e293b]">
          <div class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-100 flex items-center justify-center gap-1">
            <Users class="w-3.5 h-3.5" />
            <span>SUPPORTERS</span>
          </div>
          <div class="text-lg sm:text-xl font-extrabold font-['Pixelify_Sans',sans-serif] mt-0.5">
            {{ totalSupporters }} PEOPLE
          </div>
        </div>

      </div>

      <!-- QR Codes & Payment Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        
        <!-- Left: Scan To Donate Card -->
        <div class="bg-white border-3 border-[#1e293b] rounded-2xl p-4 shadow-[4px_4px_0px_#1e293b] flex flex-col items-center text-center">
          <!-- Title Badge -->
          <div class="bg-[#ff5252] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full border border-[#1e293b] shadow-[1px_1px_0px_#1e293b] mb-3">
            SCAN TO DONATE
          </div>

          <!-- QR Code Container -->
          <div class="relative bg-white p-2 border-2 border-[#1e293b] rounded-xl shadow-inner mb-3 group cursor-pointer" @click="showQrModal = true">
            <!-- Simulated PromptPay / SCB QR SVG -->
            <div class="w-36 h-36 sm:w-40 sm:h-40 bg-slate-50 border border-slate-200 rounded-lg p-1 flex flex-col items-center justify-center relative">
              <!-- Custom SVG QR code design with KBANK Logo in center -->
              <img src="/assets/bank_qr_code.jpg" />

              <!-- Center SCB Logo Overlay -->
              <!--<div class="absolute inset-0 m-auto w-10 h-10 bg-[#4c1d95] rounded-full border-2 border-white flex items-center justify-center shadow-md">
                <span class="text-yellow-400 font-extrabold text-[10px]">KBANK</span>
              </div>-->
            </div>

            <!-- Hover hint -->
            <div class="absolute inset-0 bg-slate-900/60 rounded-xl flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              คลิกเพื่อขยาย QR
            </div>
          </div>

          <!-- Account Details -->
          <div class="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs font-bold text-[#1e293b] space-y-1">
            <div class="flex items-center justify-center gap-1.5 text-purple-900 font-extrabold">
              <span class="px-1.5 py-0.5 bg-green-500 text-white rounded text-[10px]">{{ state.config.bankName }}</span>
              <span class="font-mono text-sm tracking-wide">{{ state.config.accountNumber }}</span>
            </div>
            <div class="text-slate-600 text-[11px]">
              ชื่อบัญชี: <span class="text-slate-900">{{ state.config.accountName }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2 mt-3 w-full">
            <button 
              @click="copyAccount" 
              class="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 border-2 border-[#1e293b] rounded-xl text-xs font-bold text-[#1e293b] flex items-center justify-center gap-1 active:translate-y-0.5 transition-all"
            >
              <Copy class="w-3.5 h-3.5" />
              <span>{{ copied ? 'คัดลอกแล้ว!' : 'คัดลอกเลขบัญชี' }}</span>
            </button>
            
            <!--<button 
              @click="$emit('openSlipModal')" 
              class="flex-1 py-1.5 px-3 bg-pink-500 hover:bg-pink-600 border-2 border-[#1e293b] rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1 shadow-[2px_2px_0px_#1e293b] active:translate-y-0.5 transition-all"
            >
              <Upload class="w-3.5 h-3.5" />
              <span>แจ้งบริจาค</span>
            </button>-->
          </div>
        </div>

        <!-- Right: Scan For Updates Card -->
        <div class="bg-white border-3 border-[#1e293b] rounded-2xl p-4 shadow-[4px_4px_0px_#1e293b] flex flex-col items-center text-center">
          <!-- Title Badge -->
          <div class="bg-[#ff5252] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full border border-[#1e293b] shadow-[1px_1px_0px_#1e293b] mb-3">
            SCAN FOR UPDATES
          </div>

          <!-- Community QR Code Container -->
          <div class="relative bg-white p-2 border-2 border-[#1e293b] rounded-xl shadow-inner mb-3">
            <div class="w-36 h-36 sm:w-40 sm:h-40 bg-emerald-50 border border-emerald-200 rounded-lg p-1 flex flex-col items-center justify-center relative">
              <!-- SVG Community QR -->
              <img src="/assets/opc_qr_code.jpg" />

              <!-- Center Niya Avatar -->
              <!--<div class="absolute inset-0 m-auto w-10 h-10 bg-pink-100 rounded-full border-2 border-pink-500 overflow-hidden shadow-md flex items-center justify-center font-bold text-xs text-pink-600">
                🌸 Niya
              </div>-->
            </div>
          </div>

          <!-- Community Link CTA -->
          <div class="text-xs font-bold text-[#1e293b] mb-3">
            เข้าร่วมคอมมูนิตี้ ติดตามความเคลื่อนไหว!
          </div>

          <a 
            :href="state.config.communityLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-600 border-2 border-[#1e293b] rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#1e293b] active:translate-y-0.5 transition-all"
          >
            <MessageCircle class="w-4 h-4" />
            <span>Join our community!</span>
            <ExternalLink class="w-3 h-3 ml-auto" />
          </a>
        </div>

      </div>

      <!-- Bottom Thank You Banner -->
      <div class="bg-[#1e293b] text-white rounded-2xl p-2.5 text-center font-extrabold text-xs sm:text-sm tracking-wider uppercase border-2 border-[#1e293b] shadow-[3px_3px_0px_#ff80ab] flex items-center justify-center gap-2">
        <span>♥</span>
        <span>THANK YOU FOR YOUR SUPPORT</span>
        <span>♥</span>
      </div>

      <!-- Sub-footer Last Update -->
      <div class="mt-3 flex justify-center">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ff80ab] border border-[#1e293b] rounded-full text-white font-bold text-[11px] shadow-[1px_1px_0px_#1e293b]">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>LAST UPDATE {{ lastUpdate }}</span>
        </div>
      </div>

    </div>

    <!-- QR Modal Zoom -->
    <div v-if="showQrModal" class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showQrModal = false">
      <div class="bg-white border-4 border-[#1e293b] rounded-3xl p-6 max-w-sm w-full text-center shadow-[8px_8px_0px_#1e293b] relative">
        <button @click="showQrModal = false" class="absolute top-3 right-3 p-1 bg-slate-100 hover:bg-slate-200 border border-[#1e293b] rounded-full">
          <X class="w-5 h-5 text-[#1e293b]" />
        </button>
        
        <h3 class="text-lg font-bold text-[#1e293b] mb-2 font-['Chakra_Petch']">
          สแกนบริจาคผ่าน PromptPay
        </h3>

        <div class="bg-purple-50 p-4 border-2 border-[#1e293b] rounded-2xl my-3 inline-block">
          <div class="w-56 h-56 bg-white p-2 rounded-xl border border-slate-300 relative flex items-center justify-center">
            <img src="/assets/bank_qr_code_big.jpg" />
            
            <!--<div class="absolute inset-0 m-auto w-12 h-12 bg-[#4c1d95] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
              <span class="text-yellow-400 font-extrabold text-xs">KBANK</span>
            </div>-->
          </div>
        </div>

        <div class="text-xs font-bold text-slate-700 font-mono">
          <span class="px-1.5 py-0.5 bg-green-500 text-white rounded text-[10px]">{{ state.config.bankName }}</span> {{ state.config.accountNumber }}
        </div>
        <div class="text-xs text-slate-500 mb-4">
          {{ state.config.accountName }}
        </div>

        <button @click="copyAccount" class="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl border-2 border-[#1e293b]">
          {{ copied ? 'คัดลอกเลขบัญชีเรียบร้อย!' : 'คัดลอกเลขบัญชี' }}
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { 
  state, 
  totalAmount, 
  effectiveAmount, 
  activeBonusTierMultiplier, 
  remainingAmount, 
  progressPercent, 
  currentTierObject,
  nextTierObject,
  totalSupporters, 
  lastUpdate 
} from '../store/donationStore';
import { Target, Hourglass, Users, Copy, Upload, MessageCircle, ExternalLink, X } from 'lucide-vue-next';

defineEmits(['openSlipModal']);
const copied = ref(false);
const showQrModal = ref(false);

const donateTokenPlus = computed(() => { 
  let MAX_TOKEN = state.config.token.maxRechargeToken;
  let PLUS_TOKEN = state.config.token.rechargeToken;
  let PLUS_LEVEL = state.config.token.rechargeTokenLevel;
  let TOKEN_PRICE = state.config.token.price;

  let result = Math.floor(totalAmount.value/TOKEN_PRICE/PLUS_LEVEL)*PLUS_TOKEN;

  if (result > MAX_TOKEN) {
    result = MAX_TOKEN;
  }

  return result;
});


function formatMoney(val: number): string {
  return new Intl.NumberFormat('th-TH').format(val);
}

function getBuyToken(val: number, price: number): number {
  return Math.floor(val/price);
}

function copyAccount() {
  navigator.clipboard.writeText(state.config.accountNumber);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2500);
}
</script>

<style scoped>
@keyframes stripe {
  0% { background-position: 0 0; }
  100% { background-position: 16px 0; }
}
</style>
