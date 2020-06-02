import React from 'react';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './App.scss';
import ingredientList from './test.json';
import searchIcon from './search.svg';
import menuIcon from './menu.svg';
import totalIcon from './total.svg';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.ingredients = <div>
      {ingredientList.map(i => <div className='ingredient' key={i[1]} onClick={
        () => { this.onIngredientClick(i[1]) }
      }>{i[0]}</div>)}
    </div>
    this.state = { view: {}, selectedFoodList: [] };
  }

  onIngredientClick = fdcId => {
    this.setState({ selectedFoodList: [...this.state.selectedFoodList, { name: fdcId, qty: 1 }] });
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
  }

  componentDidUpdate = () => {

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
                  {this.ingredients}
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
                  Menu
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
                  Totals
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