npm install

npm test

npm start

In node_modules/karma-riot/index.js, in the 'initRiot' method, comment out this bit:

`var jasminePath = path.dirname(require.resolve('riot'));
files.unshift(createPattern(jasminePath + '/../riot.js'));`
