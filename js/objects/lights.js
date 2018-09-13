function getDirectionalLights() {
  let directionals = new THREE.Group();

  let light1 = new THREE.DirectionalLight( 0xa0a0ff, 1.5 );
  light1.position.set(25, 10, 0);
  light1.castShadow = true;

  let light2 = new THREE.DirectionalLight( 0xa0a0ff, 1.5 );
  light2.position.set(0, 10, 25);
  light2.castShadow = true;

  let light3 = new THREE.DirectionalLight( 0xa0a0ff, 1.5 );
  light3.position.set(-25, 10, 0);
  light3.castShadow = true;

  let light4 = new THREE.DirectionalLight( 0xa0a0ff, 1.5 );
  light4.position.set(0, 10, -25);
  light4.castShadow = true;

  directionals.add(light1);
  directionals.add(light2);
  directionals.add(light3);
  directionals.add(light4);
  return directionals;
}

function getHemisphereLight(){
  let hemiLight = new THREE.HemisphereLight(0xffffff, 0x2d3e50, 1);
  return hemiLight;
}

function getAmbientLight() {
  return new THREE.AmbientLight(0xffffff, 0.5);
}
