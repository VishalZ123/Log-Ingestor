@echo off
setlocal enabledelayedexpansion

REM Set the URL for your Django view
set URL=http://localhost:3000/

REM Set the number of requests to send
set REQUESTS=1000

REM Loop to send POST requests
for /l %%i in (1, 1, %REQUESTS%) do (
REM Generate random values for each parameter
set LEVEL=error
set MESSAGE=RandomMessage%%i
set RESOURCEID=server-!random!
set TRACEID=trace-!random!
set SPANID=span-!random!
set COMMIT=commit-!random!
set PARENTRESOURCEID=parent-!random!

REM Create a JSON payload
set JSON_PAYLOAD={^
\"level\":\"!LEVEL!\",^
\"message\":\"!MESSAGE!\",^
\"resourceId\":\"!RESOURCEID!\",^
\"timestamp\":\"2023-09-15T08:00:00Z\",^
\"traceId\":\"!TRACEID!\",^
\"spanId\":\"!SPANID!\",^
\"commit\":\"!COMMIT!\",^
\"metadata\":{^
\"parentResourceId\":\"!PARENTRESOURCEID!\"^
}^
}

    curl -X POST -H "Content-Type: application/json" -d "!JSON_PAYLOAD!" %URL%
)