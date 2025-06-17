import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import PantallaLogin from './src/pantallas/PantallaLogin';
import PantallaRepuestos from './src/pantallas/PantallaRepuestos';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Inicio" 
          component={PantallaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Repuestos" 
          component={PantallaRepuestos}
          options={{ 
            title: 'Gestión de Repuestos',
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
