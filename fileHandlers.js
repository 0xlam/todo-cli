import fs from "fs/promises";

const MAX_BACKUPS = 50;

async function loadTask(filename) {
    try {
        const data = await fs.readFile(filename, "utf8");
        return data;
    } 

    catch (err) {
        if (err.code === "ENOENT") {
        	return null;
        } 
        else if (err.code === "EACCES") {
            console.log(`Error: Permission denied – cannot read "${filename}".`);
            return null;
        } 
        else {
        	console.log(`Unexpected error while reading "${filename}":`, err);
            return null;
        }
    }
}

async function writeTask(state, filename) {
    try {
        const data = JSON.stringify(state.tasks, null, 2);
        const tmpFile = `${filename}.tmp`;

        await fs.writeFile(tmpFile, data, "utf8");
        await fs.rename(tmpFile, filename);
        return true;

    } 
    catch (err) {
        if (err.code === "EACCES") {
            console.log(`Error: Permission denied – cannot write to "${filename}".`);
            return false;
        } 
        else {
            console.log(`Unexpected error while saving "${filename}":`, err);
            return false;
        }
    }
}



async function renameFile(filename) {
    const corruptBase = `${filename}.corrupt`;

	for (let i = 0; i <= MAX_BACKUPS; i++) {
		const newName = i ? `${corruptBase}.${i}` : corruptBase;

		try {
	        await fs.access(newName);
	        continue;
	    }

		catch(err){
			if (err.code === "ENOENT") {
			    try {
			        await fs.rename(filename, newName);
			        return newName;
			        } 
		        catch (renameErr) {
		            if (renameErr.code === "EACCES") {
		                console.log(
		                    `Warning: Could not rename "${filename}" to "${newName}" (permission denied).`
		                );
		                return null;
		            }
		            if (renameErr.code !== "EEXIST") {
	                    console.log(`Warning: Could not rename "${filename}" to "${newName}".`, err);
	                    return null;
	                }

	            }
	        }
        }
    }
    console.log(`Warning: Could not rename "${filename}" because too many corrupt backups exist.`);
	return null;
}


export { writeTask, loadTask, renameFile };

