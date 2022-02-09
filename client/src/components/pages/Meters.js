import React from 'react';
// import ReactDOM from 'react-dom'
// import { Vega } from 'react-vega'
// See https://www.npmjs.com/package/react-vega

// const spec = {
//     "width": 400,
//     "height": 200,
//     "data": [{ "name": "table" }],
//     "signals": [
//       {
//         "name": "tooltip",
//         "value": {},
//         "on": [
//           {"events": "rect:mouseover", "update": "datum"},
//           {"events": "rect:mouseout",  "update": "{}"}
//         ]
//       }
//     ],
//     // See the rest in packages/react-vega-demo/stories/vega/spec1.ts
// };
  
//   const barData = {
//     table: [
//       { a: 'A', b: 28 },
//       { a: 'B', b: 55 },
//       { a: 'C', b: 43 },
//       { a: 'D', b: 91 },
//       { a: 'E', b: 81 },
//       { a: 'F', b: 53 },
//       { a: 'G', b: 19 },
//       { a: 'H', b: 87 },
//       { a: 'I', b: 52 },
//     ],
//   };
  
//   function handleHover(...args){
//     console.log(args);
//   }
  
//   const signalListeners = { hover: handleHover };
  
//   ReactDOM.render(
//     <Vega spec={spec} data={barData} signalListeners={signalListeners} />,
//     document.getElementById('bar-container')
//   );



const Meters = () => {
    return (
        <div className='page-heading'>
            <h1>Meters</h1>
            <div className='graph'>
            <a href='https://www.npmjs.com/package/react-vega' target={"_blank"} rel="noopener noreferrer">
                <p> div for vega output.</p>
            </a>
            </div>
            <div id='bar-container'></div> {/* Link to renderer. */}
        </div>
    );
};


export default Meters;