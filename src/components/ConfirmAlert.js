import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { theme as t } from '../theme';

export default function ConfirmAlert({ config, onResolve }) {
  if (!config) return null;
  return (
    <Modal transparent animationType="fade" visible={!!config}>
      <TouchableWithoutFeedback onPress={() => onResolve(false)}>
        <View style={{
          flex: 1, backgroundColor: 'rgba(15,23,42,0.4)',
          justifyContent: 'center', alignItems: 'center',
          padding: 32,
        }}>
          <TouchableWithoutFeedback>
            <View style={{
              width: '100%', backgroundColor: t.card,
              borderRadius: t.radiusLg,
              overflow: 'hidden',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.25,
              shadowRadius: 24,
              elevation: 16,
            }}>
              <View style={{ padding: 22, alignItems: 'center' }}>
                <Text style={{ fontSize: 17, fontWeight: '700', color: t.text, textAlign: 'center' }}>
                  {config.title}
                </Text>
                {config.message && (
                  <Text style={{ marginTop: 8, fontSize: 13.5, color: t.text2, textAlign: 'center', lineHeight: 20 }}>
                    {config.message}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row', borderTopWidth: 0.5, borderTopColor: t.divider }}>
                <TouchableOpacity
                  onPress={() => onResolve(false)}
                  style={{ flex: 1, height: 48, alignItems: 'center', justifyContent: 'center', borderRightWidth: 0.5, borderRightColor: t.divider }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '500', color: t.text2 }}>
                    {config.cancel || '取消'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onResolve(true)}
                  style={{ flex: 1, height: 48, alignItems: 'center', justifyContent: 'center' }}
                >
                  <Text style={{ fontSize: 15, fontWeight: '700', color: config.danger ? t.error : t.primary }}>
                    {config.confirm || '确认'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
