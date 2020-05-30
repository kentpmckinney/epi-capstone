import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.scss';

class App extends React.Component {

  componentDidMount() {
    fetch('/src/components/food.txt', { mode: 'no-cors', redirect: 'error' })
      .then(r => r.text())
      .then(t => console.log(t))
      .catch(e => console.log(e));
  }

  render() {
    return (
      <div className="app">
        <div className="grid">
          <div className="header"><Header /></div>
          <div className="content-container">
            <div className="content"></div>
          </div>
          <div className="footer"><Footer /></div>
        </div>
      </div>
    );
  }

}

export default App;