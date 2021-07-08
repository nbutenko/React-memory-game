export default function Square(props) {
    return (
        <button onClick={() => props.openCard(props.emoji.id, props.emoji.content)} className={"card-button"}>{props.emoji.open ? props.emoji.content : ''}</button>
    )
}