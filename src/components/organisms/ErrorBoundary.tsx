import React from 'react';
import ErrorModal from '../molecules/ErrorModal';
import { selectError } from '../../store/selectors/ui.selectors';
import { StatusBar } from 'expo-status-bar';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const error = selectError();
  return (
    <>
      <StatusBar style="auto" />
      {children}
      {error && <ErrorModal error={error} />}
    </>
  );
};

export default ErrorBoundary;
