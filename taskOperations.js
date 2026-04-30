import { state } from "./store.js"

//================== Task Operations =========================

function add(task_text){
	state.tasks.push({
		id: state.next_id,
		text: task_text,
		done: false
	});
	console.log(`Task added successfully: [${state.next_id}] ${task_text}`)
	state.next_id += 1; 
}

function done(task_id){
	let task = state.tasks.find(t => t.id == task_id);

	if (task){
		if (task.done){
			console.log(`Task is already completed. [${task.id}] ${task.text}`)
		}
		else{
			task.done = true;
			console.log(`Task marked as completed: [${task.id}] ${task.text}`)

		}
	}

	else{
		console.log(`Operation failed: task with ID ${task_id} does not exist.`);
	}	
}

function undo(task_id){
	let task = state.tasks.find(t => t.id == task_id);

	if (task){
		if (!task.done){
			console.log(`Task is already uncompleted: [${task.id}] ${task.text}`)
		}
		else{
			task.done = false;
			console.log(`Task marked as not completed: [${task.id}] ${task.text}`)

		}
	}

	else{
		console.log(`Operation failed: task with ID ${task_id} does not exist.`);
	}	
}

function edit(task_id, new_text){
	let task = state.tasks.find(t => t.id == task_id);

	if (task){
		let old_text = task.text;
		if (old_text != new_text){
            task.text = new_text;
		    console.log(`Task updated successfully: [${task_id}] ${old_text} -> ${new_text} `)
		}
		else{
			console.log(`No changes made: Task [${task_id}] is already "${new_text}"`)
		}
	}
	else{
		console.log(`Operation failed: task with ID ${task_id} does not exist.`);
	}

}


function list(){
	console.log("Your tasks:");
	console.log("---------------------------");
	for (let task of state.tasks){
		let box = task.done ? "[x]" : "[ ]"
		console.log(`[${task.id}] ${box} ${task.text}`)
	}
	console.log("---------------------------");
}

function remove(task_id){
	let index;
	let task_text;

	index = state.tasks.findIndex(t => t.id === task_id);
	task_text = state.tasks[index].text;

	if (index != -1){
		state.tasks.splice(index, 1);
		console.log(`Task removed successfully: [${task_id}] ${task_text}`)
	}
	else{
		console.log(`Operation failed: task with ID ${task_id} does not exist.`);
	}	
}

function clear(){
	if (state.tasks.length === 0){
		console.log("No tasks to clear.");
		return;
	}

	tasks.length = 0;
	state.next_id = 1;
	console.log("All tasks have been cleared successfully.")
}

function stats(){
	let total_task = state.tasks.length;
	let completed = state.tasks.filter(t => t.done == true).length;
	let pending = total_task - completed;

	console.log(`Total: ${total_task} | Completed: ${completed} | pending: ${pending}`)
}

function help() {
    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║           AVAILABLE COMMANDS             ║");
    console.log("╠══════════════════════════════════════════╣");
    console.log("║  add <task text>      - Add a new task   ║");
    console.log("║  list                 - Show all tasks   ║");
    console.log("║  done <id>            - Mark task done   ║");
    console.log("║  undo <id>            - Mark task undone ║");
    console.log("║  remove <id>          - Delete a task    ║");
    console.log("║  edit <id> <new text> - Edit task text   ║");
    console.log("║  clear                - Delete all tasks ║");
    console.log("║  stats                - Show task stats  ║");
    console.log("║  help                 - Show this menu   ║");
    console.log("║  exit                 - Close the app    ║");
    console.log("╚══════════════════════════════════════════╝\n");
}

export { add, list, done, undo, remove, edit, clear, stats, help}
