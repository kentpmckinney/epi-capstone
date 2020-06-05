import React from 'react';
import Handheld from './views/Handheld/Handheld';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    // localStorage.clear()
    super(props);
    this.state = { view: {} };
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

  showContent = () => {
    const { isHandheld, isPortrait, isLargeScreen } = this.state.view;
    const content = <Handheld />
    return content;
  }

  render = () => {
    console.log(this.state)
    return <div className="app">{this.showContent()}</div>;
  }

}

export default App;