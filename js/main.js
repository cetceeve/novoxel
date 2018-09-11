let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;
camera.position.y = 2;

let renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//////////////////////////////////////////
// create light
let light = new THREE.PointLight(0xff0000, 10, 8);
light.position.z = 0;
light.position.y = 2;
light.position.x = 1;
light.castShadow = true;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 25;
scene.add(light);

let ambient = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambient);

//////////////////////////////////////////
// create plain
let geometryPlain = new THREE.BoxGeometry(5, 0.5, 5);
let materialPlain = new THREE.MeshPhongMaterial({ color: 0x808080 });
let plain = new THREE.Mesh(geometryPlain, materialPlain);
plain.receiveShadow = true;
// create player cube
let geometryCube = new THREE.BoxGeometry(1, 1, 1);
let materialCube = new THREE.MeshPhongMaterial({ color: 0x222222 });
let cube = new THREE.Mesh(geometryCube, materialCube);
cube.receiveShadow = true;
cube.castShadow = true;


scene.add(plain);
scene.add(cube);
cube.position.y = 1;

renderer.render(scene, camera);

var xSpeed = 0.1;
var ySpeed = 0.1;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 38) { // up
        cube.position.y += ySpeed;
    } else if (keyCode == 40) { // down
        cube.position.y -= ySpeed;
    } else if (keyCode == 37) { // links
        cube.position.x -= xSpeed;
    } else if (keyCode == 39) { // rechts
        cube.position.x += xSpeed;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
    renderer.render(scene, camera);
};
