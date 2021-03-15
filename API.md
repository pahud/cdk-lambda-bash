# API Reference

**Classes**

Name|Description
----|-----------
[BashExecFunction](#cdk-lambda-bash-bashexecfunction)|*No description*


**Structs**

Name|Description
----|-----------
[BashExecFunctionProps](#cdk-lambda-bash-bashexecfunctionprops)|*No description*



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



### Properties


Name | Type | Description 
-----|------|-------------
**handler** | <code>[DockerImageFunction](#aws-cdk-aws-lambda-dockerimagefunction)</code> | <span></span>

### Methods


#### run() <a id="cdk-lambda-bash-bashexecfunction-run"></a>



```ts
run(): void
```







## struct BashExecFunctionProps  <a id="cdk-lambda-bash-bashexecfunctionprops"></a>






Name | Type | Description 
-----|------|-------------
**script** | <code>string</code> | The path of the shell script to be executed.
**dockerfile**? | <code>string</code> | The path of your custom dockerfile.<br/>__*Optional*__



