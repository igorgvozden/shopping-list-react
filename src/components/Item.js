import Card from './Card';
import SvgButton from './smallComponents/SvgButton';

import './Item.css';

import editIcon from '../images/create.svg';
import deleteIcon from '../images/trash.svg';

function Item (props) {

    const createItemData = () => {
        const data = {
            id: props.id,
            name: props.name,
            quantity: props.quantity,
            category: {...props.category}
        };
        return data;
    };

    return (
        <Card className='item'>
            <h3 className='item__title'>{props.name}</h3>
            <p className='item__text'>{props.category.name}</p>
            <SvgButton source={editIcon} 
                changeFormAction={props.changeFormAction} 
                clicked={props.editIconClick} 
                itemId={props.id}
                collectDataToUpdate={props.collectDataToUpdate}
                itemName={props.name}
                itemQuantity={props.quantity}
                itemCategory = {props.category}
                itemData = {createItemData()}
            />
            <SvgButton source={deleteIcon} clicked={() => props.submitDelete(props.id)}/>
        </Card>
    );
};

export default Item;