
import { useThemeStore } from '@/shared/theme/store/useThemeStore';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EnterApp({ onPress }: { onPress: () => void }) {
    const styles = useStyles();

    return (
        <View style={{ paddingHorizontal: 24 }}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.button}
            >
                <Text style={styles.text}>Enter App</Text>
            </TouchableOpacity>
        </View>
    )
}

const useStyles = () => {
    const { COLORS } = useThemeStore();
    
    return StyleSheet.create({
        button: {
            height: 54, 
            alignItems: 'center', 
            justifyContent: 'center', 
            borderRadius: 1000, 
            width: '100%', 
            backgroundColor: COLORS.semantic.success.bg,
            borderWidth: 1,
            borderColor: COLORS.semantic.success.border,
        },
        text: {
            color: COLORS.semantic.success.base, 
            fontSize: 16 ,
        }
    })
}