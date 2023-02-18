const AudioViewer = ({ file, type }: { file: any; type: string }) =>
  file && (
    <audio autoPlay controls>
      <source src={file} />
    </audio>
  );

export default AudioViewer;
