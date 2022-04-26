import { useState } from 'react';

import Item from './Item';
import Card from './Card';
import AddButton from './smallComponents/AddButton';
import AddItemContainer from './editContainers/AddItemContainer';

import useHttp from '../hooks/useHttp';
import httpRequest from '../hooks/httpRequest';

function ItemContainer (props) {
  const [addItemForm, setAddItemForm] = useState(false);
  const [formAction, setFormAction] = useState('Add new');
  const [itemToUpdate, setItemToUpdate] = useState({});

  const { isLoading, error, sendRequest: handleRequest } = useHttp();

  ////////////////////////////// http

  const submitPatch = (itemId, formData) => {
    httpRequest(`items/${itemId}`, 'PATCH', formData, handleRequest, ()=>[props.updateItems(), props.updateLists(), cancelButtonClick()]);
    // const updateItemConfig = {
    //   url: `http://localhost:3000/items/${itemId}`,
    //   method: 'PATCH',
    //   headers: {
    //     'Access-Control-Allow-Credentials': true,
    //     'Content-Type': 'application/json'
    //   },
    //   credentials: 'include',
    //   body: formData
    // };
    // console.log(updateItemConfig, formData);
    // handleRequest(updateItemConfig, () => props.updateItems());
  };

  

  const submitDelete = (itemId) => {
    httpRequest(`items/${itemId}`, 'DELETE', {}, handleRequest, ()=>[props.updateItems(), props.updateLists()]);

    // const deleteItemConfig = {
    //   url: `http://localhost:3000/items/${itemId}`,
    //   method: 'DELETE'
    // };

    // handleRequest(deleteItemConfig, () => [props.updateItems(), props.updateLists()]); 
  };

  /////////////////////////////

  const addButtonClick = () => {
    setAddItemForm(true);
  };

  const cancelButtonClick = () => {
    setAddItemForm(false);
  };

  const renderContainer = () => {
    if (addItemForm) {
      return (
        <AddItemContainer 
          cancelClicked = {cancelButtonClick} 
          updateItems = {props.updateItems} 
          categories = {props.categories}
          submitPatch = {submitPatch}
          formAction = {formAction}
          itemToUpdate = {itemToUpdate}
        />
      );
    };

    if (!addItemForm) {
      return <Card className='container'>
        <h2 className='container__title'>Items</h2>
        {props.items.map(item => 
          <Item 
            key = {item._id} 
            id = {item._id}
            name = {item.name}
            quantity = {item.quantity}
            category = {item.category}
            editIconClick = {addButtonClick}
            submitDelete = {submitDelete}
            changeFormAction={setFormAction}
            collectDataToUpdate={setItemToUpdate}
          />
        )}
        {isLoading && <p>Please wait...</p>}
        {error && <p>{error}</p>}
        <AddButton text='Item' clicked={addButtonClick} changeFormAction={setFormAction} setItemToUpdate={setItemToUpdate}/>
      </Card>
    };
  };

  return(
    <>{ renderContainer() }</>
  )
};

export default ItemContainer;