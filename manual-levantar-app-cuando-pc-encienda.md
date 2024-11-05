# Configuración de Auto-Inicio para Aplicación Electron en Linux y Windows

Este manual explica cómo configurar el auto-inicio para una aplicación desarrollada en Electron, de manera que se ejecute automáticamente cada vez que la computadora se encienda. A continuación, se detallan dos métodos: usando la librería `auto-launch`.

## Usando la Librería `auto-launch`

### 1. Instalar la Dependencia `auto-launch`

Abre una terminal en la carpeta de tu proyecto y ejecuta el siguiente comando para instalar la librería:

```bash
npm install auto-launch
```

### 2. Configurar el Auto-Inicio en el Código de tu Aplicación

En el archivo principal de tu aplicación (por ejemplo, main.js), añade el siguiente código al inicio para habilitar el auto-inicio de la aplicación. Asegúrate de reemplazar "NombreDeTuApp" por el nombr-*+e de tu aplicación.


```javascript
const AutoLaunch = require('auto-launch');

// Crea un auto-launcher para tu aplicación
const myAppLauncher = new AutoLaunch({
    name: 'NombreDeTuApp',
    path: process.execPath, // Ruta a la app
});

// Activa el auto-inicio en Linux y Windows
myAppLauncher.isEnabled().then((isEnabled) => {
    if (!isEnabled) {
        myAppLauncher.enable();
    }
}).catch((err) => {
    console.error('Error setting auto-launch:', err);
});
```

### 3. Probar el Auto-Inicio

Una vez configurado, reinicia tu computadora para verificar que la aplicación se inicie automáticamente.
