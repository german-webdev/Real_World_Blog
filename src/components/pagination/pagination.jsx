/* eslint-disable react/no-unused-prop-types */
/* eslint-disable dot-notation */
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { setPageNumber } from '../../store/slices/articles-slice';

import classes from './pagination.module.scss';

const MyPagination = () => {
  const { currentPage, articlesCount } = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  return (
    <div className={classes['pagination']}>
      <Pagination
        current={currentPage}
        currentDefault={1}
        total={articlesCount}
        pageSize={5}
        responsive
        showSizeChanger={false}
        onChange={(page) => dispatch(setPageNumber(page))}
      />
    </div>
  );
};

export default MyPagination;
