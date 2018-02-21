// @flow

import type {Vector2} from "./utils.js"
import Network from "./network.js"
import Connection from "./connection.js"
import * as _ from "lodash"
import {IRenderable} from "./iRenderable.js"
import * as THREE from "three"
import Assets from "./assets.js"
import Game from "./game.js"

export default class Ruler implements IRenderable {
	game : Game

	// -- Renderer
	scene : any
	material : any
	geometry : any
	line : any

	leftUnit : number
	bottomUnit : number

	constructor(game : Game) {
		this.game = game
		this.scene = game.uiScene
		this.createRender()
		this.showRender()
	}
	destroy() {

	}
	render(deltaTime : number) {
		//this.geometry.verticies[0]
	}
	createRender() {
		this.leftUnit = -this.game.unitWidth / 2
		this.bottomUnit = -this.game.unitHeight / 2
		this.material = new THREE.LineBasicMaterial({color: 0xe7e973});
		this.geometry = new THREE.Geometry();
		this.line = new THREE.LineSegments(this.geometry, this.material);
		this.geometry.vertices.push(
			new THREE.Vector3(this.leftUnit + 0.5, this.bottomUnit + 0.5, 0),
			new THREE.Vector3(this.leftUnit + 0.5 + 5, this.bottomUnit + 0.5, 0)
		)
	}
	destroyRender() {

	}
	showRender() {
		this.scene.add(this.line);
	}
	hideRender() {
		this.scene.remove(this.line);
	}
}
