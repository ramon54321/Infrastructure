// @flow

import type {Vector2, NodeType} from "./utils.js"
import Node, {Town} from "./node.js"
import Connection from "./connection.js"
import Game from "./game.js"

export default class Network {
	// -- Game logic
	nodes : Array<Node>
	connections : Array<Connection>

	// -- Renderer
	scene : any

	constructor(game : Game) {
		this.nodes = []
		this.connections = []
		this.scene = game.scene
	}
	createNode(nodeType : NodeType, name : string, position : Vector2) : Node {
		let node
		if (nodeType === "Node") {
			node = new Node(this, name, position)
		} else {
			node = new Town(this, name, position)
		}
		this.nodes.push(node)
		return node
	}
	createConnection(a : Node, b : Node) : Connection {
		let connection = new Connection(this, a, b)
		a.connections.push(connection)
		b.connections.push(connection)
		this.connections.push(connection)
		return connection
	}
}
