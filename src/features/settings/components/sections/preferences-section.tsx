import { useUserStore } from '@/src/features/user/store/useUserStore';
import OSSelect from '@/src/shared/components/ui/os-select';
import { CURRENCIES } from '@/src/shared/constant/CURRENCIES';
import { themeMap } from '@/src/shared/theme/constants';
import { useThemeStore } from '@/src/shared/theme/store/useThemeStore';
import { IoniconsName } from '@/src/shared/type/type';
import React from 'react';
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

export default function PreferencesSection() {
    const [isOpenThemeModal, setIsOpenThemeModal] = React.useState(false);
    const [isOpenCurrencyModal, setIsOpenCurrencyModal] = React.useState(false);
    const [selectedCurrency, setSelectedCurrency] = React.useState('');

    const { currency, setCurrency, id, currencySymbol } = useUserStore();

    const { setTheme, theme } = useThemeStore();

    const preferenceItems: SettingsListType[] = [
        {
            title: 'Primary Currency',
            iconName: 'cash-outline',
            options: currency ? [`${currency} (${currencySymbol})`] : CURRENCIES.map((item) => item.code),
            onPress: () => setIsOpenCurrencyModal(true),
        },
        {
            title: 'App Theme',
            options: [theme],
            iconName: 'color-palette-outline',
            onPress: () => setIsOpenThemeModal(true),
        },
    ]

    // update currency
    React.useEffect(() => {
        setCurrency(id, selectedCurrency);
    }, [id, setCurrency, selectedCurrency])

    return (
        <SettingContainer iconName='options-outline' title='Preferences'>
            <OSSelect
                isOpen={isOpenThemeModal}
                onClose={() => setIsOpenThemeModal(false)}
                items={themeMap}
                value={theme}
                onChange={setTheme}
            />

            <OSSelect
                isOpen={isOpenCurrencyModal}
                onClose={() => setIsOpenCurrencyModal(false)}
                items={CURRENCIES.map((item) => ({
                    name: `${item.name} (${CURRENCIES.find((i) => i.code === item.code)?.symbol}) `,  // format : Inedian Rupee (₹)
                    value: item.code
                }))}
                value={currency}
                onChange={setSelectedCurrency}
            />



            {preferenceItems.map((item, index) => (
                <SettingItem
                    key={item.title + index}
                    iconName={item.iconName}
                    title={item.title}
                    sparator={index !== preferenceItems.length - 1}
                    onPress={item?.onPress}
                    actionText={item.options[0]}
                >
                    {item.children}
                </SettingItem>
            ))}
        </SettingContainer>
    )
}