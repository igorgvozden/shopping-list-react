import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

import useHttp from "../../hooks/useHttp";

function AddListContainer (props) {
    const { items, shops } = props;

    const { isLoading, error, sendRequest } = useHttp();

    const createList = (formData) => {
        const listConfig = {
            url: 'http://localhost:80',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: formData
        };
        console.log(formData)
        sendRequest(listConfig, () => props.updateLists());
      };

    return(
        <Card className='left-card'>
            <AddEditForm items={items} shops={shops} doingWhat={'Add new'} addingWhat={'List'} sendHttp={createList}>
                <label className='add-form__label'>Name your List:
                    <input className='add-form__input' type='text' name='name' minLength={1} required/>
                </label>
            <label className='add-form__label'>Select Shop: 
                <select className='add-form__input' name='shop' required default=''>
                    <option value=''>Add Shop</option>
                    { props.shops.map((shop, i) => <option key={i} value={shop._id}>{shop.name}</option>) }
                </select>
            You will be able to add items to your List once you have created it.
            </label>
            </AddEditForm>
            {error && <p>{error}</p>}
            {isLoading && <p>Please Wait ...</p>}
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddListContainer;