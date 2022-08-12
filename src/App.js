import React, { useRef, useState, useEffect } from 'react'
import './App.css';
import { DataSet } from 'vis-network/standalone/esm/vis-network';
import VisNetwork from './visGraph';

function App() {
  const [showGraph, setShowGraph] = React.useState(false);
  const [graph, setGraph] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [ans, setAns] = React.useState(null);
  let v, val = 1000000000;
  const inpEle = React.useRef(null);

  function tsp(graph, currPos, n, count, cost) {

    if (count == n && graph[currPos][0]) {
      val = Math.min(val, cost + graph[currPos][0])
      return;
    }
    for (var i = 0; i < n; i++) {

      if (!v[i] && graph[currPos][i]) {

        v[i] = true;
        tsp(graph, i, n, count + 1,
          cost + graph[currPos][i]);

        v[i] = false;
      }
    }
  }

  useEffect(() => {
    let nodes = [];
    let edges = [];

    for (let i = 0; i < rows.length; i++) {
      nodes.push({ id: i, label: i.toString() })
    }

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        rows[i][j] = parseInt(rows[i][j])
        if (rows[i][j] !== 0) {
          edges.push({ from: i, to: j })
        }
      }
    }

    nodes = new DataSet(nodes)
    edges = new DataSet(edges)

    const data = {
      nodes,
      edges
    };

    setGraph(data);
    v = Array(rows.length).fill(false)
    v[0] = true;
    tsp(rows, 0, rows.length, 1, 0)
    if (showGraph) setAns(val)

    setShowGraph(true);
  }, [rows])

  const handleSubmit = (e) => {
    e.preventDefault()

    setRows(inpEle.current.value.split('\n').map((e) => {
      return e.split(',')
    }))
  }


  return (
    
    <div id='main' className='flex items-center m-56'>
      
      <div id='textBut' className='flex flex-col'>
        <form className='justify-items-center' onSubmit={handleSubmit}>
          <textarea name="" id="" cols="30" rows="10" ref={inpEle}></textarea>
          <button className='ml-12 mr-16 my-20 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300' type='submit'>Submit</button>
        </form>
      </div>
      <div id='GraphCost' className='flex justify-end flex items-center'>
        <div className='flex-equal '>
          {showGraph &&
            <VisNetwork className="w-1/2"
              graph={graph}
            />}
        </div>
        <div className=''>
          {ans &&
            <div>The cost is {ans}</div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;