let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//////////////////////////////////////////
// create plain
let geometryPlain = new THREE.BoxGeometry(5, 0.5, 5);
let materialPlain = new THREE.MeshNormalMaterial();
let plain = new THREE.Mesh(geometryPlain, materialPlain);
// create player cube
let geometryCube = new THREE.BoxGeometry(1, 1, 1);
let materialCube = new THREE.MeshNormalMaterial();
let cube = new THREE.Mesh(geometryCube, materialCube);

let directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

scene.add(plain);
scene.add(cube);
cube.position.y = 1;
camera.position.z = 7;
camera.position.y = 2;

renderer.render(scene, camera);
