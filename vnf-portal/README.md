# VnfPortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

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
npm i lodash luxon @ngrx/store animate.css ngx-skeleton-loader ngx-toastr uuid zod
npm i -D @types/lodash @types/luxon @types/uuid webpack-bundle-analyzer tailwindcss postcss autoprefixer tailwind-merge
npx tailwindcss init
```
