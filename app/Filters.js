Vue.filter('screenName', function (screenName) {
  return '@'+screenName;
});

Vue.filter('profileUrl', function (screenName) {
  return 'https://twitter.com/'+screenName;
});

Vue.filter('relativeTime', function (time) {
  return moment(time, 'ddd MMM DD HH:mm:ss Z YYYY').fromNow();
});