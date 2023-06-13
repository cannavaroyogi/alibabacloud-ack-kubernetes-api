// This file is auto-generated, don't edit it
// Dependent modules can be viewed by downloading the module dependency file in the project or obtaining SDK dependency information in the upper right corner
import CS20151215, * as $CS20151215 from '@alicloud/cs20151215';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';


export default class Addnodepool {

  /**
   * Initialize the Client with the AccessKey of the account
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  static createClient(accessKeyId: string, accessKeySecret: string): CS20151215 {
    let config = new $OpenApi.Config({
      // Required, your AccessKey ID
      accessKeyId: accessKeyId,
      // Required, your AccessKey secret
      accessKeySecret: accessKeySecret,
    });
    // Endpoint
    config.endpoint = `cs.ap-southeast-5.aliyuncs.com`;
    return new CS20151215(config);
  }

  static async main(args: string[]): Promise<void> {
    // Please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID and ALIBABA_CLOUD_ACCESS_KEY_SECRET are set.
    // The project code leakage may result in the leakage of AccessKey, posing a threat to the security of all resources under the account. The following code example is called by using the environment variable to obtain the AccessKey, for reference only. It is recommended to use the more secure STS credential. For more credentials, please refer to: https://www.alibabacloud.com/help/en/alibaba-cloud-sdk-262060/latest/credentials-settings-5
    let client = Addnodepool.createClient(process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'], process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET']);
    let scalingGroup = new $CS20151215.CreateClusterNodePoolRequestScalingGroup({
      instanceChargeType: "PostPaid",
      keyPair: "your-key-pair",
      systemDiskSize: 50,
      systemDiskCategory: "cloud_essd",
      imageType: "AliyunLinux3",
      vswitchIds: [
        "your vsw",
        "can array"
      ],
      instanceTypes: [
        "ecs.g7a.xlarge"
      ],
    });
    let nodepoolInfo = new $CS20151215.CreateClusterNodePoolRequestNodepoolInfo({
      name: "node-auto-deploy",
    });
    let kubernetesConfig = new $CS20151215.CreateClusterNodePoolRequestKubernetesConfig({
      runtime: "containerd",
      runtimeVersion: "1.5.13",
    });
    let autoScaling = new $CS20151215.CreateClusterNodePoolRequestAutoScaling({
      minInstances: 2,
      maxInstances: 2,
      enable: false,
    });
    let createClusterNodePoolRequest = new $CS20151215.CreateClusterNodePoolRequest({
      autoScaling: autoScaling,
      kubernetesConfig: kubernetesConfig,
      nodepoolInfo: nodepoolInfo,
      scalingGroup: scalingGroup,
    });
    let runtime = new $Util.RuntimeOptions({ });
    let headers : {[key: string ]: string} = { };
    try {
      // Copy the code to run, please print the return value of the API by yourself.
      await client.createClusterNodePoolWithOptions("cluster_id", createClusterNodePoolRequest, headers, runtime);
    } catch (error) {
      // Print error if needed.
      Util.assertAsString(error.message);
    }    
  }

}

Addnodepool.main(process.argv.slice(2));