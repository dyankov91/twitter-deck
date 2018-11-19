Vue.component('tweet', {
  props: ['tweet'],
  template:`
    <div class="media-content">
      <div class="content">
        <p>
          <span v-if="tweet.retweeted_status">
            Retweet <strong v-text="tweet.entities.user_mentions[0].name"></strong>
            <screen-name :name="tweet.entities.user_mentions[0].screen_name"></screen-name>:
          </span>
          <span v-html="text"></span>
          <img v-if="tweet.extended_entities" :src="tweet.extended_entities.media[0].media_url_https" />
        </p>
        <p>
          <small>
            <i class="far fa-clock"></i>
            {{ tweet.created_at | relativeTime }}
          </small>
          <svg aria-hidden="true" data-prefix="fac" data-icon="dot" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-dot fa-w-20"><path fill="currentColor" d="M256,176c44.2,0,80,35.8,80,80s-35.8,80-80,80s-80-35.8-80-80S211.8,176,256,176z" class=""></path></svg>
          <tweet-link :id="tweet.id_str"></tweet-link>
        </p>
      </div>
    </div>`,
  computed: {
    text: function () {
      let text = this.tweet.text;
      let urls = this.tweet.entities.urls;
      let mentions = this.tweet.entities.user_mentions;
      if (this.tweet.retweeted_status) {
        text = this.tweet.retweeted_status.text;
        urls = this.tweet.retweeted_status.entities.urls;
        mentions = this.tweet.retweeted_status.entities.user_mentions;
      }

      if (urls.length) {
        for (let index in urls) {
          let url = urls[index];
          let link = '<a href="'+url['expanded_url']+'" target="_blank">'+url['display_url']+'</a>';
          text = text.replace(url['url'], link);
        }
      }

      if (mentions.length) {
        for (let index in mentions) {
          let user = mentions[index]['screen_name'];
          let userMention = '<a href="">@'+user+'</a>';
          text = text.replace('@'+user, userMention);
        }
      }

      return text;
    }
  }
});