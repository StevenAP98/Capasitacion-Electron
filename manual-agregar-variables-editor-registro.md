# Manual para Agregar Variables de Configuración en Windows y Linux con Node.js y Electron

## Introducción
Este manual describe cómo agregar variables de configuración en Windows y Linux usando Node.js y Electron. En Windows, configuraremos variables en el editor de registro; en Linux, las configuraciones se guardarán en archivos locales o se establecerán como variables de entorno.

## Requisitos Previos
- **Node.js** y **npm** instalados.
- Proyecto de **Node.js** y **Electron** configurado.
- **Permisos de administrador** en Windows, si se modifican claves protegidas del registro.

---

## Parte 1: Agregar Variables al Registro en Windows

### 1.1 Instalación del Paquete `node-regedit`

Instala el paquete `node-regedit` en tu proyecto ejecutando el siguiente comando en la terminal:

```bash
npm install regedit
```

### 1.2 Configuración y Uso de node-regedit

1. Importa regedit y establece la variable de entorno para la ruta del ejecutable en tu archivo principal de Node.js:

```javascript
const regedit = require('regedit');
process.env.REGEDIT_BIN = regedit.path;
```

2. Define una función para agregar una variable al registro de Windows:

```javascript
function agregarVariableRegistro() {
  const keyPath = 'HKCU\\Software\\MiAplicacion';
  const valuesToAdd = {
    [keyPath]: {
      'NombreVariable': {
        value: 'Valor de la Variable',
        type: 'REG_SZ'
      }
    }
  };

  regedit.putValue(valuesToAdd, (err) => {
    if (err) {
      console.error('Error al agregar variable al registro:', err);
    } else {
      console.log('Variable agregada correctamente al registro.');
    }
  });
}

// Llama a la función para agregar la variable al registro
agregarVariableRegistro();
```

### 1.3 Explicación de los Parámetros

- **keyPath**: Ruta de la clave en el registro (e.g., HKCU\Software\MiAplicacion).
- **NombreVariable**: Nombre de la variable que deseas crear o modificar.
- **value**: Valor que deseas asignar a la variable.
- **type**: Tipo de dato de la variable (e.g., REG_SZ para cadenas de texto).

> **⚠️ Importante:** Si necesitas modificar claves en `HKEY_LOCAL_MACHINE` u otras claves protegidas, es probable que necesites ejecutar la aplicación con permisos de administrador.

---

## Parte 2: Agregar Variables en Linux

En Linux, puedes configurar variables en:

- Archivos de entorno: Configura variables de entorno en archivos como `~/.bashrc` o `/etc/environment`.
- Archivos de configuración personalizados: Guarda configuraciones específicas de la aplicación en archivos dentro de `~/.config` o `/etc`.

### Opción 1: Agregar Variables de Entorno en `~/.bashrc`

Para agregar una variable de entorno que se cargue cada vez que el usuario inicie sesión, puedes modificar el archivo `~/.bashrc`.

#### Ejemplo en Node.js: Agregar una Variable de Entorno en `~/.bashrc`

1. Define una función en tu archivo Node.js para agregar una variable al archivo `.bashrc`:

```javascript
const fs = require('fs');
const os = require('os');
const path = require('path');

function agregarVariableEntorno(nombre, valor) {
  const bashrcPath = path.join(os.homedir(), '.bashrc');
  const nuevaVariable = `export ${nombre}="${valor}"\n`;

  fs.appendFile(bashrcPath, nuevaVariable, (err) => {
    if (err) {
      console.error('Error al agregar la variable de entorno:', err);
    } else {
      console.log(`Variable de entorno ${nombre} agregada en ${bashrcPath}.`);
    }
  });
}

// Llama a la función para agregar la variable de entorno
agregarVariableEntorno('MI_VARIABLE', 'valor_de_mi_variable');
```

2. Recargar el Archivo `.bashrc`: Después de agregar la variable, el usuario deberá ejecutar el siguiente comando en la terminal para cargar los cambios en la sesión actual:

```bash
source ~/.bashrc
```

### Opción 2: Crear un Archivo de Configuración Personalizado

Para configuraciones específicas de la aplicación, una buena práctica es crear un archivo de configuración en el directorio del usuario (`~/.config/mi_aplicacion/`) o en `/etc/mi_aplicacion` para configuraciones globales.

#### Ejemplo en Node.js: Crear un Archivo de Configuración en `~/.config`

1. Define una función en tu archivo Node.js para crear un archivo JSON de configuración en `~/.config/mi_aplicacion/`:

```javascript
const fs = require('fs');
const os = require('os');
const path = require('path');

function crearArchivoConfiguracion(nombreArchivo, configuracion) {
  const configDir = path.join(os.homedir(), '.config', 'mi_aplicacion');
  const configPath = path.join(configDir, nombreArchivo);

  // Crea el directorio si no existe
  fs.mkdir(configDir, { recursive: true }, (err) => {
    if (err) {
      console.error('Error al crear el directorio de configuración:', err);
      return;
    }

    // Escribe la configuración en el archivo
    fs.writeFile(configPath, JSON.stringify(configuracion, null, 2), (err) => {
      if (err) {
        console.error('Error al crear el archivo de configuración:', err);
      } else {
        console.log(`Archivo de configuración creado en ${configPath}`);
      }
    });
  });
}

// Ejemplo de uso
const configuracion = {
  variable1: "valor1",
  variable2: "valor2",
};

crearArchivoConfiguracion('config.json', configuracion);
```

### Explicación del Código

- **configDir**: Directorio donde se almacenará la configuración.
- **configuracion**: Objeto JSON que contiene las variables de configuración.
- La función `fs.mkdir` crea el directorio si no existe.
- La función `fs.writeFile` escribe la configuración en el archivo especificado.

