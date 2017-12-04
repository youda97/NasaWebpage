// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
       apiKey: "AIzaSyB5VGLToDQ0uvrmUjbVZOFFQBxm3xXjKXA",
    authDomain: "nasarest-f4f1e.firebaseapp.com",
    databaseURL: "https://nasarest-f4f1e.firebaseio.com",
    projectId: "nasarest-f4f1e",
    storageBucket: "nasarest-f4f1e.appspot.com",
    messagingSenderId: "592962368490"
  }
};
