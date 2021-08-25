import React, { useState } from 'react';
import { InlineField, InlineFieldRow, Input } from '@grafana/ui';
import { CommitsOptions } from '../types';

interface Props extends CommitsOptions {
  gitRef: string;
  onChange: (value: CommitsOptions) => void;
}

export const BitbucketCommitsQueryField = (props: Props) => {
  const [ref, setRef] = useState<string>(props.gitRef || '');

  return (
    <InlineFieldRow>
      <InlineField
        label="Ref (Branch / Tag)"
        labelWidth={20}
      >
        <Input
          // aria-label={selectors.components.QueryEditor.Ref.input}
          css=""
          width={36}
          value={ref}
          onChange={(el) => setRef(el.currentTarget.value)}
          onBlur={(el) => props.onChange({ ...props, gitRef: el.currentTarget.value })}
        />
      </InlineField>
    </InlineFieldRow>
  );
};
