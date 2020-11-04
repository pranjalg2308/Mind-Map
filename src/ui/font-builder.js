
const MSDFShader = require('three-bmfont-text/shaders/msdf')
const createGeometry = require('three-bmfont-text');
const loadFont = require('load-bmfont');
const fontFile = require("../../font/Roboto-msdf.json");
const fontAtlas = require("../../font/Roboto-msdf.png");

export default class FontBuilder{
    constructor(text, scene){
        // pos is vec2 location for middle of the node 
        this.text = text
        this.scene = scene
        this.loadBMF();

    }

    loadBMF(){
        // Create geometry of packed glyphs
        loadFont(fontFile, (err, font)=>{
            this.geometry = createGeometry({
                font, 
                text:this.vars.word
            })
        })

        // Load texture containing font glyphs
        this.loader = new THREE.TextureLoader();
        this.loader.load(fontAtlas, texture => {
        setTimeout(() => {
            this.init(this.geometry, texture);
            // this.animate();
        }, 1500);
        });
    }

    init(geometry, texture) {
        this.createMesh(geometry, texture);
        this.onResize();
        window.addEventListener("resize", () => this.onResize(), false);
        this.render();
    }

    getMesh(geometry, material) {
        const mesh = new THREE.Mesh(geometry, material);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }
}