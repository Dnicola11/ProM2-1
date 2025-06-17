import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function PantallaLogin({ navigation }: any) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarInicioSesion = async () => {
    try {
      const credencialesUsuario = await signInWithEmailAndPassword(auth, correo, contrasena);
      const usuario = credencialesUsuario.user;
      console.log('Usuario conectado:', usuario.email);
      navigation.navigate('Repuestos');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Gestión de Repuestos</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#666"
          value={correo}
          onChangeText={setCorreo}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#666"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />
        <TouchableOpacity style={styles.boton} onPress={manejarInicioSesion}>
          <Text style={styles.textoBoton}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  boton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
