import { useNavigation } from '@react-navigation/native';
import { RootStackParamList, ROUTES_NAMES_TYPE } from '../types/routes.type';
import { StackNavigationProp } from '@react-navigation/stack';

export const useNavigationApp = (name: ROUTES_NAMES_TYPE) => {
  type NavigationProp = StackNavigationProp<RootStackParamList, typeof name>;
  return useNavigation<NavigationProp>();
};
