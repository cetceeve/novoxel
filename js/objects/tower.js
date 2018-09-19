class Tower {
  constructor() {
    this.prop = {
      width: 2.5,
      height: 0.5,
      color: 0x424242,
      columns: 4,
      rows: 5
    };
    this.representation = this.createTower(this.prop);
  }

  createTower(prop) {
    let bricks = new THREE.Group();
    for (let k = 0; k < prop.rows; k++) {
      for (let i = -prop.columns; i <= prop.columns; i++) {
        for (let j = -prop.columns; j <= prop.columns; j++) {
          if ((j === -prop.columns || j === prop.columns) || (i === -prop.columns || i === prop.columns)) {
            bricks.add(this.createBrick(prop.width * i, prop.width * k, prop.width * j));
          }
        }
      }
    }
    return bricks;
  }

  createBrick(x, y, z) {
    let brick = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.prop.width, this.prop.width, this.prop.width),
      new THREE.MeshPhongMaterial({ color: this.prop.color })
    );
    /*let edges = new THREE.EdgesGeometry(geometry);
    let line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xffffff}));*/
    brick.receiveShadow = true;
    brick.castShadow = true;
    brick.position.x = x;
    brick.position.y = y;
    brick.position.z = z;
    return brick;
    //return line;
  }

  getObstacle() {
    let protoBox = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.prop.width, this.prop.height, this.prop.width),
      new THREE.MeshPhongMaterial({ color: this.prop.color })
    );
    protoBox.receiveShadow = true;
    protoBox.castShadow = true;
    return protoBox;
  }
}