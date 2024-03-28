# VnfPortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Initial Project

```bash
ng new vnf-portal --standalone=true --style=scss --routing=true --skip-git=true --ssr=false
ng add @angular/material
ng add @angular/pwa
ng add @ngneat/transloco
npm i lodash luxon @ngrx/store animate.css ngx-skeleton-loader ngx-toastr uuid zod hotkeys-js
npm i -D @types/lodash @types/luxon @types/uuid webpack-bundle-analyzer tailwindcss postcss autoprefixer tailwind-merge vitest prettier
npx tailwindcss init
npm init playwright@latest
```

## Docker Build

```bash
docker network create vnf-network
docker run --network vnf-network --name vnf-portal-ubuntu -p 80:8080 -p 443:8443 -p 22:22 -itd ubuntu:latest
docker build . -t vnf-portal:latest
docker run -d -p 80:80 --network vnf-network --name vnf-portal vnf-portal:latest
docker-compose up
```
