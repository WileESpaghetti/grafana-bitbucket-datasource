import React from 'react';
import { InlineField, InlineFieldRow, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';

interface Props {
  onChange: (val: SelectableValue) => void;
  queryType?: string;
  queryTypes?: string[];
}

export const BitbucketQuerySelector = (props: Props) => {
  const queryTypeOptions: Array<SelectableValue<string>> = (props.queryTypes || []).map((key) => {
    return {
      label: key.replace(/_/gi, ' '),
      value: key.toLocaleLowerCase(),
    };
  });

  return (
    <InlineFieldRow>
      <InlineField tooltip="What resource are you querying for?" label="Query Type" labelWidth={10}>
        <Select width={36} options={queryTypeOptions} value={props.queryType} onChange={props.onChange} />
      </InlineField>
    </InlineFieldRow>
  );
};
