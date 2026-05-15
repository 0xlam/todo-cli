import { state } from "./store.js"
import {  
    add, list, done, undo, remove,
    filter, edit, priority, clear,
    stats, search, help 
} from "./taskOperations.js"

function executeCommand(parsed){

    let command = parsed.command;
    let payload = parsed.payload;
	
    switch (command){
    	case "add":
    		add(state, payload.text, payload.priority);
    		break;
    	case "edit":
    	    edit(state, payload.id, payload.newText);
    	    break;
    	case "done":
    	    done(state, payload.ids);
    	    break;
    	case "remove":
    	    remove(state, payload.ids);
    	    break;
    	case "list":
    	    list(state);
    	    break;
        case "filter":
            filter(state, payload.status);
            break;
    	case "undo":
    	    undo(state, payload.ids);
    	    break;
    	case "search":
    	    search(state, payload.text);
    	    break;
        case "priority":
            priority(state, payload.ids, payload.priority);
            break;
    	case "clear":
    	    clear(state);
    	    break;
    	case "stats":
    	    stats(state);
    	    break;
    	case "help":
    	    help();
    	    break;
    }
}

export { executeCommand };
