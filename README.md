# pixi-movieclip-speed
Dynamically adjust PIXI movieclip(s) animation speed based on current browser's fps rate.

When PIXI movieclip animation speed is set in the range between 0 and 1, it is assumed that your browser always runs at 60fps.
Imagine the sprite sheet animation is exported at 24fps and animation speed is to 0.4 (24/60) but your browser is 
currently running at only 30fps. In this case, the movieclip animation will visually run slower, so the animation 
needs to speed it up to compensate lower browser's fps rate.


## Install
```sh
npm install pixi-movieclip-speed --save
```

## Usage
```sh
var pixiAnimationSpeedHandler = require('pixi-movieclip-speed');

var mc = new PIXI.MovieClip(pixiTexture);
  
// the movieclip needs to run at 24fps
pixiAnimationSpeedHandler.addClip(mc, 24);

// start the loop engine
pixiAnimationSpeedHandler.start();

mc.play();

 ...
 
// if you want to remove the movieclip from the loop
mc.stop();
pixiAnimationSpeedHandler.removeClip(mc);

 ...

// stop the loop engine when it's not needed anymore
pixiAnimationSpeedHandler.stop();
```

## License
MIT, see [LICENSE.md](http://github.com/Jam3/pixi-movieclip-speed/blob/master/LICENSE.md) for details.