import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './datasource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onRepositoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, repository: event.target.value });
  };

  onOwnerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, owner: event.target.value });
    // executes the query
    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { repository, owner } = query;

    return (
      <div className="gf-form">
        <FormField
          width={40}
          value={owner || ''}
          onChange={this.onOwnerChange}
          label="Owner"
          tooltip="The owner (organization or user) of the GitHub repository (example: 'grafana')"
        />
        <FormField
          labelWidth={40}
          value={repository || ''}
          onChange={this.onRepositoryChange}
          label="Repository"
          tooltip="The name of the Bitbucket repository"
        />
      </div>
    );
  }
}
