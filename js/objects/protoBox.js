function getProtoBox() {
  let geometryPlain = new THREE.BoxGeometry(5, 0.5, 5);
  let materialPlain = new THREE.MeshPhongMaterial({
    color: 0x808080
  });
  let protoBox = new THREE.Mesh(geometryPlain, materialPlain);
  protoBox.receiveShadow = true;
  return protoBox;
}