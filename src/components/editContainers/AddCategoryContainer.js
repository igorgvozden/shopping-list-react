import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

function AddCategoryContainer (props) {
    return(
        <Card className='add-container'>
            <AddEditForm addingWhat={'Category'}>
                <label className='add-form__label'>Add short description: 
                    <input className='add-form__input' type='text' name='description' maxLength='50'/>
                </label>
            </AddEditForm>
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddCategoryContainer;