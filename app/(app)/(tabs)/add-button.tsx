import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


export default function AddButton() {
    const { COLORS } = useThemeStore();
    const styles = useStyles();

    return (
        <TouchableOpacity onPress={() => router.push("/(app)/transaction/create")}>
            <LinearGradient
                style={styles.container}
                colors={['#0BAE5D', '#3CD67B']}
            >
                <MaterialIcons name="add" size={25} color={COLORS.text.primary} />
            </LinearGradient>
        </TouchableOpacity>
    )
}


const useStyles = () => {
    return StyleSheet.create({

        container: {
            height: 50,
            width: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1000,
        },
    });
}