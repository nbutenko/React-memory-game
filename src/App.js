import './App.css';
import Board from "./Board";
import {useEffect, useState} from "react";

function App() {
    const emoji = ['😎', '👀', '✔', '❤', '🐖', '🎗']
    const [cards, setCards] = useState([]);
    const [history, setHistory] = useState([]);
    const [result, setResult] = useState(false);

    const openCard = (cardId, content) => {
        let tempArr = cards.map(el => el.id === cardId ? {...el, open: true} : el);

        let tempHistoryArr = [...history];
        tempHistoryArr.push(content);
        setHistory(tempHistoryArr);

        setCards(tempArr);
    }

    const checkContent = () => {
       if(history[history.length-1] !== history[history.length-2]) {
           const tempCards = cards.map(el => el.content === history[history.length-1]
                                            || el.content === history[history.length-2] ? {...el, open: false} : el);
           setCards(tempCards);
       }
    }

    useEffect( () => {
        if(history.length && !(history.length % 2)) {
            setTimeout(() => checkContent(), 1000)
        }
    }, [history])

    useEffect(() => {
        if(history.length > 14) {
            checkResults();
        }
    }, [history])

    const checkResults = () => {
        if(cards.filter(el => el.open === false).length === 0) {
            setResult(true);
            setCards([]);
        }
    }

    const fillArray = (arr) => {
        for(let i = 1; i<=12; i++) {
            arr.push({
                id: i,
                open: false,
                content: ''
            })
        }
        return arr;
    }

    const fillTable = () => {
        let tempArr = [];
        fillArray(tempArr);

        for(let i = 0; i<emoji.length; i++) {
            for(let k=0; k<2; k++) {
                let random = Math.floor(Math.random()*12);
                while(tempArr[random].content !== '') {
                    random = Math.floor(Math.random()*12);
                }
                tempArr[random].content = emoji[i];
            }
        }
        setCards(tempArr);
    }

  return (
    <div className="App">
        <button onClick={fillTable} disabled={cards.length}>Start</button>
        <Board cards={cards} openCard={openCard}/>
        {result && <h3>You passed the test using {history.length / 2} steps</h3>}
    </div>
  );
}

export default App;
