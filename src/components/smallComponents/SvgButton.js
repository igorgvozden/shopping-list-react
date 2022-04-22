import './SvgButton.css'

function SvgButton (props) {
    const classes = 'svg-button ' + props.className;

    const handleClick = () => {
        // general logic
        if(!props.clicked) return;
        //list related logic
        if (props.listName) props.clicked(props.listName, props.itemId)
        else props.clicked();
        
        // item related logic
        if (props.changeFormAction) props.changeFormAction('Edit');
        if (props.itemData) {
            props.collectDataToUpdate(props.itemData);
        };
    };

    return(
        <button className={classes} type='button' onClick={handleClick}>
            {props.source && <img className='svg-button__image' src={props.source} alt='button'></img>}
            <span className='svg-button__span'>{props.text? props.text : ''}</span>
        </button>
    );
};

export default SvgButton;