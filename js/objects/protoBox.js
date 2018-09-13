function getProtoBox() {
  let geometryPlain = new THREE.BoxGeometry(2.5, 0.5, 2.5);
  let materialPlain = new THREE.MeshPhongMaterial({
    color: 0x808080
  });
  let protoBox = new THREE.Mesh(geometryPlain, materialPlain);
  protoBox.receiveShadow = true;
  return protoBox;
}

function createTower(h){
  let bricks = new THREE.Group();
  for (let k = 0; k < h; k++){
    for(let i = 0; i < 8; i++){
      for (let j = 0; j < 8; j++){
        if((j===0 || j===7) || (i===0 || i===7)) {
        bricks.add(createBrick(2.5 * i, 2.5 * k, 2.5 * j));
      }
      }
    }
  }
  return bricks;
}

function createBrick(x, y, z){
  let geometryBrick = new THREE.BoxBufferGeometry(2.5, 2.5, 2.5);
  let materialBrick = new THREE.MeshPhongMaterial( {color: 0x222222} );
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
