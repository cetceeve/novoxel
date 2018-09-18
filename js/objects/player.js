class Player {
  constructor() {
    this.dimension = 0.5;
    this.representation = this.getRepresentation();
    this.movementVector = new THREE.Vector3(0, 0, 0);
    this.movementProperties = {
      inAir: true,
      gravityTarget: 10,
      gravity: 10,
      movementSpeed: 4,
      updateGravity: function() {
        if (this.gravity < this.gravityTarget) {
          this.gravity += 0.3;
        }
      },
      reverseGravity: function() {
        if (!this.inAir) {
          this.gravity = -1 * this.gravity;
          this.inAir = true;
        }
      }
    };
  }

  getRepresentation() {
    let bottom, cyl, ball, playerRep, localPlane;

    localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
    bottom = new THREE.Mesh(
      new THREE.SphereGeometry(this.dimension, 16, 16),
      new THREE.MeshPhongMaterial({
        color: 0xff0000,
        clippingPlanes: [localPlane],
        clipShadows: true
      })
    );

    cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(this.dimension * 0.4, this.dimension, this.dimension * 2, 16, 1, false),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    cyl.position.y = this.dimension;

    ball = new THREE.Mesh(
      new THREE.SphereGeometry(this.dimension * 0.8, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );
    ball.position.y = this.dimension * 3;

    playerRep = new THREE.Group();
    playerRep.add(bottom);
    playerRep.add(cyl);
    playerRep.add(ball);

    for (let i = 0; i < playerRep.children.length; i++) {
      playerRep.children[i].castShadow = true;
      playerRep.children[i].receiveShadow = true;
    }

    playerRep.position.set(-10, 15, 12); // Startposition
    playerRep.children[0].material.clippingPlanes[0].constant = 15;
    return playerRep;
  }

  getYHitDetectionDistance() {
    return this.dimension * 1.2;
  }

  updatePosition(gravityDistance, moveDistance) {
    this.representation.position.y -= gravityDistance;
    this.representation.children[0].material.clippingPlanes[0].constant -= gravityDistance;
    if (this.movementVector.z < 0) { // move away
      this.representation.position.z -= moveDistance;
    }
    if (this.movementVector.z > 0) { // move toward
      this.representation.position.z += moveDistance;
    }
    if (this.movementVector.x < 0) { // move left
      this.representation.position.x -= moveDistance;
    }
    if (this.movementVector.x > 0) { // move right
      this.representation.position.x += moveDistance;
    }
  }
}