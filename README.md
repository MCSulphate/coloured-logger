A simple coloured logger, with file support. All messages are nicely styled, coloured
and logged to the console, and to two files: one for combined logs, and one for errors.

## Installation
`npm install coloured-logger`

## Usage
This package is very simple to use, and can be required and set up on a single line:

```js
const logger = require("coloured-logger")({ outputFile: "someFileName", errorFile: "someFileName" });
```
Requiring returns an object that you can use to log your messages. Note that `outputFile` and `errorFile`
are both optional, and by default are set to `output.log` and `error.log`. All logs are kept in a `logs` folder.

### Features
* Logs to the console and to files, one for combined logs and one for errors.
* Supports custom logging levels and different colours.
* No dependencies and very lightweight.
* Ready to use straight out of the box, no additional configuration is necessary.
* Logs timestamps to the console, and date + timestamps to files.

### Functions
* `logger.info(message)` - Logs an information message.
* `logger.warn(message)` - Logs a warning message.
* `logger.error(message)` - Logs an error message.
* `logger.addLevel(level)` - Adds a custom level to the logger.Level object.
* `logger.log(message, level, colour)` - Logs a message with the given level and colour.

### Additional Information
**Available Colours:**
* RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN, WHITE, GREY
* RESET (used to reset the colour of the text to the default)

All colours can be accessed from the logger.Colour object.

### Example Usage

```js
const logger = require("coloured-logger")(),
      Colour = logger.Colour,
      Level  = logger.Level;

// Info, Warning and Error Messages
logger.info("Info message :)");
logger.warn("Warning message :/");
logger.error("Error message :( \n");

// Custom Levels & Messages
logger.addLevel("CUSTOM");
logger.log("Custom message!", Level.CUSTOM, Colour.MAGENTA);
```

**Output:**

![Example Usage Output](https://image.prntscr.com/image/A7SGPhN-RriGSx77Ly747Q.png)

The example code can be found in the `tests.js` file.

## License
I am using the [MIT License](https://opensource.org/licenses/MIT) for this package.