function initDefineClose(app, mainWindow) {
    mainWindow.on('close', (e) => {
        e.preventDefault();		// 阻止默认行为
        if (mainWindow.isMinimized()){
            mainWindow = null;
        } else {
            mainWindow.minimize();
        }
    })
}

export default initDefineClose
