import React, { useState } from 'react';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { IssuesOptions } from '../types';

interface Props extends IssuesOptions {
  onChange: (value: IssuesOptions) => void;
}

export const BitbucketIssuesQueryField = (props: Props) => {
  const [query, setQuery] = useState<string>(props.gitRef || '');

  return (
    <InlineFieldRow>
      <InlineField
        label="Query"
        labelWidth={20}
        tooltip="For more information, visit https://developer.atlassian.com/bitbucket/api/2/reference/meta/filtering#query-issues"
      >
        <Input
          // aria-label={selectors.components.QueryEditor.Ref.input}
          css=""
          width={36 * 2 + 10} // 656px
          value={query}
          onChange={(el) => setQuery(el.currentTarget.value)}
          onBlur={(el) => props.onChange({ ...props, query: el.currentTarget.value })}
        />
      </InlineField>
    </InlineFieldRow>

    // TODO time field (need to figure out what field to use for `closed_at`
  );
};
