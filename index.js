import { AppRegistry } from 'react-native';
import { initializeBlock } from '@airtable/blocks/ui';
import { App } from './App';
import { name as appName } from './app.json';

initializeBlock(() => AppRegistry.registerComponent(appName, () => App));
