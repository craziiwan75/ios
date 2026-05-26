import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme as t } from '../theme';

export default function Field({
  label, value, onChangeText, error, hint,
  placeholder, keyboardType, secureTextEntry,
  multiline, suffix, editable = true,
}) {
  const [focused, setFocused] = useState(false);
  const borderColor = error ? t.error : focused ? t.primary : t.border;

  return (
    <View style={{ gap: 6 }}>
      {label && (
        <Text style={{ fontSize: 13, fontWeight: '500', color: t.text2 }}>{label}</Text>
      )}
      <View style={{
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: t.card,
        borderRadius: t.radiusSm,
        borderWidth: 1,
        borderColor,
        paddingHorizontal: 12,
        minHeight: 44,
      }}>
        <TextInput
          value={value || ''}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={t.text3}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            paddingVertical: 10,
            fontSize: 15,
            color: t.text,
            minHeight: multiline ? 80 : undefined,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
        />
        {suffix}
      </View>
      {error ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="warning-outline" size={12} color={t.error} />
          <Text style={{ fontSize: 12, color: t.error }}>{error}</Text>
        </View>
      ) : hint ? (
        <Text style={{ fontSize: 12, color: t.text3 }}>{hint}</Text>
      ) : null}
    </View>
  );
}
