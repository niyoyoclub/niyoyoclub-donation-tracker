export interface DonationTransaction {
  id: string;
  timestamp: string;
  supporterName: string;
  amount: number;
  paymentChannel?: string;
  slipRef?: string;
  note?: string;
  status: 'verified' | 'pending' | 'rejected';
  tierUnlocked?: number;
}

export interface TierGoal {
  level: number;
  name: string;
  targetAmount: number;
  bonusMultiplier: number; // e.g. 0.5 = +50%
  description: string;
  isReached: boolean;
}

export interface ProjectConfig {
  projectName: string;
  hashtag: string;
  motto: string;
  sheetUrl: string;
  autoRefreshInterval: number; // seconds: 0 = off, 10, 30, 60
  targetGoal: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  communityLink: string;
  activeBonusTierText: string;
  nextBonusTierText: string;
}

export interface FilterState {
  search: string;
  minAmount: number | null;
  maxAmount: number | null;
  tier: string;
  paymentChannel: string;
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest' | 'name';
  dateRange: 'all' | 'today' | 'week' | 'month';
}

export interface SupporterLeaderboardItem {
  supporterName: string;
  totalDonated: number;
  transactionCount: number;
  lastDonated: string;
  rank: number;
}
