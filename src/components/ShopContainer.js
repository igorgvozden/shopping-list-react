import { useState, useEffect } from 'react';

import Shop from './Shop';
import Card from './Card';
import AddButton from './smallComponents/AddButton';
import AddShopContainer from './editContainers/AddShopContainer';

function ShopContainer (props) {
  const [addShopForm, setAddShopForm] = useState(false);
  const { isLoading, error, sendRequest } = props.getShops;
  
  const addButtonClick = () => {
    setAddShopForm(true);
  };

  const cancelButtonClick = () => {
    setAddShopForm(false);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const renderContainer = () => {
    if (addShopForm) return <AddShopContainer cancelClicked={cancelButtonClick}/>
    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>Getting Shops {error}</p>
    if (!addShopForm) {
      return <Card className='container'>
                 {props.shops.map(shop => <Shop key={shop._id} name={shop.name} address={shop.address} city={shop.city}/>)}
                <AddButton text='Shop' clicked={addButtonClick}/>
              </Card>
    }
  };
  return(
    <>{renderContainer()}</>
  )
};

export default ShopContainer;