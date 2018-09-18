function getDirectionalLights() {
  let directionals = new THREE.Group();

  let light1 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
  light1.position.set(25, 10, 0);
  light1.castShadow = true;

  let light2 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
  light2.position.set(0, 10, 25);
  light2.castShadow = true;

  let light3 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
  light3.position.set(-25, 10, 0);
  light3.castShadow = true;

  let light4 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
  light4.position.set(0, 10, -25);
  light4.castShadow = true;

  directionals.add(light1);
  directionals.add(light2);
  directionals.add(light3);
  directionals.add(light4);
  return directionals;
}

function getSpotLights() {
  let spotLights = new THREE.Group();

  let light1 = new THREE.SpotLight(0xffffff, 1, 0, 0.8);
  light1.position.set(25, 10, 0);

  let light2 = new THREE.SpotLight(0xffffff, 1, 0, 0.8);
  light2.position.set(0, 10, 25);

  let light3 = new THREE.SpotLight(0xffffff, 1, 0, 0.8);
  light3.position.set(-25, 10, 0);

  let light4 = new THREE.SpotLight(0xffffff, 1, 0, 0.8);
  light4.position.set(0, 10, -25);

  spotLights.add(light1);
  spotLights.add(light2);
  spotLights.add(light3);
  spotLights.add(light4);

  for (let i = 0; i < spotLights.children.length; i++) {
    spotLights.children[i].castShadow = true;
  }

  return spotLights;
}

function getHemisphereLight() {
  let hemiLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);
  return hemiLight;
}

function getAmbientLight() {
  return new THREE.AmbientLight(0xffffff, 0.1);
}