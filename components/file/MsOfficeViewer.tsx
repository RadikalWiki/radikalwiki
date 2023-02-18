import { useScreen } from 'hooks';
import { useEffect, useRef, useState } from 'react';

const MsOfficeViewer = ({ file }: { file: any }) => {
  const screen = useScreen();
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    const scroll =
      document.querySelector('#scroll') ?? document.scrollingElement;
    setHeight(`${(scroll?.scrollHeight ?? 0) - (screen ? 100 : 210)}px`);
  }, []);

  console.log(file);
  return (
    file && (
      <iframe
        width="100%"
        height={height}
        frameBorder="0"
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
          file
        )}`}
      />
    )
  );
}

export default MsOfficeViewer;