import './SvgButton.css'

function SvgButton (props) {
    const classes = 'svg-button ' + props.className;

    const handleClick = () => {
        console.log('clicked');
        if(!props.clicked) return;
        props.clicked();
    };

    return(
        <button className={classes} type='button' onClick={handleClick}>
            {props.source && <img className='svg-button__image' src={props.source} alt='button'></img>}
            <span className='svg-button__span'>{props.text? props.text : ''}</span>
        </button>
    );
};

export default SvgButton;