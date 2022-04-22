import { useState } from 'react';

import Category from './Category';
import Card from './Card';
import AddButton from './smallComponents/AddButton';

import AddCategoryContainer from './editContainers/AddCategoryContainer';

function CategoryContainer (props) {
  const [addCategoryForm, setAddCategoryForm] = useState(false);

  const addButtonClick = () => {
    setAddCategoryForm(true);
  };

  const cancelButtonClick = () => {
    setAddCategoryForm(false);
  };

  const renderContainer = () => {
    if (addCategoryForm) return <AddCategoryContainer cancelClicked={cancelButtonClick} updateCategories={props.updateCategories}/>
    if (!addCategoryForm) {
      return <Card className='container'>
                <h2 className='container__title'>Categories</h2>
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