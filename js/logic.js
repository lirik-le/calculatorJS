import {print} from './utils/print.js'

const main = () => {
    let result = 0;
    let panelCalc = '';

    return (state) => {
        if (state === '=') {
            panelCalc = panelCalc.replace('x', '*');

            const amountNumbers = panelCalc.split(/[+\-*\/]/).filter(function (element) {
                return element !== "";
            }).length;

            if (amountNumbers >= 2) {
                const operands = panelCalc.split(/[+\-*\/]/);

                for (let i = 0; i < operands.length - 1; i++) {
                    const denominator = parseFloat(operands[i + 1]);

                    if (denominator === 0) {
                        print("На 0 делить нельзя");
                        return;
                    }
                }

                const numberToCheck = Number(eval(panelCalc));
                result = numberToCheck % 1 !== 0 ? numberToCheck.toFixed(2) : numberToCheck;
                panelCalc = '';
            }
        } else if (state === 'АС') {
            panelCalc = '';
            result = 0;
        } else if (state === 'С') {
            if (result !== 0 && panelCalc !== '') result = 0
            panelCalc = panelCalc.slice(0, -1);
        } else {
            if (/^[+\-x/]$/.test(state) && /^[+\-x/]$/.test(panelCalc.slice(-1))) {
                panelCalc = panelCalc.slice(0, -1).concat(state);
            } else if (result !== 0 && /^[+\-x/]$/.test(state)) {
                panelCalc = result.toString().concat(state);
                result = 0;
            } else {
                panelCalc = panelCalc + state;
            }
        }

        panelCalc ? print(panelCalc) : print(result)
    }
}

export default main