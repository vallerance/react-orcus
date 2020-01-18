/* index.js
 * Loads the react-orcus library
 * Dependencies: 
    - classes: 
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//include dependencies
import { Desktop } from './Desktop.js';
import { OrcusApp } from './OrcusApp.js';

//export modules
export { 
    Desktop,
    OrcusApp as App  
};
//export default
export default { 
    Desktop,
    App: OrcusApp
};
