# Todo List CLI

A simple command-line todo list application built with Node.js.

## Getting Started

### Prerequisites
- Node.js installed on your system

### Installation
1. Clone the project
2. Ensure Node.js is installed
3. Start the application:
```bash
node app.js
```

## Available Commands

| Command | Description |
|---------|-------------|
| `add <task text>` | Add a new task |
| `list` | Show all tasks |
| `done <id>` | Mark a task as completed |
| `undo <id>` | Mark a task as not completed |
| `remove <id>` | Delete a task |
| `edit <id> <new text>` | Edit task text |
| `clear` | Delete all tasks |
| `stats` | Show task statistics |
| `help` | Show available commands |
| `exit` | Close the application |

## Usage Examples

```bash
todo> add Buy groceries
# Task added successfully: [1] Buy groceries

todo> add Walk the dog
# Task added successfully: [2] Walk the dog

todo> list
# Your tasks:
# ---------------------------
# [1] [ ] Buy groceries
# [2] [ ] Walk the dog
# ---------------------------

todo> done 1
# Task marked as completed: [1] Buy groceries

todo> stats
# Total: 2 | Completed: 1 | Pending: 1

todo> exit
# Saving tasks...
# Saved 2 task(s) to tasks.json.
# Goodbye.

```

## Notes

- Tasks are stored in a file
- Task IDs restart after `clear`.

## Future Improvements

- Add a `search` command.
- Improve output formatting for better readability.
