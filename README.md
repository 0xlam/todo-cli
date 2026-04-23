# Todo List CLI

A simple command-line todo list application built with Node.js.

## Getting Started

### Prerequisites
- Node.js installed on your system

### Installation
1. Save the code to a file (e.g., `todo.js`)
2. Open your terminal
3. Run the application:
```bash
node todo.js
```

## Available Commands

| Command | Description |
|---------|-------------|
| `add <task text>` | Add a new task |
| `list` | Show all tasks |
| `done <id>` | Mark a task as completed |
| `undo <id>` | Mark a task as not completed |
| `remove <id>` | Delete a task |
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
# Session closed.
```

## Notes

- Tasks are stored in memory (the `tasks` array).
- Once you exit the program, all tasks are lost.
- Task IDs restart after `clear`.

## Future Improvements

- Save tasks to a JSON file so they persist after exit.
- Add a `search` command.
- Improve output formatting for better readability.
