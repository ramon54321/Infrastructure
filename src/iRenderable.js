// @flow

export interface IRenderable {
	scene : any;
	render(deltaTime : number) : void;
	createRender() : void;
	showRender() : void;
	hideRender() : void;
	destroyRender() : void;
}
