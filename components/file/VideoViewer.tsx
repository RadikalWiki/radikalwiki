const VideoViewer = ({ file }: { file: any }) =>
  file && (
    <video autoPlay width="100%" controls>
      <source src={file} />
    </video>
  );

export default VideoViewer;
