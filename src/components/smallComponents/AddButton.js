import Card from '../Card';
import addCircle from '../../images/add-circle.svg'

import './AddButton.css';

function AddButton (props) {

    const handleClick = () => {
        if(!props.clicked) return;
        props.clicked();
        if (props.changeFormAction) props.changeFormAction('Add new');
        if (props.setItemToUpdate) props.setItemToUpdate({});
    };

    return (
        <Card className='add-button'>
            <div className='add-button__container' onClick={handleClick}>
                <img className='add-button__plus' src={addCircle} alt='add-circle img' />
                <p className='add-button__text'>add {props.text}</p>
            </div>
        </Card>
    )
};

export default AddButton;