# Log Ingestion System

## Introduction

A simple log ingestion system that ingests log files from a directory and stores them in a database. The system is built using Django and the CLI is built using Node.js.

## Installation - Server

1. Clone the repository
2. Install the dependencies

   ```bash
   pip install -r requirements.txt
   ```

3. Run the migrations

   ```bash
   python manage.py makemigrations
   ```

   ```bash
   python manage.py migrate
   ```

4. Run the server
   ```bash
   python manage.py runserver 3000
   ```

## Installation - CLI

1. Install the dependencies

   ```bash
   npm install -g log_ingest
   ```

## Usage

Generate random data

```bash
generate_random_data.bat
```

This will generate 1000 random log files in the database.

For CLI usage, kindly see the [CLI documentation](https://www.npmjs.com/package/log_ingest).

## Features

- Log ingestion
- Log query
- search messages by keyword
- search combination of fields

## API Documentation

### Log Ingestion

`POST /`

JSON body can contain one or more log instances.

```json
[
  {
    "level": "error",
    "message": "Failed to connect to DB",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-0987"
    }
  },
  {
    "level": "info",
    "message": "Connected to DB",
    "resourceId": "server-1234",
    "timestamp": "2023-09-15T08:00:00Z",
    "traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
      "parentResourceId": "server-0987"
    }
  }
]
```

### Log Query

`GET /query`

Query parameters:

- `level` - log level
- `message` - log message
- `resourceId` - resource id
- `timestamp` - timestamp
- `traceId` - trace id
- `spanId` - span id
- `commit` - commit
- `parentResourceId` - parent resource id

---