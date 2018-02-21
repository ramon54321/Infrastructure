// @flow

import Network from "./network.js"
import Node from "./node.js"
import {IRenderable} from "./iRenderable.js"
import Game from "./game.js"
import * as PIXI from "pixi.js"
import {getDistanceToLine, getDistance} from "./utils.js"

export default class Connection implements IRenderable {
	game : Game

	// -- Game logic
	network : Network
	a : Node
	b : Node
	state : string

	renderNeedsUpdate : boolean

	// -- Rendering
	graphics : any
	info : any
	isInfoOn : boolean

	constructor(game : Game, network : Network, a : Node, b : Node, state : string) {
		this.game = game
		this.network = network
		this.a = a
		this.b = b
		this.state = state
		this.renderNeedsUpdate = true
		this.isInfoOn = false

		this.createRender()
		this.showRender()
		this.createUiRender()
	}
	destroy() {
		this.network.connections.splice(this.network.connections.indexOf(this), 1);
		this.a.connections.splice(this.a.connections.indexOf(this), 1);
		this.b.connections.splice(this.b.connections.indexOf(this), 1);
	}
	toString() : string {
		return "From " + this.a.name + " to " + this.b.name;
	}
	setState(state : string) {
		this.state = state
		this.renderNeedsUpdate = true
	}
	render(deltaTime : number) {
		let distancePerpendicular = getDistanceToLine(this.a.position, this.b.position, this.game.mousePosition)
		let distanceTipA = getDistance(this.a.position, this.game.mousePosition)
		let distanceTipB = getDistance(this.a.position, this.game.mousePosition)
		let length = getDistance(this.a.position, this.b.position)

		if(distanceTipA < length + 10 && distanceTipB < length + 10 && distancePerpendicular < 10) {
			if(!this.isInfoOn) {
				this.onOver()
				this.isInfoOn = true
			}
		} else if (this.isInfoOn){
			this.onOut()
			this.isInfoOn = false
		}

		if(this.renderNeedsUpdate) {
			this.graphics.clear()
			this.graphics.lineStyle(2, 0x242424, 1)
			this.graphics.moveTo(this.a.position.x, this.a.position.y)
			this.graphics.lineTo(this.b.position.x, this.b.position.y)

			this.renderNeedsUpdate = false
		}
	}
	createRender() {
		this.graphics = new PIXI.Graphics();
		this.game.scene.addChild(this.graphics)
	}
	createUiRender() {
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
		this.info.visible = true
		this.info.text = this.a.name + " - " + this.b.name
		this.info.x = Math.round((this.a.position.x + this.b.position.x) / 2) + 20
		this.info.y = Math.round((this.a.position.y + this.b.position.y) / 2)
	}
	onOut() {
		this.info.visible = false
	}
}
