var PIXI = require('./lib/pixi.js');
var data = require('./animations.json');
var pixiAnimationSpeedHandler = require('../index.js');

var renderer = new PIXI.CanvasRenderer(1000, 480);
document.body.appendChild(renderer.view);

var stage = new PIXI.Stage(0xffffff);
var container = new PIXI.DisplayObjectContainer();
stage.addChild(container);

var loader = new PIXI.JsonLoader('test/animations.json');
loader.load();
loader.on('loaded', run);

function run() {
  var textures = [];
  var movieClips = [];

  Object.keys(data.frames).forEach(function (d, index) {
    var frame = 'frame-' + (index < 10 ? '0' : '') + index;
    var texture = PIXI.Texture.fromFrame(frame);
    textures.push(texture);
  });

  var mc = new PIXI.MovieClip(textures);
  mc.loop = true;
  mc.scale.x = mc.scale.y = 2;

  container.addChild(mc);
  movieClips.push(mc);

  mc.play();
  pixiAnimationSpeedHandler.start();
  pixiAnimationSpeedHandler.addClip(mc, 24);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}