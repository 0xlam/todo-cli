console.log("==========================");
console.log("	  TODO LIST CLI        ");
console.log("==========================");
console.log("Type \"help\" to see commands");

const readline = require("readline")
const rl = readline.createInterface({
	input : process.stdin,
	output : process.stdout
})

tasks = [];
next_id = 1


//================ Helper ==================
function isWhitespace(str){
	return str.trim() === "";
}

function displayHelp() {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║           AVAILABLE COMMANDS           ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║  add <task text>    - Add a new task   ║");
    console.log("║  list               - Show all tasks   ║");
    console.log("║  done <id>          - Mark task done   ║");
    console.log("║  undo <id>          - Mark task undone ║");
    console.log("║  remove <id>        - Delete a task    ║");
    console.log("║  clear              - Delete all tasks ║");
    console.log("║  stats              - Show task stats  ║");
    console.log("║  help               - Show this menu   ║");
    console.log("║  exit               - Close the app    ║");
    console.log("╚════════════════════════════════════════╝\n");
}


//================== Task Operations =========================

function add(task_text){
	tasks.push({
		id: next_id,
		text: task_text,
		done: false
	});
	console.log(`Task added successfully: [${next_id}] ${task_text}`)
	next_id += 1; 
}

function done(task_id){
	let task = tasks.find(t => t.id == task_id);

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
	let task = tasks.find(t => t.id == task_id);

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

function list(){
	console.log("Your tasks:");
	console.log("---------------------------");
	for (let task of tasks){
		box = task.done ? "[x]" : "[ ]"
		console.log(`[${task.id}] ${box} ${task.text}`)
	}
	console.log("---------------------------");
}

function remove(task_id){
	let index;
	let task_text;

	index = tasks.findIndex(t => t.id === task_id);
	task_text = tasks[index].text;

	if (index != -1){
		tasks.splice(index, 1);
		console.log(`Task removed successfully: [${task_id}] ${task_text}`)
	}
	else{
		console.log(`Operation failed: task with ID ${task_id} does not exist.`);
	}	
}

function clear(){
	if (tasks.length === 0){
		console.log("No tasks to clear.");
		return;
	}

	tasks.length = 0;
	next_id = 1;
	console.log("All tasks have been cleared successfully.")
}

function stats(){
	let total_task = tasks.length;
	let completed = tasks.filter(t => t.done == true).length;
	let pending = total_task - completed;

	console.log(`Total: ${total_task} | Completed: ${completed} | pending: ${pending}`)
}


//================== Command Parser =================
function commands(statement){
	[command, ...rest] = statement.split(" ");
	task_text = rest.join(" ");
	task_id = Number(task_text);
    
    
    TasksWithNoArgument = ["list", "exit", "help", "clear", "stats"];
    TasksWithDigitArgument = ["done", "remove", "search", "undo"] ;
    TaskOperations = ["add", ...TasksWithDigitArgument, ...TasksWithNoArgument];

    if ( !TaskOperations.includes(command) ){
    	console.log("Invalid command: " + command)
    	console.log("Type \"help\" to see available commands.")
    	return;
    }

    if ( TasksWithNoArgument.includes(command) && !isWhitespace(task_text) ){
    	console.log(`Error: "${command}" does not take any arguments`);
    	console.log(`Usage: ${command}`)
    	return;
    }

    if ( TasksWithDigitArgument.includes(command) ){
    	if ( isNaN(task_id) ){
    		console.log(`Error: Invalid task ID "${task_text}". Task ID must be a number`)
    		console.log(`Usage: ${command} <task id>`)
    		return;
    	}
    	else if (isWhitespace(task_text)){
    		console.log("Error: Missing task ID.")
    		console.log(`Usage: ${command} <task id>`)
    		return;
    	}

    }

    if ( command == "add" && isWhitespace(task_text) ){
		    console.log("Error: Task text cannot be empty.");
		    console.log("Usage: add <task text>");
		    return;
	    }

	
    switch (command){
    	case "add":
    		add(task_text);
    		break;
    	case "done":
    	    done(task_id);
    	    break;
    	case "remove":
    	    remove(task_id);
    	    break;
    	case "list":
    	    list();
    	    break;
    	case "undo":
    	    undo(task_id);
    	    break;
    	case "clear":
    	    clear();
    	    break;
    	case "stats":
    	    stats();
    	    break;
    	case "help":
    	    displayHelp();
    	    break;

    }
	
}


function ask(){
	rl.question("todo> ", 
		(statement) => { 
            if ( statement == "exit"){
            	console.log("Session closed. ")
	            rl.close();
            }
            else if (!isWhitespace(statement)){
            	commands(statement);
            	ask();
            }
            else{
            	ask();
            }
					
		}
	)
}

ask();