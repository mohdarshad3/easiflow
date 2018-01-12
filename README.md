# Easiflow.Platform.UI
Easiflow Platform UI

## Prerequisites for build

The following needs installing before building the application

	* Node.js & NPM
	* Angular cli (https://www.npmjs.com/package/@angular/cli)

## Setup for Website and e2e tests

Run `npm install` in the following folder locations

	* Easiflow.Platform.UI

## Build:Dev
Run `ng build -dev` to build the project. The build artifacts will be stored in the `Dist` directory.

## Build:Prod
Run `ng build -prod` to build the project. The build artifacts will be stored in the `App` directory.

## Run Site
Run `ng serve` 

## Style Changes
You can add global styles, and also import other style files in styles.scss

##General Notes
The site uses webpack to monitor all changes to typescript, html and css. This means it will automatically recompile the application without having to manually do it or stop the application while ng serve is still running.