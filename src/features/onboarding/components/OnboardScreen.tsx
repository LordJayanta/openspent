import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, Text, useWindowDimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

// Base width used for scaling (standard mobile viewport reference)
const BASE_WIDTH = 375;

export default function OnboardScreen({ data }: { data: OnboardingData }) {
    const { title, description, image, imageHeight, message, form } = data;
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const { COLORS } = useThemeStore();
    const styles = useStyle();

    // Clamp scale so large tablets don't blow everything up, and small phones don't shrink too far
    const scale = Math.min(Math.max(width / BASE_WIDTH, 0.85), 1.3);
    const isTablet = width >= 768;

    // Cap image height instead of letting it equal width 1:1 on wide screens
    const resolvedImageHeight = imageHeight
        ? imageHeight * scale
        : Math.min(width, isTablet ? width * 0.55 : width * 0.85);

    const horizontalPadding = Math.max(width * 0.06, 20); // ~34 on a 560-wide reference, scales down/up
    const iconSizeLarge = 36 * scale;
    const iconSizeSmall = 22 * scale;

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
                contentContainerStyle={isTablet ? { maxWidth: 600, alignSelf: 'center', width: '100%' } : undefined}
            >
                {/* Hero Section */}
                <View style={styles.heroContainer}>
                    <Text style={styles.heroTitle}>{title}</Text>
                    <Text style={styles.heroText}>{description}</Text>
                </View>

                <Image
                    source={image}
                    style={[styles.img, {
                        width: '100%',
                        height: resolvedImageHeight,
                        resizeMode: 'contain'
                    }]}
                />

                {form && <View>{form}</View>}

            </KeyboardAwareScrollView>

            {/* message */}
            <View style={{
                paddingHorizontal: horizontalPadding,
                position: 'absolute',
                bottom: insets.bottom + 24,
                width: '100%',
                alignItems: isTablet ? 'center' : 'stretch',
            }}>
                <View style={{ width: '100%', maxWidth: isTablet ? 600 : undefined }}>
                    {message?.type === 'secure'
                        ? <View style={[styles.message, { justifyContent: 'center' }]}>
                            <Ionicons name={'shield-checkmark'}
                                size={iconSizeLarge}
                                color={COLORS.semantic.success.base} />
                            <Text style={styles.messageText}>{message?.text}</Text>
                        </View>
                        : <View style={[styles.message, { justifyContent: 'space-between' }]}>
                            <Ionicons name={'document-attach'}
                                size={iconSizeLarge}
                                color={COLORS.semantic.info.base} />
                            <Text
                                style={styles.messageText}
                                numberOfLines={2}
                            >{message?.text}</Text>
                            <Ionicons name="arrow-forward-circle" size={iconSizeSmall} color={COLORS.semantic.info.base} />
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}