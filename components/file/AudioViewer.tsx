const AudioViewer = ({
  file,
  type,
}: {
  file: any;
  type: string;
}) => {
  return (
    file && (
      <audio autoPlay controls>
        <source src={file} />
      </audio>
    )
  );
}

export default AudioViewer;