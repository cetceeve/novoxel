class Tower {
  constructor() {
    this.prop = {
      width: 25,
      height: 5,
      color: 0x424242,
      columns: 4,
      rows: 5
    };
    this.representation = this.createTower(this.prop);
  }

  createTower(prop) {
    let tower = new THREE.Group();

    tower.add(this.createObstacles(prop, MAP.arrayA, 'a'));
    tower.add(this.createObstacles(prop, MAP.arrayB, 'b'));
    tower.add(this.createObstacles(prop, MAP.arrayC, 'c'));
    tower.add(this.createObstacles(prop, MAP.arrayD, 'd'));

    return tower;
  }

  /*
  createObstacles(prop, array, side) {
    let obstacle, obstacles = new THREE.Group();
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        obstacle = this.selectObstacle(array[i][j]);
        if (array[i][j] !== 0) {
          switch (side) {
            case 'a':
              obstacle.position.z = (prop.columns + 1) * prop.width;
              obstacle.position.x = -prop.columns * prop.width + j * prop.width;
              break;
            case 'b':
              obstacle.position.z = prop.columns * prop.width - j * prop.width;
              obstacle.position.x = (prop.columns + 1) * prop.width;
              break;
            case 'c':
              obstacle.position.z = -(prop.columns + 1) * prop.width;
              obstacle.position.x = prop.columns * prop.width - j * prop.width;
              break;
            case 'd':
              obstacle.position.z = -prop.columns * prop.width + j * prop.width;
              obstacle.position.x = -(prop.columns + 1) * prop.width;
              break;
            default:
              break;
          }
          obstacle.position.y = ((MAP.arrayA.length - i - 1) * prop.width);
        } else {
          switch (side) {
            case 'a':
              obstacle.position.z = (prop.columns) * prop.width;
              obstacle.position.x = -prop.columns * prop.width + j * prop.width;
              break;
            case 'b':
              obstacle.position.z = prop.columns * prop.width - j * prop.width;
              obstacle.position.x = (prop.columns) * prop.width;
              break;
            case 'c':
              obstacle.position.z = -(prop.columns) * prop.width;
              obstacle.position.x = prop.columns * prop.width - j * prop.width;
              break;
            case 'd':
              obstacle.position.z = -prop.columns * prop.width + j * prop.width;
              obstacle.position.x = -(prop.columns) * prop.width;
              break;
            default:
              break;
          }
          obstacle.position.y = ((MAP.arrayA.length - i - 1) * prop.width);
        }
        obstacles.add(obstacle);
      }
    }
    return obstacles;
  }
  */

  createObstacles(prop, array, side) {
    let obstacle, obstacles = new THREE.Group();
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        obstacle = this.selectObstacle(array[i][j]);
        switch (side) {
          case 'a':
            obstacle.position.z = prop.columns * prop.width;
            obstacle.position.x = -prop.columns * prop.width + j * prop.width;
            break;
          case 'b':
            obstacle.position.z = prop.columns * prop.width - j * prop.width;
            obstacle.position.x = prop.columns * prop.width;
            break;
          case 'c':
            obstacle.position.z = -prop.columns * prop.width;
            obstacle.position.x = prop.columns * prop.width - j * prop.width;
            break;
          case 'd':
            obstacle.position.z = -prop.columns * prop.width + j * prop.width;
            obstacle.position.x = -prop.columns * prop.width;
            break;
          default:
            break;
        }
      }
    }
  }

  selectObstacle(n) {
    switch (n) {
      case 1:
        return this.createObstacle();
      default:
        return this.createObstacle();
    }
  }

  createObstacle() {
    let obstacle = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.prop.width, this.prop.width, this.prop.width),
      new THREE.MeshPhongMaterial({ color: this.prop.color })
    );
    obstacle.receiveShadow = true;
    obstacle.castShadow = true;
    return obstacle;
  }
}