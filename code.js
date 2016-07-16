var StattleshipAPI = require('./node-stattleship');
var flatMap = require('./flatmap');
var Q = require('Q');

var stattleship = new StattleshipAPI('940b6b0cd984eaf7e4ee15a509522f1b');

function getOptions (league, season, team, date) {
  return {
    season_id: league + "-" + season,
    team_id: league + "-" + team,
    on: date
  };
};

function getGames (stattleship, sport, league, season, team, date) {
  if (team.constructor  === Array) {
    return getMultiple (stattleship, sport, league, season, team, date);
  }
  return getSingle (stattleship, sport, league, season, team, date);
};

function getMultiple (stattleship, sport, league, season, teams, date) {
  return Q.all(teams.flatMap(function(team) {
    return stattleship.games(sport, league, getOptions(league, season, team, date));
  }));
};

function getSingle (stattleship, sport, league, season, team, date) {
  return stattleship.games(sport, league, getOptions(league, season, team, date));
};

getGames(stattleship, 'baseball', 'mlb', '2016', ['was','min']).then(function(games) {
  games.forEach(function(element) {
    element.map(function(element) {
      console.log(element.name) });
  });
});

getGames(stattleship, 'baseball', 'mlb', '2016', 'nyy').then(function(games) {
  games.forEach(function(element) {
    console.log(element.name);
  });
});

