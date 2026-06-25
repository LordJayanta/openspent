import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../../theme/store/useThemeStore';

type Props = {
    children?: React.ReactNode,
    onClose: () => void,
    isOpen: boolean,
    title?: string,
}

export default function OSModal({ children, onClose, isOpen, title }: Props) {
    const styles = useStyle();

    return (
        <View>
            <Modal
                visible={isOpen}
                onRequestClose={onClose}
                transparent
                animationType='slide'
            >
                <Pressable style={styles.extraSpace} onPress={onClose} />
                <View style={styles.modalContainer} >
                    {title && <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                    </View>}
                    <View style={{flex: 1}} >
                        {children}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const useStyle = () => {
    const { COLORS, TYPOGRAPHY } = useThemeStore();

    return StyleSheet.create({
        extraSpace: {
            flex: 1,
        },
        modalContainer: {
            height: '60%',
            width: '100%',
            paddingTop: 16,
            paddingHorizontal: 24,
            backgroundColor: COLORS.background.floating,
            position: 'absolute',
            bottom: 0,
            borderTopEndRadius: 24,
            borderTopStartRadius: 24
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
        },
        modalTitle: {
            color: COLORS.text.primary,
            fontSize: TYPOGRAPHY.body.md,
            textTransform: 'uppercase',
        },
    })
}