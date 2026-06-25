import DetailItem from '@/src/features/transactions/components/details/details-items';
import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore';
import { TransactionType } from '@/src/features/transactions/types/types';
import AppBar from '@/src/shared/components/ui/app-bar';
import Container from '@/src/shared/components/ui/container';
import Section from '@/src/shared/components/ui/section';
import { useGlobalStyle } from '@/src/shared/styles/globalStyle';
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { formatDisplayDate, formatDisplayTime } from '@/src/shared/utils/formatTime';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TransactionDetailScreen() {
    const { id } = useLocalSearchParams();

    const transaction = useTransactionStore((state) => state.transactions.find((t) => t.id === Number(id)));

    const createdAtStr = String(transaction?.created_at || '');
    const date = createdAtStr && !isNaN(Date.parse(createdAtStr)) ? new Date(createdAtStr) : new Date();

    const { COLORS } = useThemeStore();
    const globalStyles = useGlobalStyle();
    const styles = useStyles();


    const { deleteTransaction } = useTransactionStore();

    const handleDelete = async (id: TransactionType['id']) => {
        try {
            Alert.alert("Delete Transaction", "Are you want to delete This Transaction ?", [
                { text: "Cancel", style: "destructive" },
                {
                    text: "Delete", style: "default", onPress: async () => {
                        await deleteTransaction(id);
                        router.back();
                    }
                },
            ])
        } catch (error) {
            Alert.alert("Error", "Failed to delete Transaction")
            console.error("Error Deleting Transaction: ", error)
        }
    }

    useEffect(() => {
        if (!id) return router.back();


    }, [id])

    return (
        <View style={globalStyles.baseScreen}>
            {/* TAB */}
            <AppBar
                title='Transaction'
                leftAction={{
                    Icon: 'close-outline',
                    onPress: () => router.back(),
                }}
                rightAction={{
                    Icon: 'trash-outline',
                    size: 24,
                    onPress: () => handleDelete(Number(id)),
                }}
            />

            {/* MAIN */}
            <Section style={{ flex: 1, gap: 20 }}>
                <View style={styles.headerContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name='cash-outline' size={48} color={COLORS.text.primary} />
                    </View>
                    <Text style={styles.title}>{transaction?.title}</Text>
                    <Text style={styles.amount}>-${transaction?.amount}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{transaction?.category}</Text>
                    </View>
                </View>

                <Container style={{ paddingHorizontal: 12, paddingVertical: 4 }}>
                    <DetailItem icon='calendar-outline' name='Date' value={formatDisplayDate(new Date(String(date)))} sparator />
                    <DetailItem icon='time-outline' name='Time' value={formatDisplayTime(new Date(String(date)))} />
                </Container>

                {/* Note */}

                {transaction?.note && (
                    <Container style={styles.noteContainer}>
                        <Ionicons name='document-text-outline' size={20} color={COLORS.text.primary} />
                        <View style={styles.noteTextContainer}>
                            <Text style={styles.noteText}>{transaction?.note}</Text>
                        </View>
                    </Container>
                )}
            </Section>
            <View style={styles.createButtonContainer}>
                <TouchableOpacity style={globalStyles.primaryButton} onPress={() => router.push({
                    pathname: `/(app)/transaction/create`,
                    params: { id: String(transaction?.id) }
                })}>
                    <Text style={[globalStyles.primaryButtonText, { textTransform: "uppercase", color: COLORS.text.primary }]}>Edit and Modify</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const useStyles = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        headerContainer: {
            paddingTop: 24,
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        iconContainer: {
            width: 90,
            height: 90,
            borderRadius: 1000,
            borderWidth: 1,
            borderColor: COLORS.border.subtle,
            backgroundColor: COLORS.surface.lv1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.heading.h4,
        },
        amount: {
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.heading.h1,
        },
        badge: {
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 1000,
            backgroundColor: COLORS.semantic.success.bg,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: COLORS.semantic.success.border,
        },
        badgeText: {
            color: COLORS.semantic.success.base,
            fontSize: TYPOGRAPHY.body.caption,
        },
        noteContainer: {
            paddingHorizontal: 12,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            overflow: 'hidden'
        },
        noteTextContainer: {
            flex: 1,
        },
        noteText: {
            color: COLORS.text.tertiary,
            fontSize: TYPOGRAPHY.body.md,
        },
        createButtonContainer: {
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderTopWidth: 1,
            borderTopColor: COLORS.border.subtle,
        },
    })
}