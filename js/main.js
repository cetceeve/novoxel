/*jshint unused: true */
/*jshint undef: true */
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xcccccc, 0.02);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = 10;
camera.position.x = -5;
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);
const clock = new THREE.Clock();

/////////////////////////////////////
// Objects
let tower = createTower(5);
let player = new Player();
let spotLights = getSpotLights();
let directionalLight = getDirectionalLights();
let hemisphereLight = getHemisphereLight();
let ambientLight = getAmbientLight();

let rotateHori = 0,
  rotateVert = 0,
  rotateSpeed = 0.05;

let arrayA = [
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0]
  ],
  obstacles = new THREE.Group();
createObstacles(arrayA, 'a');
createObstacles(arrayA, 'b');
createObstacles(arrayA, 'c');
createObstacles(arrayA, 'd');

tower.add(obstacles);

scene.add(player.representation);
// scene.add(hemisphereLight);
scene.add(spotLights);
scene.add(ambientLight);
//scene.add(directionalLight);
scene.add(tower);
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
  let moveDistance = player.movementProperties.movementSpeed * clockSpeed;
  let gravityDistance = player.movementProperties.gravity * clockSpeed;

  // Hitdetection
  let raycasterY = new THREE.Raycaster(player.representation.position.clone(), new THREE.Vector3(0, -1 * player.movementProperties.gravity, 0).normalize());
  let collisionResultsY = raycasterY.intersectObjects(tower.children, true);
  if (collisionResultsY.length > 0 && collisionResultsY[0].distance < player.getYHitDetectionDistance()) {
    gravityDistance = 0;
    player.movementProperties.gravity = player.movementProperties.gravityTarget;
    player.movementProperties.inAir = false;
  } else {
    player.movementProperties.inAir = true;
  }
  if (player.movementVector.z !== 0 || player.movementVector.x !== 0) {
    let raycasterXZ = new THREE.Raycaster(player.representation.position.clone(), player.movementVector);
    let collisionResultsXY = raycasterXZ.intersectObjects(tower.children, true);
    if (collisionResultsXY.length > 0 && collisionResultsXY[0].distance < player.dimension) {
      moveDistance = 0;
    }
  }

  // execute movement
  player.updatePosition(gravityDistance, moveDistance);

  // update gravity
  player.movementProperties.updateGravity();
}

function updateCamera() {
  if (rotateHori || rotateVert) {
    let pos = camera.position.clone(),
      horAxis = pos.clone();
    horAxis.applyAxisAngle(new THREE.Vector3(0, 1, 0), 1.5708);
    horAxis.y = 0;
    horAxis.normalize();
    console.log("vert: " + rotateVert);
    console.log("hori: " + rotateHori);

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
      player.movementVector.setZ(-1);
      break;
    case 40: // away
      player.movementVector.setZ(1);
      break;
    case 37: // links
      player.movementVector.setX(-1);
      break;
    case 39: // rechts
      player.movementVector.setX(1);
      break;
    case 32: // space {
      player.movementProperties.reverseGravity();
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
      player.movementVector.setZ(0);
      break;
    case 40: // away
      player.movementVector.setZ(0);
      break;
    case 37: // links
      player.movementVector.setX(0);
      break;
    case 39: // rechts
      player.movementVector.setX(0);
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

///////////////////////////////////////////////
// Obstacles
function createObstacles(array, seite) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[0].length; j++) {
      if (array[i][j] !== 0) {
        let obstacle = selectCube(array[i][j]);
        switch (seite) {
          case 'a':
            obstacle.position.z = 12.5;
            obstacle.position.x = -10 + j * 2.5;
            break;
          case 'b':
            obstacle.position.z = 10 - j * 2.5;
            obstacle.position.x = 12.5;
            break;
          case 'c':
            obstacle.position.z = -12.5;
            obstacle.position.x = 10 - j * 2.5;
            break;
          case 'd':
            obstacle.position.z = -10 + j * 2.5;
            obstacle.position.x = -12.5;
            break;
          default:
            break;
        }
        obstacle.position.y = i * 2.5 - 1;

        obstacles.add(obstacle);
      } else {
        continue;
      }
    }
  }
}

function selectCube(n) {
  switch (n) {
    case 1:
      return getProtoBox();
    default:
      break;
  }
}