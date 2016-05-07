# Bauhausboards - a tool to present personalized content on public situated displays in offices

This tool is the result of the bachelor thesis of André Karge at the Bauhaus Universität Weimar.

## Installation Guide
- Install the latest version of Node.js
- Install the latest version of npm
- Install sqlite3
- Install the dependencies of the canvas package (https://www.npmjs.com/package/canvas)
- Install other dependencies (```npm install```) (may take a while)
- Run the setup.sh script
- Change the config file

## Installation on Arch Linux
```
sudo pacman -S nodejs npm sqlite3 cairo libjpeg-turbo libjpeg6-turbo giflib libpango
cd /path/to/BauhausBoards
npm install
sh ./setup.sh
mv ./config.js.example ./config.js
nano ./config.js # change all parameters for your environment
```

<!--
TODO:
- mailserver or mailcatcher??
-->
