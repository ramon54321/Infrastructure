// @flow

export default class Input {
	keysDown : Array<boolean>

	constructor() {
		this.keysDown = []
		window.addEventListener("keypress", (event : any) => {
			this.keysDown[event.code] = true
		})
		window.addEventListener("keyup", (event : any) => {
			this.keysDown[event.code] = false
		})
	}
	isDown(code : any) {
		if (this.keysDown[code])
			return true
		return false
	}
}
