#!/bin/bash

# implement your business logic below
function onCreate() {
  echo "running kubectl apply -f ..."
}

function onUpdate() { 
  echo "do nothing on update"
}

function onDelete() { 
  echo "running kubectl delete -f ..."
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
