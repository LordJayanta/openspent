import { create } from "zustand";
import { Transaction } from "../../../shared/db/schema";
import { getSqliteTimestamp } from "../../../shared/utils/formatTime";
import { sqlite } from "../db/useSqlite";
import { SummaryType, TransactionType } from "../types/types";

type Store = {
  isLoading: boolean;
  summary: SummaryType;
  transactions: Transaction[];

  toggleLoading: () => void;
  calculateSummary: () => void;
  loadDatabase: () => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (transaction: TransactionType) => void;
  deleteTransaction: (id: Transaction["id"]) => void;
  addBulkTransctions: (transactions: Transaction[]) => void;
  deleteAllTransactions: () => void;
};

export const useTransactionStore = create<Store>((set, get) => ({
  isLoading: false,
  summary: { balance: 0, expense: 0, income: 0 },
  transactions: [],

  //  Actions
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),

  calculateSummary: () => {
    const list = get().transactions;

    const income = list
      .filter((t) => t.amount > 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const expense = list
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const balance = income - expense;

    set((state) => ({
      summary: { balance, expense, income },
    }));
  },

  loadDatabase: async () => {
    set({ isLoading: true });

    try {
      const summary = await sqlite.getSummary();
      const transactions = await sqlite.getAllTransactions();

      set((state) => ({ summary, transactions }));
    } catch (error) {
      console.error("Failed to load database: ", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addTransaction: async (transaction: Transaction) => {
    try {
      const resultId = await sqlite.addTransaction({
        title: transaction.title,
        amount: transaction.amount,
        category: transaction.category,
        note: String(transaction.note),
      });

      if (resultId) {
        set((state) => ({
          transactions: [
            { ...transaction, id: resultId, created_at: getSqliteTimestamp() },
            ...state.transactions,
          ],
        }));
      }
      get().calculateSummary();
    } catch (error) {
      console.error("Failed to add transaction: ", error);
    }
  },

  updateTransaction: async (transaction: TransactionType) => {
    try {
      const resultId = await sqlite.updateTransactionById({
        title: transaction.title,
        amount: transaction.amount,
        category: transaction.category,
        note: String(transaction.note),
        id: Number(transaction.id),
      });

      if (Number(resultId) > 0) {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === transaction.id ? transaction : t,
          ),
        }));
        get().calculateSummary();
      }
    } catch (error) {
      console.error("Failed to update transaction: ", error);
    }
  },

  deleteTransaction: async (id: Transaction["id"]) => {
    try {
      await sqlite.deleteTransactionById(Number(id));

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));

      get().calculateSummary();
    } catch (error) {
      console.error("Failed to delete transaction: ", error);
    }
  },

  addBulkTransctions: async (transactions: Transaction[]) => {
    try {
      await sqlite.addBulkTransctions(transactions);

      // Reload from DB to guarantee numeric ids and typed fields
      const fresh = await sqlite.getAllTransactions();
      set({ transactions: fresh });

      get().calculateSummary();
    } catch (error) {
      console.error("Failed to add bulk transactions: ", error);
    }
  },

  deleteAllTransactions: async () => {
    try {
      await sqlite.deleteAllTransactions();
      set({
        transactions: [],
        summary: { income: 0, expense: 0, balance: 0 },
      });
    } catch (error) {
      console.error("Failed to delete all transactions: ", error);
    }
  },
}));
