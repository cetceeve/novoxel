function getProtoBox() {
  let geometryPlain = new THREE.BoxBufferGeometry(2.5, 0.5, 2.5);
  let materialPlain = new THREE.MeshPhongMaterial({
    color: 0x424242
  });
  let protoBox = new THREE.Mesh(geometryPlain, materialPlain);
  protoBox.receiveShadow = true;
  protoBox.castShadow = true;
  return protoBox;
}

function createTower(h){
  let bricks = new THREE.Group();
  for (let k = 0; k < h; k++){
    for(let i = -4; i <= 4; i++){
      for (let j = -4; j <=4; j++){
        if((j===-4 || j===4) || (i===-4 || i===4)) {
        bricks.add(createBrick(2.5 * i, 2.5 * k, 2.5 * j));
      }
      }
    }
  }
  return bricks;
}

function createBrick(x, y, z){
  let geometryBrick = new THREE.BoxBufferGeometry(2.5, 2.5, 2.5);
  let materialBrick = new THREE.MeshPhongMaterial( {color: 0x404040} );
  let brick = new THREE.Mesh(geometryBrick, materialBrick);
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
