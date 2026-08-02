import { reactive, ref, computed } from 'vue';
import { DonationTransaction, TierGoal, ProjectConfig, FilterState, SupporterLeaderboardItem } from '../types';
import { INITIAL_CONFIG, INITIAL_TIERS, INITIAL_TRANSACTIONS, BONUS_TIER_TEXTS } from '../data/initialData';
import { format } from 'date-fns';

// Reactive State
export const state = reactive<{
  transactions: DonationTransaction[];
  tiers: TierGoal[];
  config: ProjectConfig;
  filters: FilterState;
}>({
  transactions: [...INITIAL_TRANSACTIONS],
  tiers: [...INITIAL_TIERS],
  config: { ...INITIAL_CONFIG },
  filters: {
    search: '',
    minAmount: null,
    maxAmount: null,
    tier: 'all',
    paymentChannel: 'all',
    sortBy: 'newest',
    dateRange: 'all',
  },
});

const now = new Date();

export const isLoading = ref(false);
export const isSyncing = ref(false);
export const lastUpdate = ref<string>(format(now, "dd MMM yyyy '•' HH:mm"));
export const error = ref<string | null>(null);
export const isDemoMode = ref(false);

// Helper date formatter
function formatCurrentTimestamp(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} • ${hours}:${minutes}`;
}

// Computed Metrics
export const totalAmount = computed(() => {
  return state.transactions
    .filter(t => t.status === 'verified')
    .reduce((sum, t) => sum + t.amount, 0);
});

export const activeBonusTierMultiplier = computed(() => {
  const currentTotal = totalAmount.value;
  let multiplier = 0;
  for (const tier of state.tiers) {
    if (currentTotal >= tier.targetAmount && tier.bonusMultiplier > multiplier) {
      multiplier = tier.bonusMultiplier;
    }
  }
  return multiplier;
});

export const effectiveAmount = computed(() => {
  return Math.round(totalAmount.value * (1 + activeBonusTierMultiplier.value));
});

export const totalSupporters = computed(() => {
  // If in demo mode with sample data, offset to represent 260 supporters as shown in design
  const uniqueNames = new Set(state.transactions.map(t => t.supporterName.trim().toLowerCase())).size;
  // if (isDemoMode.value && state.transactions.length <= 20) {
  //   return Math.max(260, uniqueNames + 242);
  // }
  return uniqueNames;
});

export const remainingAmount = computed(() => {
  const rem = state.config.targetGoal - totalAmount.value;
  return rem > 0 ? rem : 0;
});

export const progressPercent = computed(() => {
  if (state.config.targetGoal <= 0) return 0;
  const pct = (totalAmount.value / state.config.targetGoal) * 100;
  return Math.min(100, Math.round(pct * 10) / 10);
});

export const currentTierLevel = computed(() => {
  const total = totalAmount.value;
  let level = 1;
  for (const tier of state.tiers) {
    if (total >= tier.targetAmount) {
      level = tier.level;
    }
  }
  return level;
});

export const currentTierObject = computed(() => {
  const lvl = currentTierLevel.value;
  return state.tiers.find(t => t.level === lvl) || state.tiers[0];
});

export const currentTierText = computed(() => {
  return BONUS_TIER_TEXTS[currentTierObject.value];
});

export const nextTierText = computed(() => {
  return BONUS_TIER_TEXTS[currentTierObject.value + 1];
});

// Reactive Filtering & Sorting
export const filteredTransactions = computed(() => {
  let list = [...state.transactions];

  // Search Filter
  if (state.filters.search.trim()) {
    const q = state.filters.search.toLowerCase().trim();
    list = list.filter(t =>
      t.supporterName.toLowerCase().includes(q) ||
      (t.note && t.note.toLowerCase().includes(q)) ||
      (t.slipRef && t.slipRef.toLowerCase().includes(q)) ||
      t.id.toLowerCase().includes(q)
    );
  }

  // Tier Filter
  if (state.filters.tier !== 'all') {
    const tierLvl = parseInt(state.filters.tier, 10);
    if (!isNaN(tierLvl)) {
      list = list.filter(t => t.tierUnlocked === tierLvl || (t.amount >= 10000 && tierLvl === 5));
    }
  }

  // Payment Channel Filter
  if (state.filters.paymentChannel !== 'all') {
    list = list.filter(t => t.paymentChannel === state.filters.paymentChannel);
  }

  // Amount Range
  if (state.filters.minAmount !== null && !isNaN(state.filters.minAmount)) {
    list = list.filter(t => t.amount >= state.filters.minAmount!);
  }
  if (state.filters.maxAmount !== null && !isNaN(state.filters.maxAmount)) {
    list = list.filter(t => t.amount <= state.filters.maxAmount!);
  }

  // Sort
  list.sort((a, b) => {
    if (state.filters.sortBy === 'newest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (state.filters.sortBy === 'oldest') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    } else if (state.filters.sortBy === 'highest') {
      return b.amount - a.amount;
    } else if (state.filters.sortBy === 'lowest') {
      return a.amount - b.amount;
    } else if (state.filters.sortBy === 'name') {
      return a.supporterName.localeCompare(b.supporterName, 'th');
    }
    return 0;
  });

  return list;
});

// Leaderboard Supporters Aggregation
export const topSupporters = computed<SupporterLeaderboardItem[]>(() => {
  const map = new Map<string, { total: number; count: number; lastDate: string; name: string }>();

  for (const t of state.transactions) {
    if (t.status !== 'verified') continue;
    const name = t.supporterName.trim();
    const key = name.toLowerCase();

    if (!map.has(key)) {
      map.set(key, { total: t.amount, count: 1, lastDate: t.timestamp, name });
    } else {
      const item = map.get(key)!;
      item.total += t.amount;
      item.count += 1;
      if (new Date(t.timestamp) > new Date(item.lastDate)) {
        item.lastDate = t.timestamp;
      }
    }
  }

  const sorted = Array.from(map.values())
    .sort((a, b) => b.total - a.total)
    .map((item, index) => ({
      supporterName: item.name,
      totalDonated: item.total,
      transactionCount: item.count,
      lastDonated: item.lastDate,
      rank: index + 1,
    }));

  return sorted;
});

// CSV Line Parser
function parseCSV(csvText: string): DonationTransaction[] {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  // Helper to split CSV row respecting quoted fields
  const parseRow = (text: string) => {
    const result: string[] = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        result.push(cur.trim().replace(/^"|"$/g, ''));
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim().replace(/^"|"$/g, ''));
    return result;
  };

  const headers = parseRow(lines[0]).map(h => h.toLowerCase());

  // Find column indexes
  const timeIdx = headers.findIndex(h => h.includes('time') || h.includes('เวลา') || h.includes('date'));
  const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('ชื่อ') || h.includes('supporter') || h.includes('ผู้บริจาค'));
  const amountIdx = headers.findIndex(h => h.includes('amount') || h.includes('จำนวน') || h.includes('ยอด') || h.includes('baht'));
  const noteIdx = headers.findIndex(h => h.includes('note') || h.includes('หมายเหตุ') || h.includes('ข้อความ'));
  const channelIdx = headers.findIndex(h => h.includes('channel') || h.includes('ช่องทาง') || h.includes('bank'));
  const refIdx = headers.findIndex(h => h.includes('ref') || h.includes('สลิป') || h.includes('slip'));

  const parsed: DonationTransaction[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseRow(lines[i]);
    if (cols.length === 0) continue;

    const rawAmount = amountIdx !== -1 && cols[amountIdx] ? cols[amountIdx] : cols[2] || '0';
    const amountNum = parseFloat(rawAmount.replace(/[^0-9.]/g, '')) || 0;

    if (amountNum <= 0) continue;

    const rawName = nameIdx !== -1 && cols[nameIdx] ? cols[nameIdx] : (cols[1] || `Supporter #${i}`);
    const rawTime = timeIdx !== -1 && cols[timeIdx] ? cols[timeIdx] : new Date().toISOString().replace('T', ' ').substring(0, 19);
    const rawNote = noteIdx !== -1 && cols[noteIdx] ? cols[noteIdx] : '';
    const rawChannel = channelIdx !== -1 && cols[channelIdx] ? cols[channelIdx] : 'SCB PromptPay';
    const rawRef = refIdx !== -1 && cols[refIdx] ? cols[refIdx] : `REF-${Date.now()}-${i}`;

    parsed.push({
      id: `GS-${i}-${Date.now().toString().slice(-4)}`,
      timestamp: rawTime,
      supporterName: rawName || 'ผู้บริจาคใจดี',
      amount: amountNum,
      paymentChannel: rawChannel,
      slipRef: rawRef,
      note: rawNote,
      status: 'verified',
    });
  }

  return parsed;
}

// Actions
export async function fetchFromGoogleSheet(customUrl?: string) {
  const targetUrl = customUrl || state.config.sheetUrl;
  if (!targetUrl) return;

  isSyncing.value = true;
  error.value = null;

  try {
    const proxyUrl = `/api/sheets-proxy?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl);

    if (!res.ok) {
      throw new Error(`Proxy error ${res.status}: ${res.statusText}`);
    }

    const csvData = await res.text();
    const transactionsFromSheet = parseCSV(csvData);

    if (transactionsFromSheet.length > 0) {
      state.transactions = transactionsFromSheet;
      isDemoMode.value = false;
      lastUpdate.value = formatCurrentTimestamp();
    } else {
      console.warn('Google Sheet returned 0 valid parsed rows, keeping current state.');
    }
  } catch (err: any) {
    console.error('Failed to sync Google Sheet:', err);
    error.value = `ไม่สามารถดึงข้อมูลจาก Google Sheet ได้: ${err.message || err}`;
  } finally {
    isSyncing.value = false;
  }
}

export function addManualTransaction(tx: Omit<DonationTransaction, 'id' | 'status'>) {
  const newTx: DonationTransaction = {
    ...tx,
    id: `TX-${Date.now().toString().slice(-5)}`,
    status: 'verified',
  };
  state.transactions.unshift(newTx);
  lastUpdate.value = formatCurrentTimestamp();
}

export function updateConfig(newConfig: Partial<ProjectConfig>) {
  Object.assign(state.config, newConfig);
}

export function resetToDemoData() {
  state.transactions = [...INITIAL_TRANSACTIONS];
  state.tiers = [...INITIAL_TIERS];
  state.config = { ...INITIAL_CONFIG };
  isDemoMode.value = true;
  lastUpdate.value = formatCurrentTimestamp();
  error.value = null;
}

export function exportTransactionsCSV() {
  const headers = ['ID', 'Timestamp', 'Supporter Name', 'Amount (THB)', 'Payment Channel', 'Slip Ref', 'Note', 'Status'];
  const rows = state.transactions.map(t => [
    t.id,
    `"${t.timestamp}"`,
    `"${t.supporterName.replace(/"/g, '""')}"`,
    t.amount,
    `"${t.paymentChannel || ''}"`,
    `"${t.slipRef || ''}"`,
    `"${t.note ? t.note.replace(/"/g, '""') : ''}"`,
    t.status
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Monet_Donations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
