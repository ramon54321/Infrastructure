// @flow

import Network from "./network.js"
import Node from "./node.js"
import {IRenderable} from "./iRenderable.js"

export default class Connection implements IRenderable {
	// -- Game logic
	network : Network
	a : Node
	b : Node

	// -- Renderer
	scene : any

	constructor(network : Network, a : Node, b : Node) {
		this.network = network
		this.scene = network.scene
		this.a = a
		this.b = b
	}
	destroy() {
		this.network.connections.splice(this.network.connections.indexOf(this), 1);
		this.a.connections.splice(this.a.connections.indexOf(this), 1);
		this.b.connections.splice(this.b.connections.indexOf(this), 1);
	}
	toString() : string {
		return "From " + this.a.name + " to " + this.b.name;
	}
	render(deltaTime : number) {

	}
	createRender() {

	}
	destroyRender() {

	}
	showRender() {

	}
	hideRender() {

	}
}
