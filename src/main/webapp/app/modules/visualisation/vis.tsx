import vis from 'vis';
import React, { Component } from 'react';
import { getVisualisation } from './visualisation.reducer';
import visOptions from './data/options.json';

const date = new Date();
let lastUpdatedDateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

const nodes = new vis.DataSet([]);
const edges = new vis.DataSet([]);

export class VisNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: props.mindMap,
      node_options: props.node_options,
      edge_options: props.edge_options
    };
  }

  componentDidMount() {
    const loadVisualisationData = getVisualisation();
    loadVisualisationData.payload.then(result => {
      for (const node of result.data.nodes) {
        console.log(node);
        nodes.add({ id: node.name, label: node.name, image: require('./data/flow-img.png') });
      }
      for (const edge of result.data.edges) {
        console.log(edge);
        edges.add({ from: edge.from, to: edge.to });
      }
    });

    // Note: We could pass through the Visjs options from the backend/java
    // We could even let users maintain their own preferred visjs otions
    let network = new vis.Network(document.getElementById('visigoth'), { nodes, edges }, visOptions);
  }

  render() {
    const liStyle = {
      backgroundColor: 'white'
    };

    const metaStyle = {
      height: '750px'
    };

    return (
      <li key="1" style={liStyle}>
        <div className="row">
          <div className="col-lg-12" style={metaStyle}>
            <div id="visigoth" />
            <br /> <br />
            <p>Submitted on: {lastUpdatedDateString}</p>
          </div>
        </div>
      </li>
    );
  }
}
