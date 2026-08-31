import { Transaction } from "@/shared/db/schema";

/**
 * # Create CSV Data
 * - from transaction
 */
export const prepareCSVData = (transactions: Transaction[]) => {
  if (transactions.length === 0) {
    return "id,title,amount,category,note,created_at\n";
  }

  const headers =
    Object.keys(transactions[0]).join(",").concat("\n") ||
    "id,title,amount,category,note,created_at\n";

  const data = transactions
    .map(
      (item) =>
        `${item.id},${item.title},${item.amount},${item.category},${item.note},${item.created_at}`,
    )
    .join("\n");

  const csvData = headers.concat(data);

  return csvData;
};
