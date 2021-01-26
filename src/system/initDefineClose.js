function initDefineClose(app, mainWindow) {
    mainWindow.on('close', (e) => {
        e.preventDefault();		// 阻止默认行为
        mainWindow.hide()
        if(mainWindow.isMinimized()){
            mainWindow = null;
        }else{
            e.preventDefault();
            mainWindow.minimize();
        }
    })
}

export default initDefineClose
