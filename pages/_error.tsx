const Error = ({ name, message, stack }: any) => (
  <>
    <p>An error occurred on client</p>
    <p>{`Name: ${name}`}</p>
    <p>{`Message: ${message}`}</p>
    <p>Stack:</p>
    {stack?.split('\n').map((line: any, index: number) => (
      <p key={index}>{line}</p>
    ))}
  </>
);

// eslint-disable-next-line functional/immutable-data
Error.getInitialProps = ({ res, err }: any) => ({
  name: err?.name,
  message: err?.message,
  stack: err?.stack,
});

export default Error;
