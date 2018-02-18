// @flow

import Network from "./network.js"
import Connection from "./connection.js"
import * as _ from "lodash"

export default class Node {
	connections : Array<Connection>
	network : Network
	name : string
	constructor(network : Network, name : string) {
		this.connections = []
		this.network = network
		this.name = name
	}
	destroy() {
		_.map(this.connections, (connection) => connection.destroy())
		this.network.nodes.splice(this.network.nodes.indexOf(this), 1);
	}
}
