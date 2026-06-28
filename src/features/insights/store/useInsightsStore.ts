import { Transaction } from "@/src/shared/db/schema";
import { create } from "zustand";
import { getGroupedMonthlyTransactions } from "../../transactions/utils/get-grouped-monthly-transactions";

type Store = {
  selectedMonth: string;
  currentBalance: number;
  balance: SummaryStateType;
  income: SummaryStateType;
  expense: SummaryStateType;

  loadMonthlySummary: ({
    month,
    transactions,
  }: {
    month: string;
    transactions: Transaction[];
  }) => void;
};

type SummaryStateType = {
  amount: number;
  percentage: number;
};

type MonthlyData = {
  month: string;
  totalIncome: number;
  totalExpense: number;
  transactions: Transaction[];
};

export const useInsightsStore = create<Store>((set, get) => ({
  selectedMonth: "",
  currentBalance: 0,
  balance: { amount: 0, percentage: 0 },
  income: { amount: 0, percentage: 0 },
  expense: { amount: 0, percentage: 0 },

  loadMonthlySummary: ({
    month,
    transactions,
  }: {
    month: string;
    transactions: Transaction[];
  }) => {
    const selectedMonth =
      month || new Date().toLocaleString("default", { month: "long" });

    if (transactions.length === 0) {
      set({
        selectedMonth,
        currentBalance: 0,
        balance: { amount: 0, percentage: 0 },
        income: { amount: 0, percentage: 0 },
        expense: { amount: 0, percentage: 0 },
      });
      return;
    }

    const groupedMonthlyData = getGroupedMonthlyTransactions(transactions);

    const defaultMonthlyGroup: MonthlyData = {
      month: "",
      totalIncome: 0,
      totalExpense: 0,
      transactions: [],
    };
    const currentMonth: MonthlyData =
      groupedMonthlyData[0] ?? defaultMonthlyGroup;
    const lastMonth: MonthlyData = groupedMonthlyData[1] ?? defaultMonthlyGroup;

    const incomePercentage = lastMonth.totalIncome
      ? Math.round(
          ((currentMonth.totalIncome - lastMonth.totalIncome) /
            lastMonth.totalIncome) *
            100,
        )
      : 0;
    const expensePercentage = lastMonth.totalExpense
      ? Math.round(
          ((currentMonth.totalExpense - lastMonth.totalExpense) /
            lastMonth.totalExpense) *
            100,
        )
      : 0;

    const currentMonthBalance =
      currentMonth.totalIncome - currentMonth.totalExpense;
    const lastMonthBalance = lastMonth.totalIncome - lastMonth.totalExpense;
    const finalBalance = currentMonthBalance + lastMonthBalance;
    const balancePercentage = lastMonthBalance
      ? Math.round(
          ((currentMonthBalance - lastMonthBalance) / lastMonthBalance) * 100,
        )
      : 0;

    set({
      selectedMonth: selectedMonth,
      currentBalance: currentMonthBalance,
      balance: { amount: finalBalance, percentage: balancePercentage },
      income: {
        amount: currentMonth.totalIncome,
        percentage: incomePercentage,
      },
      expense: {
        amount: currentMonth.totalExpense,
        percentage: expensePercentage,
      },
    });
  },
}));
