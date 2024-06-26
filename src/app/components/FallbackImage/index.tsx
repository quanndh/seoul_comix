"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface Props extends ImageProps {
  fallback?: string;
}
const FallbackImage: React.FC<Props> = ({
  fallback = "/logo.png",
  alt,
  src,
  ...props
}) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={(e) => setError(true)}
      src={error ? fallback : src}
      {...props}
    />
  );
};

export default FallbackImage;
