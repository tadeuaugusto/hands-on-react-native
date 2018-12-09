import { createStackNavigator, createAppContainer } from 'react-navigation';
import ViagemScreen from './src/screens/ViagemScreen/index.js';
import DespesaScreen from './src/screens/DespesaScreen/index.js';

const AppNavigator = createStackNavigator({
  // Home: HomePage,
  ViagemScreen: ViagemScreen,
  DespesaScreen: DespesaScreen
}, {
  initialRouteName: 'ViagemScreen'
})

export default createAppContainer(AppNavigator)