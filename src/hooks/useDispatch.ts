import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export const useDispatchApp = () => {
  return useDispatch<AppDispatch>();
};
