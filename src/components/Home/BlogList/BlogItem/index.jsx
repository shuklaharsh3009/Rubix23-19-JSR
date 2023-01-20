import React from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    description1,
    title,
    cover,
    category,
    id,
  },
}) => {
  return (
    <Link className='blogItem-link' to={`/blog/${id}`}>
      <div className='blogItem-wrap'>
        <img className='blogItem-cover' src={cover} alt='cover' />
        <Chip label={category} />
        <h3>{title}</h3>
        <p className='blogItem-desc'>{description1}</p>
      </div>
    </Link>
    
  );
};

export default BlogItem;
