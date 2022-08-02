export default function VideoViewer({ file }: { file: any }) {
  return (
    file && (
      <video width="100%" controls>
        <source src={file} type="video/mp4" />
      </video>
    )
  );
}
