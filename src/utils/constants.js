export const COMMAND_ALIASES = {  
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
    p: "priority"
};

export const NO_ARGS_COMMANDS = ["list", "exit", "help", "clear", "stats"];
export const REQUIRED_ARGS_COMMANDS = ["add", "edit", "filter", "done", "remove", "undo", "search", "priority"];
export const READONLY_COMMANDS = ["list", "stats", "help", "filter", "search"];


export const MAX_TASK_LENGTH = 100;
export const VALID_PRIORITIES = ["low", "medium", "high"];
export const VALID_FILTER_STATUSES = ["done", "pending"];

// File handling
export const MAX_BACKUPS = 50;
export const DEFAULT_TASK_FILE = "tasks.json";
