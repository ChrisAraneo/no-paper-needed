// Allow angular using electron module (native node modules)
const fs = require('fs');
const f_angular =
  'node_modules/@angular-devkit/build-angular/src/tools/webpack/configs/common.js';

fs.readFile(f_angular, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  // Replace the target configuration for Angular 21+
  // Changes from ['web', 'es2015'] to ['electron-renderer', 'es2015']
  var result = data.replace(
    /target: \[isPlatformServer \? 'node' : 'web', 'es2015'\],/g,
    "target: [isPlatformServer ? 'node' : 'electron-renderer', 'es2015'],",
  );

  fs.writeFile(f_angular, result, 'utf8', function (err) {
    if (err) return console.log(err);
    console.log(
      'Successfully patched Angular webpack config for Electron support',
    );
  });
});
