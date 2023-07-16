import * as R from 'ramda';
import chalk from 'chalk';
import { isExecutingInLambda } from './Environment';

const isObjectOrArray = R.either(R.is(Array), R.is(Object));
const colorizeAny = (colorizer) => (o) => (isObjectOrArray(o) ? colorizer(JSON.stringify(o, null, 2)) : colorizer(o));

const log =
    (color) =>
    (...args) => {
        const lines = isExecutingInLambda() ? args : R.map(colorizeAny(color), args);
        console.log(...lines);
    };

const Logger = {
    info: log(chalk.green),
    warn: log(chalk.yellow),
    error: log(chalk.bold.red),
};

export default Logger;
