import logo from './logo.svg';
import './App.css';
import {useEffect,useState, useRef} from 'react'
import axios from 'axios';
import Word from './components/Word';

function App() {
  const [wordList, setWordList] = useState([]);
  const [word, setword] = useState("");
  const input1 = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    axios.get('https://wordapp-backend-service.herokuapp.com/all-words')
    .then(res => {
      setWordList(res.data);
      console.log(res.data);
      input.current.focus();
    })
    
  }, []);

var handleChange = function(e) {
  setword(e.target.value, () => {
    e.target.value = "";
  });
}

var saveWord = function (){
  if(word!= "") {
  axios.post("https://wordapp-backend-service.herokuapp.com/word", {
    word: word
  })
  .then(res => {
      setword("");
      getAllWords();
  })
}
}

  var getAllWords = function() {
    axios.get('https://wordapp-backend-service.herokuapp.com/all-words')
    .then(res => {
      setWordList(res.data);
      console.log(res.data);
    })
  }

  var deleteWord = function(id) {
    axios.post("https://wordapp-backend-service.herokuapp.com/delete", {
    _id: id
  })
  .then(result => {
    getAllWords();
  })
  }

  var updateFunction = function(id, word) {
    var input = prompt ("Update This Word", "");
    if(input!=null && input!="" && input!=word) {
        axios.post("https://wordapp-backend-service.herokuapp.com/update", {
        _id: id,
        word: input
      })
      .then(result => {
        getAllWords();
      })
    }
  }

  return (
    <div className="App">
      <div className='addWord'>
        <input type="text" onChange={handleChange} value={word} className="input" ref={input}></input>
        <button onClick={saveWord} className="addBtn">Add Word</button>
      </div>
      <div className='all__words'>

        {
          wordList.map( (word) => (
            <Word word={word} deleteFunction = {deleteWord} updateFunction ={updateFunction} key={word._id}></Word>
          ))
        }
      </div>
    </div>
  );
}

export default App;
