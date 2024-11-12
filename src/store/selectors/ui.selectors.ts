import { useSelector } from 'react-redux';
import { RootState } from '../';

export const selectLoading = () =>
  useSelector<RootState, boolean>(state => state.ui.loading);
export const selectError = () =>
  useSelector<RootState, string | null>(state => state.ui.error);
