var gui = require('nw.gui');
var win = gui.Window.get();
var icon = 'img/data-white.png';
var status = true; // true = show, false = hide
win.on('minimize', function() {
 
      this.hide();
      status = false;
 });

// Create a tray icon
var tray = new gui.Tray({
 	title: 'Taskapp',
  	icon:  icon,
  	alticon: 'img/data-black.png',
  	tooltip: 'Taskapp'
}).on('click', function () {
	win.show();
});



newTask = new gui.MenuItem({
  label: "Task",
  click: function() {
  	win.show();
    document.location.href = "index.html";
  }
});

settings = new gui.MenuItem({
  label: "Settings",
  click: function() {
    win.show();
    document.location.href = "settings.html";
  }
});

quit = new gui.MenuItem({
  label: "Quit",
  click: function() {
  	console.log('Quit');
    win.close();
  }
});

// Give it a menu
var menu = new gui.Menu();
menu.append(newTask);
menu.append(settings);
menu.append(quit);
tray.menu = menu;