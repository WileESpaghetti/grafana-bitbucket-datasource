import React, {useState} from 'react';
import {InlineField, InlineFieldRow, Input, Select} from "@grafana/ui";
import {PullRequestsOptions, PullRequestTimeField} from "../types";
import {SelectableValue} from "@grafana/data";

interface Props extends PullRequestsOptions {
    onChange: (value: PullRequestsOptions) => void;
}

const timeFieldOptions: Array<SelectableValue<PullRequestTimeField>> = Object.keys(PullRequestTimeField)
    .filter((_, i) => PullRequestTimeField[i] !== undefined)
    .map((_, i) => {
        return {
            label: `${PullRequestTimeField[i]}`,
            value: i as PullRequestTimeField,
        };
    });

const defaultTimeField = timeFieldOptions[0].value;

export const BitbucketPullRequestsQueryField = (props: Props) => {
    const [query, setQuery] = useState<string>(props.query || '');

    return (
        <>
            <InlineFieldRow>
                <InlineField
                    label="Query"
                    labelWidth={20}
                    tooltip="For more information, visit https://developer.atlassian.com/bitbucket/api/2/reference/meta/filtering#query-issues"
                >
                    <Input
                        // aria-label={selectors.components.QueryEditor.Ref.input}
                        css=""
                        width={36}
                        value={query}
                        onChange={(el) => setQuery(el.currentTarget.value)}
                        onBlur={(el) => props.onChange({ ...props, query: el.currentTarget.value })}
                    />
                </InlineField>
            </InlineFieldRow>
            <InlineFieldRow>
                <InlineField
                    labelWidth={20}
                    label="Time Field"
                    tooltip="The time field to filter on the time range. WARNING: If selecting 'None', be mindful of the amount of data being queried. On larger repositories, querying all pull requests could easily cause rate limiting"
                    // tooltip="For more information, visit https://developer.atlassian.com/bitbucket/api/2/reference/meta/filtering#query-issues"
                >
                    <Select
                        width={36}
                        options={timeFieldOptions}
                        value={props.timeField || defaultTimeField}
                        onChange={(opt) =>
                            props.onChange({
                                ...props,
                                timeField: opt.value,
                            })
                        }
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};
