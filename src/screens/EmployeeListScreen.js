import React, { useState } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  RefreshControl, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import Pill from '../components/Pill';
import { SkeletonRow } from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import { theme as t } from '../theme';

export default function EmployeeListScreen({ navigation }) {
  const { employees, deleteEmployee, showAlert, showToast } = useApp();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('全部');
  const [refreshing, setRefreshing] = useState(false);
  const [loading] = useState(false);

  const depts = ['全部', ...Array.from(new Set(employees.map(e => e.dept)))];

  const filtered = employees.filter(e => {
    const okFilter = filter === '全部' || e.dept === filter;
    const okSearch = !search || e.name.includes(search) || e.email.includes(search);
    return okFilter && okSearch;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => { setRefreshing(false); showToast('已刷新员工列表', 'success'); }, 900);
  };

  const askDelete = async (emp) => {
    const ok = await showAlert({
      title: '删除员工？',
      message: `「${emp.name}」的所有数据将被永久删除，操作不可撤销。`,
      confirm: '删除', cancel: '取消', danger: true,
    });
    if (ok) deleteEmployee(emp.id);
  };

  const renderItem = ({ item: emp, index }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EmployeeDetail', { empId: emp.id })}
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingVertical: 12, paddingHorizontal: 14,
        borderBottomWidth: index < filtered.length - 1 ? 0.5 : 0,
        borderBottomColor: t.divider,
      }}
      activeOpacity={0.7}
    >
      <Avatar name={emp.name} color={emp.avatar} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 15, fontWeight: '600', color: t.text }}>{emp.name}</Text>
          <Text style={{ fontSize: 11, color: t.text3 }}>· {emp.age}岁</Text>
        </View>
        <Text style={{ marginTop: 2, fontSize: 12.5, color: t.text2 }} numberOfLines={1}>{emp.email}</Text>
        <View style={{ marginTop: 4, flexDirection: 'row', gap: 6 }}>
          <Pill tone="primary">{emp.dept}</Pill>
          <Pill tone="neutral">{emp.title}</Pill>
        </View>
      </View>
      <TouchableOpacity onPress={() => askDelete(emp)} hitSlop={8}>
        <Ionicons name="trash-outline" size={18} color={t.text3} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16, paddingBottom: 8, backgroundColor: t.bg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 12, color: t.text3, marginBottom: 2 }}>HR · 管理</Text>
            <Text style={{ fontSize: 28, fontWeight: '700', color: t.text, letterSpacing: -0.5 }}>员工</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity onPress={onRefresh} style={iconBtnStyle}>
              <Ionicons name="refresh-outline" size={20} color={t.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmployeeForm', { mode: 'create' })}
              style={[iconBtnStyle, { backgroundColor: t.primary, borderColor: 'transparent', shadowColor: t.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 8 }]}
            >
              <Ionicons name="add-outline" size={22} color={t.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={{
          marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 8,
          backgroundColor: t.card, borderRadius: t.radius, paddingHorizontal: 12,
          height: 40, borderWidth: 0.5, borderColor: t.border,
        }}>
          <Ionicons name="search-outline" size={18} color={t.text3} />
          <TextInput
            value={search} onChangeText={setSearch}
            placeholder="搜索姓名 / 邮箱" placeholderTextColor={t.text3}
            style={{ flex: 1, fontSize: 14, color: t.text }}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={16} color={t.text3} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Dept chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }} contentContainerStyle={{ gap: 6, paddingBottom: 2 }}>
          {depts.map(d => (
            <TouchableOpacity
              key={d} onPress={() => setFilter(d)}
              style={{
                paddingHorizontal: 12, paddingVertical: 5, borderRadius: 999,
                borderWidth: 0.5,
                borderColor: filter === d ? 'transparent' : t.border,
                backgroundColor: filter === d ? t.primary : t.card,
              }}
            >
              <Text style={{ fontSize: 12.5, fontWeight: '500', color: filter === d ? t.onPrimary : t.text2 }}>{d}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Count */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 6 }}>
        <Text style={{ fontSize: 12, color: t.text3 }}>
          共 <Text style={{ fontWeight: '700', color: t.text2 }}>{filtered.length}</Text> 名员工
        </Text>
      </View>

      {/* List */}
      {loading ? (
        <View style={{ backgroundColor: t.card, marginHorizontal: 16, borderRadius: t.radius, borderWidth: 0.5, borderColor: t.border, overflow: 'hidden' }}>
          {[0,1,2,3,4].map(i => <SkeletonRow key={i} />)}
        </View>
      ) : filtered.length === 0 ? (
        <EmptyState icon="people-outline" title="没有匹配的员工" hint="试试调整搜索关键词或选择其他部门" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={t.primary} />}
          contentContainerStyle={{ marginHorizontal: 16, backgroundColor: t.card, borderRadius: t.radius, borderWidth: 0.5, borderColor: t.border, overflow: 'hidden', paddingBottom: 20 }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

const iconBtnStyle = {
  width: 36, height: 36, borderRadius: 10,
  backgroundColor: '#fff',
  borderWidth: 0.5, borderColor: '#E4E6EE',
  alignItems: 'center', justifyContent: 'center',
};
