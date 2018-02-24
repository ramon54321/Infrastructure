// @flow

import * as PIXI from "pixi.js"

export default {
	circle: () => loadSprite("circle"),
	circle_ring: () => loadSprite("circle_ring"),
	circle_ring_capital: () => loadSprite("circle_ring_capital"),
	circle_ring2: () => loadSprite("circle_ring2"),
	circle_ring2_capital: () => loadSprite("circle_ring2_capital"),
	tri: () => loadSprite("tri"),
}

function loadSprite(name : string) {
	let texture = PIXI.Texture.fromImage("./assets/" + name + ".png")
	let sprite = new PIXI.Sprite(texture)
	sprite.scale.y = -1
	return sprite
}
