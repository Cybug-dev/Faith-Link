import type { ChurchImage } from '../churchesData';

type PhotoProps = {
  image: ChurchImage;
  sizes: string;
  className?: string;
  eager?: boolean;
};

const WIDTHS = [480, 800, 1200, 1600];
const withWidth = (url: string, width: number) => `${url}?auto=format&fit=crop&q=75&w=${width}`;

// One image for mobile and desktop: srcSet picks the size, object-fit/position handle the crop.
export function Photo({ image, sizes, className, eager = false }: PhotoProps) {
  return (
    <img
      className={className}
      src={withWidth(image.url, 800)}
      srcSet={WIDTHS.map((width) => `${withWidth(image.url, width)} ${width}w`).join(', ')}
      sizes={sizes}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={{ objectPosition: image.position }}
    />
  );
}
