import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { EMPLOYEES, CATEGORIES, DEVICES } from '../data';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState(EMPLOYEES);
  const [categories, setCategories] = useState(CATEGORIES);
  const [devices, setDevices] = useState(DEVICES);

  // Toast
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((text, kind = 'info') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ text, kind });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  // Alert
  const [alertConfig, setAlertConfig] = useState(null);
  const alertResolve = useRef(null);

  const showAlert = useCallback((config) => {
    return new Promise((resolve) => {
      alertResolve.current = resolve;
      setAlertConfig(config);
    });
  }, []);

  const resolveAlert = useCallback((ok) => {
    setAlertConfig(null);
    alertResolve.current?.(ok);
    alertResolve.current = null;
  }, []);

  // Auth
  const login = useCallback((u) => {
    setUser(u);
    showToast(`欢迎回来，${u.name}`, 'success');
  }, [showToast]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // Employee actions
  const addEmployee = useCallback((data) => {
    const id = 'E' + (1050 + Math.floor(Math.random() * 900));
    setEmployees(prev => [{ ...data, id, avatar: '#FCD34D' }, ...prev]);
    showToast('员工已创建', 'success');
  }, [showToast]);

  const updateEmployee = useCallback((data) => {
    setEmployees(prev => prev.map(e => e.id === data.id ? { ...e, ...data } : e));
    showToast('已保存修改', 'success');
  }, [showToast]);

  const deleteEmployee = useCallback((id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    showToast('员工已删除', 'success');
  }, [showToast]);

  // Device actions
  const addDevice = useCallback((data) => {
    const id = 'D' + (2100 + Math.floor(Math.random() * 900));
    const newDevice = { ...data, id, sn: 'SN-NEW-' + Math.floor(Math.random() * 9999) };
    setDevices(prev => [newDevice, ...prev]);
    setCategories(prev => prev.map(c => c.id === data.catId ? { ...c, count: c.count + 1 } : c));
    showToast('设备已添加', 'success');
  }, [showToast]);

  const updateDevice = useCallback((data) => {
    setDevices(prev => prev.map(d => d.id === data.id ? { ...d, ...data } : d));
    showToast('设备已更新', 'success');
  }, [showToast]);

  const deleteCategory = useCallback((id) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('分类已删除', 'success');
  }, [showToast]);

  return (
    <AppContext.Provider value={{
      user, login, logout,
      employees, addEmployee, updateEmployee, deleteEmployee,
      categories, deleteCategory,
      devices, addDevice, updateDevice,
      toast, showToast,
      alertConfig, showAlert, resolveAlert,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
