.PHONY: up down restart status clean

PORT ?= 8877
INPUT ?= ../engagemet-tests/example.md
VENV := ../venv/bin/python
PID_FILE := .server.pid

up: down
	@echo "Starting engagement dashboard on port $(PORT)..."
	@$(VENV) launcher.py $(INPUT) --port $(PORT) & echo $$! > $(PID_FILE)
	@sleep 1
	@echo "Server running (PID: $$(cat $(PID_FILE)))"
	@echo "Dashboard: http://localhost:$(PORT)"

down:
	@if [ -f $(PID_FILE) ]; then \
		echo "Stopping server (PID: $$(cat $(PID_FILE)))..."; \
		kill $$(cat $(PID_FILE)) 2>/dev/null || true; \
		rm -f $(PID_FILE); \
	fi
	@lsof -ti:$(PORT) | xargs kill -9 2>/dev/null || true
	@echo "Server stopped"

restart: down up

status:
	@if [ -f $(PID_FILE) ] && kill -0 $$(cat $(PID_FILE)) 2>/dev/null; then \
		echo "Server running (PID: $$(cat $(PID_FILE)))"; \
		echo "http://localhost:$(PORT)"; \
	else \
		echo "Server not running"; \
	fi

clean: down
	@rm -rf output/
	@rm -f $(PID_FILE)
	@echo "Cleaned output and pid files"

# Usage examples:
# make up                          - Start with defaults
# make up INPUT=myfile.json        - Start with custom input
# make up PORT=9000                - Start on different port
# make down                        - Stop server
# make restart                     - Restart server
# make status                      - Check if running
