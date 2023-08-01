import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import platform from 'platform';

const fallbackRender = ({
  error,
}: {
  error: { message: string; stack: string };
}) => {
  return (
    <div role="alert">
      <h3>Noget gik helt galt! 😔</h3>
      <p>
        Det vil være en kæmpe hjælp, hvis du vil sende følgende fejlbesked til{' '}
        <a href="mailto:niclas@overby.me">niclas@overby.me</a>:
      </p>
      <pre style={{ background: '#EDEDED', padding: '20px' }}>
        {`platform: ${platform}\n`}
        {`error: ${error.message}\n`}
        {`stack:\n${error.stack}`}
      </pre>
    </div>
  );
};

const ErrorBoundary = ({ children }: { children: JSX.Element[] }) => (
  <ReactErrorBoundary fallbackRender={fallbackRender}>
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;
