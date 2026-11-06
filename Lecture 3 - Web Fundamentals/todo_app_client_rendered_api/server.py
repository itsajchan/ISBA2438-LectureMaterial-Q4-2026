"""SPA-style todo server: serves static files and a JSON API.

Todos are stored in todos.json next to this file and are reloaded from
disk every time the client fetches them (e.g. on page refresh).

Run with:  python3 server.py
Then open: http://localhost:8001
"""

import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

PORT = 8001
STATIC_DIR = Path(__file__).parent / "static"
TODOS_FILE = Path(__file__).parent / "todos.json"

CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
}


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
    TODOS_FILE.write_text(json.dumps(todos, indent=2), "utf-8")


def send_json(handler, status, data):
    body = json.dumps(data).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def send_static(handler, filename):
    path = STATIC_DIR / filename
    if not path.is_file():
        handler.send_error(404, "Not Found")
        return
    body = path.read_bytes()
    handler.send_response(200)
    handler.send_header("Content-Type", CONTENT_TYPES[path.suffix])
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class TodoHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/api/todos":
            send_json(self, 200, {"todos": load_todos()})
        elif self.path == "/":
            send_static(self, "index.html")
        elif self.path == "/client.js":
            send_static(self, "client.js")
        elif self.path == "/style.css":
            send_static(self, "style.css")
        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        print("TODO POST")
        if self.path == "/api/todos":
            length = int(self.headers.get("Content-Length", 0))
            try:
                data = json.loads(self.rfile.read(length).decode("utf-8"))
                task = str(data["task"]).strip()
            except (ValueError, KeyError):
                send_json(self, 400, {"error": "Expected JSON body with a 'task' field"})
                return
            if not task:
                send_json(self, 400, {"error": "Task must not be empty"})
                return
            todos = load_todos()
            todos.append(task)
            save_todos(todos)
            send_json(self, 201, {"todos": todos})
        else:
            self.send_error(404, "Not Found")

    def do_DELETE(self):
        print("TODO DELETE")
        if self.path.startswith("/api/todos/"):
            try:
                index = int(self.path[len("/api/todos/"):])
            except ValueError:
                send_json(self, 400, {"error": "Expected a todo index, e.g. DELETE /api/todos/0"})
                return
            todos = load_todos()
            if 0 <= index < len(todos):
                todos.pop(index)
                save_todos(todos)
                send_json(self, 200, {"todos": todos})
            else:
                send_json(self, 404, {"error": f"No todo at index {index}"})
        else:
            self.send_error(404, "Not Found")


if __name__ == "__main__":
    server = HTTPServer(("", PORT), TodoHandler)
    print(f"Todo SPA server running at http://localhost:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.server_close()
