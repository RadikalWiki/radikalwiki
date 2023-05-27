const PdfViewer = ({ file }: { file?: string }) => (
  <div style={{ width: '100%', height: '75vh' }}>
    <object data={file} type="application/pdf" width="100%" height="100%" />
  </div>
);

export default PdfViewer;
