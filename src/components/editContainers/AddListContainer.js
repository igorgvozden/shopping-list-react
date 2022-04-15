import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

function AddListContainer (props) {
    const { items, shops } = props;

    return(
        <Card className='left-card'>
            <AddEditForm items={items} shops={shops} addingWhat={'List'}>
            <label className='add-form__label'>Select Shop: 
                <select className='add-form__input'>
                    <option>shop 1</option>
                </select>
            </label>
            <label className='add-form__label'>Add Items: 
                <select className='add-form__input'>
                    <option>item 1</option>
                </select>
            </label>
            </AddEditForm>
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddListContainer;