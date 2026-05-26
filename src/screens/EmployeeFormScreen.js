import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useApp } from '../context/AppContext';
import Field from '../components/Field';
import Button from '../components/Button';
import { theme as t } from '../theme';

const DEPTS = ['研发中心', '市场部', '人力资源部', '财务部', '运营部', '设计部'];

function SegmentField({ label, value, onChange, options }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: t.text2 }}>{label}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {options.map(o => (
          <TouchableOpacity
            key={o} onPress={() => onChange(o)}
            style={{
              paddingHorizontal: 12, paddingVertical: 8, borderRadius: t.radiusSm,
              borderWidth: 0.5,
              borderColor: value === o ? 'transparent' : t.border,
              backgroundColor: value === o ? t.primarySoft : t.card,
            }}
          >
            <Text style={{ fontSize: 13, fontWeight: value === o ? '600' : '500', color: value === o ? t.primary : t.text2 }}>
              {o}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function EmployeeFormScreen({ route, navigation }) {
  const { mode, empId } = route.params;
  const { employees, addEmployee, updateEmployee } = useApp();
  const emp = empId ? employees.find(e => e.id === empId) : null;
  const isEdit = mode === 'edit';

  const [name, setName] = useState(emp?.name || '');
  const [age, setAge] = useState(emp ? String(emp.age) : '');
  const [email, setEmail] = useState(emp?.email || '');
  const [dept, setDept] = useState(emp?.dept || '研发中心');
  const [title, setTitle] = useState(emp?.title || '');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = '姓名不能为空';
    else if (name.length > 20) e.name = '姓名不超过 20 字符';
    const ageN = parseInt(age, 10);
    if (!age) e.age = '年龄不能为空';
    else if (isNaN(ageN) || ageN < 18 || ageN > 60) e.age = '年龄需在 18 ~ 60 之间';
    if (!email.trim()) e.email = '邮箱不能为空';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = '邮箱格式错误';
    if (!title.trim()) e.title = '职位不能为空';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const data = { name, age: parseInt(age, 10), email, dept, title };
      if (isEdit) updateEmployee({ ...emp, ...data });
      else addEmployee(data);
      navigation.goBack();
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View style={{
          backgroundColor: t.card, borderRadius: t.radius,
          borderWidth: 0.5, borderColor: t.border,
          padding: 16, gap: 14,
        }}>
          <Field label="姓名 *" value={name} onChangeText={setName}
                 placeholder="请输入员工姓名" error={errors.name} hint="1 ~ 20 个字符" />
          <Field label="年龄 *" value={age} onChangeText={setAge}
                 placeholder="18 ~ 60" keyboardType="number-pad" error={errors.age} />
          <Field label="邮箱 *" value={email} onChangeText={setEmail}
                 placeholder="name@gongfeng.cn" keyboardType="email-address" error={errors.email} />
          <SegmentField label="部门" value={dept} onChange={setDept} options={DEPTS} />
          <Field label="职位 *" value={title} onChangeText={setTitle}
                 placeholder="如 后端工程师" error={errors.title} />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <Button kind="secondary" style={{ flex: 1 }} onPress={() => navigation.goBack()}>取消</Button>
          <Button kind="primary" style={{ flex: 2 }} onPress={submit} loading={saving}>
            {saving ? '' : isEdit ? '保存修改' : '创建员工'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
