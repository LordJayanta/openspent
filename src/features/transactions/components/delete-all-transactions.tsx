import Button from '@/shared/components/button';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';
import { useTransactionStore } from '../store/useTransactionStore';

export default function DeleteAllTransactions() {
    const { deleteAllTransactions, transactions } = useTransactionStore();

    return (
        <Button
            text='Delete All Data'
            variant='destructive'
            iconName='trash-outline'
            onPress={() => {
                if (transactions.length === 0) {
                    Alert.alert('Ops!', 'You have No data to delete. Please add some transactions first.');
                    return;
                }

                Alert.alert(
                    "Warning! Delete All Data",
                    "Are you sure you want to delete all transactions ? You can't undo this action.",
                    [
                        { text: "Cancel", style: "default" },
                        { text: "Delete", style: "destructive", onPress: async () => {
                            try {
                                await deleteAllTransactions();
                                setTimeout(() => router.replace('/'), 1200);
                            } catch (error) {
                                Alert.alert("Error", "Failed to delete all transactions")
                                console.error("Error deleting all transactions: ", error);
                            }
                        } },
                    ]
                )
            }}
        />
    )
}