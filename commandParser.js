import { isWhitespace } from "./utils.js"
import {  add, list, done, undo, remove, edit, clear, stats, help } from "./taskOperations.js"
import { writeTask } from "./fileHandlers.js"
import { filename } from "./store.js"

function parseCommand(input){
	let [command, ...rest] = input.split(" ");
	let task_text = rest.join(" ");
	let task_id = Number(task_text);
    
    
    const TasksWithNoArgument = ["list", "exit", "help", "clear", "stats"];
    const TasksWithDigitArgument = ["done", "remove", "search", "undo"] ;
    const TaskOperations = ["add", "edit", ...TasksWithDigitArgument, ...TasksWithNoArgument];

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

    if ( command == "edit" ){
    	let id = rest.shift();
    	task_id = Number(id);
    	task_text = rest.join(" ");

    	if ( isNaN(task_id) ){
    		console.log(`Error: Invalid task ID "${id}". Task ID must be a number`);
    		console.log(`Usage: ${command} <task id> <new text>`);
    		return;
    	}

    	else if ( isWhitespace(task_text) ){
    		console.log("Error: Task text cannot be empty.");
    		console.log(`Usage: ${command} <task id> <new text>`);
    		return;
    	}


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
    		writeTask(filename);
    		break;
    	case "edit":
    	    edit(task_id, task_text);
    	    writeTask(filename);
    	    break;
    	case "done":
    	    done(task_id);
    	    writeTask(filename);
    	    break;
    	case "remove":
    	    remove(task_id);
    	    writeTask(filename);
    	    break;
    	case "list":
    	    list();
    	    break;
    	case "undo":
    	    undo(task_id);
    	    writeTask(filename);
    	    break;
    	case "clear":
    	    clear();
    	    writeTask(filename);
    	    break;
    	case "stats":
    	    stats();
    	    break;
    	case "help":
    	    help();
    	    break;

    }
}
export { parseCommand }
