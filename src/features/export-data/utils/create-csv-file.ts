import { Transaction } from "@/src/shared/db/schema";
import { File, Paths } from "expo-file-system";
import Papa from "papaparse";
import { prepareCSVData } from "./prepare-csv-data";

export const createCSVFile = (transactions: Transaction[]) => {
  let fileUri: string | undefined = undefined;

  /**
   * create csv data
   */
  // const data = prepareCSVData(transactions);
  const data =
    Papa.unparse(transactions, {
      header: true,
    }) || prepareCSVData(transactions);

  if (!data) return;

  /**
   * create csv metadata
   */
  const dateTime = new Date()
    .toISOString()
    .replace("T", "-")
    .replaceAll(":", "")
    .split(".")[0];

  const fileName = `openspent-backup-${dateTime}.csv`;

  /**
   * create csv file
   */
  try {
    const csvFile = new File(Paths.cache, fileName);
    csvFile.create();
    csvFile.write(data);

    return csvFile;
  } catch (error) {
    console.error("Error While create CSVFile: ", error);
  }
  return;
};
