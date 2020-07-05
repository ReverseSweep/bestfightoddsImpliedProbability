import ConversionUtility from './utilities/conversionUtility.js';

export function main() {
    let oddsConverter = new OddsConverter();
    oddsConverter.appendOrRemoveImpliedProbabilityOdds();
}

class OddsConverter {

    OddsFormat = Object.freeze({
        MoneyLine : "MoneyLine",
        Decimal : "Decimal",
        Fraction: "Fractional"
    });

    moneyLineTagName = "but-sg";
    propsTagName = "but-sgp";
    oddsInnerTag = "span";

    constructor() {
    }

    appendOrRemoveImpliedProbabilityOdds() {
        let moneyLineOdds = this.getOddsInfo(this.moneyLineTagName);
        let propOdds = this.getOddsInfo(this.propsTagName);

        this.addOrRemoveImpliedProbabilityToOdds(moneyLineOdds);
        this.addOrRemoveImpliedProbabilityToOdds(propOdds);
    }


    getOddsInfo (className) {
        // className = 'but-sg' for moneyline
        // className = 'but-sgp' for props
        let oddDisplayCells = document.getElementsByClassName(className);
        let oddsInfo = [];
        for (const oddDisplayCell of oddDisplayCells) {
            oddsInfo.push(oddDisplayCell.getElementsByTagName(this.oddsInnerTag));
        }
        return oddsInfo;
    }

    addOrRemoveImpliedProbabilityToOdds (oddsInfo) {
        let oddsFormat = this.getOddsFormat(oddsInfo);
        let convertFunction = this.getOddsConverterFunction(oddsFormat);

        // the last character being ")" means implied odds are already appended
        let shouldAppend = oddsInfo[0][1].innerText.slice(-1) !== ')';

        for (let i = 0; i < oddsInfo.length; i++) {
            let originalInnerText = oddsInfo[i][1].innerText;
            if (shouldAppend) {
                let impliedProbability = convertFunction(originalInnerText);
                oddsInfo[i][1].innerText = originalInnerText + " \n" + '(' + impliedProbability.toString() + "% )";
            } else {
                oddsInfo[i][1].innerText = originalInnerText.slice(0, originalInnerText.indexOf('(') - 1);
            }
        }
    }

    getOddsFormat (oddsInfo) {
        let rawOddsExample = oddsInfo[0][1].innerText;
        if (rawOddsExample.includes('-') || rawOddsExample.includes('+')) {
            return this.OddsFormat.MoneyLine;
        } else if(rawOddsExample.includes('/')) {
            return this.OddsFormat.Fraction;
        } else {
            return this.OddsFormat.Decimal;
        }
    }

    getOddsConverterFunction(oddsFormat) {
        switch (oddsFormat) {
            case this.OddsFormat.MoneyLine:
                return ConversionUtility.convertAmerican;
            case this.OddsFormat.Fraction:
                return ConversionUtility.convertFractional;
            default:
                return ConversionUtility.convertDecimal;
        }
    }
}
