import { Rings } from 'react-loader-spinner';
import './spinners.scss';

const Preloader = () => {
  return (
    <div className="spinner">
      <Rings
        height="80"
        width="80"
        color="#52C41A"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Preloader;
