<template>
  <div class="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 mb-4 font-['Prompt',sans-serif]">
    <div class="bg-white/95 backdrop-blur-md border-3 border-[#1e293b] rounded-2xl p-3 sm:p-4 shadow-[4px_4px_0px_#1e293b]">
      
      <!-- Top Status Row -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
        
        <!-- Mode Badge -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border border-[#1e293b]"
               :class="isDemoMode ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'">
            <span class="w-2 h-2 rounded-full" :class="isDemoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-ping'"></span>
            <span>{{ isDemoMode ? 'โหมดจำลองข้อมูล (Demo Data)' : 'เชื่อมต่อ Google Sheet เรียลไทม์' }}</span>
          </div>

          <button 
            v-if="!isDemoMode" 
            @click="resetToDemoData" 
            class="text-[11px] text-slate-500 hover:text-slate-800 underline font-medium"
          >
            กลับสู่ข้อมูลจำลอง
          </button>
        </div>

        <!-- Sync controls -->
        <div class="flex items-center gap-2 text-xs">
          <!-- Auto Refresh Selector -->
          <div class="flex items-center gap-1 bg-slate-100 px-2 py-1 border border-slate-300 rounded-lg">
            <RefreshCw class="w-3.5 h-3.5 text-slate-600" :class="{ 'animate-spin': isSyncing }" />
            <span class="text-slate-600 font-medium">อัปเดตอัตโนมัติ:</span>
            <select 
              v-model="state.config.autoRefreshInterval" 
              @change="onIntervalChange" 
              class="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option :value="0">ปิด (Manual)</option>
              <option :value="10">ทุก 10 วินาที</option>
              <option :value="30">ทุก 30 วินาที</option>
              <option :value="60">ทุก 1 นาที</option>
            </select>
          </div>

          <!-- Manual Refresh Button -->
          <button 
            @click="triggerManualSync" 
            :disabled="isSyncing"
            class="py-1 px-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-lg border border-[#1e293b] shadow-[1px_1px_0px_#1e293b] flex items-center gap-1 active:translate-y-0.5"
          >
            <RefreshCw class="w-3.5 h-3.5" :class="{ 'animate-spin': isSyncing }" />
            <span>{{ isSyncing ? 'กำลังดึงข้อมูล...' : 'ดึงข้อมูลทันที' }}</span>
          </button>
        </div>

      </div>

      <!-- Google Sheet URL Input Row -->
      <div class="space-y-2">
        <!--<label class="block text-xs font-bold text-[#1e293b] flex items-center justify-between">
          <span class="flex items-center gap-1">
            <FileSpreadsheet class="w-4 h-4 text-emerald-600" />
            <span>Link Google Sheet (CSV / Published Web Link)</span>
          </span>

          <button @click="showGuideModal = true" class="text-xs text-blue-600 hover:underline flex items-center gap-1">
            <HelpCircle class="w-3.5 h-3.5" />
            <span>วิธีเปิดเผย Google Sheet เป็น CSV</span>
          </button>
        </label>-->

        <div class="flex gap-2">
          <!--input 
            type="url" 
            v-model="inputSheetUrl" 
            placeholder="วาง Link Google Sheet ที่นี่ (เช่น https://docs.google.com/spreadsheets/d/...)" 
            class="flex-1 px-3 py-1.5 bg-slate-50 border-2 border-[#1e293b] rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          /-->

          <button 
            @click="saveAndSync" 
            :disabled="isSyncing || !inputSheetUrl" 
            class="py-1.5 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl border-2 border-[#1e293b] shadow-[2px_2px_0px_#1e293b] active:translate-y-0.5 flex items-center gap-1"
          >
            <Check class="w-4 h-4" />
            <span>เชื่อมต่อ</span>
          </button>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="p-2 bg-red-100 border border-red-400 rounded-lg text-xs text-red-800 font-medium flex items-center justify-between">
          <span>⚠️ {{ error }}</span>
          <button @click="error = null" class="text-red-600 font-bold ml-2">✕</button>
        </div>
      </div>

    </div>

    <!-- Guide Modal -->
    <div v-if="showGuideModal" class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showGuideModal = false">
      <div class="bg-white border-4 border-[#1e293b] rounded-3xl p-6 max-w-md w-full text-left shadow-[8px_8px_0px_#1e293b] relative">
        <button @click="showGuideModal = false" class="absolute top-3 right-3 p-1 bg-slate-100 hover:bg-slate-200 border border-[#1e293b] rounded-full">
          <X class="w-5 h-5 text-[#1e293b]" />
        </button>

        <h3 class="text-lg font-bold text-[#1e293b] mb-3 flex items-center gap-2 font-['Chakra_Petch']">
          <FileSpreadsheet class="w-5 h-5 text-emerald-600" />
          <span>วิธีการเผยแพร่ Google Sheet ให้เชื่อมต่อได้</span>
        </h3>

        <ol class="list-decimal list-inside text-xs text-slate-700 space-y-2.5 font-sans leading-relaxed">
          <li>เปิด Google Sheet ของคุณที่บันทึกรายการบริจาค</li>
          <li>ไปที่เมนู <strong class="text-slate-900">ไฟล์ (File)</strong> &gt; <strong class="text-slate-900">แชร์ (Share)</strong> &gt; <strong class="text-slate-900">เผยแพร่ไปยังเว็บ (Publish to web)</strong></li>
          <li>ในหัวข้อการเผยแพร่ เลือกแผ่นงาน และเปลี่ยนประเภทจาก "เว็บเพจ" เป็น <strong class="text-emerald-700 bg-emerald-50 px-1 rounded">Comma-separated values (.csv)</strong></li>
          <li>กดปุ่ม <strong class="text-blue-700">เผยแพร่ (Publish)</strong> แล้วคัดลอก ลิงก์ URL ที่ได้</li>
          <li>นำลิงก์มาวางในช่อง Google Sheet Link ด้านบนแล้วกดปุ่ม "เชื่อมต่อ"</li>
        </ol>

        <div class="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-xl text-[11px] text-amber-900 font-medium">
          💡 <strong>คอลัมน์แนะนำใน Google Sheet:</strong><br />
          <code>Timestamp</code> (เวลา), <code>Supporter Name</code> (ชื่อผู้บริจาค), <code>Amount</code> (จำนวนเงิน), <code>Note</code> (ข้อความ)
        </div>

        <button @click="showGuideModal = false" class="mt-4 w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-xl border border-[#1e293b]">
          รับทราบ เข้าใจแล้ว
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  state, 
  isSyncing, 
  isDemoMode, 
  error, 
  fetchFromGoogleSheet, 
  resetToDemoData 
} from '../store/donationStore';
import { RefreshCw, FileSpreadsheet, HelpCircle, Check, X } from 'lucide-vue-next';

const inputSheetUrl = ref(state.config.sheetUrl);
const showGuideModal = ref(false);
let timer: any = null;

function saveAndSync() {
  state.config.sheetUrl = inputSheetUrl.value;
  fetchFromGoogleSheet(inputSheetUrl.value);
}

function triggerManualSync() {
  fetchFromGoogleSheet();
}

function onIntervalChange() {
  restartAutoSyncTimer();
}

function restartAutoSyncTimer() {
  if (timer) clearInterval(timer);
  if (state.config.autoRefreshInterval > 0) {
    timer = setInterval(() => {
      if (!isDemoMode.value) {
        fetchFromGoogleSheet();
      }
    }, state.config.autoRefreshInterval * 1000);
  }
}

onMounted(() => {
  restartAutoSyncTimer();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
