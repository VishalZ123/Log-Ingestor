@echo off
setlocal enabledelayedexpansion

REM Set the URL for your Django view
set URL=http://localhost:3000/

REM Set the number of requests to send
set REQUESTS=500
REM Generate random values for each parameter
set LEVEL=error
set MESSAGE=RandomMessage%%i
set RESOURCEID=server-!random!
set TIMESTAMP=%DATE%T%TIME%
set TRACEID=trace-!random!
set SPANID=span-!random!
set COMMIT=commit-!random!
set PARENTRESOURCEID=parent-!random!

REM Create a JSON payload
set JSON_PAYLOAD={^
\"level\":\"!LEVEL!\",^
\"message\":\"!MESSAGE!\",^
\"resourceId\":\"!RESOURCEID!\",^
\"timestamp\":\"!TIMESTAMP!\",^
\"traceId\":\"!TRACEID!\",^
\"spanId\":\"!SPANID!\",^
\"commit\":\"!COMMIT!\",^
\"metadata\":{^
\"parentResourceId\":\"!PARENTRESOURCEID!\"^
}^
}

set "START_TIME=!TIME!"
REM Loop to send POST requests
for /l %%i in (1, 1, %REQUESTS%) do (
    curl -X POST -H "Content-Type: application/json" -d "!JSON_PAYLOAD!" %URL%
)

REM Record end time
set "END_TIME=!TIME!"

REM Calculate elapsed time
set /a "ELAPSED_TIME=(1%END_TIME:~0,2%-100)*3600 + (1%END_TIME:~3,2%-100)*60 + (1%END_TIME:~6,2%-100) - ((1%START_TIME:~0,2%-100)*3600 + (1%START_TIME:~3,2%-100)*60 + (1%START_TIME:~6,2%-100))"

echo Elapsed time: %ELAPSED_TIME% seconds