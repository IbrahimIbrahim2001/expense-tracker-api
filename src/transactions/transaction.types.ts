export const TransactionTypes = ['expense', 'income'] as const;
export type TransactionType = typeof TransactionTypes[number];

export const Categories = ["food", "transport", "shopping", "bills", "entertainment", "health", "education", "travel", "groceries", "salary", "other"] as const;
export type Category = typeof Categories[number];

export const PaymentMethods = ["cash", "card", "bank account"] as const;
export type PaymentMethod = typeof PaymentMethods[number];