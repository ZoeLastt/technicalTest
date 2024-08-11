import * as PIXI from "pixi.js";
/**
 * Handles win celebration visuals 
 * 
 * @class
 */
export class WinVisuals {
    /**
     * 
     * @param {Number} reelCount - The number of reels 
     * @param {Number} rowCount - The number of rows / symbols per reel
     */
    constructor(reelCount, rowCount, reelContainer) {
        this._reelCount = reelCount;
        this._rowCount = rowCount;
        this._reelContainer = reelContainer;
        for (let reel = 0; reel < reelCount; ++reel) {
            const container = new PIXI.Container("reel");
            container.name = `row_${reel}`;
            this._reelContainer.addChild(container);
        }
        this.create();
    }

    /**
     * Draw every possible winline 
     */
    create() {
        this._winlineParent = new PIXI.Container("winlineParent");

        // vould get these in a nicer way 
        const yPositions = [80, 180, 280];
        const xPositions = [125, 250, 357];

        //  Create the first segments 
        for (let row = 0; row < this._rowCount; ++row) {
            const container = this._reelContainer.getChildByName( `row_${row}`);

            //Draw the first reels lines
            this._drawLine(container, {x:0, y:yPositions[row]}, {x:xPositions[0], y: yPositions[row]}, 0);

            //Draw the second and third reels lines 
            for (let reel = 0; reel < this._reelCount; ++reel) {
                this._drawLine(container, {x:xPositions[0], y:yPositions[row]}, {x:xPositions[1], y:yPositions[reel]}, reel);
                this._drawLine(container, {x:xPositions[1], y:yPositions[row]}, {x:xPositions[2], y:yPositions[reel]}, reel);
            }
        }
    }

    _drawLine(container, start, end, row) {
        const graphics = new PIXI.Graphics();
        graphics.moveTo(start.x, start.y);
        graphics.lineStyle( 10, 0xe5eb34 );
        graphics.lineTo(end.x, end.y);
        graphics.name = `Row${row}`;
        container.addChild(graphics);
    }

    buildUpWinlines() {

    }
}