import React, { useState } from 'react';

// Full image URLs, paths under public/, and existing placeholder filenames all work.
export function imageSource(source = '') {
  if (/^https?:\/\//i.test(source)) return source;
  if (source.startsWith('/')) return `${process.env.PUBLIC_URL}${source}`;
  return `${process.env.PUBLIC_URL}/images/placeholders/${source}`;
}

export default function PortfolioImage({ source, fallback, alt, ...props }) {
  const [failedSource, setFailedSource] = useState(null);
  const image = source && failedSource !== source ? source : fallback;

  return (
    <img
      {...props}
      src={imageSource(image)}
      alt={alt}
      onError={image === source ? () => setFailedSource(source) : undefined}
    />
  );
}
