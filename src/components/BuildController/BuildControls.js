import React from 'react';
import classes from "./BuildControls.css";
import BuildControl from './BuildControll/BuildControl.js';

const controls = [
    {Label:'Salad', type:'salad'},
    {Label:'Bacon', type:'bacon'},
    {Label:'Cheese', type:'cheese'},
    {Label:'Meat', type:'meat'}
]
const buildController = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price:$<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.type} 
            label={ctrl.Label}
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)}
            disabled= {props.disabled[ctrl.type]}
            />
            
        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>Order now</button>
    
    </div>
);
export default buildController;