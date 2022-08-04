export default function AudioViewer({ file, type }: { file: any, type: string }) {
  return (
    file && (
      <audio autoPlay controls>
        <source src={file} />
      </audio>
    )
  );
}

