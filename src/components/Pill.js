import React from 'react';
import { View, Text } from 'react-native';
import { theme as t } from '../theme';

const tones = {
  success: { bg: t.successSoft, fg: t.success },
  warn:    { bg: t.warnSoft,    fg: t.warn },
  error:   { bg: t.errorSoft,   fg: t.error },
  primary: { bg: t.primarySoft, fg: t.primary },
  neutral: { bg: t.cardAlt,     fg: t.text2 },
};

export default function Pill({ children, tone = 'neutral' }) {
  const c = tones[tone] || tones.neutral;
  return (
    <View style={{
      backgroundColor: c.bg, borderRadius: 999,
      paddingHorizontal: 8, paddingVertical: 2,
      alignSelf: 'flex-start',
    }}>
      <Text style={{ fontSize: 11, fontWeight: '700', color: c.fg, letterSpacing: 0.1 }}>
        {children}
      </Text>
    </View>
  );
}
