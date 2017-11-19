const log = require("./index")({ useFiles: true }),
    Colour = log.Colour,
    Level = log.Level;

// Info, Warning and Error Messages
log.info("Information message :)");
log.warning("Warning messsage :/");
log.error("Error message :( \n");

// Custom Levels & Messages
log.addLevel("CUSTOM");
log.log("Custom message!", Level.CUSTOM, Colour.MAGENTA);

// Object Logging
let obj = {
    str: "string",
    num: 100,
    bool: false,
    obj: {}
};
log.info(obj);

// Time Stamp Check
setTimeout(() => {
    log.info("Time stamp check.");
}, 1000);
