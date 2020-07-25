/* index.js
 * Loads the react-orcus library
 * Dependencies: 
    - components: Desktop, OrcusApp
    - static assets: main.css styles
 * Author: Joshua Carter
 * Created: January 18, 2020
 */
"use strict";
//import static assets
import mainClasses from './styles/main.css';
//include dependencies
import { Desktop } from './components/Desktop.js';
import { OrcusApp } from './components/OrcusApp.js';

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
