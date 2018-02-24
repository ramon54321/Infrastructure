// @flow

import * as Globals from "./globals.js"
import * as PIXI from "pixi.js"
import * as _ from "lodash"
import * as Entities from "./entity.js"
import * as Utils from "./utils.js"
import Input from "./input.js"
import Assets from "./assets.js"


export default class Game {

	app : any
	scene : any

	tickInterval : any

	mousePosition : {x : number, y : number}
	input : Input

	entities : Array<any>

	constructor() {
		let width = window.innerWidth
		let height = window.innerHeight

		this.app = new PIXI.Application(width, height, {backgroundColor : 0xffffff, antialias: true})
		if(document.body)
			document.body.appendChild(this.app.view)

		console.log("WebGL Supported: " + PIXI.utils.isWebGLSupported())

		if(this.app.renderer instanceof PIXI.WebGLRenderer) {
			console.log("Using WebGL Renderer")
		} else {
			console.log("Using Canvas Renderer")
		}

		this.scene = new PIXI.Container()
		this.scene.position.y = (this.app.renderer.height / this.app.renderer.resolution) / 2
		this.scene.position.x = (this.app.renderer.width / this.app.renderer.resolution) / 2
		this.scene.scale.y = -1
		this.scene.interactive = true
		this.scene.on("pointermove", this.onMouseMove.bind(this))
		this.scene.on("pointerdown", this.onMouseDown.bind(this))
		this.app.stage.addChild(this.scene)

		// -- Game logic initial values
		this.mousePosition = {x: 0, y: 0}
		this.input = new Input()
		this.entities = []

		// -- Start game
		this.start()

		// -- Initiate loops
		this.app.ticker.add((deltaTime) => {
			this.render(deltaTime)
		})

		let last = Date.now()
		this.tickInterval = setInterval(() => {
			let now = Date.now()
			let deltaTime = now - last
			last = now
			this.tick(deltaTime / 1000)
		}, 100)
	}

	onMouseMove(event : any) {
		this.mousePosition = event.data.getLocalPosition(this.scene)
	}

	onMouseDown(event : any) {
		let closestEntityInfo = this.getClosestEntityInfoTo(this.mousePosition)
	}

	render(deltaTime : number) {
		// Left
		if(this.input.isDown("KeyA"))
			this.scene.x += 12 * deltaTime
		// Right
		if(this.input.isDown("KeyD"))
			this.scene.x -= 12 * deltaTime
		// Up
		if(this.input.isDown("KeyW"))
			this.scene.y += 12 * deltaTime
		// Down
		if(this.input.isDown("KeyS"))
			this.scene.y -= 12 * deltaTime
	}

	tick(deltaTime : number) {
		_.map(this.entities, (entity) => entity.tick(deltaTime))
	}

	start() {
		this.createBoundaryLines()

		this.spawnTown({isBlueprint: true})
		this.spawnTown({isBlueprint: false})
		this.spawnTown({isActive: false})

		//this.spawnConnection()
	}

	spawnTown(options? : any) {
		let entity = new Entities.Town(this, options)
		this.entities.push(entity)
	}

	createBoundaryLines() {
		let graphics = new PIXI.Graphics();

		graphics.lineStyle(2, 0x121212, 1)
		graphics.drawRect(Globals.boundary.left, Globals.boundary.bottom, Globals.boundary.right * 2, Globals.boundary.top * 2)
		graphics.hitArea = graphics.getBounds()

		this.scene.addChild(graphics)
	}

	getClosestEntityInfoTo(position : {x : number, y : number}) {
		let closestEntity = null
		let closestDistance = null
		_.map(this.entities, (entity) => {
			let graphic = entity.graphic
			if(!graphic)
				return
			let distance = Utils.getSquareDistance(position, graphic.position)
			if(!closestDistance || distance < closestDistance) {
				closestEntity = entity
				closestDistance = distance
			}
		})
		return {entity: closestEntity, distance: closestDistance}
	}

	selectEntity(entity : Entities.Entity) {
		if(entity.state !== "active")
			return


	}
}
