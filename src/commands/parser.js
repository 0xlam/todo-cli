import { isWhitespace } from "../utils/helpers.js";
import { isValidPriority } from "../utils/validator.js";
import { 
    COMMAND_ALIASES, 
    NO_ARGS_COMMANDS, 
    REQUIRED_ARGS_COMMANDS,
    MAX_TASK_LENGTH,
    VALID_FILTER_STATUSES 
} from "../utils/constants.js";

const NoArgs = NO_ARGS_COMMANDS;
const ReqArgs = REQUIRED_ARGS_COMMANDS;
const TaskOps = [...ReqArgs, ...NoArgs];
const commandAliases = COMMAND_ALIASES;


function parseTaskIds(rawText){
    const rawIds = rawText.split(",")
    const invalidIds = [];
    const ids = [];

    for (let raw of rawIds) {
        const id = Number(raw.trim());
        if (isNaN(id)) {
            invalidIds.push(raw.trim());
        }
        else{
            ids.push(id);
        }
    }
    return { ids, invalidIds}
}

function parseCommand(input){
    let [command, ...rest] = input.split(" ");
    let task_text = rest.join(" ");
    let task_id = Number(task_text);
    let task_ids = [];
    let status = task_text;
    

    if ( Object.hasOwn(commandAliases, command) ){
        let cmd = commandAliases[command]; 
        command = cmd;
    }
    
    else if ( !TaskOps.includes(command) ){
        return {
            valid: false,
            error: `Invalid command: ${command}\nType "help" to see available commands.`
        };
    }


    if ( ReqArgs.includes(command) && isWhitespace(task_text) ) {
        if ( command === "search"){
            return {
                valid: false,
                error: "Error: Search text cannot be empty.\nUsage: search <text>"
            };
        }

        if ( command === "add" ){
            return {
                valid: false,
                error: "Error: Task text cannot be empty.\nUsage: add <task text> [--prio <low|medium|high>]"
            };
        }

        if ( command === "edit" ) {
            return {
                valid: false,
                error: "Error: Task text cannot be empty.\nUsage: edit <task id> <new text>"
            };
        }
        
        if ( ["done","undo","remove"].includes(command) ) {
            return {
                valid: false,
                error: `Error: Missing task ID(s).\nUsage: ${command} <id>[,id2,...]`
            };
        }

        if ( command === "priority" ){
            return {
                valid: false,
                error: "Error: Missing task ID.\nUsage: priority <id> [low|medium|high|none]"
            };
        }
    }


    if ( NoArgs.includes(command) && !isWhitespace(task_text) ){
        return {
            valid: false,
            error: `Error: "${command}" does not take any arguments\nUsage: ${command}`
        };
    }

    
    // search command 
    if ( command === "search" ) {
        return {
            valid: true,
            command: command,
            payload: { text: task_text.trim() }
        };
    }

    // add commnad
    if ( command === "add" ) {
        let priority;
        let text = task_text.split(" ")

        if ( text.includes("--prio") ){
            let prio_index = text.findIndex(subcmd => subcmd === "--prio");

            if ( text[prio_index + 1 ] === undefined ){
                return {
                    valid: false,
                    error: "Missing priority value after --prio. Use low, medium, or high."
                };
            }

            if ( ! isValidPriority(text[prio_index + 1]) ){
                return {
                    valid: false,
                    error: "Invalid priority. Choose from: low, medium, high."
                };
            }

            priority = text[prio_index + 1];
            task_text = text.filter(w => w !== "--prio" && w !== priority).join(" ");

            if ( isWhitespace(task_text) ){
                return{
                    valid: false,
                    error: "Error: Task text cannot be empty.\nUsage: add <task text> [--prio <low|medium|high>]"
                }
            }
        }


        if ( task_text.length > MAX_TASK_LENGTH ){
            return {
                valid: false,
                error: `Error: Task text exceeds ${MAX_TASK_LENGTH} characters. Please shorten it.`
            };
        }

        return {
            valid: true,
            command: command,
            payload: { 
                text: task_text.trim(), 
                priority: priority?.toLowerCase() ?? null }
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

        if ( newText.length > MAX_TASK_LENGTH ){
            return {
                valid: false,
                error: `Error: Task text exceeds ${MAX_TASK_LENGTH} characters. Please shorten it.`
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
        if (!VALID_FILTER_STATUSES.includes(status)) {
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

    //done,undo,remove command
    if ( ["done","undo","remove"].includes(command) ) {
        const {ids, invalidIds} = parseTaskIds(task_text);

        if (invalidIds.length > 0) {
            const invalidList = invalidIds.join(", ");
            return {
                valid: false,
                error: `Error: Invalid task ID(s): "${invalidList}". IDs must be numbers.\nUsage: ${command} <id>[,id2,...]`
            };
        }

        return {
            valid: true,
            command: command,
            payload: { ids: new Set(ids) }
        };
    }

    if ( command === "priority" ){
        const [idPart, priority] = task_text.trim().split(" ");
        
        const {ids, invalidIds} = parseTaskIds(idPart);

        if (invalidIds.length > 0) {
            const invalidList = invalidIds.join(", ");
            return {
                valid: false,
                error: `Error: Invalid task ID(s): "${invalidList}". IDs must be numbers.\nUsage: ${command} <id>[,id2,...] [low|medium|high|none]`
            };
        }

        if ( priority === "none" ) {
            return {
                valid: true,
                command: "priority",
                payload: { ids: new Set(ids), priority: null }  // null means remove priority
            };
        }

        if ( !isValidPriority(priority) ) {
            return {
                valid: false,
                error: "Error: Invalid priority. Choose from: low, medium, high, none."
            };
        }

        return {
            valid: true,
            command: "priority",
            payload: { ids: new Set(ids), priority: priority }
        };
    }


    if ( NoArgs.includes(command)) {
        return {
            valid: true,
            command: command,
            payload: null
        };
    }

}

export { parseCommand };
