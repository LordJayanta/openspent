import TransactionItem from '@/src/features/transactions/components/transaction-item';
import { useTransactionStore } from '@/src/features/transactions/store/useTransactionStore';
import Container from '@/src/shared/components/ui/container';
import SectionHeader from '@/src/shared/components/ui/section-header';
import React from 'react';
import { View } from 'react-native';

type Props = {
    limit?: number;
}

export default function RecentTransactions({ limit = 3 }: Props) {
    const { transactions } = useTransactionStore();
    return (
        <View style={{ gap: 16, marginBottom: 20 }}>
            <SectionHeader
                title='Recent Transactions'
                redirectPath={'/transactions'}
            />
            <Container style={{ paddingHorizontal: 12, gap: 4 }}>
                {transactions.slice(0, limit).map((tx, index) => (
                    <TransactionItem
                        key={tx.id}
                        transaction={tx}
                        sparator={index !== transactions.length - 1}
                    />
                ))}
            </Container>
        </View>
    )
}
