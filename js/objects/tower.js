class Tower {
  constructor() {
    this.prop = {
      width: 25,
      height: 5,
      color: 0x424242,
      columns: 4,
      rows: 5
    };
    this.obstacles = null;
    this.representation = this.createTower(this.prop);
  }

  createTower(prop) {
    let tower = this.createBaseTower(prop),
      obstacles = new THREE.Group();

    obstacles.add(this.createObstacles(prop, MAP.arrayA, 'a'));
    obstacles.add(this.createObstacles(prop, MAP.arrayB, 'b'));
    obstacles.add(this.createObstacles(prop, MAP.arrayC, 'c'));
    obstacles.add(this.createObstacles(prop, MAP.arrayD, 'd'));

    this.obstacles = obstacles;
    tower.add(obstacles);
    return tower;
  }

  createBaseTower(prop) {
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

  createObstacles(prop, array, side) {
    let obstacle, obstacles = new THREE.Group();
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] !== 0) {
          obstacle = this.selectObstacle(array[i][j]);
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

          obstacles.add(obstacle);
        } else {
          continue;
        }
      }
    }
    return obstacles;
  }

  selectObstacle(n) {
    switch (n) {
      case 1:
        return this.createObstacle();
      default:
        break;
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