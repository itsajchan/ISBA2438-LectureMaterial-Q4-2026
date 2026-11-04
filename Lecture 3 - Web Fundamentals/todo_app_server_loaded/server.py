"""A simple todo web server using Python's built-in http.server module.

Todos are stored in todos.json next to this file and are reloaded from
disk every time the page is refreshed.

Run with:  python3 server.py
Then open: http://localhost:8000
"""

import json
from html import escape
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs

PORT = 8000
TODOS_FILE = Path(__file__).parent / "todos.json"


def load_todos():
    if TODOS_FILE.is_file():
        try:
            data = json.loads(TODOS_FILE.read_text("utf-8"))
            if isinstance(data, list):
                return [str(task) for task in data]
        except ValueError:
            pass
    return []


def save_todos(todos):
    print("we are about to save the json file")
    TODOS_FILE.write_text(json.dumps(todos, indent=2), "utf-8")


def render_page(todos):
    if todos:
        items = "\n".join(f"      <li>{escape(task)}</li>" for task in todos)
    else:
        items = "      <li>No todos yet. Add one above!</li>"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <style>
    body {{ font-family: system-ui, sans-serif; max-width: 480px; margin: 40px auto; padding: 0 16px; }}
    form {{ display: flex; gap: 8px; margin-bottom: 24px; }}
    input[type="text"] {{ flex: 1; padding: 8px; font-size: 16px; }}
    button {{ padding: 8px 16px; font-size: 16px; cursor: pointer; }}
    li {{ font-size: 18px; margin-bottom: 8px; }}
  </style>
</head>
<body>
  <h1>My Todos</h1>
  <form method="POST" action="/add-todo">
    <input type="text" name="task" placeholder="What needs doing?" required>
    <button type="submit">Add</button>
  </form>
  <ul>
{items}
  </ul>
</body>
</html>
"""


class TodoHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/":
            body = render_page(load_todos()).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        if self.path == "/add-todo":
            length = int(self.headers.get("Content-Length", 0))
            form = parse_qs(self.rfile.read(length).decode("utf-8"))
            task = form.get("task", [""])[0].strip()
            if task:
                todos = load_todos()
                todos.append(task)
                save_todos(todos)
            self.send_response(303)
            self.send_header("Location", "/")
            self.end_headers()
        else:
            self.send_error(404, "Not Found")


if __name__ == "__main__":
    server = HTTPServer(("", PORT), TodoHandler)
    print(f"Todo server running at http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.server_close()
