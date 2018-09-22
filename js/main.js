/*jshint unused: true */
let scene, cam, renderer, clock, tower, player, lights;
clock = new THREE.Clock();

scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0xcccccc, 0.02); // not working

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);

/////////////////////////////////////
// Objects
cam = new Cam();
tower = new Tower();
lights = new Lights();
player = new Player();

scene.add(player.representation);
scene.add(lights.spotLights);
scene.add(lights.ambientLight);
// scene.add(lights.hemisphereLight);
// scene.add(lights.directionalLight);
scene.add(tower.representation);
scene.add(new THREE.AxesHelper());

////////////////////////////////////
// animation
var animate = function() {
  requestAnimationFrame(animate);
  cam.updateCamera();
  updatePlayer();
  renderer.render(scene, cam.camera);
};
animate();

function updatePlayer() {
  // movementValues
  let clockSpeed = clock.getDelta();
  let moveDistance = player.prop.movementSpeed * clockSpeed;
  let gravityDistance = player.prop.gravity * clockSpeed;

  // Hitdetections
  let raycasterY = new THREE.Raycaster(player.representation.position.clone(), new THREE.Vector3(0, -1 * player.prop.gravity, 0).normalize());
  let collisionResultsY = raycasterY.intersectObjects(tower.obstacles.children, true);
  if (collisionResultsY.length > 0 && collisionResultsY[0].distance < player.prop.floatingDistance) {
    gravityDistance = 0;
    player.prop.gravity = player.prop.gravityTarget;
    player.prop.inAir = false;
  } else {
    player.prop.inAir = true;
  }

  if (player.prop.movementVector.z !== 0 || player.prop.movementVector.x !== 0) {
    let raycasterXZ = new THREE.Raycaster(player.representation.position.clone(), player.prop.movementVector);
    let collisionResultsXY = raycasterXZ.intersectObjects(tower.representation.children, false);
    if (collisionResultsXY.length > 0 && collisionResultsXY[0].distance < player.prop.dimension) {
      moveDistance = 0;
    }
  }

  // execute movement
  player.updatePosition(gravityDistance, moveDistance);

  // update gravity
  player.prop.updateGravity();
}

/////////////////////////////////////
// Input
document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 38: // toward
      player.prop.movementVector.setZ(-1);
      break;
    case 40: // away
      player.prop.movementVector.setZ(1);
      break;
    case 37: // links
      player.prop.movementVector.setX(-1);
      break;
    case 39: // rechts
      player.prop.movementVector.setX(1);
      break;
    case 32: // space {
      player.prop.reverseGravity();
      break;
    case 65: // 'a'
      cam.prop.rotateVert = -cam.prop.rotateSpeed;
      break;
    case 68: // 'd'
      cam.prop.rotateVert = cam.prop.rotateSpeed;
      break;
    case 87: // 'w'
      cam.prop.rotateHori = -cam.prop.rotateSpeed;
      break;
    case 83: // 's'
      cam.prop.rotateHori = cam.prop.rotateSpeed;
      break;
  }
}, false);

document.addEventListener("keyup", event => {
  switch (event.keyCode) {
    case 38: // toward
      player.prop.movementVector.setZ(0);
      break;
    case 40: // away
      player.prop.movementVector.setZ(0);
      break;
    case 37: // links
      player.prop.movementVector.setX(0);
      break;
    case 39: // rechts
      player.prop.movementVector.setX(0);
      break;
    case 32: // space {
      break;
    case 65: // 'a'
      cam.prop.rotateVert = 0;
      break;
    case 68: // 'd'
      cam.prop.rotateVert = 0;
      break;
    case 87: // 'w'
      cam.prop.rotateHori = 0;
      break;
    case 83: // 's'
      cam.prop.rotateHori = 0;
      break;
  }
}, false);