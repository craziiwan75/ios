import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme as t } from '../theme';

const palettes = {
  primary:   { bg: t.primary,     fg: t.onPrimary },
  secondary: { bg: t.card,        fg: t.text,      border: t.border },
  ghost:     { bg: 'transparent', fg: t.primary },
  danger:    { bg: t.error,       fg: '#fff' },
  soft:      { bg: t.primarySoft, fg: t.primary },
};

const sizes = {
  lg: { height: 52, px: 18, fs: 17 },
  md: { height: 44, px: 16, fs: 15 },
  sm: { height: 32, px: 12, fs: 13 },
};

export default function Button({
  children, kind = 'primary', size = 'md',
  onPress, disabled, loading, leftIcon, style = {},
}) {
  const p = palettes[kind] || palettes.primary;
  const s = sizes[size] || sizes.md;
  return (
    <TouchableOpacity
      onPress={disabled || loading ? undefined : onPress}
      activeOpacity={0.75}
      style={[{
        height: s.height,
        paddingHorizontal: s.px,
        borderRadius: t.radius,
        backgroundColor: p.bg,
        borderWidth: p.border ? 1 : 0,
        borderColor: p.border || 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        opacity: disabled ? 0.5 : 1,
      }, style]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={p.fg} />
      ) : (
        <>
          {leftIcon && <Ionicons name={leftIcon} size={16} color={p.fg} />}
          <Text style={{ fontSize: s.fs, fontWeight: '600', color: p.fg }}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
