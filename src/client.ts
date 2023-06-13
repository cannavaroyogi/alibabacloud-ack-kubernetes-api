import ClientConfig, * as $ClientConfig from '@alicloud/cs20151215';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import Console from '@alicloud/tea-console';
import Util, * as $Util from '@alicloud/tea-util';
import * as $tea from '@alicloud/tea-typescript';


export default class Client {
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
    let client = Client.createClient(process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'], process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET']);
    let describeClusterNodesRequest = new $ClientConfig.DescribeClusterNodesRequest({ });
    let runtime = new $Util.RuntimeOptions({ });
    let headers : {[key: string ]: string} = { };
    let resp = await client.describeClusterNodesWithOptions("cluster_id", describeClusterNodesRequest, headers, runtime);
    Console.log(Util.toJSONString(resp));

    const stringResp = JSON.parse(Util.toJSONString(resp));

    if (!!stringResp) {
      stringResp['body']['nodes'].forEach( async value => {
        console.log(value.nodeName);
        let removeNodePoolNodesRequest = new $ClientConfig.RemoveNodePoolNodesRequest({
          releaseNode: true,
          drainNode: true,
          nodes: [(value.nodeName)],
        });

        let respRemove = await client.removeNodePoolNodesWithOptions("cluster_id", "nodepool_id", removeNodePoolNodesRequest, headers, runtime);
        console.log(Util.toJSONString(respRemove));
      })
    }

  }

}

Client.main(process.argv.slice(2));