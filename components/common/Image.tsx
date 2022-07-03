import React, { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";
import { common, grey } from "@mui/material/colors";
import { BrokenImage } from "@mui/icons-material";
import { Box } from "@mui/system";

export default function Image({
  src,
  alt,
  onLoad,
  onError,
  animationDuration = 3000,
  aspectRatio = 1,
  ...image
}: {
  src: any;
  alt: any;
  layout?: any;
  onLoad?: Function;
  onError?: Function;
  animationDuration?: number;
  aspectRatio?: number;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleLoadImage = (e: any) => {
    setLoaded(true);
    setError(false);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleImageError = (e: any) => {
    if (src) {
      setError(true);
      if (onError) {
        onError(e);
      }
    }
  };

  const imageTransition = {
    opacity: loaded ? 1 : 0,
    filterBrightness: loaded ? 100 : 0,
    filterSaturate: loaded ? 100 : 20,
    transition: `
        filterBrightness ${
          animationDuration * 0.75
        }ms cubic-bezier(0.4, 0.0, 0.2, 1),
        filterSaturate ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1),
        opacity ${animationDuration / 2}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
  };

  return (
    <Box
      sx={{
        backgroundColor: common.white,
        paddingTop: `calc(1 / ${aspectRatio} * 100%)`,
        position: "relative",
      }}
    >
      {src && (
        <img
          {...image}
          src={src}
          alt={alt}
          ref={imageRef}
          style={{
            borderRadius: "10px",
            width: "100%",
            height: "100%",
            position: "absolute",
            objectFit: "inherit",
            top: 0,
            left: 0,
            ...imageTransition,
          }}
          onLoad={handleLoadImage}
          onError={handleImageError}
        />
      )}
      <Box
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {!loaded && !error && <CircularProgress size={48} />}
        {error && (
          <BrokenImage sx={{ width: 48, height: 48, color: grey[300] }} />
        )}
      </Box>
    </Box>
  );
}
