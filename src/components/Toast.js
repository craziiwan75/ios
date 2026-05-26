import React, { useEffect, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme as t } from '../theme';

const TONES = {
  success: { bg: t.success, icon: 'checkmark-circle-outline' },
  error:   { bg: t.error,   icon: 'warning-outline' },
  info:    { bg: t.text,    icon: 'information-circle-outline' },
};

export default function Toast({ toast }) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (toast) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: -20, duration: 180, useNativeDriver: true }),
      ]).start();
    }
  }, [toast]);

  if (!toast) return null;
  const tone = TONES[toast.kind] || TONES.info;

  return (
    <Animated.View style={{
      position: 'absolute',
      top: insets.top + 12,
      left: 16, right: 16,
      zIndex: 999,
      opacity,
      transform: [{ translateY }],
      pointerEvents: 'none',
    }}>
      <View style={{
        backgroundColor: tone.bg,
        borderRadius: t.radius,
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
      }}>
        <Ionicons name={tone.icon} size={18} color="#fff" />
        <Text style={{ fontSize: 14, fontWeight: '500', color: '#fff', flex: 1 }}>
          {toast.text}
        </Text>
      </View>
    </Animated.View>
  );
}
