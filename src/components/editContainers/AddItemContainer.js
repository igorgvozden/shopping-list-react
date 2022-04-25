import { useState, useEffect } from "react";

import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

import useHttp from "../../hooks/useHttp";

function AddItemContainer (props) {
    const { isLoading, error, sendRequest: createItem } = useHttp();
    const [controlledItem, setControlledItem] = useState({})
    // console.log('we want to update,', props.itemToUpdate);

    
    
    /////////////////// http 
    const addItem = (formData) => {
        const itemConfig = {
            url: 'http://localhost:80/items',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Credentials': true,
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: formData
        };
        
        createItem(itemConfig, () => props.updateItems());
    };
    
    //////////////////

    useEffect(() => {
        if (props.itemToUpdate) setControlledItem(props.itemToUpdate)
    }, [props.itemToUpdate]);

    return(
        <Card className='add-container'>
            <AddEditForm 
                doingWhat={props.formAction} addingWhat={'Item'} 
                sendHttp={props.formAction === 'Add new' ? addItem : props.submitPatch}
                prefilledItem = {controlledItem}
            >
                <label className='add-form__label'>Name your Item: 
                    <input className='add-form__input' type='text' name='name' maxLength='15' required={true} defaultValue={controlledItem.name}/>
                </label>
                <label className='add-form__label'>How many of this one: 
                    <input className='add-form__input' type='number' name='quantity' max='10' min='1' defaultValue={controlledItem.quantity} required/>
                </label>
                <label className='add-form__label'>Choose item's category: 
                <select className='add-form__input' name='category' required >
                    {
                        controlledItem.name? 
                        <option value={controlledItem.category._id}>{controlledItem.category.name}</option> :
                        <option value=''>Select Category</option>
                    }
                    { props.categories.map((category, i) => <option key={i} value={category._id}>{category.name}</option>) }   
                </select>
                </label>
            </AddEditForm>
            {isLoading && <p>Please wait...</p>}
            {error && <p>{error}</p>}
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddItemContainer;