# Todo List CLI

A simple command-line todo list application built with Node.js.

## Getting Started

### Prerequisites
- Node.js installed on your system

### Installation
1. Clone the repository
```bash
git clone https://github.com/0xlam/todo-cli.git
cd todo-cli
```
2. Run the application:
```bash
node app.js
```

## Available Commands

| Command | Description |
|---------|-------------|
| `add <task text>` | Add a new task |
| `list` | Show all tasks |
| `done <id>[,id2,...]` | Mark one or more tasks as completed |
| `undo <id>[,id2,...]` | Mark one or more tasks as not completed |
| `remove <id>[,id2,...]` | Delete one or more tasks |
| `edit <id> <new text>` | Edit task text |
| `filter <done\|pending>` | Filter tasks by completion status |
| `search <text>` | Search tasks by keyword |
| `priority <id> <low\|medium\|high\|none>` |	Set or remove task priority |
| `clear` | Delete all tasks |
| `stats` | Show task statistics |
| `help` | Show available commands |
| `exit` | Close the application |


## Command Aliases (Shortcuts)

You can use these shorter aliases instead of full command names:

| Alias | Full Command |
|-------|---------------|
| `ls`  | `list`        |
| `q`   | `exit`        |
| `h`   | `help`        |
| `c`   | `clear`       |
| `st`  | `stats`       |
| `a`   | `add`         |
| `e`   | `edit`        |
| `f`   | `filter`      |
| `d`   | `done`        |
| `rm`  | `remove`      |
| `u`   | `undo`        |
| `se`  | `search`      |
| `p`  	| `priority`    |

Example: `todo> a Buy milk` works the same as `todo> add Buy milk`.

## Usage Examples

```bash
todo> add Buy groceries --prio high
# Task added successfully: [1] Buy groceries [priority: high]

todo> add Walk the dog
# Task added successfully: [2] Walk the dog

todo> add Write report --prio medium
# Task added successfully: [3] Write report [priority: medium]

todo> list
# Your tasks:
# ---------------------------
# [1] [ ] Buy groceries [high]
# [2] [ ] Walk the dog
# [3] [ ] Write report [medium]
# ---------------------------

todo> done 1,3
# Task marked as completed: [1] Buy groceries
# Task marked as completed: [3] Write report

todo> priority 2 high
# Priority for task [2] set to high.

todo> stats
# Total: 3 | Completed: 2 | Pending: 1

todo> exit
# Saving tasks...
# Saved 3 task(s) to tasks.json.
# Goodbye.

```

## Notes

- Tasks are stored in a file
- Task IDs restart after `clear`.

## Future Improvements

- Improve output formatting for better readability.
