import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Item } from './model/item';
import DraggableList from './DraggableList';

const items: Array<Item> = [
  { name: 'compact', commented: false },
  { name: 'takeWhile', commented: false },
  { name: 'filter', commented: true },
  { name: 'skip(1)', commented: false },
  { name: 'shareReply', commented: true }
]

function App() {
  return (
    <DraggableList items={items} />
  );
}

export default App;
