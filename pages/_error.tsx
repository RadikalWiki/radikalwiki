function Error({ name, message, stack }: any) {
  return (
    <>
      <p>An error occurred on client</p>
      <p>{`Name: ${name}`}</p>
      <p>{`Message: ${message}`}</p>
      <p>Stack:</p>
      {stack.split("\n").map((line: any, index: number) => (
        <p key={index}>{line}</p>
      ))}
    </>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  return { name: err?.name, message: err?.message, stack: err?.stack };
};

export default Error;
