import React from 'react';
import PostItem from '../PostItem/PostItem';
import { Grid } from 'vienna-ui';
import controlStyles from './PostList.modules.css';

function PostList({ posts }) {
  return (
    <Grid.Row 
    align='center' 
    style={{width: '100%', marginLeft: 0}}
    >
      <Grid.Col className='grid__row__center' size={3}>Title</Grid.Col>
      <Grid.Col className='grid__row' size={2}>Category</Grid.Col>
      <Grid.Col className='grid__row' size={2}>Price</Grid.Col>
      <Grid.Col className='grid__row' size={2}>Rating</Grid.Col>
      <Grid.Col className='grid__row' size={2}>Weight</Grid.Col>
      {posts.map((post, index) => (
        <PostItem key={post.id} post={post} isEven={index % 2 === 0} />
      ))}
    </Grid.Row>
  );
}

export default PostList;
