// @flow

import * as Globals from "./globals.js"
import * as PIXI from "pixi.js"
import type {OptionsTown, NodeType} from "./utils.js"
import Network from "./network.js"
import * as _ from "lodash"
import Input from "./input.js"
import {IRenderable} from "./iRenderable.js"


export default class Game {
	// -- Game logic
	network : Network
	input : Input

	currentBlueprints : Array<IRenderable>
	selectedItem : {type : string, item : any} | null
	selectItem(type : string, item : any) {
		if(!this.selectedItem) {
			this.selectedItem = {type: type, item: item}
		} else {
			if(this.selectedItem.type === "town" && type === "town") {
				this.network.createConnectionBlueprint(this.selectedItem.item, item)
				this.selectedItem = null
			}
		}
	}

	mousePosition : any

	// -- Rendering
	app : any
	scene : any

	constructor() {
		// -- Rendering

		let width = window.innerWidth
		let height = window.innerHeight

		this.app = new PIXI.Application(width, height, {backgroundColor : 0xf4f4f4, antialias: true})
		if(document.body) {
			document.body.appendChild(this.app.view)
		}
		console.log("WebGL Supported: " + PIXI.utils.isWebGLSupported());
		if(this.app.renderer instanceof PIXI.CanvasRenderer) {
			console.log("Canvas Renderer")
		} else {
			console.log("WebGL Renderer")
		}

		this.scene = new PIXI.Container()
		this.scene.position.y = (this.app.renderer.height / this.app.renderer.resolution) / 2
		this.scene.position.x = (this.app.renderer.width / this.app.renderer.resolution) / 2
		this.scene.scale.y = -1
		this.scene.interactive = true
		this.scene.on("pointermove", this.onMove.bind(this))
		this.app.stage.addChild(this.scene)

		// -- Game logic
		this.currentBlueprints = []
		this.selectedItem = null
		this.mousePosition = {x: 0, y: 0}
		this.network = new Network(this)
		this.input = new Input()

		// -- Start game
		this.start()

		this.app.ticker.add((deltaTime) => {
			this.render(deltaTime)
		})
	}

	onMove(event : any) {
		this.mousePosition = event.data.getLocalPosition(this.scene)
	}

	render(deltaTime : number) {
		// -- Logic TODO: Put logic in a update or tick loop instead.
		this.update(deltaTime)

		// -- Render blueprints
		_.map(this.currentBlueprints, (blueprint) => blueprint.render(deltaTime))

		// -- Render network components
		_.map(this.network.connections, (connection) => connection.render(deltaTime))
		_.map(this.network.nodes, (node) => node.render(deltaTime))
	}

	update(deltaTime : number) {
		this.updateCamera(deltaTime)
		this.updateNetwork(deltaTime)
	}
	updateCamera(deltaTime : number) {
		// Left
		if(this.input.isDown("KeyA")){
			this.scene.x += 12 * deltaTime
		}
		// Right
		if(this.input.isDown("KeyD"))
			this.scene.x -= 12 * deltaTime

		// Up
		if(this.input.isDown("KeyW"))
			this.scene.y += 8 * deltaTime
		// Down
		if(this.input.isDown("KeyS"))
			this.scene.y -= 8 * deltaTime

	}
	updateNetwork(deltaTime : number) {
		if(this.input.isDown("Space")){
			this.spawnTown({position: {x: 2, y: 2}})
		}
	}

	start() {
		// Create boundary lines
		this.createBoundaryLines()

		for (var i = 0; i < 40; i++) {
			this.spawnTown()
		}

		//this.network.createConnection(this.network.nodes[2], this.network.nodes[4])

		//this.network.createConnectionBlueprint(this.network.nodes[0], this.network.nodes[1])
	}

	// -- Logic methods
	createBoundaryLines() {
		let graphics = new PIXI.Graphics();

		graphics.lineStyle(2, 0x121212, 1)
		graphics.drawRect(Globals.boundary.left, Globals.boundary.bottom, Globals.boundary.right * 2, Globals.boundary.top * 2)

		this.scene.addChild(graphics)
	}

	spawnTown(options? : OptionsTown) {
		this.network.createNode(
			"Town",
			_.get(options, "name", Globals.getTownName()),
			_.get(options, "position", {
				x: Globals.boundary.left + Math.random() * Globals.boundary.right * 2, y: Globals.boundary.bottom + Math.random() * Globals.boundary.top * 2
			})
		)
	}
}
