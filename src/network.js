// @flow

import Node from "./node.js"
import Connection from "./connection.js"

export default class Network {
	nodes : Array<Node>
	connections : Array<Connection>
	constructor() {
		this.nodes = []
		this.connections = []
	}
	createNode(name : string) {
		let node = new Node(this, name)
		this.nodes.push(node)
	}
	createConnection(a : Node, b : Node) {
		let connection = new Connection(this, a, b)
		a.connections.push(connection)
		b.connections.push(connection)
		this.connections.push(connection)
	}
}
