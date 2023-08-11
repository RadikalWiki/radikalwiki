const PdfViewer = ({ file }: { file?: string }) => (
  <div style={{ width: '100%', height: '75vh' }}>
    <iframe frameBorder="0" src={file} width="100%" height="100%" />
  </div>
);

export default PdfViewer;
