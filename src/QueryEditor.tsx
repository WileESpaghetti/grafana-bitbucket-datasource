import React, { ReactNode, useCallback } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './datasource';
import { MyDataSourceOptions, MyQuery, QueryType } from './types';
import { BitbucketRepositoryQueryField } from './components/BitbucketRepositoryQueryField';
import { BitbucketQuerySelector } from './components/BitbucketQuerySelector';
import { BitbucketCommitsQueryField } from './components/BitbucketCommitsQueryField';
import { BitbucketIssuesQueryField } from './components/BitbucketIssuesQueryField';
import { BitbucketTagsQueryField } from './components/BitbucketTagsQueryField';
import {BitbucketPullRequestsQueryField} from "./components/BitbucketPullRequestsQueryField";
import {BitbucketMilestonesQueryField} from "./components/BitbucketMilestonesQueryField";

const isValid = (value: any): boolean => {
  // FIXME don't send if queryType is undefined
  return true;
};

export const DefaultQueryType = QueryType.Commits;

/* eslint-disable react/display-name */
const queryEditors: {
  [key: string]: { component: (props: Props, onChange: (val: any) => void) => ReactNode };
} = {
  [QueryType.Commits]: {
    component: (props: Props, onChange: (val: any) => void) => (
      <BitbucketCommitsQueryField {...(props.query.options || {})} onChange={onChange} />
    ),
  },
  [QueryType.Issues]: {
    component: (props: Props, onChange: (val: any) => void) => (
      <BitbucketIssuesQueryField {...(props.query.options || {})} onChange={onChange} />
    ),
  },
  [QueryType.Tags]: {
    component: (props: Props, _: (val: any) => void) => <BitbucketTagsQueryField {...(props.query.options || {})} />,
  },
  [QueryType.Pull_Requests]: {
    component: (props: Props, onChange: (val: any) => void) => (
       <BitbucketPullRequestsQueryField {...(props.query.options || {})} onChange={onChange}/>
    ),
  },
    [QueryType.Milestones]: {
        component: (props: Props, onChange: (val: any) => void) => (
            <BitbucketMilestonesQueryField {...(props.query.options || {})} onChange={onChange} />
        ),
    },
};

interface Props extends QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions> {
  queryTypes?: string[];
}

export const QueryEditor = (props: Props) => {
  const queryEditor = queryEditors[props.query.queryType || DefaultQueryType];
  const onChange = useCallback(
    (value: MyQuery) => {
      props.onChange(value);

      if (isValid(value)) {
        props.onRunQuery();
      }
    },
    [props]
  );

  const onKeyChange = useCallback(
    (key: string, value: any) => {
      props.onChange({
        ...props.query,
        [key]: value,
      });
    },
    [props.onChange, props.query]
  );

  return (
    <div>
      <BitbucketQuerySelector
        queryType={props.query.queryType}
        queryTypes={Object.keys(queryEditors)}
        onChange={(val) => onKeyChange('queryType', val.value || DefaultQueryType)}
      />

      <BitbucketRepositoryQueryField
        repository={props.query.repository}
        owner={props.query.owner}
        onChange={(repo) => {
          onChange({
            ...props.query,
            ...repo,
          });
        }}
      />

      {queryEditor ? (
        queryEditor.component(props, (value: any) => onKeyChange('options', !!value ? value : undefined))
      ) : (
        <span>Unsupported Query Type</span>
      )}
    </div>
  );
};
