// @flow

import Network from "./network.js"
import Node from "./node.js"

export default class Connection {
	network : Network
	a : Node
	b : Node
	constructor(network : Network, a : Node, b : Node) {
		this.network = network
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
}
