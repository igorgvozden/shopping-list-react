import { useState } from 'react';

import Shop from './Shop';
import Card from './Card';
import AddButton from './smallComponents/AddButton';
import AddShopContainer from './editContainers/AddShopContainer';

function ShopContainer (props) {
  const [addShopForm, setAddShopForm] = useState(false);
  
  const addButtonClick = () => {
    setAddShopForm(true);
  };

  const cancelButtonClick = () => {
    setAddShopForm(false);
  };

  const renderContainer = () => {
    if (addShopForm) return <AddShopContainer cancelClicked={cancelButtonClick} updateShops={props.updateShops}/>
    if (!addShopForm) {
      return <Card className='container'>
                <h2 className='container__title'>Shops</h2>
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