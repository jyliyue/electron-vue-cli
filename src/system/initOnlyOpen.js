function initOnlyOpen(app, mainWindow) {
    app.requestSingleInstanceLock((commandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
            mainWindow.show()
        }
    })
}

export default initOnlyOpen