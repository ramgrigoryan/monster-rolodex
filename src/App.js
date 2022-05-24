import { Component } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchWord: "",
    };
    console.log("constructor");
  }
  componentDidMount() {
    console.log("componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }
  onSearchChange = (event) => {
    this.setState(() => {
      let searchWord = event.target.value.toLowerCase();
      return { searchWord: searchWord };
    });
  };
  render() {
    console.log("render");
    const { onSearchChange } = this;
    const { monsters, searchWord } = this.state;
    let filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchWord);
    });
    return (
      <div className="App">
        <SearchBox onSearchChangeHandler={onSearchChange} className = "monster-search-box"  placeholder = "Monster name" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
