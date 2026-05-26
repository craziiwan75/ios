import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import Field from '../components/Field';
import Button from '../components/Button';
import { theme as t } from '../theme';

export default function LoginScreen() {
  const { login } = useApp();
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = '请输入用户名';
    if (!password) e.password = '请输入密码';
    else if (password.length < 6) e.password = '密码至少 6 位';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username === 'admin' && password === 'admin123') {
        login({ name: '管理员', role: 'admin' });
      } else {
        setErrors({ password: '账号或密码错误' });
      }
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: t.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 40, paddingHorizontal: 24, paddingBottom: 40, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{
            width: 44, height: 44, borderRadius: t.radius,
            backgroundColor: t.primary,
            alignItems: 'center', justifyContent: 'center',
            shadowColor: t.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.35, shadowRadius: 12,
            elevation: 6,
          }}>
            <Ionicons name="briefcase-outline" size={22} color={t.onPrimary} />
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: t.text, letterSpacing: 0.4 }}>工蜂办公</Text>
            <Text style={{ fontSize: 11, color: t.text3, marginTop: 1 }}>GongFeng · HR Console</Text>
          </View>
        </View>

        {/* Hero */}
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 30, fontWeight: '700', color: t.text, letterSpacing: -0.6, lineHeight: 36 }}>
            欢迎回来
          </Text>
          <Text style={{ marginTop: 8, fontSize: 14, color: t.text2, lineHeight: 22 }}>
            登录管理员账号，继续管理团队成员{'\n'}与办公设备资产。
          </Text>
        </View>

        {/* Form */}
        <View style={{ marginTop: 32, gap: 14 }}>
          <Field
            label="用户名"
            value={username}
            onChangeText={setUsername}
            placeholder="admin"
            error={errors.username}
          />
          <Field
            label="密码"
            value={password}
            onChangeText={setPassword}
            placeholder="至少 6 位"
            secureTextEntry={!showPw}
            error={errors.password}
            suffix={
              <TouchableOpacity onPress={() => setShowPw(v => !v)} style={{ padding: 4 }}>
                <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={18} color={t.text3} />
              </TouchableOpacity>
            }
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => setRemember(v => !v)} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{
                width: 18, height: 18, borderRadius: 4,
                borderWidth: 1.5, borderColor: remember ? t.primary : t.border,
                backgroundColor: remember ? t.primary : 'transparent',
                alignItems: 'center', justifyContent: 'center',
              }}>
                {remember && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <Text style={{ fontSize: 12.5, color: t.text2 }}>记住我（30 天）</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{ fontSize: 12.5, color: t.primary, fontWeight: '500' }}>忘记密码？</Text>
            </TouchableOpacity>
          </View>

          <Button kind="primary" size="lg" onPress={submit} loading={loading} style={{ width: '100%', marginTop: 6 }}>
            {loading ? '' : '登录'}
          </Button>
        </View>

        <View style={{ flex: 1, minHeight: 40 }} />

        {/* Footer */}
        <View style={{ alignItems: 'center', gap: 2, marginTop: 24 }}>
          <Text style={{ fontSize: 11.5, color: t.text3 }}>测试账号 · admin / admin123</Text>
          <Text style={{ fontSize: 11.5, color: t.text3 }}>v 1.4.2 · © 2026 工蜂办公</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
