function handler() {
  EVENT_DATA=$1

  export EVENT_DATA
 
  RESPONSE="$(./main.sh)"
  
  # send to cloudwatch logs
  echo "$RESPONSE" 1>&2;
}

#
# Always execute the user handler function in all request types.
# The user function(i.e main.sh) will determine the conditional execution.
#
function onEvent() {
  EVENT_DATA=$1
  echo "onEvent ==> $EVENT_DATA" 1>&2;
  requestType=$(getRequestType $1)
  
  case $requestType in
    'Create') onCreate $1 ;;
    'Update') onUpdate $1 ;;
    'Delete') onDelete $1 ;;
  esac
}

function onCreate() {
  invokeLambda $1
}

function onUpdate() { 
  invokeLambda $1
}
function onDelete() { 
  invokeLambda $1
}

function invokeLambda() {
  echo $1 | jq '. | @base64' |  aws lambda invoke \
  --payload file:///dev/stdin \
  --function-name ${LAMBDA_FUNCTION_ARN} /dev/stdout
}

function getRequestType() {
  echo $1 | jq -r .RequestType
}
