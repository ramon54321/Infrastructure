// @flow

export type Vector2 = {x : number, y : number}
export type NodeType = "Node" | "Town"
export type OptionsTown = {position? : Vector2, name? : string}

export function getDistance(a : Vector2, b : Vector2) {
	let m = (b.y - a.y)
	m *= m
	let n = (b.x - a.x)
	n *= n
	return Math.sqrt(m + n)
}

export function getDistanceToLine(a : Vector2, b : Vector2, point : Vector2) {
	let n = Math.abs((b.y - a.y) * point.x - (b.x - a.x) * point.y + b.x * a.y - b.y * a.x)
	let d = getDistance(a, b)
	return n / d
}
