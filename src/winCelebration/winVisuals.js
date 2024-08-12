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
    constructor(reelCount, rowCount, reelContainer, timerManager) {
        this._reelCount = reelCount;
        this._rowCount = rowCount;
        this._reelContainer = reelContainer;
        this._timerManager = timerManager;

        this.winlines = [
            [0,0],
            [0,1],
            [0,2],
            [1,0],
            [1,1],
            [1,2],
            [2,0],
            [2,1],
            [2,2],
        ];

        this._createAssets(); 
    }

    /**
     * Create all of the assets that we will use 
     */
    _createAssets() {
        // Create some containers to better sort all of the winline graphics to be created 
        this._winlineContainer = new PIXI.Container(`WinlineContainer`);
        for (let reel = 0; reel < this._reelCount; ++reel) {
            const rowContainer = new PIXI.Container(`Row_${reel}`);
            rowContainer.name = `Row_${reel}`;
            this._winlineContainer.addChild(rowContainer);
        }
        this._reelContainer.addChild(this._winlineContainer);

        // TO DO - better way to get these, get reel width ? etc - placeholder for now
        const yPositions = [80, 180, 280];
        const xPositions = [125, 187, 357];
        
        // Create all of the winline assets 
        for (let reel = 0; reel < this._reelCount; ++reel) {
            const container = this._winlineContainer.getChildByName(`Row_${reel}`);
            for (let line = 0; line < this.winlines.length; ++line){
                const winlineContainer = new PIXI.Container(`${this.winlines[line]}`);
                winlineContainer.name = `${this.winlines[line]}`;
                
                // Draw line over first symbol
                this._drawLine(winlineContainer, {x: 0, y: yPositions[reel]}, {x: xPositions[0], y: yPositions[reel]});

                // Draw the lines to the second and third symbols
                this._drawLine(winlineContainer, {x: xPositions[0], y: yPositions[reel]}, {x: xPositions[1], y: yPositions[this.winlines[line][0]]});
                this._drawLine(winlineContainer, {x: xPositions[1], y: yPositions[this.winlines[line][0]] }, {x: xPositions[2], y: yPositions[this.winlines[line][1]]});
                winlineContainer.visible = false;
                container.addChild(winlineContainer);
            }
        }

        // Create the total win pop up assets 
        this._totalWinContainer = new PIXI.Container(`TotalWin`);
        this._winText = new PIXI.Text('',{fontFamily : 'Arial', fontSize: 100, fill : 0x00000, align : 'center'});

        // Simple rectangle so text is more visible against reels 
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, 400, 200);
        this._totalWinContainer.addChild(graphics);
        this._totalWinContainer.addChild(this._winText);
        this._totalWinContainer.y = 75;
        this._totalWinContainer.visible = false;
        this._reelContainer.addChild(this._totalWinContainer);
    }

    /**
     * Show the total win 
     * @param {number} win - The win amount to show
     */
    async showTotalWin(win) {
        this._winText.text = win;
        // TO DO - could use a tween to fade in/out
        this._totalWinContainer.visible = true;
        await this._timerManager.startTimer(1000);
        this._totalWinContainer.visible = false;
    }

    /**
     * Set the visibilty of a winline container 
     * @param {number} row - The reel row that the first symbol of the winline is on 
     * @param {string} winline - The name of the win, for example 0_1
     * @param {boolean} visible - Boolean determining the winline visibility
     */
    _setWinlineVisibility(row, winline, visible) {
        const rowContainer = this._winlineContainer.getChildByName(`Row_${row}`);
        const winlineContainer = rowContainer.getChildByName(`${winline}`);
        winlineContainer.visible = visible;
    }

    /**
     * Loop through each of the winlines
     * @param {array} winlines - contains winlines for each starting symbol
     */
    async playWinlineLoop(winlines) {
        const promises = [];
        for (let row = 0; row < winlines.length; ++row) {
            for (let winline = 0; winline < winlines[row].length; ++winline) {
                // Show a winline - delay - then hide the winline
                this._setWinlineVisibility(row, winlines[row][winline], true);
                await this._timerManager.startTimer(1000);
                this._setWinlineVisibility(row, winlines[row][winline], false);     
            }
        }
    }

    /**
     * Draw a line
     * @param {PIXI.Container} container - container to add the line to 
     * @param {Point} start - contains the starting x / y positions
     * @param {Point} end - contains the ending x / y positions
     */
    _drawLine(container, start, end) {
        const graphics = new PIXI.Graphics();
        graphics.moveTo(start.x, start.y);
        graphics.lineStyle( 10, 0xe5eb34 ); // TO DO - could parse hex and have alternating colours
        graphics.lineTo(end.x, end.y);
        container.addChild(graphics);
    }
}