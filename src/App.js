import React, { useState, useEffect, useMemo } from 'react';
import { Grid, Input, Select } from 'vienna-ui';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        const validPosts = response.data.products.filter(post => 
          post.title !== undefined && 
          post.category !== undefined && 
          post.price !== undefined && 
          post.rating !== undefined && 
          post.weight !== undefined
        );
        setPosts(validPosts);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      const factor = sortOrder === 'asc' ? 1 : -1;
      if (typeof a[sortColumn] === 'string' && typeof b[sortColumn] === 'string') {
        return factor * a[sortColumn].localeCompare(b[sortColumn]);
      } else {
        return factor * (a[sortColumn] - b[sortColumn]);
      }
    });
  }, [filteredPosts, sortColumn, sortOrder]);

  return (
    <div className="App">
      <Input 
        placeholder="Search by title..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <Select 
        value={sortColumn} 
        onSelect={(e, data) => setSortColumn(data.value)} 
      >
        <Select.Option value="title">Title</Select.Option>
        <Select.Option value="category">Category</Select.Option>
        <Select.Option value="price">Price</Select.Option>
        <Select.Option value="rating">Rating</Select.Option>
        <Select.Option value="weight">Weight</Select.Option>
      </Select>
      <Select 
        value={sortOrder} 
        onSelect={(e, data) => setSortOrder(data.value)} 
      >
        <Select.Option value="asc">Ascending</Select.Option>
        <Select.Option value="desc">Descending</Select.Option>
      </Select>
      <Grid.Row>
        <Grid.Row>
          <Grid.Col size={2}><strong>Title</strong></Grid.Col>
          <Grid.Col size={2}><strong>Category</strong></Grid.Col>
          <Grid.Col size={1}><strong>Price</strong></Grid.Col>
          <Grid.Col size={1}><strong>Rating</strong></Grid.Col>
          <Grid.Col size={1}><strong>Weight</strong></Grid.Col>
        </Grid.Row>
        {sortedPosts.map((post) => (
          <Grid.Row key={post.id}>
            <Grid.Col size={2}>{post.title}</Grid.Col>
            <Grid.Col size={2}>{post.category}</Grid.Col>
            <Grid.Col size={1}>${post.price}</Grid.Col>
            <Grid.Col size={1}>{post.rating}</Grid.Col>
            <Grid.Col size={1}>{post.weight} kg</Grid.Col>
          </Grid.Row>
        ))}
      </Grid.Row>
    </div>
  );
}

export default App;
