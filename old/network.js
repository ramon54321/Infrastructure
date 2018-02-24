// @flow

import type {Vector2, NodeType} from "./utils.js"
import Node, {Town} from "./node.js"
import Connection from "./connection.js"
import Game from "./game.js"

export default class Network {
	game : Game

	// -- Game logic
	nodes : Array<Node>
	connections : Array<Connection>

	constructor(game : Game) {
		this.game = game
		this.nodes = []
		this.connections = []
	}
	createNode(nodeType : NodeType, name : string, position : Vector2) : Node {
		let node
		if (nodeType === "Node") {
			node = new Node(this.game, this, name, position)
		} else {
			node = new Town(this.game, this, name, position)
		}
		this.nodes.push(node)
		return node
	}
	createConnection(a : Node, b : Node) : Connection {
		let connection = new Connection(this.game, this, a, b, "solid")
		a.connections.push(connection)
		b.connections.push(connection)
		this.connections.push(connection)
		return connection
	}
	createConnectionBlueprint(a : Node, b : Node) : Connection {
		let connection = new Connection(this.game, this, a, b, "blueprint")
		a.connections.push(connection)
		b.connections.push(connection)
		this.game.currentBlueprints.push(connection)
		return connection
	}
	solidifyConnection(connection : Connection) : Connection {
		connection.setState("solid")
		this.game.currentBlueprints.splice(this.game.currentBlueprints.indexOf(this), 1);
		this.connections.push(connection)
		return connection
	}
}
