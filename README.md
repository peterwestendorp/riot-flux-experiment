npm install

riot -w tags src/tags

npm test


In node_modules/karma-riot/index.js, in the 'initRiot' method, change the 'files.unshift' bit to

`files.unshift(createPattern('/Users/peterwestendorp/Sites/riot-flux-experiment/node_modules/riot/riot.js'));
files.unshift(createPattern('/Users/peterwestendorp/Sites/riot-flux-experiment/node_modules/riotcontrol/riotcontrol.js'));
files.unshift(createPattern('/Users/peterwestendorp/Sites/riot-flux-experiment/src/slidestore.js'));`


