import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import Avatar from '../components/Avatar';
import Pill from '../components/Pill';
import Button from '../components/Button';
import { theme as t } from '../theme';

function Section({ title, children }) {
  return (
    <View style={{ marginHorizontal: 16, marginTop: 8 }}>
      <Text style={{ fontSize: 11, color: t.text3, paddingVertical: 6, paddingHorizontal: 4, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' }}>
        {title}
      </Text>
      <View style={{ backgroundColor: t.card, borderRadius: t.radius, borderWidth: 0.5, borderColor: t.border, overflow: 'hidden' }}>
        {children}
      </View>
    </View>
  );
}

function DataRow({ label, value, mono, last }) {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      paddingVertical: 12, paddingHorizontal: 14,
      borderBottomWidth: last ? 0 : 0.5, borderBottomColor: t.divider,
    }}>
      <Text style={{ fontSize: 14, color: t.text2 }}>{label}</Text>
      <Text style={{ marginLeft: 'auto', fontSize: 14, color: t.text, fontWeight: '500', fontFamily: mono ? 'monospace' : undefined }}>
        {value}
      </Text>
    </View>
  );
}

export default function EmployeeDetailScreen({ route, navigation }) {
  const { empId } = route.params;
  const { employees, deleteEmployee, showAlert } = useApp();
  const emp = employees.find(e => e.id === empId);

  if (!emp) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: t.bg }}>
        <Text style={{ color: t.text3 }}>员工不存在</Text>
      </View>
    );
  }

  const askDelete = async () => {
    const ok = await showAlert({
      title: '删除员工？',
      message: `「${emp.name}」的所有数据将被永久删除，操作不可撤销。`,
      confirm: '删除', cancel: '取消', danger: true,
    });
    if (ok) {
      navigation.goBack();
      deleteEmployee(emp.id);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero card */}
      <View style={{
        margin: 16, padding: 20,
        backgroundColor: t.card, borderRadius: t.radius,
        borderWidth: 0.5, borderColor: t.border,
        alignItems: 'center', gap: 10,
      }}>
        <Avatar name={emp.name} color={emp.avatar} size={68} />
        <Text style={{ fontSize: 20, fontWeight: '700', color: t.text }}>{emp.name}</Text>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          <Pill tone="primary">{emp.dept}</Pill>
          <Pill tone="neutral">{emp.title}</Pill>
        </View>
      </View>

      <Section title="基本信息">
        <DataRow label="员工 ID" value={emp.id} mono />
        <DataRow label="姓名" value={emp.name} />
        <DataRow label="年龄" value={`${emp.age} 岁`} />
        <DataRow label="邮箱" value={emp.email} mono last />
      </Section>

      <Section title="任职信息">
        <DataRow label="部门" value={emp.dept} />
        <DataRow label="职位" value={emp.title} />
        <DataRow label="入职日期" value={emp.joined} mono last />
      </Section>

      <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 16, marginTop: 16 }}>
        <Button
          kind="secondary" style={{ flex: 1 }} leftIcon="pencil-outline"
          onPress={() => navigation.navigate('EmployeeForm', { mode: 'edit', empId: emp.id })}
        >编辑资料</Button>
        <Button kind="danger" style={{ flex: 1 }} leftIcon="trash-outline" onPress={askDelete}>
          删除
        </Button>
      </View>
    </ScrollView>
  );
}
