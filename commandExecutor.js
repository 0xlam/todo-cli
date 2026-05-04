import { filename } from "./store.js"
import {  add, list, done, undo, remove, filter, edit, clear, stats, help } from "./taskOperations.js"

function executeCommand(parsed){

    let command = parsed.command
	
    switch (command){
    	case "add":
    		add(parsed.payload.text);
    		break;
    	case "edit":
    	    edit(parsed.payload.id, parsed.payload.newText);
    	    break;
    	case "done":
    	    done(parsed.payload.ids);
    	    break;
    	case "remove":
    	    remove(parsed.payload.ids);
    	    break;
    	case "list":
    	    list();
    	    break;
        case "filter":
            filter(parsed.payload.status);
            break;
    	case "undo":
    	    undo(parsed.payload.ids);
    	    break;
    	case "clear":
    	    clear();
    	    break;
    	case "stats":
    	    stats();
    	    break;
    	case "help":
    	    help();
    	    break;

    }
}

export { executeCommand };