<template>
  <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 font-['Prompt',sans-serif]" @click.self="$emit('close')">
    <div class="bg-white border-4 border-[#1e293b] rounded-3xl p-5 sm:p-6 max-w-lg w-full text-left shadow-[8px_8px_0px_#1e293b] relative max-h-[90vh] overflow-y-auto">
      
      <!-- Close button -->
      <button @click="$emit('close')" class="absolute top-3 right-3 p-1 bg-slate-100 hover:bg-slate-200 border border-[#1e293b] rounded-full">
        <X class="w-5 h-5 text-[#1e293b]" />
      </button>

      <div class="text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-1">CAMPAIGN CONFIGURATION</div>
      <h3 class="text-lg sm:text-xl font-extrabold text-[#1e293b] mb-4 font-['Chakra_Petch'] flex items-center gap-2">
        <Settings class="w-5 h-5 text-slate-700" />
        <span>ตั้งค่าโปรเจกต์ &amp; บัญชีบริจาค</span>
      </h3>

      <form @submit.prevent="saveSettings" class="space-y-3 text-xs font-medium text-slate-800">
        
        <!-- Project Name -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">ชื่อโปรเจกต์:</label>
          <input type="text" v-model="form.projectName" class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold" />
        </div>

        <!-- Hashtag -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">แฮชแท็กหลัก:</label>
          <input type="text" v-model="form.hashtag" class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold font-mono" />
        </div>

        <!-- Target Goal -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">ยอดเป้าหมายหลัก (บาท):</label>
          <input type="number" v-model.number="form.targetGoal" class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold font-mono text-emerald-700" />
        </div>

        <!-- Bank Details -->
        <div class="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-2">
          <div class="font-bold text-purple-900">ข้อมูลบัญชีรับบริจาค</div>
          
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[11px] text-slate-600">ชื่อธนาคาร:</label>
              <input type="text" v-model="form.bankName" class="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-bold" />
            </div>
            <div>
              <label class="block text-[11px] text-slate-600">เลขบัญชี:</label>
              <input type="text" v-model="form.accountNumber" class="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono font-bold" />
            </div>
          </div>

          <div>
            <label class="block text-[11px] text-slate-600">ชื่อบัญชี:</label>
            <input type="text" v-model="form.accountName" class="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-bold" />
          </div>
        </div>

        <!-- Community Link -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">Link คอมมูนิตี้:</label>
          <input type="url" v-model="form.communityLink" class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono" />
        </div>

        <!-- Active Bonus Tier Text -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">ข้อความ Bonus Tier ปัจจุบัน:</label>
          <input type="text" v-model="form.activeBonusTierText" class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs" />
        </div>

        <button 
          type="submit" 
          class="w-full mt-3 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase rounded-xl border-2 border-[#1e293b]"
        >
          บันทึกการตั้งค่า
        </button>

      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { state, updateConfig } from '../store/donationStore';
import { Settings, X } from 'lucide-vue-next';

const emit = defineEmits(['close']);

const form = reactive({
  projectName: state.config.projectName,
  hashtag: state.config.hashtag,
  targetGoal: state.config.targetGoal,
  bankName: state.config.bankName,
  accountNumber: state.config.accountNumber,
  accountName: state.config.accountName,
  communityLink: state.config.communityLink,
  activeBonusTierText: state.config.activeBonusTierText,
});

function saveSettings() {
  updateConfig(form);
  emit('close');
}
</script>
