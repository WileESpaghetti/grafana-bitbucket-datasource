import React, { useState } from 'react';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { RepositoryOptions } from '../types';

interface Props extends RepositoryOptions {
  onChange: (value: RepositoryOptions) => void;
}

export const BitbucketRepositoryQueryField = (props: Props) => {
  const [repository, setRepository] = useState<string>(props.repository || '');
  const [owner, setOwner] = useState<string>(props.owner || '');

  return (
    <InlineFieldRow>
      <InlineField
        label="Owner"
        labelWidth={20}
        tooltip="The owner (organization or user) of the Bitbucket repository (example: 'grafana')"
      >
        <Input
          // aria-label={selectors.components.QueryEditor.Owner.input}
          css=""
          width={36}
          value={owner}
          onChange={(el) => setOwner(el.currentTarget.value)}
          onBlur={(el) => props.onChange({ ...props, owner: el.currentTarget.value })}
        />
      </InlineField>
      <InlineField tooltip="The name of the Bitbucket repository" label="Repository" labelWidth={20}>
        <Input
          // aria-label={selectors.components.QueryEditor.Repository.input}
          css=""
          width={36}
          value={repository}
          onChange={(el) => setRepository(el.currentTarget.value)}
          onBlur={(el) => props.onChange({ ...props, repository: el.currentTarget.value })}
        />
      </InlineField>
    </InlineFieldRow>
  );
};
