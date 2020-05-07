import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';

import { Container } from './styles';

const Record: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const navigation = useNavigation();
  useEffect(() => {
    async function permission(): Promise<void> {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      StatusBar.setHidden(true);
    }
    permission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                padding: 10,
                color: 'white',
              }}
            >
              Virar câmera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
            }}
            onPress={() => {
              StatusBar.setHidden(false);
              navigation.goBack();
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                padding: 10,
                color: 'white',
              }}
            >
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </Container>
  );
};

export default Record;
