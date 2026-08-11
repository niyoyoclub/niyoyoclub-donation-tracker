<template>
  <div class="bg-[#fefae0] border-4 border-[#1e293b] rounded-3xl p-4 shadow-[8px_8px_0px_#1e293b] text-center relative overflow-hidden">
            
    <!-- Niya Card Header -->
    <div class="bg-pink-500 text-white text-xs font-extrabold uppercase py-1 px-3 rounded-full border border-[#1e293b] inline-block shadow-[2px_2px_0px_#1e293b] mb-3">
      GENERAL ELECTION 2026
    </div>

    <!-- Vector/Illustration Idol Photo Canvas Frame -->
    <div class="relative mx-auto rounded-2xl border-[3px] border-[#1e293b] overflow-hidden bg-gradient-to-b from-pink-200 via-rose-100 to-amber-100 p-2 shadow-inner group">
      <div class="w-full h-64 sm:h-80 rounded-xl bg-pink-100 relative flex flex-col items-center justify-center overflow-hidden border border-pink-300">
          
        <!-- Single Dynamic Image with Transition -->
        <transition name="fade" mode="out-in">
        <img 
          :key="currentImageIndex"
          :src="niyaImages[currentImageIndex]" 
          alt="Niya BNK48"
          class="w-full h-full object-cover" 
        />
        </transition>

        <!-- Slide Indicators -->
        <div class="absolute top-2 right-2 flex gap-1 z-10 bg-[#1e293b]/40 backdrop-blur-sm px-2 py-1 rounded-full">
          <span 
            v-for="(_, index) in niyaImages" 
            :key="'dot-' + index"
            class="h-1.5 rounded-full transition-all duration-300"
            :class="index === currentImageIndex ? 'bg-pink-400 w-3' : 'bg-white/60 w-1.5'"
          ></span>
        </div>

        <!-- Name Overlay Box -->
        <div class="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur p-2 rounded-xl border border-[#1e293b] text-center z-10">
          <div class="text-xs font-black text-[#1e293b] font-['Chakra_Petch']">NIYA BNK48</div>
          <div class="text-[10px] text-pink-600 font-bold">#NiyaFirstStepToSenbatsu</div>
        </div>

      </div>
    </div>

    <!-- Support Note -->
    <div class="mt-4 text-xs font-bold text-slate-700 font-['Prompt']">
      "ขอบคุณทุกๆ คนที่ร่วมเดินทางไปด้วยกันเพื่อส่งน้องนีญ่าเป็นเซ็มบัสซึเพลงหลักครั้งแรก ในครั้งนี้มากๆ นะครับ! ♥"
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import img1 from '/assets/niya_profile.png';
import img2 from '/assets/niya_profile_2.jpg';


// 1. ใส่รายการพาธรูปภาพทั้งหมดที่ต้องการสลับที่นี่
const niyaImages = ref([
  img1,
  img2
]);
const currentImageIndex = ref(0);
let imageTimer = null;

// 2. ตั้งเวลาสลับรูปภาพทุกๆ 3.5 วินาที
onMounted(() => {
  imageTimer = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % niyaImages.value.length
  }, 5000)
})

// 3. คืนค่า Memory เมื่อ Component ถูกทำลาย
onUnmounted(() => {
  if (imageTimer) clearInterval(imageTimer)
}) 
</script>

<style>
/* CSS Animation สำหรับการสลับรูป */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>