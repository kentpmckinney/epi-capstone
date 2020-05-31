import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.scss';
import ingredientList from './test.json';


class App extends React.Component {
  state = { view: {} }

  onOrientationChange = () => {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    this.setState({ view: { ...this.state.view, isPortrait } });
  }

  onScreenWidthChange = () => {
    const isLargeScreenWidth = window.matchMedia("(min-width: 768px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-width: 1024px) and (orientation: landscape)").matches;
    const isLargeScreenHeight = window.matchMedia("(min-height: 800px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-height: 600px) and (orientation: landscape)").matches;
    console.log(isLargeScreenWidth)
    console.log(isLargeScreenHeight)
    const isLargeScreen = isLargeScreenWidth && isLargeScreenHeight;
    this.setState({ view: { ...this.state.view, isLargeScreen } });
  }

  onScreenHeightChange = () => {
    const isLargeScreenWidth = window.matchMedia("(min-width: 768px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-width: 1024px) and (orientation: landscape)").matches;
    const isLargeScreenHeight = window.matchMedia("(min-height: 800px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-height: 600px) and (orientation: landscape)").matches;
    console.log(isLargeScreenWidth)
    console.log(isLargeScreenHeight)
    const isLargeScreen = isLargeScreenWidth && isLargeScreenHeight;
    this.setState({ view: { ...this.state.view, isLargeScreen } });
  }

  setMediaQueryListeners = () => {
    window.matchMedia("(orientation: portrait)").addListener(e => this.onScreenOrientationChange());
    window.matchMedia("(width)").addListener(e => this.onScreenWidthChange());
    window.matchMedia("(height)").addListener(e => this.onScreenHeightChange());
  }

  setInitialMediaQueryState = () => {
    const isHandheld = window.matchMedia("(handheld)").matches;
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const isLargeScreenWidth = window.matchMedia("(min-width: 768px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-width: 1024px) and (orientation: landscape)").matches;
    const isLargeScreenHeight = window.matchMedia("(min-height: 800px) and (orientation: portrait)").matches ||
      window.matchMedia("(min-height: 600px) and (orientation: landscape)").matches;
    console.log(isLargeScreenWidth)
    console.log(isLargeScreenHeight)
    const isLargeScreen = isLargeScreenWidth && isLargeScreenHeight;
    this.setState({ view: { isHandheld, isPortrait, isLargeScreen } });
  }

  componentDidMount = () => {
    this.setMediaQueryListeners();
    this.setInitialMediaQueryState();
  }

  componentDidUpdate = () => {

  }

  renderHandheldPortrait = () => {
    return (
      <div className="grid">
        <div className="header"><Header /></div>
        <div className="content-container">
          <div className="content">
            {ingredientList.map(i => <div className='ingredient' key={i[1]} id={i[1]}>{i[0]}</div>)}
          </div>
        </div>
        <div className="footer"><Footer /></div>
      </div>
    );
  }

  renderHandheldLandscape = () => {

  }

  render = () => {
    console.log(this.state.view)
    const { isHandheld, isPortrait, isLargeScreen } = this.state.view;
    const content = this.renderHandheldPortrait();

    return (
      <div className="app">{content}</div>
    );
  }

}

export default App;