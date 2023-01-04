import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)


const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1,0.25,0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000,0x0000ff,0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000,0.5,10,2)
pointLight.position.set(1,-0.5,1)
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4c00ff, 2, 1, 1)
rectAreaLight.position.set(-1.5,0,1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00,0.5,10,Math.PI *0.1,0.25,1)
spotLight.position.set(0,2,3)
scene.add(spotLight)



//Gui for light

var ambientLightGui = gui.addFolder('Ambient Light')
var directionalLightGui = gui.addFolder('Directional Light')
var hemisphereLightGui = gui.addFolder('Hemisphere Light')
var rectAreaLightGui = gui.addFolder('Rect Area Light')
var pointLightGui = gui.addFolder('Point Light')
var spotLightGui = gui.addFolder('Spot Light')


ambientLightGui.add(ambientLight,'intensity').min(0).max(1).step(0.01)
ambientLightGui.add(ambientLight.position,'x',-5,5).name('X')
ambientLightGui.add(ambientLight.position,'y',-5,5).name('Y')
ambientLightGui.add(ambientLight.position,'z',-5,5).name('Z')
ambientLightGui.add(ambientLight.rotation,'x',0,Math.PI).name('Rotate x')
ambientLightGui.add(ambientLight.rotation,'y',0,Math.PI).name('Rotate y')



rectAreaLightGui.add(rectAreaLight,'intensity').min(0).max(1).step(0.01)
rectAreaLightGui.add(rectAreaLight.position,'x',-5,5).name('X')
rectAreaLightGui.add(rectAreaLight.position,'y',-5,5).name('Y')
rectAreaLightGui.add(rectAreaLight.position,'z',-5,5).name('Z')
rectAreaLightGui.add(rectAreaLight.rotation,'x',0,Math.PI).name('Rotate x')
rectAreaLightGui.add(rectAreaLight.rotation,'y',0,Math.PI).name('Rotate y')


directionalLightGui.add(directionalLight,'intensity').min(0).max(1).step(0.01)
directionalLightGui.add(directionalLight.position,'x',-5,5).name('X')
directionalLightGui.add(directionalLight.position,'y',-5,5).name('Y')
directionalLightGui.add(directionalLight.position,'z',-5,5).name('Z')
directionalLightGui.add(directionalLight.rotation,'x',0,Math.PI).name('Rotate x')
directionalLightGui.add(directionalLight.rotation,'y',0,Math.PI).name('Rotate y')

hemisphereLightGui.add(hemisphereLight,'intensity').min(0).max(1).step(0.01)
hemisphereLightGui.add(hemisphereLight.position,'x',-5,5).name('X')
hemisphereLightGui.add(hemisphereLight.position,'y',-5,5).name('Y')
hemisphereLightGui.add(hemisphereLight.position,'z',-5,5).name('Z')
hemisphereLightGui.add(hemisphereLight.rotation,'x',0,Math.PI).name('Rotate x')
hemisphereLightGui.add(hemisphereLight.rotation,'y',0,Math.PI).name('Rotate y')

pointLightGui.add(pointLight,'intensity').min(0).max(1).step(0.01)
pointLightGui.add(pointLight.position,'x',-5,5).name('X')
pointLightGui.add(pointLight.position,'y',-5,5).name('Y')
pointLightGui.add(pointLight.position,'z',-5,5).name('Z')
pointLightGui.add(pointLight.rotation,'x',0,Math.PI).name('Rotate x')
pointLightGui.add(pointLight.rotation,'y',0,Math.PI).name('Rotate y')


spotLightGui.add(spotLight,'intensity').min(0).max(1).step(0.01)
spotLightGui.add(spotLight.position,'x',-5,5).name('X')
spotLightGui.add(spotLight.position,'y',-5,5).name('Y')
spotLightGui.add(spotLight.position,'z',-5,5).name('Z')
spotLightGui.add(spotLight.rotation,'x',0,Math.PI).name('Rotate x')
spotLightGui.add(spotLight.rotation,'y',0,Math.PI).name('Rotate y')



/**
 * Objects
 */
// Material


const material = new THREE.MeshStandardMaterial()
const materialS = new THREE.MeshStandardMaterial()
const materialC = new THREE.MeshStandardMaterial()
const materialT = new THREE.MeshStandardMaterial()
material.roughness = 0.4
materialS.roughness = 0.4
materialC.roughness = 0.4
materialT.roughness = 0.4

// Objects

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    materialS
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    materialC
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    materialT
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

//Gui for color 

var objectColor = gui.addFolder('Object Color')

const materialParams = {
    boxMeshColor : plane.material.color.getHex()
}

const materialParamsS = {
    boxMeshColorS : sphere.material.color.getHex()
}

const materialParamsC = {
    boxMeshColorC : sphere.material.color.getHex()
}

const materialParamsT = {
    boxMeshColorT : sphere.material.color.getHex()
}


objectColor.addColor(materialParams,'boxMeshColor')
.onChange((value) => plane.material.color.set(value))
.name('Plane Color')

objectColor.addColor(materialParamsS,'boxMeshColorS')
.onChange((value) => sphere.material.color.set(value))
.name('Sphere Color')

objectColor.addColor(materialParamsC,'boxMeshColorC')
.onChange((value) => cube.material.color.set(value))
.name('Cube Color')

objectColor.addColor(materialParamsT,'boxMeshColorT')
.onChange((value) => torus.material.color.set(value))
.name('Torus Color')

//End of Gui color

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()