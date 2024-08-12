/**
 * Class containing functionality to analyse wins
 * 
 * @class
 */
export class AnalyseWins {
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

        /**
         * Each of the first 3 symbols have the below 9 winlines 
         * The reel being the index, the row being the value 
         * @example
         * [1, 0] on reel 0 would look like 
         * [X, O, X]
         * [O, X, O]
         * [O, O, O]
         */
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

        // TO DO - could parse these or get from common place ? core?
        this._reelCount = 3;
        this._rowCount = 3;
    }

    /**
     * Get the winning lines for every starting symbol 
     * @param {array} symbols - Contains the landed reel symbols 
     * @returns {array}
     */
    getWinningLines(symbols) {
        const winlines = [[], [], []];
        for (let row = 0; row < this._rowCount; ++row) {
            const firstSymbol = symbols[0][row];
                const reel1 = [];
                const reel2 = [];

                // Loop through each reels symbols and store if matches winline symbol
                for(let x = 1; x < symbols.length; ++x) {
                    for(let y = 0; y < symbols[x].length; ++y) {
                        if(symbols[x][y] === firstSymbol) {
                            if(x===1){
                                reel1.push(y);
                            } else {
                                reel2.push(y);
                            }
                        }
                    }
                }

            // Generate all winline combinations     
            if(reel1.length > 0 && reel2.length > 0) {
                for(let a = 0; a < reel1.length; ++a ) {
                    for( let b = 0; b < reel2.length; ++b){
                        winlines[row].push([reel1[a], reel2[b]]);
                    }
                }
            }
        }

        return winlines;
    }




/**
 * Return the total win amount for all winlines 
 * @param {Array} winlines - Contains winlines 
 * @param {array} symbols - Contains all landed symbols 
 */
getTotalWin(winlines, symbols) {
    // TO DO - could refactor to store all individual wins for a different display?
    let totalWin = 0

    /*
    for (let wins = 0; wins < winningLines.length; ++wins) {
        let number = this._paytable[winningLines[wins].symbol];
        totalWin += number * winningLines[wins].count;
    }
    */
    return totalWin;
}
}