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
scene.add(plain);
// create player
let bottomGeometry = new THREE.SphereGeometry(0.49, 16, 16);
let bottomMaterial = new THREE.MeshLambertMaterial( {color: 0x333333} );
let bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
bottom.receiveShadow = true;
bottom.castShadow = true;
scene.add(bottom);
bottom.position.y = 1;

let cylGeometry = new THREE.CylinderGeometry(0.2, 0.5, 1, 32, 1, false);
let cylMaterial = new THREE.MeshLambertMaterial( {color: 0x333333} );
let cyl = new THREE.Mesh(cylGeometry, cylMaterial);
cyl.receiveShadow = true;
cyl.castShadow = true;
scene.add(cyl);
cyl.position.y = 1.5;

let ballGeometry = new THREE.SphereGeometry(0.4, 16, 16);
let ballMaterial = new THREE.MeshLambertMaterial( {color: 0x333333} );
let ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.receiveShadow = true;
ball.castShadow = true;
scene.add(ball);
ball.position.y = 2.5;

renderer.render(scene, camera);

var moveDistance = 0.08;
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 38) { // up
        cyl.position.y += moveDistance;
				ball.position.y += moveDistance;
				bottom.position.y += moveDistance;
    } else if (keyCode == 40) { // down
        cyl.position.y -= moveDistance;
				ball.position.y -= moveDistance;
				bottom.position.y -= moveDistance;
    } else if (keyCode == 37) { // links
        cyl.position.x -= moveDistance;
				ball.position.x -= moveDistance;
				bottom.position.x -= moveDistance;
    } else if (keyCode == 39) { // rechts
        cyl.position.x += moveDistance;
				ball.position.x += moveDistance;
				bottom.position.x += moveDistance;
    } else if (keyCode == 32) {
        cyl.position.set(0, 1.5, 0);
				ball.position.set(0, 2.5, 0);
				bottom.position.set(0, 1, 0);
    }
    renderer.render(scene, camera);
};
