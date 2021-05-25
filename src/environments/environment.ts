// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://api.normalindia.com/',
  stripe: 'pk_test_rI2ObieGIf2HL5nmZkUBSnn800u16zSXu6',
  reCaptcha_SiteKey: '6Lfa1_AZAAAAAKcRDyRDIVJCW5sXeOPV15Pgi4KW',
  reCaptcha: '6Lfa1_AZAAAAAMRfgwp-ef3fs68l_8GQ26kg6J8o',
  tokenUrl: null, // For IdentityServer/Authorization Server API. You can set to null if same as baseUrl
  loginUrl: '/login',
  firebase: {
    apiKey: "AIzaSyBzakrnYl5abbtd0xwXk1jYjTbTsY4Ou6A",
    authDomain: "normal-india.firebaseapp.com",
    projectId: "normal-india",
    storageBucket: "normal-india.appspot.com",
    messagingSenderId: "504663250244",
    appId: "1:504663250244:web:1d86415f8b8a6d0256f311",
    measurementId: "G-ZVWB2NX35S"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
