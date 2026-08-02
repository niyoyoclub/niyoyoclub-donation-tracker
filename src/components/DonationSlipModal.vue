<template>
  <div class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 font-['Prompt',sans-serif]" @click.self="$emit('close')">
    <div class="bg-white border-4 border-[#1e293b] rounded-3xl p-5 sm:p-6 max-w-md w-full text-left shadow-[8px_8px_0px_#1e293b] relative">
      
      <!-- Close button -->
      <button @click="$emit('close')" class="absolute top-3 right-3 p-1 bg-slate-100 hover:bg-slate-200 border border-[#1e293b] rounded-full">
        <X class="w-5 h-5 text-[#1e293b]" />
      </button>

      <!-- Title Header -->
      <div class="text-xs font-extrabold uppercase text-pink-600 tracking-wider mb-1">
        SUBMIT DONATION SLIP
      </div>
      <h3 class="text-lg sm:text-xl font-extrabold text-[#1e293b] mb-4 font-['Chakra_Petch'] flex items-center gap-2">
        <Upload class="w-5 h-5 text-pink-500" />
        <span>แจ้งโอนเงินบริจาค</span>
      </h3>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-3.5 text-xs font-medium text-slate-800">
        
        <!-- Supporter Name -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">
            ชื่อผู้บริจาค (หรือนามแฝง): <span class="text-rose-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.supporterName" 
            required 
            placeholder="เช่น โอชิโมเน่ต์ตลอดไป" 
            class="w-full p-2.5 bg-slate-50 border-2 border-[#1e293b] rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Amount -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">
            จำนวนเงินบริจาค (บาท): <span class="text-rose-500">*</span>
          </label>
          <input 
            type="number" 
            v-model.number="form.amount" 
            required 
            min="1" 
            placeholder="เช่น 1000" 
            class="w-full p-2.5 bg-slate-50 border-2 border-[#1e293b] rounded-xl font-mono text-sm font-extrabold text-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Payment Channel -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">ช่องทางโอนเงิน:</label>
          <select 
            v-model="form.paymentChannel" 
            class="w-full p-2.5 bg-slate-50 border-2 border-[#1e293b] rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="SCB PromptPay">SCB PromptPay</option>
            <option value="KBank PromptPay">KBank PromptPay</option>
            <option value="TrueMoney">TrueMoney</option>
          </select>
        </div>

        <!-- Slip Ref -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">เลขสลิปอ้างอิง (ถ้ามี):</label>
          <input 
            type="text" 
            v-model="form.slipRef" 
            placeholder="เช่น 20260801991204" 
            class="w-full p-2.5 bg-slate-50 border-2 border-[#1e293b] rounded-xl font-mono text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Note -->
        <div>
          <label class="block font-bold text-slate-800 mb-1">ข้อความถึงโมเน่ต์:</label>
          <textarea 
            v-model="form.note" 
            rows="2" 
            placeholder="ส่งกำลังใจให้โมเน่ต์..." 
            class="w-full p-2.5 bg-slate-50 border-2 border-[#1e293b] rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="w-full mt-2 py-3 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl border-3 border-[#1e293b] shadow-[4px_4px_0px_#1e293b] active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <Check class="w-4 h-4" />
          <span>บันทึกแจ้งโอนเรียบร้อย</span>
        </button>

      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { addManualTransaction } from '../store/donationStore';
import { Upload, X, Check } from 'lucide-vue-next';

const emit = defineEmits(['close']);

const form = reactive({
  supporterName: '',
  amount: 1000,
  paymentChannel: 'SCB PromptPay',
  slipRef: '',
  note: '',
});

function handleSubmit() {
  if (!form.supporterName || form.amount <= 0) return;

  const now = new Date();
  const timestampStr = now.toISOString().replace('T', ' ').substring(0, 19);

  addManualTransaction({
    timestamp: timestampStr,
    supporterName: form.supporterName,
    amount: form.amount,
    paymentChannel: form.paymentChannel,
    slipRef: form.slipRef || `SLIP-${Date.now().toString().slice(-6)}`,
    note: form.note,
  });

  emit('close');
}
</script>
