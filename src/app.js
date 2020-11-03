import NodeUI from './ui/nodeui'
import * as THREE from 'three'
import Dat from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as Stats from 'stats.js'



//making basic scene and adding nodeui
//camera
//renderer and dom component
//lighting
//controls and resize listerner 
//dat.gui and fps monitor UI
//instante and attach node UI in scene

export default class Stage{

    setup(){

        this.gui = new Dat.GUI()
        this.stats = new Stats()
        document.body.appendChild(this.stats.domElement)
        this.disp_param = {
            wireframe : false
        }
        this.textureLoader = new THREE.TextureLoader()

    }

    initScene(){
        this.scene = new THREE.Scene()
        
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.SpotLightShadow
        this.renderer.setClearColor(0x000000, 1)
        this.renderer.physicallyCorrectLights = true
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 1.25
        document.body.appendChild(this.renderer.domElement)


    }

    initCamera(){
        this.camera_param = {
            fov  : 20,
            near : 1,
            far  : 1000
        }
        this.camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1)
        this.camera.position.set(0, 0, 100)
        const look = new THREE.Vector3(0, 0, 0)
        this.camera.lookAt(look)
        this.scene.add(this.camera)
        const cameraGUI = this.gui.addFolder('Camera')
        cameraGUI.add(this.camera, 'fov').onChange(()=>{this.camera.updateMatrix()})
        cameraGUI.add(this.camera, 'near').onChange(()=>{this.camera.updateMatrix()})
        cameraGUI.add(this.camera, 'far').onChange(()=>{this.camera.updateMatrix()})
        cameraGUI.close()

    }

    initHelper(){
        this.scene.add(new THREE.AxesHelper(100))

    }

    initEventListener(){
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.control.enableRotate = false
        const controlGUI = this.gui.addFolder('Controls')
        controlGUI.add(this.control, 'enableRotate')
        controlGUI.add(this.control, 'rotateSpeed')
        controlGUI.add(this.control, 'enableZoom')
        controlGUI.add(this.control, 'zoomSpeed')
        controlGUI.add(this.control, 'enableRotate')
        controlGUI.add(this.control, 'rotateSpeed')
        controlGUI.add(this.control, 'enableDamping')
        controlGUI.add(this.control, 'dampingFactor')
        controlGUI.add(this.control, 'autoRotate')
        controlGUI.add(this.control, 'autoRotateSpeed')
        controlGUI.add(this.control, 'enableKeys')

        window.addEventListener('resize', this.onResize.bind(this))
        // window.addEventListener('mousemove', this.onMouseMove.bind(this), {passive:true})
        
    }

    onResize() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.width, this.height)
    }
    

    getMesh(geometry, material) {
        const mesh = new THREE.Mesh(geometry, material)

        mesh.castShadow = true
        mesh.receiveShadow = true

        return mesh
    }

    animate(){
        this.stats.begin()

        if(this.control) this.control.update()
        this.renderer.render(this.scene, this.camera)

        this.stats.end()
        requestAnimationFrame(this.animate.bind(this))

    }


    init(){
        
        //initialising all environment variables
        this.setup()

        //create Scene and renderer
        this.initScene()

        //create camera
        this.initCamera()

        //adding grid and helper
        this.initHelper()

        this.animate()

        //controls - mouse, resize listener, 
        this.initEventListener()

    }

}
