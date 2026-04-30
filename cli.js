import { isWhitespace } from "./utils.js"
import { writeTask } from "./fileHandlers.js"
import { state, filename } from "./store.js"
import { parseCommand } from "./commandParser.js"
import readline from "readline"

const rl = readline.createInterface({
	input : process.stdin,
	output : process.stdout
})

function ask(){
	rl.question("todo> ", 
		(input) => { 
            if ( input === "exit"){
            	console.log("Saving tasks...");
            	if (writeTask(filename)){
            		console.log(`Saved ${state.tasks.length} task(s) to ${filename}.`);
            	}
            	else{
            		console.log(`Error: Failed to save ${filename}.`);
            	}
            	console.log("Goodbye.");
	            rl.close();
            }
            else if (!isWhitespace(input)){
            	parseCommand(input);
            	ask();
            }
            else{
            	ask();
            }
					
		}
	)
}

export { ask };