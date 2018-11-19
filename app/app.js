const app = new Vue({
  el: '#app',
  data: {
    defaultUsers: [
      'makeschool',
      'newsycombinator',
      'ycombinator',
    ],
    newUser: '',
    tweets: {},
    settingsMode: false,
    loadTweetsCount: 30,
  },
  mounted () {
    if (localStorage.loadTweetsCount) {
      this.loadTweetsCount = localStorage.loadTweetsCount;
    }
    if (localStorage.defaultUsers) {
      this.defaultUsers = JSON.parse(localStorage.defaultUsers);
    }
    this.initApp();
  },
  computed: {
    hasUsers: function () {
      return (Array.isArray(this.defaultUsers) && this.defaultUsers.length)
    }
  },
  methods: {
    initApp: function() {
      this.tweets = {};
      for (const i in this.defaultUsers) {
        let user = this.defaultUsers[i];
        axios
          .get('http://localhost:7890/1.1/statuses/user_timeline.json?count='+this.loadTweetsCount+'&screen_name='+user)
          .then(response => (Vue.set(this.tweets, user, response.data)));
      }
    },
    openSettings: function () {
      this.settingsMode = true;
    },
    closeSettings: function () {
      this.settingsMode = false;
    },
    applySettings: function () {
      this.initApp();
      this.closeSettings();
    },
    changeLoadTweetsCount: function (e) {
      localStorage.loadTweetsCount = this.loadTweetsCount;
    },
    addUser: function() {
      this.defaultUsers.push(this.newUser);
      this.newUser = '';
      localStorage.defaultUsers = JSON.stringify(this.defaultUsers);
    },
    removeUser: function (user) {
      const index = this.defaultUsers.indexOf(user);
      if (index > -1) {
        this.defaultUsers.splice(index, 1);
      }
      localStorage.defaultUsers = JSON.stringify(this.defaultUsers);
    }
  },
});

Vue.prototype.moment = moment;