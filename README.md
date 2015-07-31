# Taskapp

## Need

- Node & NPM install and in your PATH
- An instance [TaskBoard](https://github.com/kiswa/TaskBoard/)
- [Node Webkit](https://github.com/nwjs/nw.js) in your PATH

## Usage in developement
- `git clone https://github.com/camael24/taskapp`
- `cd taskapp`
- `npm install`
-  `nw ./`

## Usage in release
- go to https://github.com/camael24/taskapp/releases/latest
- download the latest version and extract it
- `cd path/to/taskapp`
- `npm install`
-  `nw ./`

## First run (Settings) or else when localStorage are lost 
Register your credential of your TaskBan instance you need User, Password, Url.
The fied token are automaticly register when you click on submit after validation of your credential

##### Url
for exemple the url `http://127.0.0.1:8080/#/boards` taskapp need `http://127.0.0.1:8080`

## Feature
- Settings
- List boards for add Item


## TODO
- New boards
- Link to Instance (for admin etc)
- Package for Windows/Unix
- Add systray icon/menu
