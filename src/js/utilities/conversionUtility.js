class ConversionUtility {

    static convertAmerican(odds) {
        odds = parseFloat(odds);
        if (odds > 0) {
            return (100 /(odds + 100)*100).toFixed(2);
        } else {
            return (-(odds)/ ((-(odds) + 100))*100).toFixed(2);
        }
    };

    static convertFractional(odds) {
        let slashIndex = odds.indexOf("/");
        let numerator = parseInt(odds.slice(0, slashIndex));
        let denominator = parseInt(odds.slice(slashIndex + 1, odds.length));
        return ((1 / ((numerator/denominator) + 1)) * 100).toFixed(2);
    };

    static convertDecimal(odds) {
        odds = parseFloat(odds);
        return ((1/odds)*100).toFixed(2);
    }
}

export default ConversionUtility;