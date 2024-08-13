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
        const winlines = Array(this._rowCount).fill().map(() => []);
    
        for (let row = 0; row < this._rowCount; ++row) {
            const firstSymbol = symbols[0][row];
            const matchingIndices = [[], []];  // Stores matching indices for reel 1 and reel 2
    
            // Collect matching indices for reel 1 and reel 2
            symbols.slice(1).forEach((reel, reelIndex) => {
                reel.forEach((symbol, symbolIndex) => {
                    if (symbol === firstSymbol) {
                        matchingIndices[reelIndex].push(symbolIndex);
                    }
                });
            });
    
            // Generate all winline combinations     
            if (matchingIndices[0].length > 0 && matchingIndices[1].length > 0) {
                matchingIndices[0].forEach(index1 => {
                    matchingIndices[1].forEach(index2 => {
                        winlines[row].push([index1, index2]);
                    });
                });
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
        // TO DO - could add to a variable storing every spins win and display 
        let totalWin = 0

        for (let row = 0; row < this._rowCount; ++row) {
            if (winlines[row].length > 0) {
            const count = winlines[row].length;
            const symbol = symbols[0][row];
            totalWin += count * this._paytable[symbol];
            }
        }
        return totalWin;
    }
}