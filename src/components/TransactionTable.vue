<template>
  <div class="relative z-10 max-w-4xl mx-auto px-2 sm:px-4 mb-8 font-['Prompt',sans-serif]">
    
    <!-- Table Wrapper Card -->
    <div class="bg-white border-3 border-[#1e293b] rounded-2xl p-4 shadow-[6px_6px_0px_#1e293b]">
      
      <!-- Table Header Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
        <h3 class="text-sm sm:text-base font-bold text-[#1e293b] flex items-center gap-2 font-['Chakra_Petch']">
          <ListOrdered class="w-4 h-4 text-pink-600" />
          <span>รายการบริจาคทั้งหมด</span>
          <span class="px-2 py-0.5 bg-pink-100 text-pink-800 rounded-full text-xs font-mono font-bold">
            {{ filteredTransactions.length }} รายการ
          </span>
        </h3>

        <!-- Page Size Selector -->
        <div class="flex items-center gap-2 text-xs text-slate-600">
          <span>แสดงหน้าละ:</span>
          <select v-model="pageSize" @change="currentPage = 1" class="bg-slate-100 border border-slate-300 rounded px-2 py-1 font-bold">
            <option :value="10">10 รายการ</option>
            <option :value="20">20 รายการ</option>
            <option :value="50">50 รายการ</option>
          </select>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredTransactions.length === 0" class="py-12 text-center text-slate-500">
        <Inbox class="w-12 h-12 mx-auto text-slate-300 mb-2" />
        <p class="font-bold text-sm">ไม่พบรายการบริจาคตามเงื่อนไขที่คัดกรอง</p>
        <p class="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหาหรือล้างตัวคัดกรอง</p>
      </div>

      <!-- Transactions List Table (Desktop View) -->
      <div v-else class="hidden md:block overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-100 text-[#1e293b] border-b-2 border-[#1e293b] uppercase tracking-wider font-extrabold">
              <th class="p-2.5">ลำดับ/เวลา</th>
              <th class="p-2.5">ผู้บริจาค</th>
              <th class="p-2.5 text-right">ยอดบริจาค (บาท)</th>
              <th class="p-2.5">ช่องทาง</th>
              <th class="p-2.5">ข้อความ</th>
              <th class="p-2.5 text-center">สถานะ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 font-medium">
            <tr 
              v-for="(tx, idx) in paginatedTransactions" 
              :key="tx.id"
              @click="selectedTx = tx"
              class="hover:bg-pink-50/60 cursor-pointer transition-colors group"
            >
              <td class="p-2.5 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                <div class="font-bold text-slate-800">#{{ (currentPage - 1) * pageSize + idx + 1 }}</div>
                <div class="text-[10px]">{{ tx.timestamp }}</div>
              </td>

              <td class="p-2.5 font-bold text-[#1e293b]">
                <div class="flex items-center gap-1.5">
                  <span class="w-6 h-6 rounded-full bg-pink-100 text-pink-700 font-extrabold text-[10px] flex items-center justify-center border border-pink-300">
                    {{ tx.supporterName.slice(0, 1).toUpperCase() }}
                  </span>
                  <span class="group-hover:text-pink-600 transition-colors">{{ tx.supporterName }}</span>
                </div>
              </td>

              <td class="p-2.5 text-right font-bold text-emerald-600 font-mono text-sm whitespace-nowrap">
                ฿{{ formatMoney(tx.amount) }}
              </td>

              <td class="p-2.5 text-slate-600 text-[11px] whitespace-nowrap">
                <span class="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono">
                  {{ tx.paymentChannel || 'PromptPay' }}
                </span>
              </td>

              <td class="p-2.5 text-slate-600 max-w-[200px] truncate" :title="tx.note">
                {{ tx.note || '-' }}
              </td>

              <td class="p-2.5 text-center">
                <span 
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase inline-flex items-center gap-1"
                  :class="tx.status === 'verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'"
                >
                  <CheckCircle2 class="w-3 h-3" />
                  <span>{{ tx.status === 'verified' ? 'ยืนยันแล้ว' : 'รอตรวจ' }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Compact Mobile Cards View -->
      <div v-if="filteredTransactions.length > 0" class="md:hidden space-y-2.5">
        <div 
          v-for="(tx, idx) in paginatedTransactions" 
          :key="tx.id"
          @click="selectedTx = tx"
          class="p-3 bg-slate-50 hover:bg-pink-50 border-2 border-[#1e293b] rounded-xl shadow-[2px_2px_0px_#1e293b] cursor-pointer transition-all active:scale-[0.99]"
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="text-[10px] text-slate-500 font-mono">#{{ (currentPage - 1) * pageSize + idx + 1 }} • {{ tx.timestamp }}</div>
              <div class="text-sm font-extrabold text-[#1e293b] mt-0.5 flex items-center gap-1.5">
                <span class="w-5 h-5 rounded-full bg-pink-200 text-pink-800 font-bold text-[10px] flex items-center justify-center">
                  {{ tx.supporterName.slice(0, 1).toUpperCase() }}
                </span>
                <span>{{ tx.supporterName }}</span>
              </div>
            </div>

            <div class="text-right">
              <div class="text-base font-extrabold text-emerald-600 font-mono">฿{{ formatMoney(tx.amount) }}</div>
              <span class="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold border border-emerald-300">
                ยืนยันแล้ว
              </span>
            </div>
          </div>

          <div v-if="tx.note" class="mt-2 text-xs text-slate-600 bg-white p-2 rounded border border-slate-200 italic">
            "{{ tx.note }}"
          </div>
        </div>
      </div>

      <!-- Pagination Footer Controls -->
      <div v-if="totalPages > 1" class="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-slate-700">
        <div>
          หน้า {{ currentPage }} / {{ totalPages }}
        </div>

        <div class="flex items-center gap-1">
          <button 
            @click="currentPage--" 
            :disabled="currentPage === 1" 
            class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-[#1e293b] rounded-lg"
          >
            &lt; ก่อนหน้า
          </button>

          <button 
            @click="currentPage++" 
            :disabled="currentPage >= totalPages" 
            class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 border border-[#1e293b] rounded-lg"
          >
            ถัดไป &gt;
          </button>
        </div>
      </div>

    </div>

    <!-- Transaction Detail Modal -->
    <div v-if="selectedTx" class="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4" @click.self="selectedTx = null">
      <div class="bg-white border-4 border-[#1e293b] rounded-3xl p-6 max-w-sm w-full text-left shadow-[8px_8px_0px_#1e293b] relative">
        <button @click="selectedTx = null" class="absolute top-3 right-3 p-1 bg-slate-100 hover:bg-slate-200 border border-[#1e293b] rounded-full">
          <X class="w-5 h-5 text-[#1e293b]" />
        </button>

        <div class="text-xs font-extrabold uppercase text-pink-600 tracking-wider mb-1">รายละเอียดสลิปการบริจาค</div>
        <h3 class="text-xl font-extrabold text-[#1e293b] mb-4 font-['Chakra_Petch'] flex items-center gap-2">
          <span>{{ selectedTx.supporterName }}</span>
        </h3>

        <div class="space-y-2.5 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-xs text-slate-800 font-medium">
          <div class="flex justify-between items-center pb-2 border-b border-slate-200">
            <span class="text-slate-500">ยอดเงินบริจาค:</span>
            <span class="text-lg font-extrabold text-emerald-600 font-mono">฿{{ formatMoney(selectedTx.amount) }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-slate-500">รหัสทำรายการ:</span>
            <span class="font-mono text-slate-900 font-bold">{{ selectedTx.id }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-slate-500">วัน-เวลา:</span>
            <span class="font-mono text-slate-900">{{ selectedTx.timestamp }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-slate-500">ช่องทาง:</span>
            <span class="font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">{{ selectedTx.paymentChannel || 'SCB PromptPay' }}</span>
          </div>

          <div v-if="selectedTx.slipRef" class="flex justify-between items-center">
            <span class="text-slate-500">เลขสลิปอ้างอิง:</span>
            <span class="font-mono text-slate-900">{{ selectedTx.slipRef }}</span>
          </div>

          <div v-if="selectedTx.note" class="pt-2 border-t border-slate-200">
            <span class="text-slate-500 block mb-1">ข้อความให้กำลังใจ:</span>
            <p class="p-2 bg-white rounded border border-slate-300 italic text-slate-800">
              "{{ selectedTx.note }}"
            </p>
          </div>
        </div>

        <button @click="selectedTx = null" class="mt-4 w-full py-2 bg-[#1e293b] text-white font-bold text-xs rounded-xl">
          ปิดหน้าต่าง
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { filteredTransactions } from '../store/donationStore';
import { DonationTransaction } from '../types';
import { ListOrdered, Inbox, CheckCircle2, X } from 'lucide-vue-next';

const currentPage = ref(1);
const pageSize = ref(10);
const selectedTx = ref<DonationTransaction | null>(null);

function formatMoney(val: number): string {
  return new Intl.NumberFormat('th-TH').format(val);
}

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / pageSize.value) || 1;
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredTransactions.value.slice(start, start + pageSize.value);
});
</script>
