import { Transaction } from "@/src/shared/db/schema";

// Definition matching your exact desired UI schema format
export type MonthlyGroup = {
  month: string;
  totalIncome: number;
  totalExpense: number;
  transactions: Transaction[];
  //   transactions: (Transaction & { type: "income" | "expense" })[];
};

export const getGroupedMonthlyTransactions = (transactions: Transaction[]) => {
  if (transactions.length === 0) return [];
  try {
    // Temporary record map for fast hash-grouping
    const groupsMap: Record<string, MonthlyGroup> = {};

    transactions.forEach((row) => {
      // Parse database timestamp string into standard human format (e.g., "Jan 2023")
      if (!row.created_at) return;
      const dateObj = new Date(row?.created_at);
      const monthlyLabel = dateObj.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });

      // Initialize the month container tracking schema if missing
      if (!groupsMap[monthlyLabel]) {
        groupsMap[monthlyLabel] = {
          month: monthlyLabel,
          totalIncome: 0,
          totalExpense: 0,
          transactions: [],
        };
      }

      // Map the exact fields to fit your requested nested item layout
      groupsMap[monthlyLabel].transactions.push(row);

      // Aggregate totals conditionally depending on flow direction
      const amount = Math.abs(row.amount);
      if (row.amount > 0) {
        groupsMap[monthlyLabel].totalIncome += amount;
      } else {
        groupsMap[monthlyLabel].totalExpense += amount;
      }
    });

    // Return values array (Preserves the descending database sort order)
    return Object.values(groupsMap);
  } catch (error) {
    console.error("Failed to grouped timeline data:", error);
    return [];
  }
};
