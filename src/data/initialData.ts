import { DonationTransaction, TierGoal, ProjectConfig } from '../types';

export const INITIAL_CONFIG: ProjectConfig = {
  projectName: 'GENERAL ELECTION PROJECT FOR NIYA',
  hashtag: '#NiyaFirstStepToSenbatsu',
  motto: 'ONE DREAM • FIRST STEP TO SENBATSU',
  sheetUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT_MONET_ELECTION_2026/pub?output=csv',
  autoRefreshInterval: 30,
  targetGoal: 68000,
  bankName: 'KBNK',
  accountNumber: '236-1-62262-9',
  accountName: 'นาย วัฒนชัย ยิ้มงาม',
  communityLink: 'https://line.me/ti/g2/hfQvhsWKm0DCpXR7YZyQ9C4Gd7gk01DBm2Qitg',
  activeBonusTierText: '[NOW] BONUS TIER 5 (DONATION +50%)',
  nextBonusTierText: 'BONUS TIER 6 (DONATION +100%)',
};

export const INITIAL_TIERS: TierGoal[] = [
  { level: 1, name: 'Tier 1', targetAmount: 3400, bonusMultiplier: 0.1, description: 'เริ่มต้นการเดินทาง 1,330 Tokens', isReached: true },
  { level: 2, name: 'Tier 2', targetAmount: 13600, bonusMultiplier: 0.2, description: 'ปลดล็อกโบนัส 2,660 Tokens', isReached: true },
  { level: 3, name: 'Tier 3', targetAmount: 23800, bonusMultiplier: 0.35, description: 'ปลดล็อกโบนัส 4,655 Tokens', isReached: true },
  { level: 4, name: 'Tier 4', targetAmount: 34000, bonusMultiplier: 0.5, description: 'ปลดล็อกโบนัส  6,650 Tokens', isReached: true },
  { level: 5, name: 'Tier 5', targetAmount: 51000, bonusMultiplier: 0.75, description: 'เป้าหมายหลัก 9,970 Tokens', isReached: true },
  { level: 6, name: 'Tier 6', targetAmount: 68000, bonusMultiplier: 1.0, description: 'SUPER BONUS TIER 13,295 Tokens', isReached: false },
];

// Sample realistic supporters list to equal 260 supporters & ~156,752 THB total
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
