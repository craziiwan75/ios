import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Pill from '../components/Pill';
import { API_LOGS } from '../data';
import { theme as t } from '../theme';

const METHOD_COLORS = {
  GET:    t.primary,
  POST:   '#10B981',
  PUT:    '#F59E0B',
  DELETE: '#EF4444',
};

const statusTone = (code) => code >= 500 ? 'error' : code >= 400 ? 'warn' : 'success';

const FILTERS = ['全部', '成功', '4xx', '5xx'];

export default function LogsScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState('全部');

  const matches = API_LOGS.filter(l => {
    if (filter === '全部') return true;
    if (filter === '成功') return l.status < 400;
    if (filter === '4xx') return l.status >= 400 && l.status < 500;
    if (filter === '5xx') return l.status >= 500;
    return true;
  });

  const counts = {
    总请求: API_LOGS.length,
    成功: API_LOGS.filter(l => l.status < 400).length,
    错误: API_LOGS.filter(l => l.status >= 400).length,
    '平均': Math.round(API_LOGS.reduce((a, b) => a + b.ms, 0) / API_LOGS.length) + ' ms',
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16, paddingBottom: 6, backgroundColor: t.bg }}>
        <Text style={{ fontSize: 12, color: t.text3, marginBottom: 2 }}>运维 · 监控</Text>
        <Text style={{ fontSize: 28, fontWeight: '700', color: t.text, letterSpacing: -0.5 }}>API 日志</Text>

        {/* Stat cards */}
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
          {Object.entries(counts).map(([k, v]) => (
            <View key={k} style={{
              flex: 1, backgroundColor: t.card, borderRadius: t.radiusSm,
              borderWidth: 0.5, borderColor: t.border,
              paddingVertical: 10, paddingHorizontal: 8, alignItems: 'center',
            }}>
              <Text style={{ fontSize: 17, fontWeight: '700', color: t.text }}>{v}</Text>
              <Text style={{ fontSize: 10, color: t.text3, marginTop: 2 }}>{k}</Text>
            </View>
          ))}
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }} contentContainerStyle={{ gap: 6 }}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f} onPress={() => setFilter(f)}
              style={{
                paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999,
                borderWidth: 0.5,
                borderColor: filter === f ? 'transparent' : t.border,
                backgroundColor: filter === f ? t.primary : t.card,
              }}
            >
              <Text style={{ fontSize: 12.5, fontWeight: '500', color: filter === f ? t.onPrimary : t.text2 }}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={{ fontSize: 11, color: t.text3, paddingHorizontal: 20, paddingVertical: 12, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' }}>
        实时日志 · 今日
      </Text>

      <FlatList
        data={matches}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ marginHorizontal: 16, backgroundColor: t.card, borderRadius: t.radius, borderWidth: 0.5, borderColor: t.border, overflow: 'hidden', paddingBottom: 20 }}
        renderItem={({ item: l, index }) => (
          <View style={{
            padding: 12, paddingHorizontal: 14,
            borderBottomWidth: index < matches.length - 1 ? 0.5 : 0,
            borderBottomColor: t.divider,
            gap: 6,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{
                backgroundColor: (METHOD_COLORS[l.method] || t.text3) + '22',
                paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
                minWidth: 50, alignItems: 'center',
              }}>
                <Text style={{ fontSize: 10.5, fontWeight: '700', color: METHOD_COLORS[l.method] || t.text3, fontFamily: 'monospace', letterSpacing: 0.3 }}>
                  {l.method}
                </Text>
              </View>
              <Text style={{ fontSize: 12.5, color: t.text, fontFamily: 'monospace', flex: 1 }} numberOfLines={1}>
                {l.url}
              </Text>
              <Pill tone={statusTone(l.status)}>{l.status}</Pill>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <Text style={{ fontSize: 10.5, color: t.text3, fontFamily: 'monospace' }}>{l.ts}</Text>
              <Text style={{ fontSize: 10.5, color: t.text3 }}>·</Text>
              <Text style={{ fontSize: 10.5, color: t.text3, fontFamily: 'monospace' }}>{l.ip}</Text>
              <Text style={{ fontSize: 10.5, color: t.text3 }}>·</Text>
              <Text style={{ fontSize: 10.5, color: l.ms > 100 ? t.warn : t.text3, fontFamily: 'monospace' }}>{l.ms} ms</Text>
              {l.err && <Text style={{ fontSize: 11, color: t.error, marginLeft: 'auto' }}>! {l.err}</Text>}
            </View>
          </View>
        )}
      />
    </View>
  );
}
