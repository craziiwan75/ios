import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
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

function NavRow({ icon, label, detail, onPress, last }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingVertical: 13, paddingHorizontal: 14,
        borderBottomWidth: last ? 0 : 0.5, borderBottomColor: t.divider,
      }}
      activeOpacity={0.7}
    >
      <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: t.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={16} color={t.primary} />
      </View>
      <Text style={{ flex: 1, fontSize: 14, color: t.text }}>{label}</Text>
      {detail ? <Text style={{ fontSize: 12.5, color: t.text3 }}>{detail}</Text> : null}
      <Ionicons name="chevron-forward-outline" size={14} color={t.text3} />
    </TouchableOpacity>
  );
}

function SwitchRow({ icon, label, value, onChange, last }) {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', gap: 12,
      paddingVertical: 13, paddingHorizontal: 14,
      borderBottomWidth: last ? 0 : 0.5, borderBottomColor: t.divider,
    }}>
      <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: t.primarySoft, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={16} color={t.primary} />
      </View>
      <Text style={{ flex: 1, fontSize: 14, color: t.text }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: t.border, true: t.primary }}
        thumbColor="#fff"
        ios_backgroundColor={t.border}
      />
    </View>
  );
}

export default function ProfileScreen() {
  const { user, logout, employees, devices, showAlert } = useApp();
  const insets = useSafeAreaInsets();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    const ok = await showAlert({ title: '确认退出登录？', confirm: '退出', cancel: '取消' });
    if (ok) logout();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: 16, paddingBottom: 6, backgroundColor: t.bg }}>
        <Text style={{ fontSize: 12, color: t.text3, marginBottom: 2 }}>账号</Text>
        <Text style={{ fontSize: 28, fontWeight: '700', color: t.text, letterSpacing: -0.5 }}>我的</Text>
      </View>

      {/* User card */}
      <View style={{
        marginHorizontal: 16, marginTop: 12, padding: 18, borderRadius: t.radius,
        backgroundColor: t.primary, flexDirection: 'row', alignItems: 'center', gap: 14,
      }}>
        <View style={{
          width: 56, height: 56, borderRadius: 28,
          backgroundColor: 'rgba(255,255,255,0.2)',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ fontSize: 22, fontWeight: '700', color: t.onPrimary }}>
            {(user?.name || 'A').slice(0, 1)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: t.onPrimary }}>{user?.name || '管理员'}</Text>
          <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2 }}>
            admin@gongfeng.cn · {user?.role || 'admin'}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.22)' }}>
          <Text style={{ fontSize: 11, color: t.onPrimary, fontWeight: '600' }}>ADMIN</Text>
        </View>
      </View>

      <Section title="管理">
        <NavRow icon="people-outline" label="员工管理" detail={String(employees.length)} />
        <NavRow icon="desktop-outline" label="设备资产" detail={String(devices.length)} />
        <NavRow icon="list-outline" label="API 日志" detail="今日 12 条" last />
      </Section>

      <Section title="偏好">
        <SwitchRow icon="moon-outline" label="暗黑模式" value={darkMode} onChange={setDarkMode} />
        <NavRow icon="notifications-outline" label="消息通知" detail="开启" />
        <NavRow icon="settings-outline" label="账号安全" detail="" last />
      </Section>

      <Section title="关于">
        <NavRow icon="information-circle-outline" label="版本信息" detail="1.4.2 (b2604)" />
        <NavRow icon="person-outline" label="使用条款" detail="" last />
      </Section>

      <View style={{ padding: 16 }}>
        <Button kind="secondary" onPress={handleLogout} leftIcon="log-out-outline" style={{ width: '100%' }}>
          退出登录
        </Button>
      </View>
    </ScrollView>
  );
}
