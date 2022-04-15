import { useState, useEffect } from 'react';

import Item from './Item';
import Card from './Card';
import AddButton from './smallComponents/AddButton';
import AddItemContainer from './editContainers/AddItemContainer';

function ItemContainer (props) {
  const [addItemForm, setAddItemForm] = useState(false);
  const { isLoading, error, sendRequest } = props.getItems;

  const addButtonClick = () => {
    setAddItemForm(true);
  };

  const cancelButtonClick = () => {
    setAddItemForm(false);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const renderContainer = () => {
    if (addItemForm) return <AddItemContainer cancelClicked={cancelButtonClick}/>
    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>Getting Items {error}</p>
    if (!addItemForm) {
      return <Card className='container'>
                {props.items.map(item => <Item key={item._id} name={item.name} />)}
                <AddButton text='Item' clicked={addButtonClick}/>
              </Card>
    }
  };

  return(
    <>{ renderContainer() }</>
  )
};

export default ItemContainer;