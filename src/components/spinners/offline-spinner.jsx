import { Radio } from 'react-loader-spinner';
import './spinners.scss';

const Offline = () => {
  return (
    <div className="spinner">
      <Radio
        visible="true"
        height="80"
        width="80"
        ariaLabel="radio-loading"
        wrapperStyle={{}}
        wrapperClass="radio-wrapper"
      />
      <span className="spinner__message">Sorry, no internet connection available at the moment</span>
    </div>
  );
};

export default Offline;
