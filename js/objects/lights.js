function getPointLight(camera) {
  let light = new THREE.PointLight(0x00ff00, 10, 8);
  light.position.x = camera.position.x + 2;
  light.position.y = camera.position.y;
  light.position.z = camera.position.z;
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  return light;
}

function getAmbientLight() {
  return new THREE.AmbientLight(0xffffff, 1.5);
}