import Button from '@/shared/components/button';
import { File } from 'expo-file-system';
import { router } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React from 'react';
import { Alert } from 'react-native';
import { useTransactionStore } from '../../transactions/store/useTransactionStore';
import { createCSVFile } from '../utils/create-csv-file';

export default function ExportAndShareButton() {

    const { transactions } = useTransactionStore();

    
    const exportData = async () => {
        
        if (transactions.length === 0) {
            Alert.alert('Ops!', 'You have No data to export. Please add some transactions first.');
            return;
        }

        try {
            const file: File | undefined = createCSVFile(transactions);
            const fileUri = file?.uri;

            // Check if sharing is available on the device
            if (await Sharing.isAvailableAsync() && fileUri) {
                await Sharing.shareAsync(fileUri);
            }

            setTimeout(() => router.back(), 1200);
        } catch (error) {
            Alert.alert("Error", "Failed to export data");
            console.log("ExportData: ", error);
        }
    }

    return (
        <Button
            text='Share Data'
            variant='natural'
            onPress={() => exportData()}
        />
    )
}