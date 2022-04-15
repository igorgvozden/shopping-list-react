import Card from '../Card';

import './FilterForm.css';

function FilterForm (props) {
    const {categories, addFiltered} = props;

    const collectShop = (event) => {
        event.preventDefault();
        let usersFilter = event.target.value;
        addFiltered(usersFilter);
    };

    return(
        <Card className='form-card'>
            <form className='form' onChange={collectShop}>
                <label className='form__label'>Filter by Shop:
                    <input className='form__input' type='text' name='shop' />
                </label>

                <label className='form__label'>Filter by Category:
                    <select className='form__input'  name='category'>
                        <option defaultValue></option>
                        {categories.map((category, i) => <option key={i}>{category.name}</option>)}
                    </select>
                </label>
            </form>
        </Card>
    )
};

export default FilterForm;