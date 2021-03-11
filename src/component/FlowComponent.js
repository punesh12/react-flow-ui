import React, {useState, Fragment} from 'react'
import ReactFlow , {Background, Controls, MiniMap, addEdge} from 'react-flow-renderer'

const initialElements = [
    {
        id:'1',
        type:'input', 
        data:{label:'Node'}, 
        position:{x:0,y:0}
}
]

const onLoad = (reactFlowInstance) =>{
    reactFlowInstance.fitView();
}

function FlowComponent() {

    const [elements, setElements] = useState(initialElements);
    const [name, setName] = useState("")

    const addNode =() =>{
        setElements(e => e.concat({
            id:(e.length+1).toString(),
            data:{label:`${name}`},
            position:{x:Math.random()* window.innerWidth, y: Math.random()* window.innerHeight}
        }));
    };

    const onConnect = (params) => setElements(e => addEdge(params,e));




    return (
        <Fragment>
            <ReactFlow
            
            elements={elements}
            onLoad={onLoad}
            style={{width:'100%', height:'90vh'}}
            onConnect={onConnect}
            connectionLineStyle={{stroke:"#ddd", strokeWidth:2}}
            connectionLineType="bezier"
            snapToGrid = {true}
            snspGrid = {[16,16]}
            >
                <Background
                color ="black"
                gap={16}
                />
                <MiniMap

                style={{borderColor:"red", background:"lightblue"}}
                nodeStrokeColor={n =>{
                    if (n.type === 'input') return '#blue';
                    if (n.type === 'output') return '#ff0072';
                    if (n.type === 'default') return '#1a192b';                    if (n.type === 'default') return '#1a192b';
          
                    return '#red';
                }}

                nodeColor={(n) => {
                    if (n.type === 'input') return '#0041d0';
          
                    return '#888';
                  }}
                  nodeBorderRadius={2}

                /> 

                <Controls className="control" />
            </ReactFlow>

            <div>
                <input type="text"
                name="title"
                placeholder="Enter node name"
                onChange={e => setName(e.target.value)}
                />
                <button
                onClick={addNode}
                >Add node</button>

            </div>
            
        </Fragment>
    )
}

export default FlowComponent
