var StattleshipAPI = require('node-stattleship');

var stattleship = new StattleshipAPI('940b6b0cd984eaf7e4ee15a509522f1b');

var season = {
 season_id: 'mlb-2016'
};

var gameToday = {
  on: 'today'
};

stattleship.teams('baseball', 'mlb', season).then(function(teams) {
  teams.forEach(function(element, index, array) {
    console.log(element.name);
  });
});

stattleship.games('baseball', 'mlb', gameToday).then(function(games) {
  games.forEach(function(element, index, array) {
    console.log(element.name);
  });
});
