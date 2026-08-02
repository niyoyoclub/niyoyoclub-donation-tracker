<template>
  <div class="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 mb-4 font-['Prompt',sans-serif]">
    <div class="bg-white border-3 border-[#1e293b] rounded-2xl p-4 shadow-[4px_4px_0px_#1e293b] space-y-3">
      
      <!-- Top Search & Main Actions Bar -->
      <div class="flex flex-col md:flex-row gap-2 items-stretch md:items-center justify-between">
        
        <!-- Search Input -->
        <div class="relative flex-1">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            v-model="state.filters.search" 
            placeholder="ค้นหาตามชื่อผู้บริจาค, เลขสลิป, หรือข้อความ..." 
            class="w-full pl-9 pr-8 py-2 bg-slate-50 border-2 border-[#1e293b] rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
          />
          <button 
            v-if="state.filters.search" 
            @click="state.filters.search = ''" 
            class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs p-1"
          >
            ✕
          </button>
        </div>

        <!-- Sort & Filter Toggle Actions -->
        <div class="flex items-center gap-2">
          <!-- Sort Dropdown -->
          <div class="flex items-center gap-1 bg-slate-50 border-2 border-[#1e293b] rounded-xl px-2.5 py-1.5">
            <ArrowUpDown class="w-3.5 h-3.5 text-slate-600" />
            <select 
              v-model="state.filters.sortBy" 
              class="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="newest">ใหม่ล่าสุด</option>
              <option value="oldest">เก่าที่สุด</option>
              <option value="highest">ยอดบริจาคสูงสุด</option>
              <option value="lowest">ยอดบริจาคน้อยที่สุด</option>
              <option value="name">ชื่อผู้บริจาค (ก-ฮ)</option>
            </select>
          </div>

          <!-- Advanced Filter Toggle Button -->
          <button 
            @click="showAdvanced = !showAdvanced" 
            class="py-1.5 px-3 border-2 border-[#1e293b] rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
            :class="showAdvanced || hasActiveFilters ? 'bg-pink-100 text-pink-900 border-pink-700' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'"
          >
            <SlidersHorizontal class="w-3.5 h-3.5" />
            <span>คัดกรอง</span>
            <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-pink-500"></span>
          </button>

          <!-- Export CSV -->
          <button 
            @click="exportTransactionsCSV" 
            class="py-1.5 px-3 bg-emerald-500 hover:bg-emerald-600 border-2 border-[#1e293b] rounded-xl text-xs font-bold text-white shadow-[2px_2px_0px_#1e293b] active:translate-y-0.5 flex items-center gap-1"
            title="ส่งออกไฟล์ CSV"
          >
            <Download class="w-3.5 h-3.5" />
            <span class="hidden sm:inline">ส่งออก CSV</span>
          </button>
        </div>

      </div>

      <!-- Quick Tier Chips Row -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span class="text-slate-500 font-bold whitespace-nowrap text-[11px] mr-1">ระดับ TIER:</span>
        
        <button 
          @click="state.filters.tier = 'all'"
          class="px-2.5 py-1 rounded-full border border-[#1e293b] font-bold text-[11px] transition-all whitespace-nowrap"
          :class="state.filters.tier === 'all' ? 'bg-[#1e293b] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'"
        >
          ทั้งหมด
        </button>

        <button 
          v-for="tier in state.tiers" 
          :key="tier.level"
          @click="state.filters.tier = String(tier.level)"
          class="px-2.5 py-1 rounded-full border border-[#1e293b] font-bold text-[11px] transition-all whitespace-nowrap flex items-center gap-1"
          :class="state.filters.tier === String(tier.level) ? 'bg-pink-500 text-white shadow-[1px_1px_0px_#1e293b]' : 'bg-pink-50 text-pink-900 hover:bg-pink-100'"
        >
          <span>{{ tier.name }}</span>
          <span class="text-[9px] opacity-80">(≥฿{{ formatShort(tier.targetAmount) }})</span>
        </button>
      </div>

      <!-- Expandable Advanced Filters Panel -->
      <div v-if="showAdvanced" class="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        
        <!-- Payment Channel -->
        <div>
          <label class="block font-bold text-slate-700 mb-1">ช่องทางชำระเงิน:</label>
          <select 
            v-model="state.filters.paymentChannel" 
            class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800"
          >
            <option value="all">ทุกช่องทาง</option>
            <option value="SCB PromptPay">SCB PromptPay</option>
            <option value="KBank PromptPay">KBank PromptPay</option>
            <option value="TrueMoney">TrueMoney</option>
          </select>
        </div>

        <!-- Min Amount -->
        <div>
          <label class="block font-bold text-slate-700 mb-1">ยอดขั้นต่ำ (บาท):</label>
          <input 
            type="number" 
            v-model.number="state.filters.minAmount" 
            placeholder="เช่น 1000" 
            class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800"
          />
        </div>

        <!-- Max Amount -->
        <div>
          <label class="block font-bold text-slate-700 mb-1">ยอดสูงสุด (บาท):</label>
          <input 
            type="number" 
            v-model.number="state.filters.maxAmount" 
            placeholder="เช่น 50000" 
            class="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800"
          />
        </div>

        <!-- Clear Filters Footer -->
        <div class="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-1">
          <button 
            @click="resetFilters" 
            class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-300 text-xs flex items-center gap-1"
          >
            <RotateCcw class="w-3.5 h-3.5" />
            <span>ล้างตัวคัดกรองทั้งหมด</span>
          </button>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { state, exportTransactionsCSV } from '../store/donationStore';
import { Search, ArrowUpDown, SlidersHorizontal, Download, RotateCcw } from 'lucide-vue-next';

const showAdvanced = ref(false);

const hasActiveFilters = computed(() => {
  return state.filters.search !== '' || 
         state.filters.tier !== 'all' || 
         state.filters.paymentChannel !== 'all' || 
         state.filters.minAmount !== null || 
         state.filters.maxAmount !== null;
});

function formatShort(val: number): string {
  if (val >= 1000) {
    return (val / 1000) + 'k';
  }
  return String(val);
}

function resetFilters() {
  state.filters.search = '';
  state.filters.tier = 'all';
  state.filters.paymentChannel = 'all';
  state.filters.minAmount = null;
  state.filters.maxAmount = null;
  state.filters.sortBy = 'newest';
}
</script>
