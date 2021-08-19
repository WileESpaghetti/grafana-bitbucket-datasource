import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface RepositoryOptions {
  repository?: string;
  owner?: string;
}

// GitHubQuery
export interface MyQuery extends DataQuery, RepositoryOptions {
  queryText?: string;
  constant: number;
}

export const defaultQuery: Partial<MyQuery> = {
  constant: 6.5,
};

/**
 * These are options configured for each DataSource instance
 */
// GithubDataSourceOptions
export interface MyDataSourceOptions extends DataSourceJsonData, RepositoryOptions {
  path?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
}
