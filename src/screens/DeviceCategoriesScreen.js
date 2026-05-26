import React from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { SkeletonRow } from '../components/Skeleton';
import { theme as t } from '../theme';

export default function DeviceCategoriesScreen({ navigation }) {
  const { categories, devices, deleteCategory, showAlert, showToast } = useApp();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);

  const total = devices.length;
  const inUse = devices.filter(d => d.status === '在用').length;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); showToast('已刷新', 'success'); }, 800);
  };

  const askDeleteCat = async (cat) => {
    if (cat.count > 0) {
      showToast(`分类下有 ${cat.count} 台设备，无法删除`, 'error');
      return;
    }
    const ok = await showAlert({
      title: `删除分类「${cat.name}」？`,
      message: '该分类下没有设备，可以安全删除。',
      confirm: '删除', cancel: '取消', danger: true,
    });
    if (ok) deleteCategory(cat.id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16, paddingBottom: 6, backgroundColor: t.bg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 12, color: t.text3, marginBottom: 2 }}>资产 · 设备</Text>
            <Text style={{ fontSize: 28, fontWeight: '700', color: t.text, letterSpacing: -0.5 }}>设备分类</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('DeviceForm', { mode: 'create' })}
            style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: t.primary, alignItems: 'center', justifyContent: 'center',
              shadowColor: t.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 8,
            }}
          >
            <Ionicons name="add-outline" size={22} color={t.onPrimary} />
          </TouchableOpacity>
        </View>

        {/* Stats strip */}
        <View style={{
          marginTop: 14, padding: 16, borderRadius: t.radius,
          backgroundColor: t.primary,
        }}>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', letterSpacing: 0.5 }}>资产总览</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 14, marginTop: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#fff' }}>{total}</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>台设备</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#fff' }}>{categories.length}</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>个分类</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text style={{ fontSize: 28, fontWeight: '700', color: '#fff' }}>{inUse}</Text>
              <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>在用</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={{ fontSize: 11, color: t.text3, paddingHorizontal: 20, paddingVertical: 12, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' }}>
        全部分类
      </Text>

      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={t.primary} />}
        contentContainerStyle={{ marginHorizontal: 16, backgroundColor: t.card, borderRadius: t.radius, borderWidth: 0.5, borderColor: t.border, overflow: 'hidden', paddingBottom: 20 }}
        renderItem={({ item: cat, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DeviceList', { catId: cat.id })}
            style={{
              flexDirection: 'row', alignItems: 'center', gap: 12,
              paddingVertical: 14, paddingHorizontal: 14,
              borderBottomWidth: index < categories.length - 1 ? 0.5 : 0,
              borderBottomColor: t.divider,
            }}
            activeOpacity={0.7}
          >
            <View style={{
              width: 40, height: 40, borderRadius: 10,
              backgroundColor: cat.color + '22',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Ionicons name="folder-outline" size={22} color={cat.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>{cat.name}</Text>
              <Text style={{ marginTop: 2, fontSize: 12, color: t.text3 }}>{cat.desc}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: t.text }}>{cat.count}</Text>
              <Text style={{ fontSize: 10.5, color: t.text3 }}>台设备</Text>
            </View>
            <TouchableOpacity onPress={() => askDeleteCat(cat)} hitSlop={8} style={{ marginLeft: 4 }}>
              <Ionicons name="trash-outline" size={18} color={t.text3} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
