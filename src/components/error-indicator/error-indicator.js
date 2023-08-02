import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import './error-indicator.scss';

const ErrorIndicator = () => {
  const { errorMessage } = useSelector((state) => state.articles);

  return (
    <Stack sx={{ width: '50%', marginInline: 'auto' }} spacing={2}>
      <Alert variant="filled" severity="error">
        <AlertTitle sx={{ fontSize: '18px' }}>Error</AlertTitle>
        {errorMessage || 'Oops! Something went wrong. Please try again later.'}
      </Alert>
    </Stack>
  );
};

export default ErrorIndicator;
