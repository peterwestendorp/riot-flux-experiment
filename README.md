npm install

riot -w tags src/tags

npm test


(in node_modules/karma-riot/index.js, in the 'initRiot' method, change the 'files.unshift' bit to files.unshift(createPattern('/Users/peterwestendorp/Sites/riot-flux-experiment/node_modules/riot/riot.js'));)


