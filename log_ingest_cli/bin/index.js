#!/usr/bin/env node

const options = require("../options");
const axios = require("axios");
const Table = require("cli-table");
const fs = require("fs");

require("dotenv").config();
const url = process.env.URL;

// Access the values
const command = options._[0]; // Get the command specified in options
const level = options.level ? options.level : null;
const message = options.message ? options.message : null;
const resourceId = options.resourceId ? options.resourceId : null;
const timestamp = options.timestamp ? options.timestamp : null;
const traceId = options.traceId ? options.traceId : null;
const spanId = options.spanId ? options.spanId : null;
const commit = options.commit ? options.commit : null;
const metadata_parentResourceId = options.metadata_parentResourceId
  ? options.metadata_parentResourceId
  : null;
const filePath = options.file;
const BACKEND_URL = options.url;

var jsonData;
if (filePath) {
  jsonData = require(filePath);
} else {
  jsonData = {
    level: level,
    message: message,
    resourceId: resourceId,
    timestamp: timestamp,
    traceId: traceId,
    spanId: spanId,
    commit: commit,
    metadata: {
      parentResourceId: metadata_parentResourceId
    }
  };
}
if (command === "specs") {
  const envContent = `URL=${BACKEND_URL}`;
  fs.writeFileSync(".env", envContent);
  console.log(`URL set to ${BACKEND_URL}`);
} else if (command === "ingest") {
  // if url is undefined, display error message
  if (!url) {
    console.error(
      "URL is not set. Please set the URL using the 'log_ingest specs --url <url>' command."
    );
    process.exit(1);
  }
  // Send log data
  axios
    .post(url, jsonData)
    .then((res) => {
      console.log(`Ingested log data. StatusCode: ${res.status}`);
    })
    .catch((error) => {
      console.error(error);
    });
} else if (command === "query") {
  // if url is undefined, display error message
  if (!url) {
    console.error(
      "URL is not defined. Please set the URL using the 'log_ingest specs --url <url>' command."
    );
    process.exit(1);
  }
  // Query the backend
  axios({
    method: "get",
    url: url + "/query",
    data: {
      level: level,
      message: message,
      resourceId: resourceId,
      timestamp: timestamp,
      traceId: traceId,
      spanId: spanId,
      commit: commit,
      parentResourceId: metadata_parentResourceId
    }
  })
    .then((res) => {
      logs = res.data.logs;
      // if no logs are returned, display message
      if (logs.length === 0) {
        console.log("No logs found.");
        return;
      }
      const table = new Table({
        head: Object.keys(logs[0]) // Use the keys of the first log entry as table headers
      });

      // Add data to the table
      logs.forEach((log) => {
        table.push(Object.values(log));
      });

      // Display the table
      console.log(table.toString());
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error("Invalid command. Supported commands: 'ingest' or 'query'");
}
