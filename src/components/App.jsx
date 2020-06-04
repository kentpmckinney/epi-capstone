import React from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './App.scss';
import ingredientList from '../data/dst/ingredients.json';
import nutrientData from '../data/dst/nutrients.json';
import searchIcon from './search.svg';
import menuIcon from './menu.svg';
import totalIcon from './total.svg';

class App extends React.Component {
  constructor(props) {
    // localStorage.clear()
    console.log(ingredientList);
    console.log(nutrientData);
    super(props);
    this.cache = {}
    this.cache.nutrients = nutrientData;
    this.cache.ingredients = <div>
      {ingredientList.map(i => <div className='ingredient' key={i[1]} onClick={
        () => { this.onIngredientClick(i[1]) }
      }>{i[0]}</div>)}
    </div>
    this.state = { view: {}, selectedFoodList: [] };
  }

  onIngredientClick = fdcId => {
    this.setState({ selectedFoodList: [...this.state.selectedFoodList, { fdcId, qty: 1 }] });
  }

  onOrientationChange = () => {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    this.setState({ view: { ...this.state.view, isPortrait } });
  }

  onScreenWidthChange = () => {
    console.log('screen width change')
    const isLargeScreenWidth = window.matchMedia("(min-width: 768px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-width: 1024px) and (orientation: landscape)").matches;
    const isLargeScreenHeight = window.matchMedia("(min-height: 800px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-height: 600px) and (orientation: landscape)").matches;
    const isLargeScreen = isLargeScreenWidth && isLargeScreenHeight;
    this.setState({ view: { ...this.state.view, isLargeScreen } });
  }

  onScreenHeightChange = () => {
    const isLargeScreenWidth = window.matchMedia("(min-width: 768px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-width: 1024px) and (orientation: landscape)").matches;
    const isLargeScreenHeight = window.matchMedia("(min-height: 800px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-height: 600px) and (orientation: landscape)").matches;
    const isLargeScreen = isLargeScreenWidth && isLargeScreenHeight;
    this.setState({ view: { ...this.state.view, isLargeScreen } });
  }

  onChangeTheme = () => {
    const isLightTheme = window.matchMedia("(prefers-color-scheme: light)");
    this.setState({ view: { ...this.state.view, isLightTheme } });
  }

  setMediaQueryListeners = () => {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener('change', this.onChangeTheme);
    window.matchMedia("(orientation: portrait)").addEventListener('change', this.onScreenOrientationChange);
    window.matchMedia("(min-width: 768px)").addEventListener('change', this.onScreenWidthChange);
    window.matchMedia("(min-width: 1024px)").addEventListener('change', this.onScreenWidthChange);
    window.matchMedia("(min-height: 600px)").addEventListener('change', this.onScreenHeightChange);
    window.matchMedia("(min-height: 800px)").addEventListener('change', this.onScreenHeightChange);
  }

  setInitialMediaQueryState = () => {
    const isHandheld = window.matchMedia("(handheld)").matches;
    const isLightTheme = window.matchMedia("(prefers-color-scheme: light)");
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isLargeScreenWidth = window.matchMedia("(min-width: 768px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-width: 1024px) and (orientation: landscape)").matches;
    const isLargeScreenHeight = window.matchMedia("(min-height: 800px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-height: 600px) and (orientation: landscape)").matches;
    const isLargeScreen = isLargeScreenWidth && isLargeScreenHeight;
    this.setState({ view: { isHandheld, isPortrait, isLargeScreen } });
  }

  componentDidMount = () => {
    this.setMediaQueryListeners();
    this.setInitialMediaQueryState();
    const state = window.localStorage.getItem('state');
    if (state) { this.setState(JSON.parse(state)) }
  }

  componentDidUpdate = () => {
    if (this.state) { window.localStorage.setItem('state', JSON.stringify(this.state)); }
  }

  getFoodNutrientData = fdcId => {
    return this.cache.nutrients.filter(i => i[0] === fdcId);
  }

  getNutientIndex = nut => {
    const header = this.cache.nutrients[0];
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

      const header = this.cache.nutrients[0];
      // qty needs to be unit-converted and multiplied by the amount of the nutrient in the food
      return header.map(nut => {
        return { [nut]: list.reduce((a, c) => a + c.qty, 0) }
      })
    }
  }

  showTotals = () => {
    const totals = this.calculateTotals(this.state.selectedFoodList);
    if (totals && totals.length > 0) {
      return totals.map((item, index) =>
        <div key={`totals-${index}`}>{`${Object.keys(item)[0]} (${Object.values(item)[0]})`}</div>
      )
    }
  }

  viewHandheldPortrait = () => {

    const footer = <Footer links={[
      { name: 'Search', img: { searchIcon }, to: '/' },
      { name: 'Menu', img: { menuIcon }, to: '/menu' },
      { name: 'Totals', img: { totalIcon }, to: '/totals' }
    ]}></Footer>

    return (
      <div className="grid">
        <MemoryRouter>
          <Switch>
            <Route path='/' exact>
              <div className="header">
                <Header>
                  <div className="tab-left">Search</div>
                  <div className="tab-right">Browse</div>
                  <div className="header-content">
                    <input /><button>Search</button>
                  </div>
                </Header>
              </div>
              <div className="content-container">
                <div className="content">
                  {this.cache.ingredients}
                </div>
              </div>
              <div className="footer">{footer}</div>
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
                    <div key={`foodlist-${index}`}>{ingredientList.filter(i => i[1] === item.fdcId)[0][0]} ({item.qty})</div>)}
                </div>
              </div>
              <div className="footer">{footer}</div>
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
              <div className="footer">{footer}</div>
            </Route>
          </Switch>
        </MemoryRouter>
      </div>
    );
  }

  viewHandheldLandscape = () => {

  }

  showContent = () => {
    const { isHandheld, isPortrait, isLargeScreen } = this.state.view;
    const content = this.viewHandheldPortrait();
    return content;
  }

  render = () => {
    console.log(this.state)
    return <div className="app">{this.showContent()}</div>;
  }

}

export default App;