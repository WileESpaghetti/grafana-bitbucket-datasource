import { DataQuery, DataSourceJsonData } from '@grafana/data';

export enum QueryType {
  Commits = 'Commits',
  Issues = 'Issues',
  Contributors = 'Contributors',
  Tags = 'Tags',
  // Releases = 'Releases', // Not Supported By Bitbucket API
  Pull_Requests = 'Pull Requests',
  Labels = 'Labels',
  Repositories = 'Repositories',
  Organizations = 'Organizations',
  GraphQL = 'GraphQL',
  Milestones = 'Milestones',
  Packages = 'Packages',
}

export enum PullRequestTimeField {
  ClosedAt,
  CreatedAt,
  MergedAt,
  None,
}

export interface Indexable {
  [index: string]: any;
}

export interface CommitsOptions extends Indexable {
  gitRef?: string;
}

export interface IssuesOptions extends Indexable {
  timeField?: IssueTimeField;
  query?: string;
}

export enum IssueTimeField {
  CreatedAt,
  ClosedAt,
}

export interface RepositoryOptions {
  repository?: string;
  owner?: string;
}

export interface TagsOptions extends Indexable {}

export interface PullRequestsOptions extends Indexable {
  timeField?: PullRequestTimeField;
  query?: string;
}

// GitHubQuery
export interface MyQuery extends Indexable, DataQuery, RepositoryOptions, CommitsOptions {
  queryText?: string;
  constant?: number;
  options?: CommitsOptions | IssuesOptions | TagsOptions;
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
