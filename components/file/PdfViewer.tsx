export default function PdfViewer({ file }: { file: any }) {
  return (
    <div style={{ width: '100%', height: '75vh' }}>
      <object
        data={file}
        type="application/pdf"
        width="100%"
        height="100%"
        onLoad={(e) => console.log(e)}
      />
    </div>
  );
}
