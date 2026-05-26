import React from 'react';
import { View, Text } from 'react-native';

export default function Avatar({ name = '', color, size = 40 }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: color || '#E7ECFE',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ fontSize: size * 0.4, fontWeight: '700', color: '#0F172A' }}>
        {name.slice(0, 1)}
      </Text>
    </View>
  );
}
