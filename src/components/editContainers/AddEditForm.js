import { useState, useEffect } from 'react';
import './AddEditForm.css';

function AddEditForm (props) {
    const [formData, setFormData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
       
        formData.id? props.sendHttp(props.prefilledItem.id, formData) : props.sendHttp(formData);
    };

    const collectInputs = (e) => {
        setFormData((prevState) => {
            return {...prevState, [e.target.name]: e.target.value};
        });   
    };

    useEffect(() => {
        const transfromPrefilled = () => {
            if (!props.prefilledItem.name) return;
            const { id, name, category, quantity } = props.prefilledItem;
            return {
                id,
                name,
                category: category._id,
                quantity
            };
        };

        props.prefilledItem? setFormData(transfromPrefilled()) : setFormData({});
    }, [props.prefilledItem]);

    return (
        <form className='add-form' onSubmit={handleSubmit} onChange={collectInputs}>
            <h2 className='add-form__title'>{props.doingWhat} {props.addingWhat}</h2>

            {props.children}

            <button className='add-form__submit' disabled={false} type='submit'>Submit {props.addingWhat}</button>
        </form>
    )
};

export default AddEditForm;