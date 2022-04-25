import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

import useHttp from "../../hooks/useHttp";
import SERVER_URL from "../../config";

function AddShopContainer (props) {
    const { isLoading, error, sendRequest: createShop } = useHttp();

    /////////////////// http 
    const shopConfig = {
        url: `${SERVER_URL}/shops`,
        method: 'POST',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: {}
    };
    //////////////////

    const submitShop = (formData) => {
        shopConfig.body = formData;
        createShop(shopConfig, () => props.updateShops());
    };

    return(
        <Card className='add-container'>
            <AddEditForm doingWhat={'Add new'} addingWhat={'Shop'} sendHttp={submitShop}>
                <label className='add-form__label'>Name your Shop: 
                    <input className='add-form__input' type='text' name='name' maxLength='15' required={true}/>
                </label>
                <label className='add-form__label'>Address: 
                    <input className='add-form__input' type='text' name='address' maxLength='50'/>
                </label>
                <label className='add-form__label'>City: 
                    <input className='add-form__input' type='text' name='city' maxLength='15'/>
                </label>
            </AddEditForm>
            {isLoading && <p>Please wait...</p>}
            {error && <p>{error}</p>}
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddShopContainer;