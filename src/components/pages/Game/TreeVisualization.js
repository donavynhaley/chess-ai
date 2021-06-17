import React from 'react'
import Tree from 'react-d3-tree';

const TreeVisualization = ({ data }) => {
    return (
        <div id="treeWrapper" >
            <Tree
                data={data}
                depthFactor={1000}
                initialDepth={2}
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf" />
        </div>
    )
}

export default TreeVisualization
