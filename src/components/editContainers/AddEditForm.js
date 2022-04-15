import './AddEditForm.css';

function AddEditForm (props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submited')
    };

    return (
        <form className='add-form'>
            <h3 className='add-form__title'>Add New {props.addingWhat}</h3>
            <label className='add-form__label'>Name your {props.addingWhat}: 
                <input className='add-form__input' type='text' name='name' maxLength='15'/>
            </label>

            {props.children}

            <button onClick={handleSubmit} className='add-form__submit' type='submit'>Save</button>
        </form>
    )
};

export default AddEditForm;