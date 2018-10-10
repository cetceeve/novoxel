const brickNum = 0;

class Tower {
  constructor() {
    this.prop = {
      width: 25,
      height: 5,
      color: 0x424242,
      columns: (MAP.arrayA[0].length - 2) / 2
    };
    this.representation = this.createTower(this.prop);
  }

  createTower(prop) {
    let tower = new THREE.Group();

    tower.add(this.createObstacles(prop, MAP.arrayA, 'a'));
    tower.add(this.createObstacles(prop, MAP.arrayB, 'b'));
    tower.add(this.createObstacles(prop, MAP.arrayC, 'c'));
    tower.add(this.createObstacles(prop, MAP.arrayD, 'd'));
    tower.add(this.createGround());
    tower.add(this.createCover());

    return tower;
  }

  createObstacles(prop, array, side) {
    let obstacle, obstacles = new THREE.Group();
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        obstacle = this.selectObstacle(array[i][j]);
        switch (side) {
          case 'a':
            obstacle.representation.position.z = (prop.columns + obstacle.offset) * prop.width;
            obstacle.representation.position.x = -prop.columns * prop.width + j * prop.width;
            break;
          case 'b':
            obstacle.representation.position.z = prop.columns * prop.width - j * prop.width;
            obstacle.representation.position.x = (prop.columns + obstacle.offset) * prop.width;
            break;
          case 'c':
            obstacle.representation.position.z = -(prop.columns + obstacle.offset) * prop.width;
            obstacle.representation.position.x = prop.columns * prop.width - j * prop.width;
            break;
          case 'd':
            obstacle.representation.position.z = -prop.columns * prop.width + j * prop.width;
            obstacle.representation.position.x = -(prop.columns + obstacle.offset) * prop.width;
            break;
          default:
            break;
        }
        obstacle.representation.position.y = ((MAP.arrayA.length - i - 1) * prop.width);
        obstacles.add(obstacle.representation);
      }
    }
    return obstacles;
  }

  selectObstacle(n) {
    switch (n) {
      case 1:
        return this.createObstacle();
      default:
        return this.createTowerWall();
    }
  }

  createTowerWall() {
    return {
      representation: this.createBrick(),
      offset: 0
    };
  }

  createObstacle() {
    return {
      representation: this.createBrick(),
      offset: 1
    };
  }

  createBrick() {
    let brick = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.prop.width, this.prop.width, this.prop.width),
      new THREE.MeshPhongMaterial({ color: this.prop.color })
    );
    brick.receiveShadow = true;
    brick.castShadow = true;
    return brick;
  }

  createGround() {
    let ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(600, 600),
      new THREE.MeshPhongMaterial({ color: 0x35682d })
    );
    ground.receiveShadow = true;
    ground.rotateX(1.57 * 3);
    ground.position.y = -this.prop.width / 2;
    return ground;
  }

  createCover() {
    let cover = new THREE.Mesh(
      new THREE.PlaneBufferGeometry((MAP.arrayA[0].length - 1) * this.prop.width, (MAP.arrayA[0].length - 1) * this.prop.width),
      new THREE.MeshPhongMaterial({ color: this.prop.color })
    );
    cover.receiveShadow = true;
    cover.rotateX(1.57 * 3);
    cover.position.y = (MAP.arrayA.length - 1) * this.prop.width + this.prop.width / 2;
    return cover;
  }
}