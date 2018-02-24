// @flow

import * as Globals from "./globals.js"
import Game from "./game.js"
import Assets from "./assets.js"

export class Entity {
	game : Game
	graphic : any
	state : string
	isBlueprint : boolean
	constructor(game : Game) {
		this.game = game
		this.graphic = null
	}
	tick() {

	}
}

export class Town extends Entity {
	name : string
	constructor(game : Game, {
		position = {x: Globals.boundary.left + Math.random() * Globals.boundary.right * 2, y: Globals.boundary.bottom + Math.random() * Globals.boundary.top * 2},
		name = Globals.getTownName(),
		isActive = true,
		isBlueprint = false,
	} : any = {}) {
		super(game)

		// -- Create graphic
		this.graphic = Assets.circle()
		this.graphic.anchor.set(0.5)
		this.graphic.x = position.x
		this.graphic.y = position.y
		this.graphic.interactive = true
		this.game.scene.addChild(this.graphic)

		this.name = name
		this.isBlueprint = isBlueprint

		if(isActive) {
			this.setState("active")
		} else {
			this.setState("inactive")
		}
	}
	setState(state : string) {
		this.state = state
		switch (state) {
			case "active":
				console.log("Changing state to active")
				if(this.isBlueprint) {
					this.graphic.tint = 0x23b17d
				} else {
					this.graphic.tint = 0x0ad5e6
				}
				break;
			case "inactive":
				console.log("Changing state to inactive")
				this.graphic.tint = 0xb6b6b6
				break;
			case "selected":
				console.log("Changing state to selected")
				this.graphic.tint = 0xd45048
				break;
			default:
				console.log("Invalid state set to object")
		}
	}
}
