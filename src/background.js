'use strict';

import {app, protocol, BrowserWindow, Tray, Menu, MenuItem} from 'electron';
import path from 'path'
import {createProtocol,/*installVueDevtools*/} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true});
let icon = path.join(__dirname, '../build/icon.ico');

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: true,
        fullscreenable: true,
        // frame: false,
        // transparent: true,
        icon,
    });

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
    win.setThumbarButtons([
        {
            tooltip: 'button1',
            icon,
            click() {
                console.log('button1 clicked')
            }
        },
        /*{
            tooltip: 'button1',
            icon: path.join(__dirname, '../src/assets/logo.png'),
            click() {
                console.log('button2 clicked.')
            }
        },*/
    ]);
    /*// 多重图标
    win.setOverlayIcon(icon, 'Description for overlay');*/
    /*// 进度条
    win.setProgressBar(0.1);
    setTimeout(() => {
        win.setProgressBar(0.5);
        setTimeout(() => {
            win.setProgressBar(1.0);
            setTimeout(() => {
                win.setProgressBar(0);
            }, 1000)
        }, 2000)
    }, 2000);*/

    // 托盘
    let tray = new Tray(icon);
    tray.setToolTip('这个是tooltip');
    /*const contextMenu = Menu.buildFromTemplate([
        {label: 'Item1', type: 'radio'},
        {label: 'Item2', type: 'radio'},
        {label: 'Item3', type: 'radio', checked: true},
        {label: 'Item4', type: 'radio'}
    ]);*/
    const contextMenu = new Menu();
    contextMenu.append(new MenuItem({
        label: 'one',
        click() {
            console.log("one");
        }
    }));
    contextMenu.append(new MenuItem({
        label: 'two',
        // icon,
        click() {
            console.log("two");
        }
    }));
    contextMenu.append(new MenuItem({type: 'separator'}));
    contextMenu.append(new MenuItem({
        label: "退出",
        role: 'quit'
    }));
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    setTimeout(()=>{},2000);
    // tray.setContextMenu(new Menu())

    /*// 右下角通知
    tray.displayBalloon({
        title: 'disBall',
        content: 'test',
    });*/

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
