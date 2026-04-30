function isValidJson(data){
	try{
		JSON.parse(data);
		return true;
	}
	catch{
		return false;
	}
}

function getMaxId(ids){
    let max_id = 0;
    for (let id of ids){
        if (id > max_id){
            max_id = id;
        }

    }
    return max_id;
}

function validateTasks(tasks) {
    const tasksId = [];

    for (let task of tasks) {
        if (
            task.id === undefined ||
            task.text === undefined ||
            task.done === undefined
        ) {
            return { ok: false, code: "BAD_STRUCTURE" };
        }

        if (
            typeof task.id !== "number" ||
            typeof task.text !== "string" ||
            typeof task.done !== "boolean"
        ) {
            return { ok: false, code: "BAD_TYPES" };
        }

        tasksId.push(task.id);
    }

    const unique = new Set(tasksId);

    if (tasksId.length > unique.size) {
        return { ok: false, code: "DUPLICATE_IDS" };
    }

    return { ok: true, code: "VALID", max_id: getMaxId(unique) };
}

export { isValidJson, validateTasks}
 
