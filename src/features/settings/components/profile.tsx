import { COLORS } from '@/src/shared/constant/colors';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useUserStore } from '../../user/store/useUserStore';

export default function Profile() {
    const { name } = useUserStore();
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <View style={styles.image}>
                    <Image
                        source={require('../../../../assets/images/icon.png')}
                        style={{ width: 80, height: 80 }}
                    />
                </View>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.text}>A Opensource Project</Text>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        padding: 24,
        width: '100%',
        borderRadius: 16,
        backgroundColor: COLORS.surface,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        fontFamily: 'Inter',
        color: COLORS.light
    },
    text: {
        fontWeight: "medium",
        fontSize: 14,
        fontFamily: 'Inter',
        color: COLORS.text
    },
});
