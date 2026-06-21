import { useSettingStore } from '@/src/features/settings/store/useSettingStore';
import OSSwitch from '@/src/shared/components/ui/os-switch';
import { IoniconsName } from '@/src/shared/type/type';
import React from 'react';
import { Alert } from 'react-native';
import SettingContainer from '../ui/setting-container';
import { SettingItem } from '../ui/setting-item';

type SettingsListType = {
    title: string;
    description?: string;
    iconName: IoniconsName;
    onPress?: () => void;
    actionText?: string;
    children?: React.ReactNode;
    options: string[]
}


export default function SecuritySection() {
    const { isEnableBiometricAuth, enableBiometricAuth, disableBiometricAuth } = useSettingStore();

    const toggleBiometricAuth = () => {
        return isEnableBiometricAuth ? disableBiometricAuth() : enableBiometricAuth();
    }


    const SettingsListItem: SettingsListType[] = [
        {
            title: 'Biometric Unlock',
            description: 'Use FaceID or Fingerprint',
            iconName: 'finger-print-outline',
            options: [],
            children: <OSSwitch value={isEnableBiometricAuth} onValueChange={toggleBiometricAuth} />
        },
    ]

    return (
        <SettingContainer iconName='shield-outline' title='Security'>
            {SettingsListItem.map((item, index) => (
                <SettingItem
                    key={item.title + index}
                    iconName={item.iconName}
                    title={item.title}
                    sparator={index !== SettingsListItem.length - 1}
                    onPress={item.onPress || (() => Alert.alert('Option Comming Soon...!'))}
                    actionText={item.options[0]}
                >
                    {item.children}
                </SettingItem>
            ))}
        </SettingContainer>
    )
}