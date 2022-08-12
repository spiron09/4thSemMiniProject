import React, { useEffect, useRef } from 'react';
import { DataSet, Network} from 'vis-network/standalone/esm/vis-network';

const VisNetwork = (props) => {
  const domNode = useRef(null);
  const network = useRef(null);

  const options = {}; //customization

  useEffect(
    () => {
      network.current = new Network(domNode.current, props.graph, options);
    },
    [domNode, network, props.graph, options]
  );

  return (
    <div ref = { domNode } />
  );
};

export default VisNetwork;