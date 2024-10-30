console.log("Hola dese Electron")

const {app, BrowserWindow} = require('electron') 

const createWindow = () => {
    const window = new BrowserWindow({
        width:800,
        height:600
    })
    window.loadFile('views/configuration-csp.html')
}

app.whenReady().then (()=>{
    createWindow();
})