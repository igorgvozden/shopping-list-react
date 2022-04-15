import Card from './Card';
import SvgButton from './smallComponents/SvgButton';

import './Item.css';

import editIcon from '../images/create.svg';
import deleteIcon from '../images/trash.svg';

function Item (props) {
    return (
        <Card className='item'>
            <h3 className='item__title'>{props.name}</h3>
            <SvgButton source={editIcon}/>
            <SvgButton source={deleteIcon}/>
        </Card>
    );
};

export default Item;