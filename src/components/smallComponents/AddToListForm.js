import { useState } from 'react';

import './AddToListForm.css';

function AddToListForm (props) {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.listName = props.listName;
        console.log(formData);
        props.sendHttp(formData);   
    };

    const collectData = (e) => {
        setFormData((prevState) => {
            return {...prevState, [e.target.name]: e.target.value};
        });
    };

    return(
        <form className='add-item__form' onSubmit={handleSubmit} onChange={collectData}>
            <p className='add-item__text'>Add item to the List</p>
            <select className='add-item__input' name='itemId' required default={1}>
                <option value=''>Choose Item</option>
                { props.dbItems.map((item, i) => <option key={i} value={item._id} required>{item.name}</option>) }
            </select>
           
            <button className='add-item__submit' type='submit'>Add</button>
        </form>
    )
}

export default AddToListForm;