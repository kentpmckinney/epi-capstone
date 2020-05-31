import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.scss';
import ingredientList from './test.json';


class App extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="app">
        <div className="grid">
          <div className="header"><Header /></div>
          <div className="content-container">
            <div className="content">
              {ingredientList.map(i => <div className='ingredient' key={i[1]} id={i[1]}>{i[0]}</div>)}
            </div>
          </div>
          <div className="footer"><Footer /></div>
        </div>
      </div>
    );
  }

}

export default App;