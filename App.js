import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { AppProvider, useApp } from './src/context/AppContext';
import Toast from './src/components/Toast';
import ConfirmAlert from './src/components/ConfirmAlert';
import { theme as t } from './src/theme';

import LoginScreen from './src/screens/LoginScreen';
import EmployeeListScreen from './src/screens/EmployeeListScreen';
import EmployeeDetailScreen from './src/screens/EmployeeDetailScreen';
import EmployeeFormScreen from './src/screens/EmployeeFormScreen';
import DeviceCategoriesScreen from './src/screens/DeviceCategoriesScreen';
import DeviceListScreen from './src/screens/DeviceListScreen';
import DeviceFormScreen from './src/screens/DeviceFormScreen';
import LogsScreen from './src/screens/LogsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyle = {
  headerStyle: { backgroundColor: t.bg },
  headerTintColor: t.primary,
  headerTitleStyle: { fontWeight: '600', color: t.text },
  headerShadowVisible: false,
  headerBackTitleVisible: false,
};

function EmployeeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="EmployeeList"   component={EmployeeListScreen}   options={{ headerShown: false }} />
      <Stack.Screen name="EmployeeDetail" component={EmployeeDetailScreen} options={{ title: '员工详情', ...headerStyle }} />
      <Stack.Screen name="EmployeeForm"   component={EmployeeFormScreen}
        options={({ route }) => ({ title: route.params?.mode === 'edit' ? '编辑员工' : '新增员工', ...headerStyle })} />
    </Stack.Navigator>
  );
}

function DeviceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DeviceCategories" component={DeviceCategoriesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DeviceList"       component={DeviceListScreen}
        options={({ route }) => ({ title: '设备列表', ...headerStyle })} />
      <Stack.Screen name="DeviceForm"       component={DeviceFormScreen}
        options={({ route }) => ({ title: route.params?.mode === 'edit' ? '编辑设备' : '新增设备', ...headerStyle })} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: t.primary,
        tabBarInactiveTintColor: t.text3,
        tabBarStyle: {
          backgroundColor: t.card,
          borderTopWidth: 0.5,
          borderTopColor: t.border,
          height: 82,
          paddingBottom: 4,
        },
        tabBarLabelStyle: { fontSize: 10.5, fontWeight: '500', marginBottom: 4 },
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            Employees: focused ? 'people' : 'people-outline',
            Devices:   focused ? 'desktop' : 'desktop-outline',
            Logs:      focused ? 'list' : 'list-outline',
            Profile:   focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name]} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Employees" component={EmployeeStack} options={{ title: '员工' }} />
      <Tab.Screen name="Devices"   component={DeviceStack}   options={{ title: '设备' }} />
      <Tab.Screen name="Logs"      component={LogsScreen}    options={{ title: '日志' }} />
      <Tab.Screen name="Profile"   component={ProfileScreen} options={{ title: '我的' }} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, toast, alertConfig, resolveAlert } = useApp();
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Main" component={MainTabs} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast toast={toast} />
      <ConfirmAlert config={alertConfig} onResolve={resolveAlert} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}
