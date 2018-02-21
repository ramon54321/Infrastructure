// @flow

import * as Globals from "./globals.js"
import type {OptionsTown, NodeType} from "./utils.js"
import Network from "./network.js"
import * as THREE from "three"
import MeshLine from "three.meshline"
import * as _ from "lodash"
import Ruler from "./ruler.js"
import Input from "./input.js"


export default class Game {
	// -- Game logic
	network : Network
	input : Input

	// -- UI
	ruler : Ruler

	// -- Rendering
	width : number
	height : number
	aspectRatio : number
	cameraSize : number
	unitWidth : number
	unitHeight : number
	scene : any
	camera : any
	renderer : any

	// -- UI Rendering
	uiCameraSize : number
	uiUnitWidth : number
	uiUnitHeight : number
	uiScene : any
	uiCamera : any

	constructor() {
		// -- Rendering
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.aspectRatio = this.width / this.height
		this.cameraSize = 10 // Vertical units
		this.unitWidth = this.aspectRatio * this.cameraSize
		this.unitHeight = this.cameraSize
		this.scene = new THREE.Scene()
		this.camera = new THREE.OrthographicCamera(
			(-this.aspectRatio/2) * this.cameraSize,
			(this.aspectRatio/2) * this.cameraSize,
			(1/2) * this.cameraSize,
			-(1/2) * this.cameraSize, 0.1, 1000)
		this.camera.position.z = 10

		this.uiCameraSize = 10 // Vertical units
		this.uiUnitWidth = this.aspectRatio * this.uiCameraSize
		this.uiUnitHeight = this.uiCameraSize
		this.uiScene = new THREE.Scene()
		this.uiCamera = new THREE.OrthographicCamera(
			(-this.aspectRatio/2) * this.uiCameraSize,
			(this.aspectRatio/2) * this.uiCameraSize,
			(1/2) * this.uiCameraSize,
			-(1/2) * this.uiCameraSize, 0.1, 1000)
		this.uiCamera.position.z = 10

		// Renderer
		this.renderer = new THREE.WebGLRenderer({antialias: true})
		this.renderer.setSize(this.width, this.height)
		this.renderer.setClearColor(0x11181e, 1)
		this.renderer.autoClear = false

		if(document.body != null) {
			document.body.appendChild(this.renderer.domElement)
		} else {
			console.log("[ERROR] Body Null -> Application won't run");
		}

		// -- UI
		this.ruler = new Ruler(this)

		// -- Game logic
		this.network = new Network(this)
		this.input = new Input()

		// -- Start game
		this.start()
	}

	render(deltaTime : number) {
		// -- Logic TODO: Put logic in a update or tick loop instead.
		this.update(deltaTime)

		// -- Render UI
		this.ruler.render(deltaTime)

		// -- Render network components
		_.map(this.network.connections, (connection) => connection.render(deltaTime))
		_.map(this.network.nodes, (node) => node.render(deltaTime))

		this.renderer.clear()
		this.renderer.render(this.scene, this.camera)
		//this.renderer.clearDepth()
		//this.renderer.render(this.uiScene, this.camera)
		this.renderer.clearDepth()
		this.renderer.render(this.uiScene, this.uiCamera)
	}

	update(deltaTime : number) {
		this.updateCamera(deltaTime)
		this.updateNetwork(deltaTime)
	}
	updateCamera(deltaTime : number) {
		// Left
		if(this.input.isDown("KeyA")){
			this.camera.position.x -= 4 * deltaTime
		}
		// Right
		if(this.input.isDown("KeyD"))
			this.camera.position.x += 4 * deltaTime

		// Up
		if(this.input.isDown("KeyW"))
			this.camera.position.y += 4 * deltaTime
		// Down
		if(this.input.isDown("KeyS"))
			this.camera.position.y -= 4 * deltaTime

	}
	updateNetwork(deltaTime : number) {
		if(this.input.isDown("Space")){
			this.spawnTown({position: {x: 2, y: 2}})
		}
	}

	start() {
		// Create boundary lines
		this.createBoundaryLines()

		this.spawnTown({position: {x: 2, y: 2}})
	}

	// -- Logic methods
	createBoundaryLines() {
		let material = new THREE.LineBasicMaterial({color: 0xd4b353, linewidth: 6});
		material = new MeshLineMaterial({color: 0xd4b353, linewidth: 6});
		let geometry = new THREE.Geometry();
		let line = new MeshLine();
		line.setGeometry(geometry)
		let mesh = new THREE.Mesh(geometry, material)
		geometry.vertices.push(
			new THREE.Vector3(Globals.boundary.left, Globals.boundary.top, 0),
			new THREE.Vector3(Globals.boundary.left, Globals.boundary.bottom, 0),
			new THREE.Vector3(Globals.boundary.right, Globals.boundary.bottom, 0),
			new THREE.Vector3(Globals.boundary.right, Globals.boundary.top, 0),
			new THREE.Vector3(Globals.boundary.left, Globals.boundary.top, 0),
		)
		this.scene.add(mesh);
	}

	spawnTown(options : OptionsTown) {
		this.network.createNode(
			"Town",
			_.get(options, "name", Globals.getTownName()),
			_.get(options, "position", {
				x: 0, y: 0
			})
		)
	}
}
