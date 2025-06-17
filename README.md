# Gestión de Repuestos - Prueba de Concepto

Esta es una aplicación móvil React Native de prueba de concepto para la gestión de inventario de repuestos con autenticación Firebase y almacenamiento Firestore, junto con un backend mínimo de Node.js.

## Características
- Inicio de sesión de usuario con autenticación Firebase
- Registrar, actualizar, eliminar repuestos almacenados en Firestore
- Backend básico de Node.js para gestión de repuestos (opcional)

## Configuración

### Frontend (React Native)
1. Instalar dependencias:
   ```
   cd gestion-repuestos/frontend
   npm install
   ```
2. Configurar Firebase en `firebaseConfig.ts`
3. Ejecutar la aplicación:
   ```
   npm start
   ```

### Backend (Node.js)
1. Instalar dependencias:
   ```
   cd gestion-repuestos/backend
   npm install
   ```
2. Ejecutar el servidor:
   ```
   npm run dev
   ```

## Notas
- Esta es una prueba de concepto mínima para propósitos de demostración.
- Se requiere configuración del proyecto Firebase con autenticación y Firestore habilitados.
