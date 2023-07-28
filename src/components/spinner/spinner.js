import { Space, Spin } from 'antd';
import './spinner.css';

const Preloader = () => {
  return (
    <div className="spinner">
      <Space size="middle">
        <Spin size="large" className="spinner-in" />
      </Space>
    </div>
  );
};

export default Preloader;
