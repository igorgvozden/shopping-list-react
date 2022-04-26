import './InfoModal.css';

function InfoModal (props) {
    const { text } = props;
    const classes = props.className + ' modal-info-text';

    return (
        <p className={classes}>{ text }</p>
    );
};

export default InfoModal;