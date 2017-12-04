const logger = require("./index")({ useFiles: false, useLogName: true, logName: "Tests" }),
    Colour = logger.Colour,
    Level = logger.Level;

// Info, Warning and Error Messages
logger.info("Information message :)");
logger.warning("Warning messsage :/");
logger.error("Error message :( \n");

// Custom Levels & Messages
logger.addLevel("CUSTOM");
logger.log("Custom message!", Level.CUSTOM, Colour.MAGENTA);

// Object Logging
let obj = {
    str: "string",
    num: 100,
    bool: false,
    obj: {}
};
logger.info(obj);

// Changing the Log Name
logger.setLogName();

// Time Stamp Check
setTimeout(() => {
    logger.info("Time stamp check.");
}, 1000);