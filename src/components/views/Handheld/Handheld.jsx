import React from 'react';
import { v4 } from 'uuid';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import Data from '../../../data/Data.js';
import Header from './Header';
import Footer from './Footer';
import searchIcon from './search.svg';
import menuIcon from './menu.svg';
import totalIcon from './total.svg';

class Handheld extends React.Component {
  constructor(props) {
    // localStorage.clear()

    super(props);
    this.ingredients = <div>
      {Data.ingredients.map(i => <div className='ingredient' key={i[1]} onClick={
        () => { this.onIngredientClick(i[1]) }
      }>{i[0]}</div>)}
    </div>
    this.state = { selectedFoodList: [] };
  }

  componentDidMount = () => {
    const state = window.localStorage.getItem('state');
    if (state) { this.setState(JSON.parse(state)) }
  }

  componentDidUpdate = () => {
    if (this.state) { window.localStorage.setItem('state', JSON.stringify(this.state)); }
  }

  footer = () => {
    return (
      <Footer links={[
        { name: 'Search', img: { searchIcon }, to: '/' },
        { name: 'Menu', img: { menuIcon }, to: '/menu' },
        { name: 'Totals', img: { totalIcon }, to: '/totals' }
      ]}>
      </Footer>
    )
  }

  searchHeader = () => {
    return (
      <Header>
        <div className="tab-left">Search</div>
        <div className="tab-right">Browse</div>
        <div className="header-content">
          <input /><button>Search</button>
        </div>
      </Header>
    )
  }

  menuHeader = () => {
    return (
      <Header>
        <div className="tab-left">Plan</div>
        <div className="tab-right">Track</div>
      </Header>
    )
  }

  totalsHeader = () => {
    return (
      <Header>
        <div className="tab-left">Totals</div>
      </Header>
    )
  }

  onIngredientClick = fdcId => {
    this.setState({ selectedFoodList: [...this.state.selectedFoodList, { fdcId, qty: 100, unit: 'g', id: v4() }] });
  }

  onUnitChange = id => {

  }

  onQuantityChange = event => {
    const id = event.target.id;
    const qty = event.target.value;
    this.setState({ selectedFoodList: [...this.state.selectedFoodList.filter(i => i.id !== id), { ...this.state.selectedFoodList.filter(i => i.id === id)[0], qty: qty }] });
  }

  showTotals = () => {
    const totals = Data.calculateTotals(this.state.selectedFoodList) || [];
    let output = []
    for (let i = 1; i < totals.length; i++) {
      output.push(
        <div key={`totals-${i}`}>
          {`${Object.keys(totals[i])[0]}: ${Object.values(totals[i])[0]}${Data.getUnit(Object.keys(totals[i])[0])}`}
        </div>
      )
    }
    return output;
  }

  unitList = (selectedUnit, onChangeCallback) => {
    return (
      <select defaultValue={selectedUnit} onChange={onChangeCallback}>
        {Data.getAllUnits().map(unit => <option key={unit} value={unit}>{unit}</option>)}
      </select>
    )
  }

  render() {
    console.log(this.state.selectedFoodList)
    return (
      <div className="grid">
        <MemoryRouter>
          <Switch>
            <Route path='/' exact>
              <div className="header">{this.searchHeader()}</div>
              <div className="content-container">
                <div className="content">{this.ingredients}</div>
              </div>
              <div className="footer">{this.footer()}</div>
            </Route>
            <Route path='/menu' exact>
              <div className="header">{this.menuHeader()}</div>
              <div className="content-container">
                <div className="content">
                  {this.state.selectedFoodList.map(item =>
                    <div key={item.id}>
                      {Data.ingredients.filter(i => i[1] === item.fdcId)[0][0]} <input id={item.id} defaultValue={item.qty} onChange={this.onQuantityChange} /> {this.unitList(item.unit, () => { this.onUnitChange(item.id) })}
                    </div>)}
                </div>
              </div>
              <div className="footer">{this.footer()}</div>
            </Route>
            <Route path='/totals' exact>
              <div className="header">{this.totalsHeader()}</div>
              <div className="content-container">
                <div className="content">{this.showTotals()}</div>
              </div>
              <div className="footer">{this.footer()}</div>
            </Route>
          </Switch>
        </MemoryRouter>
      </div>
    );
  }
}

export default Handheld;