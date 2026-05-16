import { isWhitespace } from "./utils.js"
import { writeTask } from "./fileHandlers.js"
import { state } from "./store.js"
import { parseCommand } from "./commandParser.js"
import { executeCommand } from "./commandExecutor.js"
import { READONLY_COMMANDS } from "./constants.js"
import readline from "readline"

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})


// Commands that do not modify data
const readonlyCommands = READONLY_COMMANDS;


async function ask(filename) {
    rl.question("todo> ", async (input) => { 
        if (isWhitespace(input)) {
            ask(filename);
            return;
        }

        const parsed = parseCommand(input);

        if (!parsed.valid) {
            console.log(parsed.error);
            ask(filename);
            return;
        }

        if (parsed.command === "exit") {
            console.log("Saving tasks...");
            if (await writeTask(state, filename)) {   
                console.log(`Saved ${state.tasks.length} task(s) to ${filename}.`);
            } else {
                console.log(`Error: Failed to save ${filename}.`);
            }
            console.log("Goodbye.");
            rl.close();
            return;
        }

        if (parsed.command === "clear") {
            rl.question("Are you sure you want to delete all tasks? (y/n): ", async (answer) => {
                if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
                    executeCommand(parsed);
                    await writeTask(state, filename);
                } else {
                    console.log("Clear cancelled.");
                }
                ask(filename);
            });
            return;
        }

        // Execute the command
        executeCommand(parsed);

        // Save if the command modified data
        if (!readonlyCommands.includes(parsed.command)) {
            await writeTask(state, filename);
        }

        ask(filename);
    });
}
export { ask };
