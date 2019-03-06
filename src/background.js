'use strict';

import {app, protocol, BrowserWindow, Tray,} from 'electron';
import path from 'path'
import {createProtocol,} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true});

function createWindow() {
    /**
     * @author wells
     * @date 2019/3/4
     * @description: 此处获取APPicon 持续失败
     */
    /*try {
        let appIcon = new Tray(process.env.WEBPACK_DEV_SERVER_URL+'/img/logo.82b9c7a5.png');
    }catch (e) {
        console.log(e);
    }*/
    /*const {width, height} = screen.getPrimaryDisplay().workAreaSize
    win = new BrowserWindow({
        width, height,
        frame: false,
        transparent: true,
        icon: path.join(__dirname, '../src/assets/logo.png'),
    })*/
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        transparent: true,
        icon: path.join(__dirname, '../src/assets/logo.png'),
    });

    // win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    win.on('closed', () => {
        win = null
    })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            // 启动是检测 vue devtool 失败
            // await installVueDevtools()
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow();
    /*powerMonitor.on('suspend', () => {
        console.log('The system is going to sleep')
    })*/
    win.setProgressBar(0.5);
    new Tray(path.join(__dirname, '../src/assets/logo.png'));
    win.setThumbarButtons([
        {
            tooltip: 'button2',
            icon: path.join(__dirname, '../src/assets/logo.png'),
            flags: ['enabled', 'dismissonclick'],
            click() {
                console.log('button2 clicked.')
            }
        }
    ]);

});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', data => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
