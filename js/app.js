SB(function () {

  var videoUrl = 'https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4',
    isPaused = false;

  var $player = $('.player'),
    $play = $player.find('.player-play'),
    $pause = $player.find('.player-pause'),
    $rw = $player.find('.player-rw'),
    $ff = $player.find('.player-ff');

  function playHandler( e ) {
    if (isPaused) {
      Player.resume();
      $play.hide();
      $pause.show();
      $$nav.current($pause);
      isPaused = false;
    } else {
      Player.play({
        url: videoUrl
      });
    }
  }

  function pauseHandler( e ) {
    if ( !isPaused ) {
      Player.pause();
      $play.show();
      $pause.hide();
      $$nav.current($play);
      isPaused = true;
    }
  }

  function rwHandler( e ) {

  }

  function ffHandler( e ) {

  }

  Player.on('ready', function(){
    $play.hide();
    $pause.show();
    $$nav.current($pause);
  });

  $play.on('click', playHandler);
  $pause.on('click', pauseHandler);
  $rw.on('click', rwHandler);
  $ff.on('click', ffHandler);
  $$nav.on('.player');
});