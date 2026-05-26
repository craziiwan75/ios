import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { theme as t } from '../theme';

export function Skeleton({ width = '100%', height = 14, style = {} }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(anim, { toValue: 0, duration: 700, useNativeDriver: false }),
      ])
    ).start();
  }, []);
  const bg = anim.interpolate({ inputRange: [0, 1], outputRange: [t.cardAlt, t.border] });
  return (
    <Animated.View style={[{ width, height, borderRadius: 6, backgroundColor: bg }, style]} />
  );
}

export function SkeletonRow() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}>
      <Skeleton width={40} height={40} style={{ borderRadius: 20 }} />
      <View style={{ flex: 1, gap: 8 }}>
        <Skeleton width="40%" height={12} />
        <Skeleton width="70%" height={10} />
      </View>
    </View>
  );
}
