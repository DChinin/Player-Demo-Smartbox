(function () {

  var LocalPlayer = {
    initialize: function () {
      this.$el = $('.player');
      this.$overlay = $('.player-overlay');
      this.$progress = this.$el.find('.player-seek-progress');
      this.$progressStyle = this.$progress[0].style;
      this.$play = this.$el.find('.player-play');
      this.$pause = this.$el.find('.player-pause');

      // store link to smartbox plugin
      this.plugin = window.Player;
      this.addNativePlayerEvents();
      this.addEvents();
    },

    init: function (media) {
      this.plugin.play(media);
    },

    addNativePlayerEvents: function () {
      var plugin = this.plugin,
        self = this;

      plugin.on('pause', function () {
        self.$play.show();
        self.$pause.hide();
      });
      plugin.on('resume', function () {
        self.$play.hide();
        self.$pause.show();
      });
      plugin.on('update', _.bind(this.onUpdate, this));
      plugin.on('stop', _.bind(this.onStop, this));
      plugin.on('complete', _.bind(this.onStop, this));
      plugin.on('ready', _.bind(this.onReady, this));
    },

    onReady: function () {
      this.$play.hide();
      this.$pause.show();
      this.$overlay.hide();
    },

    onStop: function (  ) {
      this.$progressStyle.width = '0%';
      this.$play.show();
      this.$pause.hide();
      this.$overlay.show();
    },

    onUpdate: function (  ) {
      var info = this.plugin.videoInfo,
        progressWidth;

      progressWidth = (info.currentTime / info.duration) * 100;
      if (progressWidth > 100) {
        progressWidth = 100;
      }
      this.$progressStyle.width = progressWidth + '%';
    },

    addEvents: function () {
      var playFunc = _.bind(this.onPlayClick, this),
        pauseFunc = _.bind(this.onPauseClick, this),
        stopFunc = _.bind(this.onStopClick, this),
        RWFunc = _.bind(this.onRWClick, this),
        FFClick = _.bind(this.onFFClick, this);

      this.$pause.on('click', pauseFunc);
      this.$play.on('click', playFunc);
      this.$el.find('.player-rw').on('click', RWFunc);
      this.$el.find('.player-ff').on('click', FFClick);

      $(document.body).on({
        'nav_key:play': playFunc,
        'nav_key:stop': stopFunc,
        'nav_key:pause': pauseFunc,
        'nav_key:rw': RWFunc,
        'nav_key:ff': FFClick
      });
    },

    onStopClick: function () {
      this.plugin.stop();
    },

    onPlayClick: function () {
      this.plugin.play();
    },

    onPauseClick: function () {
      this.plugin.pause();
    },

    onRWClick: function () {

    },

    onFFClick: function () {

    }
  };

  window.App = {

    // main initialization point
    initialize: function () {
      this.$menu = $('.menu-list');

      this.renderVideoItems();
      this.addEvents();
      LocalPlayer.initialize();

      // start navigation
      $$nav.on();
    },

    addEvents: function () {
      this.$menu.on('click', '.menu-item', _.bind(this.onVideoClick, this));
    },

    // handler for click on item in videos menu
    onVideoClick: function ( e ) {
      var el = e.currentTarget;

      LocalPlayer.init({
        url: el.getAttribute('data-url'),
        type: el.getAttribute('data-type')
      })
    },

    // show items from videos.js in menu
    renderVideoItems: function () {
      var videos = this.videos || [],
        result = '';
      _.each(videos, function ( item ) {
        result += '<li class="menu-item nav-item" data-url="'+ item.url +'" ' +
                  'data-type="'+ item.type +'">' + item.title + '</li>';
      });

      this.$menu.html(result);
    }
  };

  SB(_.bind(App.initialize, App));
})();