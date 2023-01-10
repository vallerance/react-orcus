//include dependencies
import { Desktop } from './lib/components/Desktop';
import { OrcusApp } from './lib/components/OrcusApp';

//export modules
export { Desktop, OrcusApp as App };
//export default
export default {
    Desktop,
    App: OrcusApp,
};

console.log('A CHANGE');
console.log('ANOTHER CHANGE');
