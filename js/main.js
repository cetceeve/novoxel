const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;
camera.position.y = 3.5;
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const clock = new THREE.Clock();

/////////////////////////////////////
// Objects
let playerMoveAway, playerMoveToward, playerMoveLeft, playerMoveRight, spacePressed, gravityDistance;
let movementSpeed = 2;
let gravity = 5;
let protoBox = getProtoBox();
let player = getPlayer();
let pointLight = getPointLight(camera);
let ambientLight = getAmbientLight();
let collide = false;

scene.add(protoBox);
scene.add(player);
scene.add(ambientLight);
scene.add(pointLight);

////////////////////////////////////
// animation
var animate = function() {
  requestAnimationFrame(animate);
  updatePlayer();
  renderer.render(scene, camera);
};
animate();

function updatePlayer() {
  let clockSpeed = clock.getDelta();
  let moveDistance = movementSpeed * clockSpeed;
  gravityDistance = gravity * clockSpeed;

  // Hitdetection
  let ray = new THREE.Raycaster(player.position.clone(), new THREE.Vector3(0, -1, 0));
  let collisionResults = ray.intersectObjects(scene.children);
  if (collisionResults.length > 0 && collisionResults[0].distance < gravityDistance * 2) {
    gravityDistance = 0;
  }

  // movement
  player.position.y -= gravityDistance;
  if (playerMoveAway) {
    player.position.z -= moveDistance;
  } else if (playerMoveToward) {
    player.position.z += moveDistance;
  } else if (playerMoveLeft) {
    player.position.x -= moveDistance;
  } else if (playerMoveRight) {
    player.position.x += moveDistance;
  }

  if (gravity < 5) {
    gravity += 0.2;
  }
  // collision detection:
  //   determines if any of the rays from the cube's origin to each vertex
  //		intersects any face of a mesh in the array of target meshes
  //   for increased collision accuracy, add more vertices to the cube;
  //		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
  //   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
  // let originPoint = player.position.clone();
  // for (let vertexIndex = 0; vertexIndex < player.geometry.vertices.length; vertexIndex++) {
  //   let localVertex = player.geometry.vertices[vertexIndex].clone();
  //   let globalVertex = localVertex.applyMatrix4(player.matrix);
  //   let directionVector = globalVertex.sub(player.position);
  //
  //   let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
  //   let collisionResults = ray.intersectObjects(scene.children);
  // }
}

/////////////////////////////////////
// Input
document.addEventListener("keydown", event => {
  let keyCode = event.which;
  if (keyCode == 38) { // away
    playerMoveAway = true;
  } else if (keyCode == 40) { // toward
    playerMoveToward = true;
  } else if (keyCode == 37) { // links
    playerMoveLeft = true;
  } else if (keyCode == 39) { // rechts
    playerMoveRight = true;
  } else if (keyCode == 32) {
    gravity = -5;
    spacePressed = true;
  }
}, false);

document.addEventListener("keyup", event => {
  let keyCode = event.which;
  if (keyCode == 38) { // away
    playerMoveAway = false;
  } else if (keyCode == 40) { // toward
    playerMoveToward = false;
  } else if (keyCode == 37) { // links
    playerMoveLeft = false;
  } else if (keyCode == 39) { // rechts
    playerMoveRight = false;
  } else if (keyCode == 32) {
    spacePressed = false;
  }
}, false);