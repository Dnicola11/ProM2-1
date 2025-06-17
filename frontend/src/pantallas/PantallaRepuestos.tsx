import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  TextInput,
  Alert 
} from 'react-native';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';

type Repuesto = {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
};

export default function PantallaRepuestos({ navigation }: any) {
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [repuestoEditando, setRepuestoEditando] = useState<Repuesto | null>(null);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    obtenerRepuestos();
  }, []);

  const obtenerRepuestos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'spareParts'));
      const repuestos: Repuesto[] = [];
      querySnapshot.forEach((doc) => {
        repuestos.push({ id: doc.id, ...doc.data() } as Repuesto);
      });
      setRepuestos(repuestos);
    } catch (error) {
      console.error('Error al obtener repuestos:', error);
      Alert.alert('Error', 'No se pudieron cargar los repuestos');
    }
  };

  const manejarAgregar = async () => {
    try {
      if (!nombre || !cantidad || !precio) {
        Alert.alert('Error', 'Por favor complete todos los campos');
        return;
      }

      const nuevoRepuesto = {
        nombre,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
      };

      await addDoc(collection(db, 'spareParts'), nuevoRepuesto);
      limpiarFormulario();
      obtenerRepuestos();
      setModalVisible(false);
    } catch (error) {
      console.error('Error al agregar repuesto:', error);
      Alert.alert('Error', 'No se pudo agregar el repuesto');
    }
  };

  const manejarEditar = async () => {
    try {
      if (!repuestoEditando || !nombre || !cantidad || !precio) {
        Alert.alert('Error', 'Por favor complete todos los campos');
        return;
      }

      await updateDoc(doc(db, 'spareParts', repuestoEditando.id), {
        nombre,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
      });

      limpiarFormulario();
      obtenerRepuestos();
      setModalVisible(false);
    } catch (error) {
      console.error('Error al actualizar repuesto:', error);
      Alert.alert('Error', 'No se pudo actualizar el repuesto');
    }
  };

  const manejarEliminar = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'spareParts', id));
      obtenerRepuestos();
    } catch (error) {
      console.error('Error al eliminar repuesto:', error);
      Alert.alert('Error', 'No se pudo eliminar el repuesto');
    }
  };

  const limpiarFormulario = () => {
    setNombre('');
    setCantidad('');
    setPrecio('');
    setRepuestoEditando(null);
  };

  const manejarCerrarSesion = () => {
    auth.signOut()
      .then(() => navigation.replace('Inicio'))
      .catch(error => Alert.alert('Error', error.message));
  };

  const abrirModalEditar = (repuesto: Repuesto) => {
    setRepuestoEditando(repuesto);
    setNombre(repuesto.nombre);
    setCantidad(repuesto.cantidad.toString());
    setPrecio(repuesto.precio.toString());
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botonAgregar} onPress={() => setModalVisible(true)}>
          <Text style={styles.textoBotonAgregar}>Agregar Nuevo Repuesto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonCerrarSesion} onPress={manejarCerrarSesion}>
          <Text style={styles.textoBotonCerrarSesion}>Salir</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={repuestos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRepuesto}>
            <View style={styles.infoRepuesto}>
              <Text style={styles.nombreRepuesto}>{item.nombre}</Text>
              <Text style={styles.detallesRepuesto}>
                Cantidad: {item.cantidad} | Precio: ${item.precio}
              </Text>
            </View>
            <View style={styles.botonesAccion}>
              <TouchableOpacity
                style={[styles.botonAccion, styles.botonEditar]}
                onPress={() => abrirModalEditar(item)}
              >
                <Text style={styles.textoBotonAccion}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botonAccion, styles.botonEliminar]}
                onPress={() => manejarEliminar(item.id)}
              >
                <Text style={styles.textoBotonAccion}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          limpiarFormulario();
          setModalVisible(false);
        }}
      >
        <View style={styles.contenedorModal}>
          <View style={styles.contenidoModal}>
            <Text style={styles.tituloModal}>
              {repuestoEditando ? 'Editar Repuesto' : 'Agregar Nuevo Repuesto'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Cantidad"
              value={cantidad}
              onChangeText={setCantidad}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={precio}
              onChangeText={setPrecio}
              keyboardType="decimal-pad"
            />
            <View style={styles.botonesModal}>
              <TouchableOpacity
                style={[styles.botonModal, styles.botonCancelar]}
                onPress={() => {
                  limpiarFormulario();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textoBotonModal}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botonModal, styles.botonGuardar]}
                onPress={repuestoEditando ? manejarEditar : manejarAgregar}
              >
                <Text style={styles.textoBotonModal}>
                  {repuestoEditando ? 'Guardar' : 'Agregar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botonAgregar: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  textoBotonAgregar: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botonCerrarSesion: {
    backgroundColor: '#ff3b30',
    padding: 10,
    borderRadius: 5,
    width: 80,
  },
  textoBotonCerrarSesion: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemRepuesto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  infoRepuesto: {
    flex: 1,
  },
  nombreRepuesto: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detallesRepuesto: {
    color: '#666',
  },
  botonesAccion: {
    flexDirection: 'row',
  },
  botonAccion: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  botonEditar: {
    backgroundColor: '#007aff',
  },
  botonEliminar: {
    backgroundColor: '#ff3b30',
  },
  textoBotonAccion: {
    color: '#fff',
    fontSize: 12,
  },
  contenedorModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contenidoModal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonModal: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  botonCancelar: {
    backgroundColor: '#666',
  },
  botonGuardar: {
    backgroundColor: '#000',
  },
  textoBotonModal: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
