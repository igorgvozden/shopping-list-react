import { useState, useEffect } from 'react';

import Category from './Category';
import Card from './Card';
import AddButton from './smallComponents/AddButton';

import AddCategoryContainer from './editContainers/AddCategoryContainer';

function CategoryContainer (props) {
  const [addCategoryForm, setAddCategoryForm] = useState(false);

  const { isLoading, error, sendRequest } = props.getCategories;

  const addButtonClick = () => {
    setAddCategoryForm(true);
  };

  const cancelButtonClick = () => {
    setAddCategoryForm(false);
  };
  
  useEffect(() => {
    sendRequest();
  }, []);

  const renderContainer = () => {
    if (addCategoryForm) return <AddCategoryContainer cancelClicked={cancelButtonClick}/>
    if (isLoading) return <p>Loading ...</p>
    if (error) return <p>Getting Categories {error}</p>
    if (!addCategoryForm) {
      return <Card className='container'>
                {props.categories.map(category => <Category key={category._id} name={category.name} description={category.description}/>)}
                <AddButton text='Category' clicked={addButtonClick}/>
              </Card>
    }
  };

  return(
      <>{renderContainer()}</>
  );
};

export default CategoryContainer;