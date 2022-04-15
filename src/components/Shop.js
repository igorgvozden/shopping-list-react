import Card from './Card';
import './Shop.css';

function Shop (props) {
    return (
        <Card className='shop'>
            <h3 className='shop__title'>{props.name}</h3>
            <p className='shop__text'>{props.address}</p>
            <p className='shop__text'>{props.city}</p>
        </Card>
    )
};

export default Shop;