# Log Stream Container

A real-time log viewer that streams log files through a web interface.

## Features

- Real-time log streaming
- Web-based interface
- Docker support
- Configurable log file path
- Auto-scroll functionality
- Initial display of last 10 lines

## Quick Start

### Using Docker Run

```bash
# Build the image
docker build -t logstream .

# Run the container
docker run -v $(pwd)/log:/log -p 3000:3000 --rm -d logstream your-logfile.log
```

### Using Docker Compose

1. Edit docker-compose.yml to set your log file path
2. Run:
```bash
docker-compose up -d
```

## Access the Log Viewer

Open your browser and navigate to:
```
http://localhost:3000
```

## Configuration

### Environment Variables

- `LOG_FILE`: Path to the log file inside the container (default: /log/arbZkf2.log)

### Volumes

Mount your log directory to `/log` in the container:
```bash
-v /path/to/your/logs:/log
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Run locally:
```bash
LOG_FILE=/path/to/your/logfile npm start
```

## License

ISC
