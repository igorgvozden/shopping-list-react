import React, { useState, useEffect } from 'react';

import Card from './components/Card';
import FilterForm from './components/smallComponents/FilterForm';
import AddButton from './components/smallComponents/AddButton';
import Loading from './components/smallComponents/Loading';

import ListContainer from './components/ListContainer';
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
  const [shopFilter, setShopFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [items, setItems] = useState([]);

  ///////////////////////////////
  
  const { sendRequest: getCategories} = useHttp();
  const updateCategories = () => getCategories({url: 'http://localhost:3000/categories'}, (data) => setCategories(data.categories));

  const { sendRequest: getShops} = useHttp();
  const updateShops = () => getShops({url: 'http://localhost:3000/shops'}, (data) => setShops(data.shops));

  const { sendRequest: getItems} = useHttp();
  const updateItems = () => getItems({url: 'http://localhost:3000/items'}, (data) => setItems(data.items));

  const { isLoading, error, sendRequest: getLists } = useHttp();
  const updateLists = () => getLists({url: 'http://localhost:3000'}, (data) => setLists(data.lists));

  ///////////////////////////////

  useEffect(() => {
    getShops({url: 'http://localhost:3000/shops'}, (data) => setShops(data.shops));
    getCategories({url: 'http://localhost:3000/categories'}, (data) => setCategories(data.categories));
    getLists({url: 'http://localhost:3000'}, (data) => setLists(data.lists));
    getItems({url: 'http://localhost:3000/items'}, (data) => setItems(data.items));
  }, [getLists, getShops, getCategories, getItems]);
  
  // FILTER LISTS
  const filterLists = (text) => { 
    let filtered = lists.filter(list => list.shop.name.includes(text));
    setFilteredList(filtered);
    if (text === '' || !text) {
      setShopFilter('');
    } else setShopFilter(text);
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
    
    if (error) return <p>{error}</p>
    if (addListForm) return <AddListContainer cancelClicked={cancelButtonClick} shops={shops} updateLists={updateLists}/>;
    if (!addListForm) {
      return <Card className='left-card'>
        <FilterForm categories={categories} shops={shops} addFiltered={filterLists} />
        <h2>Lists</h2>
        {isLoading && <Loading/>}
        <ListContainer
          dbLists={lists} 
          dbShops={shops} 
          dbItems={items} 
          dbCategories={categories} 
          updateLists={updateLists}
          filteredLists={filteredLists}
          shopFilter={shopFilter}
          getLists={getLists}
        />

        <AddButton text='List' clicked={addButtonClick}/>
      </Card>
    };
  };

  return (
    <div className='App'>
      {renderListSide()}

      <Card className='right-card'>
        <ShopContainer shops={shops} getShops={getShops} updateShops={updateShops}/>
        <CategoryContainer categories={categories} getCategories={getCategories} updateCategories={updateCategories}/>
        <ItemContainer items={items} getItems={getItems} updateItems={updateItems} updateLists={updateLists} categories={categories}/>
      </Card>
    </div>
  );
}

export default App;
