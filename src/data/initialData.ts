import { DonationTransaction, TierGoal, ProjectConfig } from "../types";

export const INITIAL_CONFIG: ProjectConfig = {
  projectName: "GENERAL ELECTION 2026 PROJECT FOR NIYA",
  hashtag: "#NiyaFirstStepToSenbatsu",
  motto: "ONE DREAM • FIRST STEP TO SENBATSU",
  sheetUrl:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQjjo3Gd1VwUWxVHYEy01Rar9ueGqpxeiQtpRR-Q9U1IxD5ew15gf0YQ0KPtyGAbj8XAKO8JXLm_RjF/pub?gid=0&single=true&output=csv",
  autoRefreshInterval: 30,
  targetGoal: 68000,
  bankName: "KBANK",
  accountNumber: "236-1-62262-9",
  accountName: "นาย วัฒนชัย ยิ้มงาม",
  communityLink: "https://line.me/ti/g2/hfQvhsWKm0DCpXR7YZyQ9C4Gd7gk01DBm2Qitg",
  activeBonusTierText: "[NOW]",
  nextBonusTierText: "[NEXT]",
  token: {
    start: 2085,
    price: 68,
    target: 1000, // จำนวน token เป้าหมายที่ต้องการซื้อ
    rechargeTokenLevel: 250, // level ที่จะทบ ทุกๆ 250 token
    rechargeToken: 1000, // ทบให้ 1000 ทุกๆ level
    maxRechargeToken: 4000, // จำนวน token สูงสุดที่ทบให้
    bonusTokens: [500, 1000, 2000, 4000, 8000, (15000-2085)],
    targetAmounts: [3000, 6000, 12000, 24000, 44000, 68000]
  },
};

// export const BONUS_TIER_TEXTS = [
//   'NOT YET BONUS TIER (+' + INITIAL_CONFIG.token.start +' Tokens)',
//   'BONUS TIER 1 (+2,290 Tokens)',
//   'BONUS TIER 2 (+2,880 Tokens)',
//   'BONUS TIER 3 (+4,050 Tokens)',
//   'BONUS TIER 4 (+6,395 Tokens)',
//   'BONUS TIER 5 (+10,300 Tokens)',
//   'SUPER BONUS TIER (+15,000 Tokens)',
//   'COMPLETED +15,000 Tokens'
// ];

export const INITIAL_TIERS: TierGoal[] = [
  {
    level: 0,
    name: "Tier 0",
    targetAmount: 0,
    bonusMultiplier: 0,
    description:
      "เริ่มต้นการเดินทาง " +
      formatMoney(INITIAL_CONFIG.token.start) +
      " Tokens",
    isReached: true,
  },
  {
    level: 1,
    name: "Tier 1",
    targetAmount: INITIAL_CONFIG.token.targetAmounts[0],
    bonusMultiplier: INITIAL_CONFIG.token.bonusTokens[0],
    description:
      "ปลดล็อกโบนัส " +
      formatMoney(INITIAL_CONFIG.token.start) +
      " + " +
      formatMoney(INITIAL_CONFIG.token.bonusTokens[0]) +
      " Tokens",
    isReached: true,
  },
  {
    level: 2,
    name: "Tier 2",
    targetAmount: INITIAL_CONFIG.token.targetAmounts[1],
    bonusMultiplier: INITIAL_CONFIG.token.bonusTokens[1],
    description:
      "ปลดล็อกโบนัส " +
      formatMoney(INITIAL_CONFIG.token.start) +
      " + " +
      formatMoney(INITIAL_CONFIG.token.bonusTokens[1]) +
      " Tokens",
    isReached: true,
  },
  {
    level: 3,
    name: "Tier 3",
    targetAmount: INITIAL_CONFIG.token.targetAmounts[2],
    bonusMultiplier: INITIAL_CONFIG.token.bonusTokens[2],
    description:
      "ปลดล็อกโบนัส " +
      formatMoney(INITIAL_CONFIG.token.start) +
      " + " +
      formatMoney(INITIAL_CONFIG.token.bonusTokens[2]) +
      " Tokens",
    isReached: true,
  },
  {
    level: 4,
    name: "Tier 4",
    targetAmount: INITIAL_CONFIG.token.targetAmounts[3],
    bonusMultiplier: INITIAL_CONFIG.token.bonusTokens[3],
    description:
      "ปลดล็อกโบนัส  " +
      formatMoney(INITIAL_CONFIG.token.start) +
      " + " +
      formatMoney(INITIAL_CONFIG.token.bonusTokens[3]) +
      " Tokens",
    isReached: true,
  },
  {
    level: 5,
    name: "Tier 5",
    targetAmount: INITIAL_CONFIG.token.targetAmounts[4],
    bonusMultiplier: INITIAL_CONFIG.token.bonusTokens[4],
    description:
      "ปลดล็อกโบนัส " +
      formatMoney(INITIAL_CONFIG.token.start) +
      " + " +
      formatMoney(INITIAL_CONFIG.token.bonusTokens[4]) +
      " Tokens",
    isReached: true,
  },
  {
    level: 6,
    name: "Tier 6",
    targetAmount: INITIAL_CONFIG.token.targetAmounts[5],
    bonusMultiplier: INITIAL_CONFIG.token.bonusTokens[5],
    description:
      "SUPER BONUS TIER " +
      formatMoney(INITIAL_CONFIG.token.start) +
      " + " +
      formatMoney(INITIAL_CONFIG.token.bonusTokens[5]) +
      " Tokens",
    isReached: false,
  },
];

export function getActiveBonusTierText(currentAmount: number) {
  let tier = INITIAL_TIERS.map((t) => (t) => {
    if (currentAmount < t.targetAmount) {
      return t.level - 1;
    } else {
      return INITIAL_TIERS.length - 1;
    }
  });

  return BONUS_TIER_TEXTS[tier];
}

export function getNextBonusTierText(currentAmount: number) {
  return getActiveBonusTierText(currentAmount) + 1;
}

function formatMoney(val: number): string {
  return new Intl.NumberFormat("th-TH").format(val);
}

// Sample realistic supporters list to equal 260 supporters & ~156,752 THB total
export const INITIAL_TRANSACTIONS: DonationTransaction[] = [];
/*
export const INITIAL_TRANSACTIONS: DonationTransaction[] = [
  {
    id: 'TX-10260',
    timestamp: '2026-08-01 23:49:12',
    supporterName: 'MONET_OFC_CLUB',
    amount: 15000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801991204',
    note: 'ส่งนีโยโย่วไปถล่มโพล! สู้ๆ นะนีญ่า ♥',
    status: 'verified',
    tierUnlocked: 5
  },
  {
    id: 'TX-10259',
    timestamp: '2026-08-01 23:45:00',
    supporterName: 'P\'Tee_Monet',
    amount: 10000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801882311',
    note: 'One Last Time ต้องที่ 1 เท่านั้น!',
    status: 'verified',
    tierUnlocked: 5
  },
  {
    id: 'TX-10258',
    timestamp: '2026-08-01 23:30:15',
    supporterName: 'โอชิโมเน่ต์ตลอดไป',
    amount: 5000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801773344',
    note: 'เพื่อความฝันของโมเน่ต์ครับ',
    status: 'verified',
    tierUnlocked: 5
  },
  {
    id: 'TX-10257',
    timestamp: '2026-08-01 23:12:00',
    supporterName: 'Monet_Lover_01',
    amount: 3333,
    paymentChannel: 'KBank PromptPay',
    slipRef: '20260801665522',
    note: '3333 เลขมงคล One Last Time',
    status: 'verified'
  },
  {
    id: 'TX-10256',
    timestamp: '2026-08-01 22:50:40',
    supporterName: 'นายไข่ต้ม สายเปย์',
    amount: 8888,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801554433',
    note: 'รวยรวยรวย เพื่อโพลครั้งสุดท้าย',
    status: 'verified'
  },
  {
    id: 'TX-10255',
    timestamp: '2026-08-01 22:30:10',
    supporterName: 'สายลมแห่งรัก',
    amount: 2500,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801443322',
    note: 'ช่วยกันเต็มที่ครับ',
    status: 'verified'
  },
  {
    id: 'TX-10254',
    timestamp: '2026-08-01 22:15:05',
    supporterName: 'แมวส้มข้างบ้าน',
    amount: 1200,
    paymentChannel: 'TrueMoney',
    slipRef: '20260801332211',
    note: 'สมทบทุนค่านมโมเน่ต์',
    status: 'verified'
  },
  {
    id: 'TX-10253',
    timestamp: '2026-08-01 22:00:00',
    supporterName: 'กัปตันม้าเกรซ',
    amount: 12000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801221100',
    note: 'ม้าเกรซพร้อมออกศึก!',
    status: 'verified'
  },
  {
    id: 'TX-10252',
    timestamp: '2026-08-01 21:40:18',
    supporterName: 'มังกรบินปีกแดง',
    amount: 7500,
    paymentChannel: 'KBank PromptPay',
    slipRef: '20260801110099',
    note: 'ส่งพลังให้โมเน่ต์',
    status: 'verified'
  },
  {
    id: 'TX-10251',
    timestamp: '2026-08-01 21:20:00',
    supporterName: 'กุหลาบขาว',
    amount: 3000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801009988',
    note: 'เป็นกำลังใจให้ทีมงานทุกคนครับ',
    status: 'verified'
  },
  {
    id: 'TX-10250',
    timestamp: '2026-08-01 21:00:00',
    supporterName: 'Monet_Smile_FC',
    amount: 5500,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801998877',
    note: 'เพื่อรอยยิ้มของโมเน่ต์',
    status: 'verified'
  },
  {
    id: 'TX-10249',
    timestamp: '2026-08-01 20:30:12',
    supporterName: 'น้องบีเกิ้ล',
    amount: 1500,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801887766',
    note: 'เล็กๆ น้อยๆ ช่วยกันครับ',
    status: 'verified'
  },
  {
    id: 'TX-10248',
    timestamp: '2026-08-01 20:10:05',
    supporterName: 'พี่ชายสายดัน',
    amount: 20000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801776655',
    note: 'จัดไปอีก 20K! สู้ไม่ถอย',
    status: 'verified'
  },
  {
    id: 'TX-10247',
    timestamp: '2026-08-01 19:50:00',
    supporterName: 'Monet_Galaxy',
    amount: 9999,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801665544',
    note: 'สู่จักรวาลโมเน่ต์',
    status: 'verified'
  },
  {
    id: 'TX-10246',
    timestamp: '2026-08-01 19:30:22',
    supporterName: 'คุณชาย 3',
    amount: 6000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801554433',
    note: '#NiyaFirstStepToSenbatsu',
    status: 'verified'
  },
  {
    id: 'TX-10245',
    timestamp: '2026-08-01 19:00:11',
    supporterName: 'โอชิแฝดสยาม',
    amount: 4000,
    paymentChannel: 'KBank PromptPay',
    slipRef: '20260801443322',
    note: 'สู้ๆ น้าา',
    status: 'verified'
  },
  {
    id: 'TX-10244',
    timestamp: '2026-08-01 18:30:00',
    supporterName: 'ป๋าเหน่ง',
    amount: 25000,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801332211',
    note: 'โบนัสออกจัดใหญ่ให่โมเน่ต์',
    status: 'verified'
  },
  {
    id: 'TX-10243',
    timestamp: '2026-08-01 18:00:00',
    supporterName: 'Supporter_260',
    amount: 9033,
    paymentChannel: 'SCB PromptPay',
    slipRef: '20260801221100',
    note: 'ปิดยอดให้ทะลุเป้าหมาย Tier 5!!',
    status: 'verified'
  }
];
*/
