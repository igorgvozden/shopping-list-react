import Card from './Card';
import './Category.css';

function Category (props) {
    return (
        <Card className='category'>
            <h3 className='category__title'>{props.name}</h3>
            <p className='category__text'>{props.description}</p>
        </Card>
    )
};

export default Category;