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

function done(task_ids){

	function _done(task_id){
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


	for (let task_id of task_ids){
		_done(task_id);
	}		
}

function undo(task_ids){

	function _undo(task_id){
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

	for (let task_id of task_ids){
		_undo(task_id);
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

function filter(status) {
    let filtered_tasks = [];

    if (status === "done") {
        console.log("Completed tasks:");
        console.log("---------------------------");
        filtered_tasks = state.tasks.filter(task => task.done);
    }
    else if (status === "pending") {
        console.log("Pending tasks:");
        console.log("---------------------------");
        filtered_tasks = state.tasks.filter(task => !task.done);
    }
    else {
        console.log("Invalid filter status. Use 'done' or 'pending'.");
        return;
    }

    for (let task of filtered_tasks) {
        let box = task.done ? "[x]" : "[ ]";
        console.log(`[${task.id}] ${box} ${task.text}`);
    }

    console.log("---------------------------");

    if (status === "done") {
        console.log(`Total completed: ${filtered_tasks.length}`);
    }
    else {
        console.log(`Total pending: ${filtered_tasks.length}`);
    }
}


function remove(task_ids){

	function _remove(task_id){
		let index;
		let task_text;

		index = state.tasks.findIndex(t => t.id === task_id);

		if (index != -1){
			task_text = state.tasks[index].text;
			state.tasks.splice(index, 1);
			console.log(`Task removed successfully: [${task_id}] ${task_text}`)
		}
		else{
			console.log(`Operation failed: task with ID ${task_id} does not exist.`);
		}	
	}

	for (let task_id of task_ids){
		_remove(task_id);
	}
}


function search(text) {
    const searchWords = text
        .toLowerCase()
        .split(" ")
        .filter(w => w.length > 0);

    const results = [];

    for (let i = 0; i < state.tasks.length; i++) {
        const taskLower = state.tasks[i].text.toLowerCase();
        let totalMatch = 0;

        for (let word of searchWords) {
            if (taskLower.includes(word)) {
            totalMatch += 1;
            }
        }

        if (totalMatch > 0) {
            results.push({ match: totalMatch, index: i });
        }
    }

    if (results.length === 0) {
        console.log(`No tasks found matching "${text}".`);
        return;
    }

    results.sort((a, b) => b.match - a.match);

    console.log(`Found ${results.length} task(s) matching "${text}":`);
       console.log("---------------------------");
       for (let result of results) {
           const task = state.tasks[result.index];
           const box = task.done ? "[x]" : "[ ]";
           console.log(`[${task.id}] ${box} ${task.text}`);
       }
       console.log("---------------------------");
}


function clear(){
	if (state.tasks.length === 0){
		console.log("No tasks to clear.");
		return;
	}

	state.tasks.length = 0;
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
    console.log("\n╔═════════════════════════════════════════════════════╗");
    console.log("║                 AVAILABLE COMMANDS                  ║");
    console.log("╠═════════════════════════════════════════════════════╣");
    console.log("║  add <task text>              - Add a new task      ║");
    console.log("║  list                         - Show all tasks      ║");
    console.log("║  done <id>[,id2,...]          - Mark task(s) done   ║");
    console.log("║  undo <id>[,id2,...]          - Mark task(s) undone ║");
    console.log("║  remove <id>[,id2,...]        - Delete task(s)      ║");
    console.log("║  edit <id> <new text>         - Edit task text      ║");
    console.log("║  filter <done|pending>        - Filter by status    ║");
    console.log("║  search <text>                - Search tasks        ║");
    console.log("║  clear                        - Delete all tasks    ║");
    console.log("║  stats                        - Show task stats     ║");
    console.log("║  help                         - Show this menu      ║");
    console.log("║  exit                         - Close the app       ║");
    console.log("╚═════════════════════════════════════════════════════╝\n");
}

export { add, list, done, undo, remove, filter, edit, clear, search, stats, help}
