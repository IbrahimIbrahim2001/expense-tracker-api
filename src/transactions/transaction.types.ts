export const TransactionTypes = ['expense', 'income'] as const;
export type TransactionType = typeof TransactionTypes[number];