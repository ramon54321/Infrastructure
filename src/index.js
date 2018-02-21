// @flow

import Game from "./game.js"

// -- Create new game instance
const game : Game = new Game()

// -- Render loop call
let framesThisSecond = 0
let lastRenderTime = Date.now()
const render = function() {
	requestAnimationFrame(render)

	let now = Date.now()
	let deltaTime = (now - lastRenderTime) / 1000
	lastRenderTime = now
	framesThisSecond++

	game.render(deltaTime)
}
render()

// -- Render fps log
setInterval(() => {
	console.log(framesThisSecond);
	framesThisSecond = 0
}, 1000)


//game.network.createNode("Town", "Hide", {x: 0, y: 0})
