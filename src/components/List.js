import Card from './Card';
import SvgButton from './smallComponents/SvgButton';

import removeIcon from '../images/close.svg';
import addIcon from '../images/add-circle.svg';

import './List.css';

function List (props) {
    return(
        <Card className='list'>
            <div className='list__subdiv'>
                <h2 className='list__name'>{props.name}</h2>
                <p className='list__shop-name'>{props.shop}</p>
            </div>
            <div className='list__subdiv'>
                {props.items.map(item => {
                    return <Card key={item._id} className='list__subdiv__items'>
                        <p className='list__subdiv__items-itemname'>{item.name}</p>
                        
                        <SvgButton source={removeIcon}/>
                    </Card>
                })}
                <SvgButton source={addIcon} text={'Add more Items to the List'}/>
            </div>
        </Card>
    )
};

export default List;
