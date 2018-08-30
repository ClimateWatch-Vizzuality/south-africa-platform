import React from 'react';
import { Dropdown, ButtonGroup, Button, Icon } from 'cw-components';

import iconInfo from 'assets/icons/info';
import iconDownload from 'assets/icons/download';

import styles from './summary-styles';

const Summary = () => (
  <div className={styles.columns}>
    <Dropdown
      label="Theme"
      value={{ label: 'Apple', value: 'Apple' }}
      options={{ label: 'Apple', value: 'Apple' }}
      onValueChange={() => {
      }}
      hideResetButton
    />
    <Dropdown
      label="GHG Emissions Reduction "
      value={{ label: 'pera', value: 'pera' }}
      options={{ label: 'pera', value: 'pera' }}
      onValueChange={() => {
      }}
      hideResetButton
    />
    <Dropdown
      label="Visualization"
      value={{ label: 'buble chart', value: 'buble chart' }}
      options={[
        { label: 'buble chart', value: 'buble chart' },
        { label: 'table', value: 'table' }
      ]}
      onValueChange={() => {
      }}
      hideResetButton
    />
    <ButtonGroup theme={{ wrapper: styles.buttonGroupWrapper }}>
      <Button onClick={() => console.info('Clicked on info')}>
        <Icon icon={iconInfo} />
      </Button>
      <Button onClick={() => console.info('Clicked on download')} disabled>
        <Icon icon={iconDownload} />
      </Button>
    </ButtonGroup>
  </div>
);

export default Summary;
