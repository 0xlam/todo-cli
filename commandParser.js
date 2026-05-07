import { isWhitespace } from "./utils.js"


function parseCommand(input){
    let [command, ...rest] = input.split(" ");
    let task_text = rest.join(" ");
    let task_id = Number(task_text);
    let task_ids = [];
    let status = task_text;
    
    
    const TasksWithNoArgument = ["list", "exit", "help", "clear", "stats"];
    const TaskOperations = ["add", "edit", "filter", "done", "remove", "undo", "search", ...TasksWithNoArgument];
    const commandAliases = {  
        ls: "list",
        q: "exit",
        h: "help",
        c: "clear",
        st: "stats",
        a: "add",
        e: "edit",
        f: "filter",
        d: "done",
        rm: "remove",
        u: "undo",
        se: "search",
    };
    

    if ( Object.hasOwn(commandAliases, command) ){
        let cmd = commandAliases[command]; 
        command = cmd;
    }

    
    else if ( !TaskOperations.includes(command) ){
        return {
            valid: false,
            error: `Invalid command: ${command}\nType "help" to see available commands.`
        };
    }


    if ( TasksWithNoArgument.includes(command) && !isWhitespace(task_text) ){
        return {
            valid: false,
            error: `Error: "${command}" does not take any arguments\nUsage: ${command}`
        };
    }

    
    // add,search command 
    if ( ["add", "search"].includes(command) ) {
        const errorLabel = command === "add" ? "Task text" : "Search text";
        const usageLabel = command === "add" ? "task text" : "text";

        if (isWhitespace(task_text)) {
            return {
                valid: false,
                error: `Error: ${errorLabel} cannot be empty.\nUsage: ${command} <${usageLabel}>`
            };
        }

        return {
            valid: true,
            command: command,
            payload: { text: task_text }
        };
    }
    
    
    // edit command
    if (command === "edit") {
        let id = rest.shift();
        let edit_id = Number(id);
        let newText = rest.join(" ").trim();

        if (isNaN(edit_id)) {
            return {
                valid: false,
                error: `Error: Invalid task ID "${id}". Task ID must be a number.\nUsage: edit <task id> <new text>`
            };
        }
        if (isWhitespace(newText)) {
            return {
                valid: false,
                error: "Error: Task text cannot be empty.\nUsage: edit <task id> <new text>"
            };
        }
        return {
            valid: true,
            command: "edit",
            payload: { id: edit_id, newText: newText }
        };
    }
    
    //filter command
    if (command === "filter") {
        let validStatus = ["done", "pending"];
        if (!validStatus.includes(status)) {
            return {
                valid: false,
                error: `Error: Invalid status '${status}'.\nUsage: filter <done|pending>`
            };
        }
        return {
            valid: true,
            command: "filter",
            payload: { status: status }
        };
    }

    if (command === "search"){

    }

    //done,undo,remove command
    if ( ["done","undo","remove"].includes(command) ) {
        if (isWhitespace(task_text)) {
            return {
                valid: false,
                error: `Error: Missing task ID(s).\nUsage: ${command} <id>[,id2,...]`
            };
        }

        const rawIds = task_text.split(",");
        const invalidIds = [];
        const ids = [];

        for (let raw of rawIds) {
            const id = Number(raw.trim());
            if (isNaN(id)) {
                invalidIds.push(raw.trim());
            } else {
                ids.push(id);
            }
        }

        if (invalidIds.length > 0) {
            const invalidList = invalidIds.join(", ");
            return {
                valid: false,
                error: `Error: Invalid task ID(s): "${invalidList}". IDs must be numbers.\nUsage: done <id>[,id2,...]`
            };
        }

        return {
            valid: true,
            command: command,
            payload: { ids: new Set(ids) }
        };
    }

    if ( TasksWithNoArgument.includes(command)) {
        return {
            valid: true,
            command: command,
            payload: null
        };
    }
}


export { parseCommand };
