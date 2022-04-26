import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";
import InfoModal from '../smallComponents/InfoModal';

import useHttp from "../../hooks/useHttp";
import SERVER_URL from "../../config";

function AddCategoryContainer (props) {
    const { isLoading, error, sendRequest: createCategory } = useHttp();

    /////////////////// http 
    const categoryConfig = {
        url: `${SERVER_URL}/categories`,
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
        createCategory(categoryConfig, () => [props.updateCategories(), props.cancelClicked()]);
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
                {isLoading && <InfoModal text={'Please wait ...'}/>}
                {error && <InfoModal text={error}/>}
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddCategoryContainer;