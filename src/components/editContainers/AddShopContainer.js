import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

function AddShopContainer (props) {
    return(
        <Card className='add-container'>
            <AddEditForm addingWhat={'Shop'}>
                <label className='add-form__label'>Address: 
                    <input className='add-form__input' type='text' name='address' maxLength='50'/>
                </label>
                <label className='add-form__label'>City: 
                    <input className='add-form__input' type='text' name='city' maxLength='15'/>
                </label>
            </AddEditForm>
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddShopContainer;