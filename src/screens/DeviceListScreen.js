import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import Pill from '../components/Pill';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';
import { theme as t } from '../theme';

const statusTone = { '在用': 'success', '闲置': 'neutral', '维修': 'warn', '库存': 'primary' };

export default function DeviceListScreen({ route, navigation }) {
  const { catId } = route.params;
  const { categories, devices } = useApp();
  const category = categories.find(c => c.id === catId);
  const list = devices.filter(d => d.catId === catId);

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <Text style={{ fontSize: 12, color: t.text3, paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 }}>
        共 <Text style={{ fontWeight: '700', color: t.text2 }}>{list.length}</Text> 台 · {category?.desc}
      </Text>

      {list.length === 0 ? (
        <EmptyState
          icon="desktop-outline"
          title="该分类下暂无设备"
          hint="点击右上角 + 添加第一台设备"
          action={
            <Button
              kind="primary" leftIcon="add-outline"
              onPress={() => navigation.navigate('DeviceForm', { mode: 'create', catId })}
            >添加设备</Button>
          }
        />
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item: d }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DeviceForm', { mode: 'edit', deviceId: d.id })}
              style={{
                backgroundColor: t.card, borderRadius: t.radius,
                borderWidth: 0.5, borderColor: t.border,
                padding: 14, flexDirection: 'row', gap: 12, alignItems: 'flex-start',
              }}
              activeOpacity={0.7}
            >
              <View style={{
                width: 44, height: 44, borderRadius: t.radiusSm,
                backgroundColor: t.cardAlt,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Ionicons name="desktop-outline" size={22} color={category?.color || t.text2} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>{d.name}</Text>
                  <Pill tone={statusTone[d.status] || 'neutral'}>{d.status}</Pill>
                </View>
                <Text style={{ marginTop: 3, fontSize: 12.5, color: t.text2 }}>{d.model}</Text>
                <View style={{ marginTop: 6, flexDirection: 'row', gap: 14 }}>
                  <Text style={{ fontSize: 11, color: t.text3 }}>
                    SN · <Text style={{ fontFamily: 'monospace', color: t.text2 }}>{d.sn}</Text>
                  </Text>
                  <Text style={{ fontSize: 11, color: t.text3 }}>
                    使用人 · <Text style={{ color: t.text2 }}>{d.assignee}</Text>
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={t.text3} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
