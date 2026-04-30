import { isValidJson, validateTasks } from "./validator.js";
import { ask } from "./cli.js";
import { state, filename } from "./store.js";
import { loadTask, renameFile } from "./fileHandlers.js";

console.log("==========================");
console.log("      TODO LIST CLI       ");
console.log("==========================");
console.log('Type "help" to see commands');


async function handleCorruptFile(reason) {
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
	const data = await loadTask(filename);

	if (!data) {
       console.log("No saved task file found. Starting with an empty task list.");
       ask();
       return;
    }

    if (!isValidJson(data)) {
        await handleCorruptFile("invalid or corrupted JSON");
        ask();
        return;
    }


    const temp_tasks = JSON.parse(data);
    const result = validateTasks(temp_tasks);

    if (result.code === "VALID") {
    	state.tasks = temp_tasks;
        state.next_id = result.max_id + 1;

        console.log(`Loaded ${state.tasks.length} task(s) from ${filename}.`);
        ask();
        return;
    }

    await handleCorruptFile(result.code);
    ask();
}

main();






