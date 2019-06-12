import vis from 'vis';
import React, { Component, createRef } from 'react';

const nodes = new vis.DataSet([
  { id: 1, label: 'Node 1' },
  { id: 2, label: 'Node 2' },
  { id: 3, label: 'Node 3' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' }
]);

// create an array with edges
const edges = new vis.DataSet([{ from: 1, to: 3 }, { from: 1, to: 2 }, { from: 2, to: 4 }, { from: 2, to: 5 }]);

let network = {};

// // initialize your network!
export default class VisNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: props.mindMap,
      node_options: props.node_options,
      edge_options: props.edge_options
    };
  }

  componentDidMount() {
    const edge_dataset = edges;
    const nodes_dataset = nodes;
    const data = {
      nodes: {
        nodes_dataset
      },
      edges: {
        edge_dataset
      }
    };
    const edge_options = {};
    const node_options = {
      color: {
        inherit: false
      }
    };
    const options = {
      edges: edge_options,
      nodes: node_options,
      physics: false,
      locale: 'en',
      interaction: {
        navigationButtons: true,
        keyboard: true,
        hover: true
      }
    };
    network = new vis.Network(this.refs.network, data, options);
  }

  render() {
    const liStyle = {
      borderStyle: 'outset',
      backgroundColor: 'lightgrey',
      marginBottom: '10px',
      listStyleType: 'none'
    };

    const metaStyle = {
      paddingLeft: '15px'
    };

    const networkStyle = {
      height: '250px',
      borderRight: 'dashed 2px'
    };
    let date = new Date();
    let dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    return (
      <li key="1" style={liStyle}>
        <div className="row">
          <div className="col-lg-4" style={metaStyle}>
            <br />
            <p>Submitted on: {dateString}</p>
          </div>
        </div>
      </li>
    );
  }
}
