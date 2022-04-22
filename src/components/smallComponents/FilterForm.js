import Card from '../Card';

import './FilterForm.css';

function FilterForm (props) {
    const { shops, addFiltered } = props;

    const collectShop = (event) => {
        event.preventDefault();
        let usersFilter = event.target.value;
        addFiltered(usersFilter);
    };

    return(
        <Card className='form-card'>
            <form className='form'>
                <label className='form__label'>Filter your Lists by Shop:
                    <select className='form__input'  name='shop' onChange={collectShop}>
                        <option defaultValue value=''>All</option>
                        {shops.map((shop, i) => <option key={i}>{shop.name}</option>)}
                    </select>
                </label>
            </form>
        </Card>
    )
};

export default FilterForm;