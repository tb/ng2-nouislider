System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  //map tells the System loader where to look for things
  map: {
    app: "./demo",
    'nouislider': "../node_modules/nouislider/distribute/nouislider.js",
    'ng2nouislider': "../nouislider.ts"
  },
  //packages defines our app package
  packages: {
    app: {
      main: 'main.ts',
      defaultExtension: 'ts'
    }
  }
});