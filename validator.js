function isValidJson(data){
    try{
        JSON.parse(data);
        return true;
    }
    catch{
        return false;
    }
}

function isValidPriority(priority){
    return ["low", "medium", "high"].includes(priority.toLowerCase()) 
}

function isValidISODate(str){
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(str)) {
        return false;
    }

    const d = new Date(str);
    return !isNaN(d.getTime()) && d.toISOString() === str;
}

function validateTasks(tasks) {
    const tasksId = [];

    for (let task of tasks) {
        if (
            task.id === undefined ||
            task.text === undefined ||
            task.done === undefined ||
            task.priority === undefined ||
            task.createdAt === undefined
        ) {
            return { valid: false, code: "BAD_STRUCTURE" };
        }

        if (
            typeof task.id !== "number" ||
            typeof task.text !== "string" ||
            typeof task.done !== "boolean" ||
            !isValidPriority(task.priority) ||
            !isValidISODate(task.createdAt)

        ) {
            return { valid: false, code: "BAD_TYPES" };
        }

        tasksId.push(task.id);
    }

    const unique = new Set(tasksId);
    const maxId = tasksId.length ? Math.max(...tasksId) : 0;

    if (tasksId.length > unique.size) {
        return { valid: false, code: "DUPLICATE_IDS" };
    }

    return { valid: true, code: "VALID", max_id: maxId };
}

export { isValidJson, validateTasks, isValidPriority}