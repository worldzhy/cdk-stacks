import {Stack, CfnElement} from 'aws-cdk-lib';

/**
 * A base stack class that implements custom logical name
 * allocation. Adds a prefix if it is defined in the "prefix"
 * context key.
 *
 * Use `cdk --context prefix=PREFIX` to set the prefix.
 *
 * More information - https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/custom-logical-names
 */
export class BaseStack extends Stack {
  public allocateLogicalId(element: CfnElement) {
    const orig = super.allocateLogicalId(element);
    const prefix = this.node.tryGetContext('prefix');
    return prefix ? prefix + orig : orig;
  }
}
