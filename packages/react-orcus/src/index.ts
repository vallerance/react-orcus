//include dependencies
import { Desktop } from './lib/components/Desktop.js';
import { OrcusApp } from './lib/components/OrcusApp.js';

//export modules
export { Desktop, OrcusApp as App };
//export default
export default {
    Desktop,
    App: OrcusApp,
};
