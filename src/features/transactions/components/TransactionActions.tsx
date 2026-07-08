import { useThemeStore } from '@/src/shared/theme/store/useThemeStore'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTransactionStore } from '../store/useTransactionStore'
import { TransactionType } from '../types/types'

type Props = {
    data?: any,
    onClose: () => void,
    isOpen: boolean
}
export default function TransactionActions({ data, onClose, isOpen }: Props) {
    const { deleteTransaction } = useTransactionStore();
    const { COLORS } = useThemeStore();

    const handleDelete = async (data: TransactionType) => {
        try {
            Alert.alert("Delete Transaction", "Are you want to delete This Transaction ?", [
                {text: "Cancel", style: "destructive", onPress: onClose},
                {text: "Delete", style: "default", onPress: async () => await deleteTransaction(data?.id)},
            ])
        } catch (error) {
            Alert.alert("Error", "Failed to delete Transaction")
            console.error("Error Deleting Transaction: ", error)
        }
        onClose();
    }

    return (
        <View>
            <Modal animationType='slide' visible={isOpen} transparent >
                <TouchableOpacity style={{ flex: 1, height: '85%' }} onPress={onClose} />
                <View style={styles.container}>
                    <LinearGradient
                        colors={['transparent', '#000000']}
                        style={styles.actionContainer}>
                        <TouchableOpacity
                            onPress={async () => {
                                onClose()
                                router.push({
                                    pathname: '/(app)/transaction/create',
                                    params: {
                                        id: JSON.stringify(data?.id)
                                    },
                                })
                            }}
                            activeOpacity={0.3}
                            style={[styles.iconContainer, { backgroundColor: COLORS.background.tertiary, width: 56, height: 56 }]}
                        >
                            <Ionicons name="pencil-sharp" color={COLORS.semantic.danger.base} size={18} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=> handleDelete(data)}
                            activeOpacity={0.3}
                            style={[styles.iconContainer, { backgroundColor: COLORS.semantic.danger.bg, width: 56, height: 56 }]}
                        >
                            <Ionicons name="trash" color={COLORS.semantic.danger.base} size={18} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '15%',
        position: 'absolute',
        bottom: 0
    },
    actionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24
    },
    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})