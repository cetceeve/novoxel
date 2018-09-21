class Lights {
  constructor() {
    this.spotLights = this.getSpotLights();
    this.directionalLights = this.getDirectionalLights();
    this.ambientLight = this.getAmbientLight();
    this.hemisphereLight = this.getHemisphereLight();
  }

  getDirectionalLights() {
    let directionals, light1, light2, light3, light4;

    light1 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
    light1.position.set(25, 10, 0);

    light2 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
    light2.position.set(0, 10, 25);

    light3 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
    light3.position.set(-25, 10, 0);

    light4 = new THREE.DirectionalLight(0xa0a0ff, 1.5);
    light4.position.set(0, 10, -25);

    directionals = new THREE.Group();
    directionals.add(light1, light2, light3, light4);

    for (let i = 0; i < directionals.children.length; i++) {
      directionals.children[i].castShadow = true;
    }

    return directionals;
  }

  getSpotLights() {
    let spotLights, prop, light1, light2, light3, light4;
    prop = {
      color: 0xffffff,
      intensity: 1,
      distance: 0,
      angle: 0.8,
      posHeight: 100,
      posSpacing: 250
    };

    light1 = new THREE.SpotLight(prop.color, prop.intensity, prop.distnance, prop.angle);
    light1.position.set(prop.posSpacing, prop.posHeight, 0);

    light2 = new THREE.SpotLight(prop.color, prop.intensity, prop.distnance, prop.angle);
    light2.position.set(0, prop.posHeight, prop.posSpacing);

    light3 = new THREE.SpotLight(prop.color, prop.intensity, prop.distnance, prop.angle);
    light3.position.set(-prop.posSpacing, prop.posHeight, 0);

    light4 = new THREE.SpotLight(prop.color, prop.intensity, prop.distnance, prop.angle);
    light4.position.set(0, prop.posHeight, -prop.posSpacing);

    spotLights = new THREE.Group();
    spotLights.add(light1, light2, light3, light4);

    for (let i = 0; i < spotLights.children.length; i++) {
      spotLights.children[i].castShadow = true;
    }

    return spotLights;
  }

  getHemisphereLight() {
    return new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);
  }

  getAmbientLight() {
    return new THREE.AmbientLight(0xffffff, 0.2);
  }
}