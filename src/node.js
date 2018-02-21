// @flow

import * as Globals from "./globals.js"
import type {Vector2} from "./utils.js"
import Network from "./network.js"
import Connection from "./connection.js"
import * as _ from "lodash"
import {IRenderable} from "./iRenderable.js"
import * as THREE from "three"
import Assets from "./assets.js"

export default class Node implements IRenderable {
	// -- Game logic
	connections : Array<Connection>
	network : Network
	name : string
	position : Vector2

	// -- Renderer
	scene : any
	material : any
	sprite : any

	constructor(network : Network, name : string, position : Vector2) {
		this.connections = []
		this.network = network
		this.scene = network.scene
		this.name = name
		this.position = position
		this.createRender()
		this.showRender()
	}
	destroy() {
		_.map(this.connections, (connection) => connection.destroy())
		this.network.nodes.splice(this.network.nodes.indexOf(this), 1);
	}
	render(deltaTime : number) {

	}
	createRender() {
		this.material = new THREE.SpriteMaterial({map: Assets.circle, color: 0x3be84c});
		this.sprite = new THREE.Sprite(this.material);
		this.sprite.scale.set(1.0, 1.0, 1.0);
		this.sprite.position.set(this.position.x, this.position.y, 0);
	}
	destroyRender() {

	}
	showRender() {
		this.scene.add(this.sprite);
	}
	hideRender() {
		this.scene.remove(this.sprite);
	}
}

export class Town extends Node {
	// -- Game Logic
	population : number
	populationNeedsUpdate : boolean

	growth : number

	constructor(network : Network, name : string, position : Vector2) {
		super(network, name, position)
		this.population =  0
		this.alterPopulation(Globals.getInitialTownPopulation())
	}
	alterPopulation(amount : number) {
		this.population += amount
		this.populationNeedsUpdate = true
	}
	render(deltaTime : number) {
		if(this.populationNeedsUpdate) {
			// -- Size
			let spriteSize = 2 * Math.sqrt(this.population / Math.PI) / 10
			this.sprite.scale.set(spriteSize, spriteSize, spriteSize)

			// -- Color
			this.material.color.set(0xe6ba5b)

			this.populationNeedsUpdate = false
		}
	}
}
