import React from 'react';
import { Grid } from 'vienna-ui';
import postStyles from './PostItems.modules.css';

function PostItem({ post, isEven }) {
  return (
    <Grid.Row 
        className={`postItem__${isEven ? "even" : "odd"}`}
        style={{width: '100%', marginLeft: 0}}
        >
      <Grid.Col size={3}>
        <div className="post-col" >{post.title}</div>
      </Grid.Col>
      <Grid.Col size={2}>
        <div className="post-col">{post.category}</div>
      </Grid.Col>
      <Grid.Col size={2}>
        <div className="post-col">${post.price}</div>
      </Grid.Col>
      <Grid.Col size={2}>
        <div className="post-col">{post.rating}</div>
      </Grid.Col>
      <Grid.Col size={2}>
        <div className="post-col">{post.weight} kg</div>
      </Grid.Col>
    </Grid.Row>
  );
}

export default PostItem;
