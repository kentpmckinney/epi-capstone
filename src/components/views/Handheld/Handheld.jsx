import React from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import Data from '../../../data/Data.js';
import Header from './Header';
import Footer from './Footer';
import searchIcon from './search.svg';
import menuIcon from './menu.svg';
import totalIcon from './total.svg';

class Handheld extends React.Component {
  constructor(props) {
    super(props);
    // this.data = new Data();
    this.ingredients = <div>
      {Data.ingredients.map(i => <div className='ingredient' key={i[1]} onClick={
        () => { this.onIngredientClick(i[1]) }
      }>{i[0]}</div>)}
    </div>
    this.state = { selectedFoodList: [] };
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

  onIngredientClick = fdcId => {
    this.setState({ selectedFoodList: [...this.state.selectedFoodList, { fdcId, qty: 1 }] });
  }

  showTotals = () => {
    const totals = this.calculateTotals(this.state.selectedFoodList);
    if (totals && totals.length > 0) {
      return totals.map((item, index) =>
        <div key={`totals-${index}`}>{`${Object.keys(item)[0]} (${Object.values(item)[0]})`}</div>
      )
    }
  }

  getFoodNutrientData = fdcId => {
    return Data.nutrients.filter(i => i[0] === fdcId);
  }

  getNutientIndex = nut => {
    const header = Data.nutrients[0];
    for (let i = 0; i < header.length; i++) {
      if (header[i] === nut) { return i }
    }
  }

  getUnit = nut => {
    const units = this.cache.nutrients[1];
    const index = this.getNutientIndex(nut);
    return units[index];
  }

  getFoodMassInGrams = (fdcId, unit, qty) => {
    const nutData = this.getFoodNutrientData(fdcId)
    console.log('mass')
    console.log(nutData)
    // get the unit for the food
    // convert to grams
  }

  getNutrientAmount = (fdcId, nut) => {
    // get base nutrient amount
    // convert amount to grams
  }

  calculateTotals = list => {
    if (list && list.length > 0) {
      this.getFoodMassInGrams(list[0].fdcId)
      // given qty and unit of food, and amount of nutrient in a given amount of the food
      // get mass by converting the qty from its unit into grams
      // get the amount of the nutrient in one gram of the food
      // multiply the two to get the final amount
      // convert from grams to the default unit for the nutrient

      const header = Data.nutrients[0];
      // qty needs to be unit-converted and multiplied by the amount of the nutrient in the food
      return header.map(nut => {
        return { [nut]: list.reduce((a, c) => a + c.qty, 0) }
      })
    }
  }

  render() {
    return (
      <div className="grid">
        <MemoryRouter>
          <Switch>
            <Route path='/' exact>
              <div className="header">
                {this.searchHeader()}
              </div>
              <div className="content-container">
                <div className="content">
                  {this.ingredients}
                </div>
              </div>
              <div className="footer">{this.footer()}</div>
            </Route>
            <Route path='/menu' exact>
              <div className="header">
                <Header>
                  <div className="tab-left">Plan</div>
                  <div className="tab-right">Track</div>
                </Header>
              </div>
              <div className="content-container">
                <div className="content">
                  {this.state.selectedFoodList.map((item, index) =>
                    <div key={`foodlist-${index}`}>{Data.ingredients.filter(i => i[1] === item.fdcId)[0][0]} ({item.qty})</div>)}
                </div>
              </div>
              <div className="footer">{this.footer()}</div>
            </Route>
            <Route path='/totals' exact>
              <div className="header">
                <Header>
                  <div className="tab-left">Totals</div>
                </Header>
              </div>
              <div className="content-container">
                <div className="content">
                  {this.showTotals()}
                </div>
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