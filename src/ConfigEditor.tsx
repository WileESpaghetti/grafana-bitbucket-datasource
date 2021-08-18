import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions, MySecureJsonData } from './types';

const { SecretFormField, FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      path: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  // Secure field (only sent to the backend)
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
  };

  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  // Secure field (only sent to the backend)
  onClientIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        clientId: event.target.value,
      },
    });
  };

  // Secure field (only sent to the backend)
  onClientSecretChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        clientSecret: event.target.value,
      },
    });
  };

  render() {
    const { options } = this.props;
    const { jsonData, secureJsonFields } = options;
    const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="Path"
            labelWidth={6}
            inputWidth={20}
            onChange={this.onPathChange}
            value={jsonData.path || ''}
            placeholder="json field returned to frontend"
          />
        </div>

        {/*<div className="gf-form-inline">*/}
        {/*  <div className="gf-form">*/}
        {/*    <SecretFormField*/}
        {/*      isConfigured={(secureJsonFields && secureJsonFields.apiKey) as boolean}*/}
        {/*      value={secureJsonData.apiKey || ''}*/}
        {/*      label="API Key"*/}
        {/*      placeholder="secure json field (backend only)"*/}
        {/*      labelWidth={6}*/}
        {/*      inputWidth={20}*/}
        {/*      onReset={this.onResetAPIKey}*/}
        {/*      onChange={this.onAPIKeyChange}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.clientId) as boolean}
              value={secureJsonData.clientId || ''}
              label="Client ID"
              placeholder="secure json field (backend only)"
              labelWidth={6}
              inputWidth={20}
              onReset={this.onResetAPIKey}
              onChange={this.onClientIdChange}
            />
          </div>
        </div>

        <div className="gf-form-inline">
          <div className="gf-form">
            <SecretFormField
              isConfigured={(secureJsonFields && secureJsonFields.clientSecret) as boolean}
              value={secureJsonData.clientSecret || ''}
              label="Client Secret"
              placeholder="secure json field (backend only)"
              labelWidth={6}
              inputWidth={20}
              onReset={this.onResetAPIKey}
              onChange={this.onClientSecretChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
