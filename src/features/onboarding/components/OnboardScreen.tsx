import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Ionicons, } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, Text, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useStyle } from '../assets/styles/style';


export type OnboardingData = {
    id: number;
    title: string;
    description: string;
    image: ImageSourcePropType;
    imageHeight?: number;
    message?: {
        type: 'secure' | 'database';
        text: string;
    };
    form?: React.ReactNode;
}

export default function OnboardScreen({ data }: { data: OnboardingData }) {
    const { title, description, image, imageHeight, message, form } = data;
    const { width } = useWindowDimensions();
    const { COLORS } = useThemeStore();
    const styles = useStyle();

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#0E0E0D',
            height: '100%'
        }}>
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                enableOnAndroid
                extraHeight={100}
            >

                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <Text style={styles.heroTitle}>{title}</Text>
                    <Text style={styles.heroText}>{description}</Text>
                </View>

                <Image
                    source={image}
                    width={width}
                    height={imageHeight ? imageHeight : width}
                    style={[styles.img, {
                        width: width,
                        height: imageHeight || width,
                        resizeMode: 'contain'
                    }]}
                />

                {form && <View>{form}</View>}

            </KeyboardAwareScrollView>
            {/* message */}
            <View style={{
                paddingHorizontal: 34,
                position: 'absolute',
                bottom: 60
            }}>
                {message?.type === 'secure'
                    ? <View style={[styles.message, { justifyContent: 'center' }]}>
                        <Ionicons name={'shield-checkmark'}
                            size={40}
                            color={COLORS.semantic.success.base} />
                        <Text style={styles.messageText}>{message?.text}</Text>
                    </View>
                    : <View style={[styles.message, { justifyContent: 'space-between' }]}>
                        <Ionicons name={'document-attach'}
                            size={40}
                            color={COLORS.semantic.info.base} />
                        <Text style={styles.messageText}>{message?.text}</Text>
                        <Ionicons name="arrow-forward-circle" size={24} color={COLORS.semantic.info.base} />
                    </View>
                }
            </View>

        </View>
    )
}
