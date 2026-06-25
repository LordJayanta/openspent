import { Ionicons } from '@expo/vector-icons'
import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useThemeStore } from '../../theme/store/useThemeStore'
import OSModal from './os-modal'

type Props = {
    onClose: () => void,
    isOpen: boolean,
    items?: Item[],
    title?: string,
    value?: any,
    onChange?: (value: any) => void;
}

type Item = {
    name: string;
    value: string;
}

export default function OSSelect({ items, onClose, isOpen, title='Select', value, onChange}: Props) {
    const { COLORS } = useThemeStore();
    const styles = useStyle();

    const handleValueChange = (value: any) => {
        onChange && onChange(value);
        onClose();
    }

    return (
        <OSModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <FlashList
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={handleValueChange.bind(null, item.value)} style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        {item.value === value && <Ionicons name='ellipse' size={20} color={COLORS.text.accent} />}
                    </TouchableOpacity>
                )}
            />
        </OSModal>
    )
}

const useStyle = () => {
    const { COLORS,TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        itemContainer: {
            paddingHorizontal: 24,
            paddingVertical: 12,
            marginBottom: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: COLORS.background.secondary,
            borderWidth: 1,
            borderRadius: 14,
            borderColor: COLORS.border.default,
        },
        itemText: {
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.body.md,
        },
    })
}