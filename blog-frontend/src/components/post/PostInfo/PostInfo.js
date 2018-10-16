import React from 'react';
import styles from './PostInfo.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PostInfo = () => (
  <div className={cx('post-info')}>
    <div className={cx('info')}>
      <h1>Title</h1>
      <div className={cx('tags')}>
        <a>#tag</a> <a>#tag</a> <a>#tag</a>
      </div>
      <div className={cx('date')}>Oct 29, 2018</div>
    </div>
  </div>
);

export default PostInfo;