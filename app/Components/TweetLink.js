Vue.component('tweet-link', {
  props: ['id'],
  template: '<a :href="url" target="_blank"><i class="fab fa-twitter"></i></a>',
  computed: {
    url: function () {
      return 'https://twitter.com/statuses/'+this.id;
    }
  }
});