function getPlayer() {
  let bottomGeometry = new THREE.SphereGeometry(0.49, 16, 16);
  let bottomMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333
  });
  let bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
  bottom.receiveShadow = true;
  bottom.castShadow = true;

  let cylGeometry = new THREE.CylinderGeometry(0.2, 0.5, 1, 32, 1, false);
  let cylMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333
  });
  let cyl = new THREE.Mesh(cylGeometry, cylMaterial);
  cyl.receiveShadow = true;
  cyl.castShadow = true;
  cyl.position.y = 0.5;

  let ballGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  let ballMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333
  });
  let ball = new THREE.Mesh(ballGeometry, ballMaterial);
  ball.receiveShadow = true;
  ball.castShadow = true;
  ball.position.y = 1.5;

  let player = new THREE.Group();
  player.add(cyl);
  player.add(ball);
  player.add(bottom);

  return player;
}