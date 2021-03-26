# API Reference

**Classes**

Name|Description
----|-----------
[BashExecFunction](#cdk-lambda-bash-bashexecfunction)|*No description*


**Structs**

Name|Description
----|-----------
[BashExecFunctionProps](#cdk-lambda-bash-bashexecfunctionprops)|*No description*
[RunOps](#cdk-lambda-bash-runops)|*No description*



## class BashExecFunction  <a id="cdk-lambda-bash-bashexecfunction"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new BashExecFunction(scope: Construct, id: string, props: BashExecFunctionProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[BashExecFunctionProps](#cdk-lambda-bash-bashexecfunctionprops)</code>)  *No description*
  * **script** (<code>string</code>)  The path of the shell script to be executed. 
  * **dockerfile** (<code>string</code>)  The path of your custom dockerfile. __*Optional*__
  * **environment** (<code>Map<string, string></code>)  Lambda environment variables. __*Optional*__



### Properties


Name | Type | Description 
-----|------|-------------
**handler** | <code>[DockerImageFunction](#aws-cdk-aws-lambda-dockerimagefunction)</code> | <span></span>

### Methods


#### run(ops?) <a id="cdk-lambda-bash-bashexecfunction-run"></a>



```ts
run(ops?: RunOps): CustomResource
```

* **ops** (<code>[RunOps](#cdk-lambda-bash-runops)</code>)  *No description*
  * **runOnUpdate** (<code>boolean</code>)  whether to run the lambda function again on the provider update. __*Default*__: false;

__Returns__:
* <code>[CustomResource](#aws-cdk-core-customresource)</code>



## struct BashExecFunctionProps  <a id="cdk-lambda-bash-bashexecfunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**script** | <code>string</code> | The path of the shell script to be executed.
**dockerfile**? | <code>string</code> | The path of your custom dockerfile.<br/>__*Optional*__
**environment**? | <code>Map<string, string></code> | Lambda environment variables.<br/>__*Optional*__



## struct RunOps  <a id="cdk-lambda-bash-runops"></a>






Name | Type | Description 
-----|------|-------------
**runOnUpdate**? | <code>boolean</code> | whether to run the lambda function again on the provider update.<br/>__*Default*__: false;



