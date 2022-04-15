import React, { useState, useEffect } from 'react';

import Card from './components/Card';
import List from './components/List';
import FilterForm from './components/smallComponents/FilterForm';
import AddButton from './components/smallComponents/AddButton';
import Loading from './components/smallComponents/Loading';

import ShopContainer from './components/ShopContainer';
import CategoryContainer from './components/CategoryContainer';
import ItemContainer from './components/ItemContainer';

import AddListContainer from './components/editContainers/AddListContainer';

import './App.css';

import useHttp from './hooks/useHttp';

function App () {
  const [addListForm, setAddListForm] = useState(false);
  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [items, setItems] = useState([]);

  ///////////////////////////////
  
  const getCategories = useHttp({url: 'http://localhost:3000/categories'}, (data) => setCategories(data.categories));
  const getShops = useHttp({url: 'http://localhost:3000/shops'}, (data) => setShops(data.shops));
  const getItems = useHttp({url: 'http://localhost:3000/items'}, (data) => setItems(data.items));

  ///////////////////////////////

  const { isLoading, error, sendRequest } = useHttp({url: 'http://localhost:3000'}, (data) => setLists(data.lists));

  useEffect(() => {
    sendRequest();
  }, []);
  
  console.log('just logging lists in app state', lists, categories)
  
  // FILTER LISTS

  const filterLists = (text) => {
    console.log(text);
    console.log('ovo imamo u state', lists);
    let filtered =lists.filter(list => list.name.toLowerCase().includes(text));
    console.log('ovo je filterovana lista', filtered);
    setFilteredList(filtered)
  };

  // RENDERS LOADING... TEXT WHILE FETCHING DATA
  const renderLists = () => {
    let listContent = <p>There are no lists.</p>
    if (isLoading) listContent =<Loading/>;
    if (error) listContent= <p>{error}</p>
    if (filteredLists.length > 0) {
      listContent = filteredLists.map(list => <List key={list._id} name={list.name} shop={list.shop.name} items={list.items}/>)
    }
    if (lists.length > 0) {
      listContent = lists.map(list => <List key={list._id} name={list.name} shop={list.shop.name} items={list.items}/>)
    };

    return listContent;
  };

  // EVENT HANDLERS
  const addButtonClick = () => {
    setAddListForm(true);
  };

  const cancelButtonClick = () => {
    setAddListForm(false);
  };

  // RENDERS LEFT (LIST) SIDE OF THE APP
  const renderListSide = () => {
    if (addListForm) return <AddListContainer cancelClicked={cancelButtonClick}/>;
    if (!addListForm) {
      return <Card className='left-card'>
        <FilterForm categories={categories} addFiltered={filterLists}/>
        {renderLists()}
        <AddButton text='List' clicked={addButtonClick}/>
      </Card>
    };
  };

  return (
    <div className='App'>
      {renderListSide()}
      <Card className='right-card'>
        <ShopContainer shops={shops} getShops={getShops}/>
        <CategoryContainer categories={categories} getCategories={getCategories}/>
        <ItemContainer items={items} getItems={getItems}/>
      </Card>
    </div>
  );
}

export default App;
