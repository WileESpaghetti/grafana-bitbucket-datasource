import React, {useState} from 'react';
import {InlineField, InlineFieldRow, Input} from "@grafana/ui";
import {MilestonesOptions} from "../types";

interface Props extends MilestonesOptions {
    onChange: (value: MilestonesOptions) => void;
}

export const BitbucketMilestonesQueryField = (props: Props) => {
    const [query, setQuery] = useState<string>(props.query || '');

    return (
        <InlineFieldRow>
            <InlineField
                label="Query"
                labelWidth={20}
                tooltip="Query milestones by title asdfasdf"
            >
                <Input
                    // aria-label={selectors.components.QueryEditor.Ref.input}
                    css=""
                    width={36 * 2 + 10} // 656px
                    value={query}
                    onChange={(el) => setQuery(el.currentTarget.value)}
                    onBlur={(el) =>
                        props.onChange({
                            ...props,
                            query: el.currentTarget.value
                        })
                    }
                />
            </InlineField>
        </InlineFieldRow>
    );
};
