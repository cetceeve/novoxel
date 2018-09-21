/*jshint unused: true */
let scene, camera, renderer, clock, tower, player, lights;
clock = new THREE.Clock();

scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xcccccc, 0.02);

camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = 10;
camera.position.x = -5;
camera.lookAt(scene.position);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);

let rotateHori = 0,
  rotateVert = 0,
  rotateSpeed = 0.05;
/////////////////////////////////////
// Objects
tower = new Tower();
player = new Player();
lights = new Lights();

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
  updatePlayer();
  updateCamera();
  renderer.render(scene, camera);
};
animate();

function updatePlayer() {
  // movementValues
  let clockSpeed = clock.getDelta();
  let moveDistance = player.prop.movementSpeed * clockSpeed;
  let gravityDistance = player.prop.gravity * clockSpeed;

  // Hitdetections
  let raycasterY = new THREE.Raycaster(player.representation.position.clone(), new THREE.Vector3(0, -1 * player.prop.gravity, 0).normalize());
  let collisionResultsY = raycasterY.intersectObjects(tower.representation.children, true);
  if (collisionResultsY.length > 0 && collisionResultsY[0].distance < player.prop.floatingDistance) {
    gravityDistance = 0;
    player.prop.gravity = player.prop.gravityTarget;
    player.prop.inAir = false;
  } else {
    player.prop.inAir = true;
  }

  if (player.prop.movementVector.z !== 0 || player.prop.movementVector.x !== 0) {
    let raycasterXZ = new THREE.Raycaster(player.representation.position.clone(), player.prop.movementVector);
    let collisionResultsXY = raycasterXZ.intersectObjects(tower.representation.children, true);
    if (collisionResultsXY.length > 0 && collisionResultsXY[0].distance < player.prop.dimension) {
      moveDistance = 0;
    }
  }

  // execute movement
  player.updatePosition(gravityDistance, moveDistance);

  // update gravity
  player.prop.updateGravity();
}

function updateCamera() {
  if (rotateHori || rotateVert) {
    let pos = camera.position.clone(),
      horAxis = pos.clone();
    horAxis.applyAxisAngle(new THREE.Vector3(0, 1, 0), 1.5708);
    horAxis.y = 0;
    horAxis.normalize();

    pos.applyAxisAngle(horAxis, rotateHori);
    pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotateVert);
    camera.position.copy(pos);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
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
      rotateVert = -rotateSpeed;
      break;
    case 68: // 'd'
      rotateVert = rotateSpeed;
      break;
    case 87: // 'w'
      rotateHori = -rotateSpeed;
      break;
    case 83: // 's'
      rotateHori = rotateSpeed;
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
      rotateVert = 0;
      break;
    case 68: // 'd'
      rotateVert = 0;
      break;
    case 87: // 'w'
      rotateHori = 0;
      break;
    case 83: // 's'
      rotateHori = 0;
      break;
  }
}, false);