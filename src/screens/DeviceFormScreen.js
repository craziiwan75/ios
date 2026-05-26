import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Modal, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import Field from '../components/Field';
import Button from '../components/Button';
import { theme as t } from '../theme';

const STATUSES = ['在用', '闲置', '维修', '库存'];

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

function CategoryPicker({ value, onChange, options, error }) {
  const [open, setOpen] = useState(false);
  const cur = options.find(o => o.id === value);

  return (
    <View style={{ gap: 6 }}>
      <Text style={{ fontSize: 13, fontWeight: '500', color: t.text2 }}>所属分类 *</Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={{
          height: 44, paddingHorizontal: 12, borderRadius: t.radiusSm,
          borderWidth: 1, borderColor: error ? t.error : t.border,
          backgroundColor: t.card, flexDirection: 'row', alignItems: 'center', gap: 10,
        }}
      >
        {cur ? (
          <>
            <View style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: cur.color + '22', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="folder-outline" size={14} color={cur.color} />
            </View>
            <Text style={{ flex: 1, fontSize: 14, color: t.text }}>{cur.name}</Text>
          </>
        ) : (
          <Text style={{ flex: 1, fontSize: 14, color: t.text3 }}>请选择分类</Text>
        )}
        <Ionicons name="chevron-forward-outline" size={16} color={t.text3} />
      </TouchableOpacity>
      {error && <Text style={{ fontSize: 12, color: t.error }}>{error}</Text>}

      {/* Bottom sheet picker */}
      <Modal transparent animationType="slide" visible={open} onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' }} onPress={() => setOpen(false)} activeOpacity={1}>
          <View style={{ backgroundColor: t.card, borderTopLeftRadius: t.radiusLg, borderTopRightRadius: t.radiusLg, paddingBottom: 28 }}>
            <View style={{ width: 36, height: 4, backgroundColor: t.border, borderRadius: 2, alignSelf: 'center', marginVertical: 12 }} />
            <Text style={{ fontSize: 13, color: t.text3, paddingHorizontal: 16, marginBottom: 8 }}>选择分类</Text>
            {options.map((o, i) => (
              <TouchableOpacity
                key={o.id}
                onPress={() => { onChange(o.id); setOpen(false); }}
                style={{
                  flexDirection: 'row', alignItems: 'center', gap: 10,
                  padding: 14, paddingHorizontal: 16,
                  borderTopWidth: i === 0 ? 0.5 : 0, borderTopColor: t.divider,
                  borderBottomWidth: 0.5, borderBottomColor: t.divider,
                }}
              >
                <View style={{ width: 26, height: 26, borderRadius: 7, backgroundColor: o.color + '22', alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="folder-outline" size={16} color={o.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: t.text }}>{o.name}</Text>
                  <Text style={{ fontSize: 11.5, color: t.text3 }}>{o.desc} · {o.count} 台</Text>
                </View>
                {value === o.id && <Ionicons name="checkmark-outline" size={18} color={t.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default function DeviceFormScreen({ route, navigation }) {
  const { mode, deviceId, catId } = route.params || {};
  const { devices, categories, addDevice, updateDevice } = useApp();
  const device = deviceId ? devices.find(d => d.id === deviceId) : null;
  const isEdit = mode === 'edit';

  const [name, setName] = useState(device?.name || '');
  const [model, setModel] = useState(device?.model || '');
  const [selectedCatId, setSelectedCatId] = useState(device?.catId || catId || categories[0]?.id);
  const [assignee, setAssignee] = useState(device?.assignee || '');
  const [status, setStatus] = useState(device?.status || '在用');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const submit = () => {
    const e = {};
    if (!name.trim()) e.name = '设备名称不能为空';
    if (!selectedCatId) e.catId = '请选择所属分类';
    setErrors(e);
    if (Object.keys(e).length) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      const data = { name, model, catId: selectedCatId, assignee: assignee || '-', status };
      if (isEdit) updateDevice({ ...device, ...data });
      else addDevice(data);
      navigation.goBack();
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View style={{
          backgroundColor: t.card, borderRadius: t.radius,
          borderWidth: 0.5, borderColor: t.border, padding: 16, gap: 14,
        }}>
          <Field label="设备名称 *" value={name} onChangeText={setName} placeholder="如 MacBook Pro 14" error={errors.name} />
          <Field label="型号" value={model} onChangeText={setModel} placeholder="可选，如 M3 Pro / 18GB" />
          <CategoryPicker value={selectedCatId} onChange={setSelectedCatId} options={categories} error={errors.catId} />
          <Field label="使用人" value={assignee} onChangeText={setAssignee} placeholder="部门 / 姓名（可选）" />
          <SegmentField label="状态" value={status} onChange={setStatus} options={STATUSES} />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <Button kind="secondary" style={{ flex: 1 }} onPress={() => navigation.goBack()}>取消</Button>
          <Button kind="primary" style={{ flex: 2 }} onPress={submit} loading={saving}>
            {saving ? '' : isEdit ? '保存修改' : '创建设备'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
