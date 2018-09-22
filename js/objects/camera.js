class Cam {
  constructor() {
    this.prop = {
      fov: 60,
      posX: 0,
      posY: 120,
      posZ: 250,
      rotateSpeed: 0.05,
      rotateHori: 0,
      rotateVert: 0
    };
    this.camera = this.getCamera();
    this.posCallback = null; // to be injected
  }

  subscribeToPosUpdates(callback) {
    this.posCallback = callback;
  }

  getCamera() {
    let cam = new THREE.PerspectiveCamera(this.prop.fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    cam.position.x = this.prop.posX;
    cam.position.y = this.prop.posY;
    cam.position.z = this.prop.posZ;
    cam.lookAt(new THREE.Vector3(0, 0, 0));
    return cam;
  }

  updateCamera() {
    if (this.prop.rotateHori || this.prop.rotateVert) {
      let pos = this.camera.position.clone(),
        horAxis = pos.clone();
      horAxis.applyAxisAngle(new THREE.Vector3(0, 1, 0), 1.5708);
      horAxis.y = 0;
      horAxis.normalize();

      pos.applyAxisAngle(horAxis, this.prop.rotateHori);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.prop.rotateVert);
      this.posCallback(pos);
      this.camera.position.copy(pos);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  }

  bindTo(subscribable) {
    subscribable.subscribeToPosUpdates((pos) => {
      this.camera.lookAt(pos);
    });
  }
}