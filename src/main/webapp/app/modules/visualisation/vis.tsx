import vis from 'vis';
import React, { Component } from 'react';
import { getEntities } from './visualisation.reducer';
import visOptions from './data/options.json';

const date = new Date();
let lastUpdatedDateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

const nodes = new vis.DataSet([]);
const edges = new vis.DataSet([
  { from: 'hello', to: 'world' },
  { from: 1, to: 3 },
  { from: 2, to: 1 },
  { from: 2, to: 4 },
  { from: 2, to: 5 }
]);

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
    const loadEntities = getEntities();
    loadEntities.payload.then(result => {
      for (const node of result.data) {
        nodes.add({ id: node.id, label: node.flowName, image: require('./data/flow-img.png') });
      }
      lastUpdatedDateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    });

    // Note: We could pass through the Visjs options from the backend/java
    // We could even let users maintain their own preferred visjs otions
    let network = new vis.Network(document.getElementById('visigoth'), { nodes, edges }, visOptions);

    network.on('click', function(params) {
      console.log('Node Clicked');
      if (params.nodes.length == 0 && params.edges.length == 0) {
        let updatedIds = nodes.add([
          {
            label: 'new',
            x: params.pointer.canvas.x,
            y: params.pointer.canvas.y
          }
        ]);
        network.selectNodes([updatedIds[0]]);
        network.editNode();
      }
    });
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
            <img src={require('./data/flow-img.png')} />
          </div>
        </div>
      </li>
    );
  }
}
