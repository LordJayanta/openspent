import Button from '@/src/shared/components/button';
import { Directory, File } from 'expo-file-system';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import { useTransactionStore } from '../../transactions/store/useTransactionStore';
import { createCSVFile } from '../utils/create-csv-file';

export default function ExportAndSaveButton() {

    const { transactions } = useTransactionStore();


    const exportData = async () => {

        if (transactions.length === 0) {
            Alert.alert('Ops!', 'You have No data to export. Please add some transactions first.');
            return;
        }

        try {
            const csvFile: File | undefined = createCSVFile(transactions);
            const fileName = csvFile?.name || `openspent.csv`;


            const selectedDir = await Directory.pickDirectoryAsync();
            if (selectedDir) {
                const fileContent = await csvFile?.text() as string;

                const targetFile = selectedDir.createFile(fileName, fileContent);
                await targetFile.write(fileContent);

                setTimeout(() => {
                    Alert.alert("Success", "Backup saved successfully");
                    router.back()
                }, 1200);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to export data");
            console.log("ExportData: ", error);
        }
    }

    return (
        <Button
            text='Save Data'
            variant='natural'
            onPress={() => exportData()}
        />
    )
}