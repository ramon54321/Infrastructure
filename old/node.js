// @flow

import * as Globals from "./globals.js"
import type {Vector2} from "./utils.js"
import Network from "./network.js"
import Connection from "./connection.js"
import * as _ from "lodash"
import {IRenderable} from "./iRenderable.js"
import Assets from "./assets.js"
import Game from "./game.js"
import * as PIXI from "pixi.js"

class Sprite {
	game : Game
	sprite : any
	constructor(game : Game, sprite : any, tint : any) {
		this.game = game
		this.sprite = sprite
		this.sprite.interactive = true
		this.sprite.anchor.set(0.5)
		this.sprite.tint = tint
		this.sprite.zOrder = 1
		this.game.scene.addChild(this.sprite)
	}
	setPosition(x : number, y : number) {
		this.sprite.x = x
		this.sprite.y = y//((y * 100) - this.game.app.screen.height) * -1
	}

}

export default class Node implements IRenderable {
	game : Game

	// -- Game logic
	connections : Array<Connection>
	network : Network
	name : string
	position : Vector2

	// -- Rendering
	sprite : Sprite
	info : any

	constructor(game : Game, network : Network, name : string, position : Vector2) {
		this.game = game
		this.connections = []
		this.network = network
		this.name = name
		this.position = position
		this.createRender()
		this.showRender()
		this.createUiRender()
	}
	destroy() {
		_.map(this.connections, (connection) => connection.destroy())
		this.network.nodes.splice(this.network.nodes.indexOf(this), 1);
	}
	render(deltaTime : number) {

	}
	createRender() {

	}
	createUiRender() {
		this.sprite.sprite.on("pointerdown", this.onClick.bind(this))
		this.sprite.sprite.on("pointerup", this.onRelease.bind(this))
		this.sprite.sprite.on("pointerupoutside", this.onRelease.bind(this))
		this.sprite.sprite.on("pointerover", this.onOver.bind(this))
		this.sprite.sprite.on("pointerout", this.onOut.bind(this))
		let style = new PIXI.TextStyle({
		    fontFamily: "Arial",
		    fontSize: 12,
			fontWeight: "bold"
		})
		this.info = new PIXI.Text("", style)
		this.info.scale = new PIXI.Point(1, -1)
		this.info.visible = false
		this.game.scene.addChild(this.info)
	}
	destroyRender() {

	}
	showRender() {

	}
	hideRender() {

	}
	onClick() {

	}
	onRelease() {

	}
	onOver() {

	}
	onOut() {

	}
}



export class Town extends Node {
	// -- Game Logic
	population : number
	populationNeedsUpdate : boolean

	growth : number

	constructor(game : Game, network : Network, name : string, position : Vector2) {
		super(game, network, name, position)
		this.population =  0
		this.alterPopulation(Globals.getInitialTownPopulation())
	}
	alterPopulation(amount : number) {
		this.population += amount
		this.populationNeedsUpdate = true
	}
	shipment(type : string, amount : number) {

	}
	render(deltaTime : number) {

		// -- Ship to connections


		if(this.populationNeedsUpdate) {
			// -- Size
			let spriteSize = Math.round(2 * Math.sqrt(this.population / Math.PI) * 1)
			this.sprite.sprite.width = spriteSize
			this.sprite.sprite.height = spriteSize

			// -- Color


			this.populationNeedsUpdate = false
		}
	}
	createRender() {
		this.sprite = new Sprite(this.game, Assets.circle(), 0x14b677)
		this.sprite.setPosition(this.position.x, this.position.y)
	}
	onOver() {
		this.info.visible = true
		this.info.text = this.name + "\nPopulation: " + Math.round(this.population)
		this.info.x = Math.round(this.position.x + this.sprite.sprite.width / 2 + 12)
		this.info.y = Math.round(this.position.y + this.sprite.sprite.height / 2)
	}
	onOut() {
		this.info.visible = false
	}
	onClick() {
		this.game.selectItem("town", this)
	}
}
