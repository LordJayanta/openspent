import Button from '@/shared/components/button';
import { Transaction } from '@/shared/db/schema';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { router } from 'expo-router';
import Papa from 'papaparse';
import React from 'react';
import { Alert } from 'react-native';
import { useTransactionStore } from '../../transactions/store/useTransactionStore';


export default function ImportButton() {

    const { addBulkTransctions } = useTransactionStore();
    const importData = async () => {
        let fileData = undefined;

        try {
            const doc: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
                type: 'text/comma-separated-values',
            })

            /**
             * A Demo response
             * {"assets": [{"lastModified": 1778228878000, "mimeType": "text/comma-separated-values", "name": "openspent-backup-2026-05-08-082727.csv", "size": 186, "uri": "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/c99a75a0-f29c-4c8f-ab5f-99c446636f3b.csv"}], "canceled": false}
             */

            if (doc.canceled) {
                Alert.alert("Failed", "Failed to import data. Try again. and choose a valid CSV file.");
                return;
            }

            try {
                // Read CSV File
                if (Array.isArray(doc.assets)) {
                    const path = doc?.assets[0].uri || doc.assets?.[0]?.uri;

                    const file = new File(path);
                    const data = await file.textSync();

                    fileData = data;
                }

                // Convert CSV-String to JSON-Object
                if (fileData !== undefined) {
                    Papa.parse(fileData, {
                        header: true,
                        complete: async (result) => {
                            await addBulkTransctions(result?.data as Transaction[]);
                            Alert.alert("Success", "Successfully imported data.");
                        }
                    })
                }

                setTimeout(() => router.replace('/'), 1200);
            } catch (error) {
                console.error("CSV Parse Error :", error);
                Alert.alert("Failed", "Faile to parse CSV file. Try again. and choose a valid CSV file.");
            }


        } catch (error) {
            console.error("Import Error :", error);
            Alert.alert("Failed", "Failed to import data. Try again. and choose a valid CSV file.");
        }
    }

    return (
        <Button
            text='Import CSV'
            iconName='document-attach-outline'
            variant='natural'
            onPress={() => importData()}
        />
    )
}