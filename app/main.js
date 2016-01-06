var app = require('app'); // Module to control application life.
var BrowserWindow = require('browser-window'); // Module to create native browser window.
var Menu = require("menu");
var ipc = require('ipc');

// Report crashes to our server.
//require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;
var quit = false;

var isWin = /^win/.test(process.platform);

//hide is not good on windows.
if(isWin)
  quit = true;

ipc.on('badge', function(event, text) {
  if(app.dock && app.dock.setBadge){
    app.dock.setBadge(text);
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', function(e) {
  app.quit();
});

app.on('activate-with-no-open-windows', function(e){
  if(mainWindow){
    mainWindow.show();
  }
});

app.on('before-quit', function(e){
  quit = true;
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  require('power-monitor').on('suspend', function() {
    //console.log('The system is going to sleep');
  });

  require('power-monitor').on('resume', function() {
    mainWindow.webContents.send('resume', '');
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');
  // mainWindow.loadUrl('file://Users/LukeChui/Desktop/focas/Focas/app/index.html');
  // Open the devtools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('close', function(e) {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    if(quit){
      mainWindow = null;
    }else{
      mainWindow.hide();
      e.preventDefault();
    }
  });

  var template = [{
    label: "Application",
    submenu: [{
      label: "About Application",
      selector: "orderFrontStandardAboutPanel:"
    }, {
      type: "separator"
    }, {
      label: "Developer Tools",
      accelerator: "Command+D",
      click: function() {
        mainWindow.toggleDevTools();
      }
    }, {
      label: "Quit",
      accelerator: "Command+Q",
      click: function() {
        app.quit();
      }
    }]
  }, {
    label: "Edit",
    submenu: [{
      label: "Undo",
      accelerator: "Command+Z",
      selector: "undo:"
    }, {
      label: "Redo",
      accelerator: "Shift+Command+Z",
      selector: "redo:"
    }, {
      type: "separator"
    }, {
      label: "Cut",
      accelerator: "Command+X",
      selector: "cut:"
    }, {
      label: "Copy",
      accelerator: "Command+C",
      selector: "copy:"
    }, {
      label: "Paste",
      accelerator: "Command+V",
      selector: "paste:"
    }, {
      label: "Select All",
      accelerator: "Command+A",
      selector: "selectAll:"
    }]
  }];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
});