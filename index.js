var loop = require('raf-loop');

module.exports = (function () {
  var data = {};
  var movieClips = [];
  var mcFpsHandlerId = 0;
  var engineStarted = false;
  var engine;

  function init() {
    engine = loop(function (dt) {
      if (dt && movieClips.length) update(dt);
    });
  }

  function update(dt) {
    movieClips.forEach(function (mc) {
      mc.clip.animationSpeed = dt / (1000 / mc.fps);
    });
  }

  /**
   * @param clip - PIXI.MovieClip
   * @param fps - desired fps rate the movie clip should play at
   */
  function addClip(clip, fps) {
    data.clip = clip;
    data.fps = fps || 60;
    movieClips.push(data);
    clip.mcFpsHandlerId = mcFpsHandlerId++;
  }

  function removeClip(clip) {
    movieClips.forEach(function (mc, index) {
      if (mc.clip.mcFpsHandlerId === clip.mcFpsHandlerId) {
        movieClips.splice(index, 1);
        delete mc.mcFpsHandlerId;
      }
    });
  }

  function start() {
    if (engineStarted) return;

    if (!engine) init();

    engine.start();
    engineStarted = true;
  }

  function stop() {
    if (!engineStarted) return;

    engine.stop();
    engineStarted = false;
  }

  return {
    addClip: addClip,
    removeClip: removeClip,
    start: start,
    stop: stop
  }
})();