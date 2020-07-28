import { Menu, Tray, MenuItem, nativeImage, BrowserWindow } from 'electron'
import path from 'path'

let tray = null
const icon = path.join(__dirname, '../src/assets/icon.ico')
const miniIcon = nativeImage
  .createFromPath(icon)
  .resize({
    height: 16,
    width: 16
  })

console.log(
  icon,
  miniIcon.isEmpty(),
  miniIcon.getSize()
);
function init() {
  if (tray) {
    return tray
  }
  tray = new Tray(icon)
  tray.setToolTip('我的程序')
  const contextMenu = new Menu();
  contextMenu.append(new MenuItem({
    label: 'one',
    icon: miniIcon,
    click() {
      console.log('one');
      console.log(BrowserWindow.getAllWindows());
      const arr = BrowserWindow.getAllWindows()
      if (arr[0]) {
        const win = arr[0]
        console.log(win.webContents.getURL())
        win.minimize()
        setTimeout(() => {
          win.maximize()
        }, 400);
      }
    }
  }));
  contextMenu.append(new MenuItem({
    label: 'two',
    icon: miniIcon,
    click() {
      console.log('two');
    }
  }));
  contextMenu.append(new MenuItem({ type: 'separator' }));
  contextMenu.append(new MenuItem({
    label: '退出',
    role: 'quit'
  }));
  tray.setToolTip('This is my application.');
  tray.setContextMenu(contextMenu);
  return tray
}

export function getTray() {
  if (tray) {
    return tray
  }
  return init()
}
