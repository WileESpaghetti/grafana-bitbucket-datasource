import { getBackendSrv } from '@grafana/runtime';
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions, QueryType } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  url?: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);

    this.url = instanceSettings.url;
  }

  async doRequest(query: MyQuery) {
    let url =
      this.url +
      '/bitbucketws/repositories/' +
      query.owner +
      '/' +
      query.repository +
      '/' +
      (query.queryType || '').toLocaleLowerCase();

    if (query?.options?.gitRef) {
      url += '/' + query.options.gitRef;
    }

    const result = await getBackendSrv().datasourceRequest({
      method: 'GET',
      url: url,
      // params: query,
    });

    return result;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map((query) =>
      this.doRequest(query).then((response) => {
        let frame: MutableDataFrame;

        switch (query.queryType) {
          case QueryType.Commits:
            console.log('query type commits');
            frame = new MutableDataFrame({
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
            break;
          case QueryType.Issues:
            console.log('query type issues');
            console.log(response);
            frame = new MutableDataFrame({
              refId: query.refId,
              name: 'issues',
              fields: [
                { name: 'title', type: FieldType.string },
                { name: 'author', type: FieldType.string },
                { name: 'author_company', type: FieldType.string },
                { name: 'repo', type: FieldType.string },
                { name: 'number', type: FieldType.number },
                { name: 'closed', type: FieldType.boolean },
                { name: 'created_at', type: FieldType.time },
                { name: 'closed_at', type: FieldType.time },
              ],
            });
            response.data.values.forEach((point: any) => {
              // TODO api does not include a closed_at equivalent
              const closed = ['new', 'open'].indexOf(point.state) === -1;
              frame.appendRow([
                point.title,
                point.reporter.display_name,
                '',
                point.repository.full_name,
                point.id,
                closed,
                point.created_on,
                '',
              ]);
            });
            break;
          default:
            // TODO return error unknown query type
            frame = new MutableDataFrame();
        }

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
