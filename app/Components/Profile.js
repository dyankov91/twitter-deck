Vue.component('profile', {
  props: ['user'],
  template:`
    <article class="media author">
      <figure class="media-left">
        <p class="image is-48x48">
          <a href="">
            <img class="is-rounded" :src="user.profile_image_url_https">
          </a>
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong v-text="user.name"></strong>
            <screen-name :name="user.screen_name"></screen-name>
          </p>
        </div>
      </div>
    </article>`,
});