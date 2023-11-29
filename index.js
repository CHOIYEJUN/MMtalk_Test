/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App'; // 실제 앱의 메인 파일로 수정할 것
import { name as appName } from './app.json';
import 'react-native-gesture-handler'; // 추가

AppRegistry.registerComponent(appName, () => App);
