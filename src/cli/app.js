import { isValidJson, validateTasks } from "../utils/validator.js";
import { ask } from "./prompt.js";
import { state } from "../state/store.js";
import { loadTask, renameFile } from "../storage/fileHandlers.js";
import { DEFAULT_TASK_FILE } from "../utils/constants.js";
import { Command } from "commander";

console.log("==========================");
console.log("      TODO LIST CLI       ");
console.log("==========================");
console.log('Type "help" to see commands');



function configureCli() {
    const program = new Command();

    program
        .name("todo")
        .description("A simple command-line todo list application")
        .option("-f, --file <path>", "task file", DEFAULT_TASK_FILE);

    return program;
}

async function handleCorruptFile(filename, reason) {
    console.log(`Error: Failed to load ${filename} (${reason}).`);

    const renamed = await renameFile(filename);

    if (renamed) {
        console.log(`A backup copy has been saved as ${renamed}.`);
    } 
    else {
    	console.log(`Warning: Could not create backup file for ${filename}.`);
    }

    console.log("Starting with an empty task list.");
}


async function main(){
    const cli = configureCli();
    cli.parse(process.argv);

    const filename = cli.opts().file;

	const res = await loadTask(filename);

    if (!res.ok){
        if (res.error.code === "ENOENT") {
            console.log(`File "${filename}" not found. Starting with an empty task list.`);
        } 
        else if (res.error.code === "EACCES") {
            console.log(`Error: Permission denied reading "${filename}".`);
        } 
        else {
            console.log("Unexpected error loading file:", res.error);
        }
        ask(filename);
        return;
    }

    const data = res.data;

    if (data.trim() === ""){
        console.log("Task file is empty. Starting with an empty task list.");
        ask(filename);
        return;
    }
    
    if (!isValidJson(data)) {
        await handleCorruptFile(filename, "invalid or corrupted JSON");
        ask(filename);
        return;
    }


    const temp_tasks = JSON.parse(data);
    const result = validateTasks(temp_tasks);

    if (result.code === "VALID") {
    	state.tasks = temp_tasks;
        state.next_id = result.max_id + 1;

        console.log(`Loaded ${state.tasks.length} task(s) from ${filename}.`);
        ask(filename);
        return;
    }

    await handleCorruptFile(filename, result.code);
    ask(filename);
}

main();
