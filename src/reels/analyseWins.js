/**
 * simple timer class 
 * 
 * @class
 */
export class analyseWins {
    /**
     * 
     */
    constructor() {
        this._paytable = {
            h2: 10, 
            h3: 10, 
            h4: 10, 
            ace: 30, 
            king: 30, 
            queen: 30, 
            jack: 30, 
            ten: 50, 
            nine: 50
        }
    }


/**
 * Return the total win amount for all winlines 
 * @param {Array} winningLines - array of winning winlines 
 */
getTotalWin(winningLines) {
    // to do - could change to store all individual wins for a different display?
    let totalWin = 0
    for (let wins = 0; wins < winningLines.length; ++wins) {
        let number = this._paytable[winningLines[wins].symbol];
        totalWin += number * winningLines[wins].count;
    }
    return totalWin;
}

/**
* Get all winning symbol combinations 
* @param {Array} symbols - array showing landed symbols 
* @param {Number} reelCount - number of columns in the reel 
* @param {Number} rowCount - number of rows in the reel 
* @returns {Object}
*/
getWinlines(symbols, reelCount, rowCount) {
    const winningLines = []; // to do - clean up - nicer way not loop hell?
    for (let row = 0; row < rowCount; ++row) {
        const winlines = [];
        const firstSymbol = symbols[0][row];
        let secondReelCount = 0;
        let thirdReelCount = 0; 
        for ( let reel = 0; reel < reelCount; ++reel ) {
            if ( reel === 0 ) {
                winlines.push(reel);
            } else {
                for (let row = 0 ; row < rowCount; ++row) {
                    if (symbols[reel][row] === firstSymbol) { // shorten?
                        if (reel === 1) {
                            ++secondReelCount;
                        } else if (reel === 2) {
                            ++thirdReelCount;
                        }
                        winlines.push(row);
                    }
                }     
            }
           
        }

        // return winning symbols with number of winlines per 
        const count = secondReelCount * thirdReelCount;
        if (winlines.length >= reelCount && count > 0) {
            winningLines.push({lines: winlines, count: count, symbol: firstSymbol});
        } 
    }

    const result = {
        winningLines,
        totalWin: this.getTotalWin(winningLines)
    }
    return result;
}
}