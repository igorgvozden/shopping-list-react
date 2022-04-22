import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

import useHttp from "../../hooks/useHttp";

function AddCategoryContainer (props) {
    const { isLoading, error, sendRequest: createCategory } = useHttp();

    /////////////////// http 
    const categoryConfig = {
        url: 'http://localhost:3000/categories',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: {}
    };
    //////////////////

    const submitCategory = (formData) => {
        categoryConfig.body = formData;
        createCategory(categoryConfig, () => props.updateCategories());
    };

    return(
        <Card className='add-container'>
            <AddEditForm doingWhat={'Add new'} addingWhat={'Category'} sendHttp={submitCategory}>
                <label className='add-form__label'>Name your Category: 
                    <input className='add-form__input' type='text' name='name' maxLength='15' required={true}/>
                </label>
                <label className='add-form__label'>Add short description: 
                    <input className='add-form__input' type='text' name='description' maxLength='50' required={true}/>
                </label>
            </AddEditForm>
                {isLoading && <p>Please wait...</p>}
                {error && <p>{error}</p>}
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddCategoryContainer;