import vis from 'vis';
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { getEntities } from 'app/entities/ikasan-component/ikasan-component.reducer';

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
    const data = {
      nodes,
      edges
    };

    const options = {
      // edges: {},
      nodes: {
        // color: {
        //   inherit: false
        // }
        // image: {
        //   unselected: 'flow.png',
        //   selected: './flow.png'
        // }
      },
      physics: false,
      manipulation: {
        enabled: true,
        addNode: function(data, callback) {
          // filling in the popup DOM elements
          console.log('add', data);
        },
        editNode: function(data, callback) {
          // filling in the popup DOM elements
          console.log('edit', data);
        },
        addEdge: function(data, callback) {
          console.log('add edge', data);
          if (data.from == data.to) {
            var r = confirm('Do you want to connect the node to itself?');
            if (r === true) {
              callback(data);
            }
          } else {
            callback(data);
          }
        }
      },
      locale: 'en',
      interaction: {
        navigationButtons: true,
        keyboard: true,
        hover: true
      },
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: true,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'LR', // UD, DU, LR, RL
          sortMethod: 'hubsize' // hubsize, directed
        }
      }
    };
    let network = new vis.Network(document.getElementById('visigoth'), data, options);

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
      // listStyleType: 'none'
    };

    const metaStyle = {
      height: '750px'
    };

    const networkStyle = {
      height: '250px',
      borderRight: 'dashed 2px'
    };
    let date = new Date();
    // let dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    return (
      <li key="1" style={liStyle}>
        <div className="row">
          <div className="col-lg-12" style={metaStyle}>
            <div id="visigoth" />
            <br />
            {/* <p>Submitted on: {dateString}</p> */}
          </div>
        </div>
      </li>
    );
  }
}
