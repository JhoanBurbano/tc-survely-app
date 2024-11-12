import { useSelector } from 'react-redux';
import { RootState } from '..';

export const selectSurvey = () =>
  useSelector((state: RootState) => state.survey);
