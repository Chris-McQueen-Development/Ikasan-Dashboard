import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { VisNetwork } from '../visualisation/vis';

import './visualisation.scss';

export interface IVisualisationProps extends RouteComponentProps<{ url: string }> {}

export default class Visualisation extends React.Component<IVisualisationProps> {
  render() {
    return (
      <div>
        <h2 id="ikasan-flow-heading">Visualisations</h2>
        <VisNetwork />
      </div>
    );
  }
}
