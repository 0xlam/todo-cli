import { isWhitespace } from "./utils.js"
import { writeTask } from "./fileHandlers.js"
import { state, filename } from "./store.js"
import { parseCommand } from "./commandParser.js"
import { executeCommand } from "./commandExecutor.js"
import readline from "readline"

const rl = readline.createInterface({
      input : process.stdin,
	output : process.stdout
})

// Commands that do not modify data
const readonlyCommands = ["list", "stats", "help", "filter"];

function ask(){
      rl.question("todo> ", (input) => {
            if (isWhitespace(input)){
                  ask();
                  return;
            }

            const parsed = parseCommand(input);

            if (!parsed.valid) {
                  console.log(parsed.error);
                  ask();
                  return;
            }


            if ( parsed.command === "exit"){
                  console.log("Saving tasks...");
            	if (writeTask(filename)){
            		console.log(`Saved ${state.tasks.length} task(s) to ${filename}.`);
            	}
            	else{
            		console.log(`Error: Failed to save ${filename}.`);
            	}
            	console.log("Goodbye.");
	            rl.close();
                  return;
            }

            // Execute the command
            executeCommand(parsed);

            // Save if the command modified data
            if (!readonlyCommands.includes(parsed.command)) {
                  writeTask(filename);
            }

            ask();

      });
}

export { ask };