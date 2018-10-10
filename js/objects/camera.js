class Cam {
  constructor() {
    this.prop = {
      fov: 60,
      posX: 0,
      posZ: 250,
      offsetY: 50,
      rotateSpeed: 0.05,
      rotateHori: 0,
      rotateVert: 0,
      animationSpeed: 1
    };
    this.camera = this.getCamera();
    this.targetPosition = this.prop.offsetY;
  }

  observePosUpdates(callback) {
    this.posCallback = callback;
  }

  getCamera() {
    let cam = new THREE.PerspectiveCamera(this.prop.fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    cam.position.x = this.prop.posX;
    cam.position.y = this.prop.offsetY;
    cam.position.z = this.prop.posZ;
    cam.lookAt(new THREE.Vector3(0, 0, 0));
    return cam;
  }

  updateCamera() {
    if ((this.targetPosition - this.prop.animationSpeed) > this.camera.position.y ||
      (this.targetPosition + this.prop.animationSpeed) < this.camera.position.y) {
      if (this.targetPosition > this.camera.position.y) {
        this.camera.position.y += this.prop.animationSpeed;
      } else {
        this.camera.position.y -= this.prop.animationSpeed;
      }
    }

    if (this.prop.rotateHori || this.prop.rotateVert) {
      let pos = this.camera.position.clone(),
        horAxis = pos.clone();
      horAxis.applyAxisAngle(new THREE.Vector3(0, 1, 0), 1.5708);
      horAxis.y = 0;
      horAxis.normalize();

      pos.applyAxisAngle(horAxis, this.prop.rotateHori);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.prop.rotateVert);
      this.camera.position.copy(pos);
      if (this.posCallback !== undefined) {
        this.posCallback(pos);
      }
      this.lookAt();
    }
  }

  updateHeight(posY) {
    this.targetPosition = posY + this.prop.offsetY;
  }

  lookAt(subscribable) {
    if (subscribable !== undefined) {
      subscribable.observePosUpdates((pos) => {
        this.camera.lookAt(pos);
      });
    } else {
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  }
}