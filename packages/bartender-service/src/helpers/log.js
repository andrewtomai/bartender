const R = require('ramda');
const chalk = require('chalk');
const { v4: uuid } = require('uuid');
const { performance } = require('perf_hooks');
const environment = require('./environment');
//= ==============================================
const LOG_LEVELS = {
    info: 4,
    debug: 3,
    warn: 2,
    error: 1,
};
const isObjectOrArray = R.either(R.is(Array), R.is(Object));
const colorizeAny = (colorizer) => (o) => (isObjectOrArray(o) ? colorizer(JSON.stringify(o, null, 2)) : colorizer(o));
const cyan = colorizeAny(chalk.cyan);
const green = colorizeAny(chalk.green);
const orange = colorizeAny(chalk.keyword('orange'));
const red = colorizeAny(chalk.bold.red);
class Logger {
    // internal variables:
    // logLevel :: int
    // colorize :: boolean
    constructor(logLevel = process.env.LOG_LEVEL) {
        this.logLevel = environment.isExecutingInLambda() ? 1000 : Number(logLevel);
        this.colorize = !environment.isExecutingInLambda();
        this.timeTable = {};
    }

    time(message) {
        const label = uuid();
        if (this.logLevel >= LOG_LEVELS.debug) {
            this.timeTable[label] = { start: performance.now(), message };
        }
        return label;
    }

    timeEnd(label) {
        if (this.logLevel >= LOG_LEVELS.debug) {
            try {
                const { start, message } = this.timeTable[label];
                const end = performance.now();
                this.info(`${message}: ${end - start}ms`);
                return end - start;
            } catch (e) {
                this.warn('Missing timer label: ', label);
            }
        }
    }

    colorizeArgs(colorizer, args) {
        return this.colorize ? R.map(colorizer, args) : args;
    }

    separator(title) {
        const seperatorLength = 80;
        const tildesToUse = seperatorLength - title.length - 2;
        const tildeBuffer = '~'.repeat(tildesToUse / 2);
        this.warn();
        this.warn(`${tildeBuffer} ${title} ${tildeBuffer}`);
    }

    info(...args) {
        if (this.logLevel >= LOG_LEVELS.info) {
            console.log(...this.colorizeArgs(cyan, args));
        }
    }

    success(...args) {
        if (this.logLevel >= LOG_LEVELS.debug) {
            console.log(...this.colorizeArgs(green, args));
        }
    }

    warn(...args) {
        if (this.logLevel >= LOG_LEVELS.warn) {
            console.warn(...this.colorizeArgs(orange, args));
        }
    }

    error(...args) {
        if (this.logLevel >= LOG_LEVELS.error) {
            console.error(...this.colorizeArgs(red, args));
        }
    }
}
// let logger = null;
// const getLogger = (logLevel) => {
//     if (!logger) {
//         logger = new Logger(logLevel);
//     }
//     return logger;
// };
// getLogger();
module.exports = new Logger();
