/*jshint unused: true */
/*jshint undef: true */
let scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xcccccc, 0.02);
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.y = 10;
camera.position.x = -5;
camera.lookAt(scene.position);

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.localClippingEnabled = true;
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
document.body.appendChild(renderer.domElement);
let clock = new THREE.Clock();

/////////////////////////////////////
// Objects
let tower, player, lights;
tower = new Tower();
player = new Player();
lights = new Lights();

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

tower.representation.add(obstacles);

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
      return tower.getObstacle();
    default:
      break;
  }
}