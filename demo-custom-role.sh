#!/bin/bash

function whoami() {
  aws sts get-caller-identity
}

# implement your business logic below
function onCreate() {
  echo "running whoami"
  whoami
}

function onUpdate() { 
  echo "do nothing on update"
}

function onDelete() { 
  echo "do nothing on update"
}

function getRequestType() {
  echo $1 | jq -r .RequestType
}

function conditionalExec() {
  requestType=$(getRequestType $EVENT_DATA)

  # determine the original request type
  case $requestType in
    'Create') onCreate $1 ;;
    'Update') onUpdate $1 ;;
    'Delete') onDelete $1 ;;
  esac
}

echo "Hello cdk lambda bash!!"

conditionalExec

exit 0
