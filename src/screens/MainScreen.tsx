import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import client from '../apis/client';

const MainScreen = () => {
  const [connectionResult, setConnectionResult] = useState('');

  useEffect(() => {
    ping();
  }, []);

  const ping = async () => {
    try {
      const result = await client.ping();

      setConnectionResult(`Appwrite 연결 성공 : ${JSON.stringify(result)}`);
    } catch (error) {
      setConnectionResult(`Appwrite 연결 실패 : ${error}`);
    }
  };

  const handleKakaoLoginClick = () => {};
  const handleNaverLoginClick = () => {};

  return (
    <View style={styles.container}>
      <Button title={'카카오 로그인'} onPress={handleKakaoLoginClick} />
      <Button title={'네이버 로그인'} onPress={handleNaverLoginClick} />

      <Text>{connectionResult}</Text>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
