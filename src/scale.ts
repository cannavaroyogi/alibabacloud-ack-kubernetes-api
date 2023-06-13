import ClientConfig, * as $ClientConfig from '@alicloud/cs20151215';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Console from '@alicloud/tea-console';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';


export default class Scale {
  static createClient(accessKeyId: string, accessKeySecret: string): ClientConfig {
    let config = new $OpenApi.Config({
      // AccessKey ID
      accessKeyId: accessKeyId,
      // AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // endpoint
    config.endpoint = `cs.ap-southeast-5.aliyuncs.com`;
    return new ClientConfig(config);
  }

  static async main(args: string[]): Promise<void> {
    //ALIBABA_CLOUD_ACCESS_KEY_ID, ALIBABA_CLOUD_ACCESS_KEY_SECRET。
    let client = Scale.createClient(process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'], process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET']);
    let scaleClusterNodePoolRequest = new $ClientConfig.ScaleClusterNodePoolRequest({
        count: 1,
      });
    let runtime = new $Util.RuntimeOptions({ });
    let headers : {[key: string ]: string} = { };
    let resp = await client.scaleClusterNodePoolWithOptions("cluster_id", "nodepool_id", scaleClusterNodePoolRequest, headers, runtime);
    Console.log(Util.toJSONString(resp));

  }

}

Scale.main(process.argv.slice(2));