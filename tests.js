const logger = require("./index")(),
      Colour = logger.Colour,
      Level  = logger.Level;

// Info, Warning and Error Messages
logger.info("Information message :)");
logger.warning("Warning messsage :/");
logger.error("Error message :( \n");

// Custom Levels & Messages
logger.addLevel("CUSTOM");
logger.log("Custom message!", Level.CUSTOM, Colour.MAGENTA);