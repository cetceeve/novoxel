let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;
camera.position.y = 3.5;
camera.lookAt(scene.position);

let renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/////////////////////////////////////
// Objects
let protoBox = getProtoBox();
let player = getPlayer();
let pointLight = getPointLight(camera);
let ambientLight = getAmbientLight();

scene.add(protoBox);
scene.add(player);
scene.add(ambientLight);
scene.add(pointLight);

renderer.render(scene, camera);

/////////////////////////////////////
// Movement
var moveDistance = 0.08;
document.addEventListener("keydown", onDocumentKeyDown, false);

function onDocumentKeyDown(event) {
  var keyCode = event.which;

  if (keyCode == 38) { // up
    player.position.z += moveDistance;
  } else if (keyCode == 40) { // down
    player.position.z -= moveDistance;
  } else if (keyCode == 37) { // links
    player.position.x -= moveDistance;
  } else if (keyCode == 39) { // rechts
    player.position.x += moveDistance;
  } else if (keyCode == 32) {
    player.position.set(0, 1.5, 0);
  }
  renderer.render(scene, camera);
}