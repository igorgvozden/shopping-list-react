import Card from "../Card";
import SvgButton from "../smallComponents/SvgButton";
import AddEditForm from "./AddEditForm";

function AddItemContainer (props) {
    return(
        <Card className='add-container'>
            <AddEditForm addingWhat={'Item'}>
                
            </AddEditForm>
            <SvgButton clicked={props.cancelClicked} text='Cancel' className='svg-button--cancel'/>
        </Card>
    );
};

export default AddItemContainer;