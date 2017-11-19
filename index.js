/*
 Copyright (c) 2017 Matthew Lester <mjflester@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 and associated documentation files (the "Software"), to deal in the Software without restriction, 
 including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
*/

const fs   = require("fs"),
      path = require("path");
      
exports = module.exports = (options) => {
    options = options || {};
    
    //Options
    // outputFile: A filename to output logs to.
    //  errorFile: A filename to output errors to.
    //   useFiles: Boolean, sets whether to save to files or not.
    
    let outputFilePath = path.join(__dirname, "..", "..", "logs", (options.outputFile || "output.log"));
    let errorFilePath = path.join(__dirname, "..", "..", "logs", (options.errorFile || "error.log"));
    let useFiles = options.useFiles === undefined ? true : options.useFiles;

    // Level constant, used to identify different types of logs.
    const Level = {
        INFO: 0,
        WARN: 1,
        ERROR: 2,
        
        0: "INFO",
        1: "WARN",
        2: "ERROR"
    };

    // Colour constant, used for colouring log messages.
    const Colour = {
        RESET: "\x1b[0m",

        RED: "\x1b[31m",
        GREEN: "\x1b[32m",
        YELLOW: "\x1b[33m",
        BLUE: "\x1b[34m",
        MAGENTA: "\x1b[35m",
        CYAN: "\x1b[36m",
        WHITE: "\x1b[37m",
        GREY: "\x1b[90m"
    };

    // DateType constant, used for generating different date-related strings.
    const DateType = {
        TIME: 0,
        FULL: 1,
        
        0: "TIME",
        1: "FULL"
    };

    // Function that returns a date-related string.
    function getDateString(shouldColour, dateType) {
        let date = new Date();
        let colour = shouldColour ? [Colour.GREY, Colour.RESET] : [ "", "" ];
        
        // Pad all (maximum of) 2 digit values with a 0 at the start if they do not already have one.
        let padString = (stringToPad) => { return stringToPad.padStart(2, "0"); }
        let dateString = `[${colour[0]}${padString(date.getDate().toString())}/${padString(date.getMonth().toString())}/${date.getFullYear().toString().substring(2)}${colour[1]}]`;
        let timeString = `${colour[0]}${padString(date.getHours().toString())}:${padString(date.getMinutes().toString())}:${padString(date.getSeconds().toString())}${colour[1]}`;
        
        if (dateType === DateType.FULL) {
            return dateString + " " + timeString;
        } else if (dateType === DateType.TIME) {
            return timeString;
        } else return undefined;
    }

    // Base strings for log messages.
    const messageStart = () => { return `${getDateString(true, DateType.TIME)} ${Colour.GREY}[`; }
    const messageEnd = `${Colour.GREY}] ${Colour.WHITE}`;
    
    // Checks whether the log folder exists, and if not, tries to create it.
    function checkFolder() {
        if (!useFiles) return true;
        
        let folderPath = path.join(__dirname, "..", "..", "logs");
        if (!fs.existsSync(folderPath)) {
            try {
                fs.mkdirSync(folderPath);
                return true;
            } catch (e) {
                logMessage(e, Level.ERROR, Colour.RED);
                return e;
            }
        } else return true;
    }
    
    // Logs a message to the console and returns a string to be appended to the respective files.
    let logMessage = (message, level, colour) => {
        if (message instanceof Object) message = JSON.stringify(message, null, 4);
        console.log(`${messageStart()}${colour}${Level[level]}${messageEnd}${message}${Colour.RESET}`);
        return `${getDateString(false, DateType.FULL)} [${Level[level]}] ${message}\n`;
    };
    
    // Returns error object if it fails to create the folder.
    let folderCreated = checkFolder();
    if (!folderCreated) {
        logMessage("Failed to create logs folder.", Level.ERROR, Colour.RED);
        return { error: "Failed to create logs folder." };
    }
    
    // Appends a log message to a file.
    function appendToFile(path, content) {
        fs.appendFile(path, content, "utf-8", (err) => {
            if (err) {
                logMessage(`Failed to append to logfile '${path}'.`, Level.ERROR, Colour.RED);
            }
        });
    }

    // Interface to use this module.
    return {
        usingFiles: useFiles,
        
        // Logs an info message.
        info: (message) => {
            let messageToLog = logMessage(message, Level.INFO, Colour.BLUE);
            if (useFiles) appendToFile(outputFilePath, messageToLog);
        },

        // Logs a warning message.
        warning: (message) => {
            let messageToLog = logMessage(message, Level.WARN, Colour.YELLOW);
            if (useFiles) appendToFile(outputFilePath, messageToLog);
        },

        // Logs an error message.
        error: (message) => {
            let messageToLog = logMessage(message, Level.ERROR, Colour.RED);
            if (useFiles) {
                appendToFile(outputFilePath, messageToLog);
                appendToFile(errorFilePath, messageToLog);
            }
        },
        
        // Logs a custom message.
        log: (message, level, colour) => {
            let messageToLog = logMessage(message, level, colour);
            if (useFiles) appendToFile(outputFilePath, messageToLog);
        },
        
        // Constants
        Colour: Colour,
        Level: Level,
        DateType: DateType,
        
        // Additional Functions
        addLevel: (level) => {
            let indexToAdd = Object.keys(Level).length / 2;
            Level[level.toUpperCase()] = indexToAdd;
            Level[indexToAdd] = level.toUpperCase();
        }
    };
};
