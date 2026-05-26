import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme as t } from '../theme';

export default function EmptyState({ icon = 'folder-outline', title, hint, action }) {
  return (
    <View style={{ paddingVertical: 64, paddingHorizontal: 24, alignItems: 'center', gap: 10 }}>
      <View style={{
        width: 72, height: 72, borderRadius: 36,
        backgroundColor: t.cardAlt,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Ionicons name={icon} size={32} color={t.text3} />
      </View>
      <Text style={{ fontSize: 16, fontWeight: '600', color: t.text, marginTop: 4 }}>{title}</Text>
      {hint && (
        <Text style={{ fontSize: 13, color: t.text3, lineHeight: 20, textAlign: 'center', maxWidth: 240 }}>
          {hint}
        </Text>
      )}
      {action && <View style={{ marginTop: 8 }}>{action}</View>}
    </View>
  );
}
