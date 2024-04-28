import { CSSProperties } from 'react';

interface LoaderProps {
  height?: CSSProperties['height'];
}

const Loader = ({ height = '100vh' }: LoaderProps) => (
  <div style={{ height, display: 'grid', placeItems: 'center' }}>
    <div className="spinner-border" style={{ width: 50, height: 50, fontSize: 30 }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loader;
