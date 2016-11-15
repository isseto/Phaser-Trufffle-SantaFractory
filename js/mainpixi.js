//Aliases
var Container = PIXI.Container,
    autoDetextRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.TextureCache,
    Rectangle = PIXI.Rectangle;


//Create a Pixi stage and renderer 
var stage = new PIXI.Container();
//var renderer = PIXI.autoDetectRenderer(2610, 1668);
var renderer = PIXI.autoDetectRenderer();
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);
//renderer.plugins.interaction.autoPreventDefault = false;
//Background color
renderer.backgroundColor = 0xD8E6FF;
//Add the canvas to the HTML document, add the renderer.view to the DOM
document.body.appendChild(renderer.view);

//Adding content
//load an image and run the `setup` function when it's done
loader
  .add([
    "img/baseMap-larger.png",
    "img/bunny.png",
    "sprites/SantaF_test1.png",
    "sprites/SantaF_test1.json"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);




//Tracking Loading Progress
function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url); 
  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}






var movie;

function setup() {
  console.log("setup");
  
  //*** BASEMAP TEXTURE
  var basemap = new Sprite(
    resources["img/baseMap-larger.png"].texture
  );
  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  basemap.interactive = true;
  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  basemap.buttonMode = true;
  // center the bunny's anchor point
    basemap.anchor.set(0.5);
  // setup events
    basemap
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove);
  // move the sprite to its designated position
    basemap.position.x = 0;
    basemap.position.y = 0;
  //Add the cat to the stage
  stage.addChild(basemap);
  
  //Create the 'tileset' sprite from the texture
  //var texture = TextureCache["sprites/SantaF_test1.png"];
  //Create rectangle
  //var rect = new Rectangle(192, 128, 64, 64);
  //texture.frame = rect;
  //var rocket = new Sprite(texture);
  //Position rocket sprite on the canvas
  //rocket.x=32;rocket.y=32;
  //stage.addChild(rocket);
  
  
  //BUNNY
  var bunny = Sprite.fromImage('img/bunny.png');
  bunny.position.set(230,264);
  bunny.interactive = true;
  bunny.buttonMode = true;
  bunny.on('mousedown', onDown);
  bunny.on('touchstart', onDown);
  stage.addChild(bunny);
  function onDown (eventData) {
    bunny.scale.x += 0.3;
    bunny.scale.y += 0.3;
  }
  // BUNNY start animating
  bunnyAnimate();
  function bunnyAnimate() {
    requestAnimationFrame(bunnyAnimate);
    
    //render the root container
    renderer.render(stage);
  }
  
  
  
  
  
  //Create an arraw of textures from an image path
  var frames = [];
  
  for (var i = 0; i < 39; i++) {
    var val = i < 10 ? '0' + i : i;
    frames.push(PIXI.Texture.fromFrame('animation00' + val));
  }
  
  // create a MovieClip (brings back memories from the days of Flash, right ?)
    movie = new PIXI.extras.MovieClip(frames);
  
  /*
     * A MovieClip inherits all the properties of a PIXI sprite
     * so you can change its position, its anchor, mask it, etc
     */
    movie.position.set(300);

    movie.anchor.set(0.5);
    movie.animationSpeed = .5;

    movie.play();

    stage.addChild(movie);

    animate();
}
  
function animate() {
  
  //Render the stage
  renderer.render(stage);
  requestAnimationFrame(animate);
  
  console.log("All files loaded");
}



//*** Map Drag Functions ***//
//* Found in Github Issue #180
function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = this.data.getLocalPosition(this.parent);
}
function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}
function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x += (newPosition.x - this.dragging.x);
        this.position.y += (newPosition.y - this.dragging.y);
        this.dragging = newPosition;
    }
}