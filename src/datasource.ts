import { getBackendSrv } from '@grafana/runtime';
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  url?: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);

    this.url = instanceSettings.url;
  }

  async doRequest(query: MyQuery) {
    const result = await getBackendSrv().datasourceRequest({
      method: 'GET',
      url: this.url + '/bitbucketws/repositories/' + query.owner + '/' + query.repository + '/commits',
      // params: query,
    });

    return result;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map((query) =>
      this.doRequest(query).then((response) => {
        /*
          // Frames converts the list of commits to a Grafana DataFrame
        func (c Commits) Frames() data.Frames {
            frame := data.NewFrame(
                "commits",
                data.NewField("id", nil, []string{}),
                data.NewField("author", nil, []string{}),
                data.NewField("author_login", nil, []string{}),
                data.NewField("author_email", nil, []string{}),
                data.NewField("author_company", nil, []string{}),
                data.NewField("commited_at", nil, []time.Time{}),
                data.NewField("pushed_at", nil, []time.Time{}),
            )

            for _, v := range c {
                frame.AppendRow(
                    v.OID,
                    v.Author.Name,
                    v.Author.User.Login,
                    v.Author.Email,
                    v.Author.User.Company,
                    v.CommittedDate.Time,
                    v.PushedDate.Time,
                )
            }

            return data.Frames{frame}
        }
           */
        const frame = new MutableDataFrame({
          refId: query.refId,
          name: 'commits',
          fields: [
            { name: 'id', type: FieldType.string },
            { name: 'author', type: FieldType.string },
            { name: 'author_login', type: FieldType.string },
            { name: 'author_email', type: FieldType.string },
            { name: 'author_company', type: FieldType.string },
            { name: 'commited_at', type: FieldType.time },
            { name: 'pushed_at', type: FieldType.time },
          ],
        });

        response.data.values.forEach((point: any) => {
          frame.appendRow([point.hash, point.author.raw, '', '', '', point.date, point.date]);
        });

        return frame;
      })
    );

    return Promise.all(promises).then((data) => ({ data }));

    // return result;
    // const { range } = options;
    // const from = range!.from.valueOf();
    // const to = range!.to.valueOf();
    //
    // // Return a constant for each query.
    // const data = options.targets.map((target) => {
    //   const query = defaults(target, defaultQuery);
    //   return new MutableDataFrame({
    //     refId: query.refId,
    //     fields: [
    //       { name: 'Time', values: [from, to], type: FieldType.time },
    //       { name: 'Value', values: [query.constant, query.constant], type: FieldType.number },
    //     ],
    //   });
    // });
    //
    // return { data };
  }

  async testDatasource() {
    // TODO return error until client ID and client secret and both configured then run api request
    const result = await getBackendSrv().datasourceRequest({
      method: 'GET',
      url: this.url + '/bitbucketws/user',
    });

    return result;
    // Implement a health check for your data source.
    // return {
    //   status: 'success',
    //   message: 'Success',
    // };
  }
}
