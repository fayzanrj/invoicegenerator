// Props
interface LoaderProps {
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ color = "#ffffff" }) => {
  return (
    <div className="CENTER">
      <svg className="loaderSvg" viewBox="25 25 50 50">
        <circle
          className="circle"
          style={{ stroke: color }}
          r="20"
          cy="50"
          cx="50"
        ></circle>
      </svg>
    </div>
  );
};

export default Loader;
