import { createStackNavigator, createAppContainer } from 'react-navigation';
import ViagemScreen from './src/screens/ViagemScreen/index.js';
import DespesaScreen from './src/screens/DespesaScreen/index.js';
import CadastrarViagem from './src/screens/CadastrarViagem/index.js';
import CadastrarDespesa from './src/screens/CadastrarDespesa/index.js';

const AppNavigator = createStackNavigator({
  // Home: HomePage,
  ViagemScreen: ViagemScreen,
  DespesaScreen: DespesaScreen,
  CadastrarViagem: CadastrarViagem,
  CadastrarDespesa: CadastrarDespesa
}, {
  initialRouteName: 'ViagemScreen'
})

export default createAppContainer(AppNavigator)