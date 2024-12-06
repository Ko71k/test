import React, { useState, useEffect, useMemo } from 'react';
import { Input, Select } from 'vienna-ui';
import axios from 'axios';
import PostList from './PostList/PostList';
import styles from './App.modules.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('Sort by');
  const [sortOrder, setSortOrder] = useState('In order');

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
      const factor = sortOrder === 'Ascending' ? 1 : -1;
      if (typeof a[sortColumn] === 'string' && typeof b[sortColumn] === 'string') {
        return factor * a[sortColumn].localeCompare(b[sortColumn]);
      } else {
        return factor * (a[sortColumn] - b[sortColumn]);
      }
    });
  }, [filteredPosts, sortColumn, sortOrder]);

  return (
    <div className="App">
      <h1>Product List</h1>
      <div className="controls">
        <Input 
          className="search-input"
          placeholder="Search by title..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <div className="controls-container">
        <Select 
          className="sort-select"
          value={sortColumn} 
          onSelect={(e, data) => setSortColumn(data.value)} 
        >
          <Select.Option value="Sort by" disabled>Sort by</Select.Option>
          <Select.Option value="title">Title</Select.Option>
          <Select.Option value="category">Category</Select.Option>
          <Select.Option value="price">Price</Select.Option>
          <Select.Option value="rating">Rating</Select.Option>
          <Select.Option value="weight">Weight</Select.Option>
        </Select>
        <Select 
          className="sort-select"
          value={sortOrder} 
          onSelect={(e, data) => setSortOrder(data.value)} 
        >
          <Select.Option value="In order" disabled>In order</Select.Option>
          <Select.Option value="Ascending">Ascending</Select.Option>
          <Select.Option value="Descending">Descending</Select.Option>
        </Select>
      </div>
      <PostList posts={sortedPosts} />
    </div>
  );
}

export default App;
