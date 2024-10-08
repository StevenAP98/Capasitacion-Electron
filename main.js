console.log("Hola dese Electron")

const {app, BrowserWindow} = require('electron') 
const { app, BrowserWindow, autoUpdater, dialog } = require('electron');
const path = require('path');

// Configuración de autoUpdater
autoUpdater.on('checking-for-update', () => {
  console.log('Verificando actualizaciones...');
});

autoUpdater.on('update-available', (info) => {
  console.log('Actualización disponible.');
});

autoUpdater.on('update-not-available', (info) => {
  console.log('No hay actualizaciones disponibles.');
});

autoUpdater.on('error', (err) => {
  console.error('Error en la actualización:', err);
});

autoUpdater.on('download-progress', (progressObj) => {
  const { bytesPerSecond, percent, transferred, total } = progressObj;
  console.log(`Descargando actualización: ${percent}% (${transferred} de ${total} bytes)`);
});

autoUpdater.on('update-downloaded', (info) => {
  console.log('Actualización descargada. Se instalará la próxima vez que inicie la aplicación.');
  
  // Opcional: Preguntar al usuario si quiere reiniciar ahora
  const dialogOpts = {
    type: 'info',
    buttons: ['Reiniciar', 'Más tarde'],
    title: 'Actualizar aplicación',
    message: 'Una nueva actualización ha sido descargada.',
    detail: '¿Desea reiniciar la aplicación ahora para instalar la actualización?'
  };

  dialog.showMessageBox(dialogOpts).then((result) => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall(); // Reinicia e instala la actualización
    }
  });
});


const createWindow = () => {
    const window = new BrowserWindow({
        width:800,
        height:600
    })
    window.loadFile('index.html')
}

app.whenReady().then (()=>{
    createWindow();
})

