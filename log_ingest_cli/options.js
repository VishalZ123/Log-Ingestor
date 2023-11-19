const yargs = require("yargs");

const options = yargs
  .command({
    command: "specs [options]",
    describe: "Get the specs of the backend",
    builder: (yargs) => {
      return yargs.option("url", {
        describe: "Set URL of the backend",
        type: "string"
      });
    }
  })
  .command({
    command: "ingest [options]",
    describe: "Ingest log data",
    builder: (yargs) => {
      return yargs
        .option("level", {
          alias: "l",
          describe: "Log level",
          type: "string"
        })
        .option("message", {
          alias: "m",
          describe: "Log message",
          type: "string"
        })
        .option("resourceId", {
          alias: "rid",
          describe: "Resource ID",
          type: "string"
        })
        .option("timestamp", {
          alias: "ts",
          describe: "Include timestamp",
          type: "string"
        })
        .option("traceId", {
          alias: "tid",
          describe: "Trace ID",
          type: "string"
        })
        .option("spanId", {
          alias: "sid",
          describe: "Span ID",
          type: "string"
        })
        .option("commit", {
          alias: "c",
          describe: "Commit",
          type: "string"
        })
        .option("metadata_parentResourceId", {
          alias: "prid",
          describe: "Parent Resource ID",
          type: "string"
        })
        .option("file", {
          alias: "f",
          describe: "JSON file path",
          type: "string"
        })
        .check((argv) => {
          if (
            !(
              argv.level &&
              argv.message &&
              argv.resourceId &&
              argv.timestamp &&
              argv.traceId &&
              argv.spanId &&
              argv.commit &&
              argv.metadata_parentResourceId
            ) &&
            !argv.file
          ) {
            throw new Error(
              "For log ingestion, Please provide either the options or a JSON file path."
            );
          }
          return true;
        });
    }
  })
  .command({
    command: "query [options]",
    describe: "Query log data",
    builder: (yargs) => {
      return yargs
        .option("level", {
          alias: "l",
          describe: "Log level",
          type: "string"
        })
        .option("message", {
          alias: "m",
          describe: "Log message",
          type: "string"
        })
        .option("resourceId", {
          alias: "rid",
          describe: "Resource ID",
          type: "string"
        })
        .option("timestamp", {
          alias: "ts",
          describe: "Include timestamp",
          type: "string"
        })
        .option("traceId", {
          alias: "tid",
          describe: "Trace ID",
          type: "string"
        })
        .option("spanId", {
          alias: "sid",
          describe: "Span ID",
          type: "string"
        })
        .option("commit", {
          alias: "c",
          describe: "Commit",
          type: "string"
        })
        .option("metadata_parentResourceId", {
          alias: "prid",
          describe: "Parent Resource ID",
          type: "string"
        })
        .option("all", {
          alias: "a",
          describe: "Get all log data",
          type: "boolean"
        })
        .check((argv) => {
          const requiredArgs = [
            "level",
            "message",
            "resourceId",
            "timestamp",
            "traceId",
            "spanId",
            "commit",
            "metadata_parentResourceId"
          ];
          const hasAtLeastOneArg = requiredArgs.some(
            (arg) => argv[arg] !== undefined
          );
          if (!hasAtLeastOneArg && !argv.all) {
            throw new Error("For log query, provide at least one argument or use the --all flag to get all log data.");
          }
          return true;
        });
    }
  })
  .demandCommand(1, "You need to specify either 'ingest' or 'query'").argv;

module.exports = options;
