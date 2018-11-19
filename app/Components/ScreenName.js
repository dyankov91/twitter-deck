Vue.component('screen-name', {
  props: ['name'],
  template: '<a :href="name | profileUrl"><small>{{ name | screenName }}</small></a>',
});