class Player {
  constructor() {
    this.dimension = 0.49;
    this.representation = this.getRepresentation();
    this.representation.position.set(-10, 15, 12); // Startposition
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
    let bottom, cyl, ball, playerRep;

    bottom = new THREE.Mesh(
      new THREE.SphereGeometry(this.dimension, 16, 16),
      new THREE.MeshLambertMaterial({ color: 0x2d3e50 })
    );

    cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.5, 1, 32, 1, false),
      new THREE.MeshLambertMaterial({ color: 0x2d3e50 })
    );
    cyl.position.y = 0.5;

    ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 16, 16),
      new THREE.MeshLambertMaterial({ color: 0x2d3e50 })
    );
    ball.position.y = 1.5;

    playerRep = new THREE.Group();
    playerRep.add(cyl);
    playerRep.add(ball);
    playerRep.add(bottom);

    for (let i = 0; i < playerRep.children.length; i++) {
      playerRep.children[i].castShadow = true;
      playerRep.children[i].receiveShadow = true;
    }
    return playerRep;
  }

  getYHitDetectionDistance() {
    return this.dimension * 1.2;
  }

  updatePosition(gravityDistance, moveDistance) {
    this.representation.position.y -= gravityDistance;
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