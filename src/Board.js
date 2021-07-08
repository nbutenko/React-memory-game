import Square from "./Square";

export default function Board(props) {
    return (
        <div className={"board"}>
            {props.cards.map(el => <Square emoji={el} key={el.id} openCard={props.openCard}/>)}
        </div>
    )
}