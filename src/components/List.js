import { useState, useEffect } from 'react';

import Card from './Card';
import SvgButton from './smallComponents/SvgButton';

import AddToListForm from './smallComponents/AddToListForm';
import removeIcon from '../images/close.svg';

import './List.css';

function List (props) {
    const [filteredItems, setFilteredItems] = useState([]);
    
    const { name, shop, items, dbItems } = props;

    const filterItems = (e) => {
        const filter = e.target.value;
        const filtered = items.filter(item => item.category.name === filter);

        if(filter === '') {
            setFilteredItems(items);
        } else {
            setFilteredItems(filtered)
        }; 
    };

    useEffect(() => {
        setFilteredItems(items)
    }, [dbItems, items]);

    return(
        <Card className='list'>
            <div className='list__subdiv'>
                <h2 className='list__name'>{name}</h2>
                <p className='list__shop-name'>{shop}</p>
            </div>
            <div className='list__subdiv'>
                { items.length > 0 &&
                    <label className='list__label'>Show Category: 
                    <select className='list__input' name='category' onChange={filterItems}>
                        <option  value=''>All</option>
                         { items.map((item, i) => <option key={i} value={item.category.name}>{item.category.name}</option>) } 
                    </select>
                </label>
                }
                {items.length === 0 && <p className='list__info'>This List is empty.<br/>Try adding some items.</p>}
                {filteredItems.map((item, i) => {
                    return <Card key={i} className='list__subdiv__items'>
                        <p className='list__subdiv__items-itemname'>{item.name}
                            <span className='list__subdiv__items-category'>({item.quantity})</span>
                            <span className='list__subdiv__items-category'>{item.category.name}</span>
                        </p>
                        <SvgButton source={removeIcon} clicked={props.removeItem} listName={name} itemId={item._id}/>
                    </Card>
                })}
                <AddToListForm dbItems={dbItems} listName={name} sendHttp={props.submitItem}/>
            </div>
        </Card>
    )
};

export default List;
