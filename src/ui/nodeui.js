//node UI threejs 
var MSDFShader = require('three-bmfont-text/shaders/msdf')
var createGeometry = require('three-bmfont-text');
var loadFont = require('load-bmfont');

export default class NodeUI{

    constructor(text, scene, pos){
        // pos is vec2 location for middle of the node 
        this.text = text
        this.scene = scene
        this.scene.add()
    }

    getMesh(geometry, material) {
        const mesh = new THREE.Mesh(geometry, material);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

}
