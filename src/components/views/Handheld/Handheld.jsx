import React from 'react';
import { v4 } from 'uuid';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Data from '../../../data/Data.js';
import Header from './Header';
import Footer from './Footer';
import searchIcon from './search.svg';
import menuIcon from './menu.svg';
import totalIcon from './total.svg';
import minusIcon from './minus.svg';
import './Handheld.scss';

class Handheld extends React.Component {
  constructor(props) {
    super(props);
    this.selectedIngredient = '';
    this.state = { selectedFoodList: [], searchFilter: '' };
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
        <div className="header-content">
          <input id='search-term' /><button onClick={this.onSearchClick}>Search</button>
        </div>
      </Header>
    )
  }

  menuHeader = () => {
    return (
      <Header>
        <div className="tab-left">Menu</div>
      </Header>
    )
  }

  totalsHeader = () => {
    return (
      <Header>
        <div className="tab-left">Totals</div>
        <div>DISCLAIMER: this is a student demo only and accuracy of data is not guaranteed.</div>
      </Header>
    )
  }

  ingredientsList = () => {
    if (this.state.searchFilter) {
      const filtered = Data.ingredients.filter(i => i[0].includes(this.state.searchFilter));
      return (
        filtered.map(i =>
          <div className='ingredient' key={i[1]} onClick={() => { this.onIngredientClick(i[1]) }}
          >{i[0]}
            <span hidden id={i[1]} style={{ position: 'relative', float: 'right' }}
              onClick={() => { this.onAddIngredientClick(i[1]) }}>+ Add to Menu</span>
          </div>)
      )
    }
    else {
      return (
        Data.ingredients.map(i =>
          <div className='ingredient' key={i[1]} onClick={
            () => { this.onIngredientClick(i[1]) }
          }>{i[0]}
            <span hidden id={i[1]} style={{ position: 'relative', float: 'right' }}
              onClick={() => { this.onAddIngredientClick(i[1]) }}>+ Add to Menu</span>
          </div>)
      )
    }
  }

  onSearchClick = event => {
    const filter = document.getElementById('search-term').value;
    this.setState({ searchFilter: filter });
  }

  onIngredientClick = fdcId => {
    if (this.selectedIngredient) {
      document.getElementById(this.selectedIngredient).style.display = 'none';
    }
    document.getElementById(fdcId).style.display = 'inline';
    this.selectedIngredient = fdcId;
  }

  onAddIngredientClick = fdcId => {
    this.setState({
      selectedFoodList:
        [...this.state.selectedFoodList, { fdcId, qty: 100, unit: 'g', id: v4() }]
    });
  }

  onRemoveItem = id => {
    this.setState({
      selectedFoodList:
        [...this.state.selectedFoodList.filter(i => i.id !== id)]
    });
  }

  onQuantityChange = event => {
    const id = event.target.id;
    const qty = event.target.value;
    if (qty === '') { return }
    if (qty <= 0) { this.onRemoveItem(id) }
    else {
      this.setState({
        selectedFoodList:
          [...this.state.selectedFoodList.filter(i => i.id !== id), { ...this.state.selectedFoodList.filter(i => i.id === id)[0], qty: qty }]
      }
      );
    }
  }

  showNutrient(name, displayName, totals) {
    return <tr key={`nut-${name}`}><td>&nbsp;&nbsp;&nbsp;&nbsp;{displayName}</td><td>{totals.filter(i => i[0] === name)[0][1].toFixed(2)}{Data.getUnit(name)}</td></tr>;
  }

  showTotals = () => {
    const totals = Data.calculateTotals(this.state.selectedFoodList) || [];
    let html = [];
    html.push(<tr><td>Macronutrient Summary</td></tr>);
    html.push(this.showNutrient('Energy', 'Energy', totals))
    html.push(this.showNutrient('Carbohydrate, by difference', 'Carbohydrates', totals))
    html.push(this.showNutrient('Protein', 'Protein', totals))
    html.push(this.showNutrient('Total lipid (fat)', 'Fat', totals))
    html.push(this.showNutrient('Water', 'Water', totals))
    html.push(this.showNutrient('Fiber, total dietary', 'Fiber', totals))
    html.push(<tr key={`nut-blank-1`}><span>&nbsp;</span></tr>)
    html.push(<tr><td>Vitamins</td></tr>);
    html.push(this.showNutrient('Vitamin A, IU', 'A', totals))
    html.push(this.showNutrient('Thiamin', 'B - Thiamin', totals))
    html.push(this.showNutrient('Riboflavin', 'B - Riboflavin', totals))
    html.push(this.showNutrient('Niacin', 'B - Niacin', totals))
    html.push(this.showNutrient('Pantothenic acid', 'B - Pantothenic Acid', totals))
    html.push(this.showNutrient('Biotin', 'B - Biotin', totals))
    html.push(this.showNutrient('Folate, total', 'B - Folate', totals))
    html.push(this.showNutrient('Inositol', 'B - Inositol', totals))
    html.push(this.showNutrient('Choline, total', 'B - Choline', totals));
    html.push(this.showNutrient('Vitamin B-6', 'B-6', totals))
    html.push(this.showNutrient('Vitamin B-12', 'B-12', totals))
    html.push(this.showNutrient('Vitamin C, total ascorbic acid', 'C', totals))
    html.push(this.showNutrient('Vitamin D (D2 + D3)', 'D2 + D3', totals))
    html.push(this.showNutrient('Vitamin E', 'E', totals))
    html.push(this.showNutrient('Vitamin K (Dihydrophylloquinone)', 'K (Dihydrophylloquinone)', totals))
    html.push(this.showNutrient('Vitamin K (Menaquinone-4)', 'K (Menaquinone-4)', totals))
    html.push(this.showNutrient('Vitamin K (phylloquinone)', 'K (phylloquinone)', totals))
    html.push(<tr key={`nut-blank-2`}><span>&nbsp;</span></tr>)
    html.push(<tr><td>Minerals</td></tr>);
    html.push(this.showNutrient('Boron, B', 'Boron', totals))
    html.push(this.showNutrient('Calcium, Ca', 'Calcium', totals))
    html.push(this.showNutrient('Chlorine, Cl', 'Chlorine', totals))
    html.push(this.showNutrient('Chromium, Cr', 'Chromium', totals))
    html.push(this.showNutrient('Cobalt, Co', 'Cobalt', totals))
    html.push(this.showNutrient('Copper, Cu', 'Copper', totals))
    html.push(this.showNutrient('Fluoride, F', 'Fluoride', totals))
    html.push(this.showNutrient('Iodine, I', 'Iodine', totals))
    html.push(this.showNutrient('Iron, Fe', 'Iron', totals))
    html.push(this.showNutrient('Magnesium, Mg', 'Magnesium', totals))
    html.push(this.showNutrient('Manganese, Mn', 'Manganese', totals))
    html.push(this.showNutrient('Molybdenum, Mo', 'Molybdenum', totals))
    html.push(this.showNutrient('Nickel, Ni', 'Nickel', totals))
    html.push(this.showNutrient('Phosphorus, P', 'Phosphorus', totals))
    html.push(this.showNutrient('Potassium, K', 'Potassium', totals))
    html.push(this.showNutrient('Selenium, Se', 'Selenium', totals))
    html.push(this.showNutrient('Sodium, Na', 'Sodium', totals))
    html.push(this.showNutrient('Sulfur, S', 'Sulfur', totals))
    html.push(this.showNutrient('Zinc, Zn', 'Zinc', totals))
    html.push(<tr key={`nut-blank-3`}><span>&nbsp;</span></tr>)
    html.push(<tr><td>Fats</td></tr>);
    html.push(this.showNutrient('18:3 n-3 c,c,c (ALA)', 'Alpha - Linolenic Acid (Omega 3)', totals))
    html.push(this.showNutrient('18:3 n-6 c,c,c', 'Linoleic Acid (Omega 6)', totals))
    html.push(this.showNutrient('Fatty acids, total monounsaturated', 'Monounsaturated', totals))
    html.push(this.showNutrient('Fatty acids, total polyunsaturated', 'Polyunsaturated', totals))
    html.push(this.showNutrient('Fatty acids, total saturated', 'Saturated', totals))
    html.push(this.showNutrient('Fatty acids, total trans', 'Trans', totals))
    html.push(<tr key={`nut-blank-4`}><span>&nbsp;</span></tr>)
    html.push(<tr><td>Amino Acids: Essential</td></tr>);
    html.push(this.showNutrient('Histidine', 'Histidine', totals))
    html.push(this.showNutrient('Isoleucine', 'Isoleucine', totals))
    html.push(this.showNutrient('Leucine', 'Leucine', totals))
    html.push(this.showNutrient('Lysine', 'Lysine', totals))
    html.push(this.showNutrient('Methionine', 'Methionine', totals))
    html.push(this.showNutrient('Phenylalanine', 'Phenylalanine', totals))
    html.push(this.showNutrient('Threonine', 'Threonine', totals))
    html.push(this.showNutrient('Tryptophan', 'Tryptophan', totals))
    html.push(this.showNutrient('Valine', 'Valine', totals))
    html.push(
      <details>
        <summary>Amino Acids: Conditionally-Essential</summary>
        <table>
          <tbody>
            {this.showNutrient('Arginine', 'Arginine', totals)}
            {this.showNutrient('Cysteine', 'Cysteine', totals)}
            {this.showNutrient('Glutamine', 'Glutamine', totals)}
            {this.showNutrient('Glycine', 'Glycine', totals)}
            {this.showNutrient('Proline', 'Proline', totals)}
            {this.showNutrient('Tyrosine', 'Tyrosine', totals)}
            Taurine
          </tbody>
        </table>
      </details>
    )
    html.push(
      <details>
        <summary>Amino Acids: Non-Essential</summary>
        <table>
          <tbody>
            {this.showNutrient('Alanine', 'Alanine', totals)}
            {this.showNutrient('Aspartic acid', 'Aspartic Acid', totals)}
            {this.showNutrient('Glutamic acid', 'Glutamic Acid', totals)}
            {this.showNutrient('Serine', 'Serine', totals)}
          </tbody>
        </table>
      </details>
    )
    html.push(<tr key={`nut-blank-5`}><span>&nbsp;</span></tr>);
    html.push(<tr><td>Sugars</td></tr>);
    html.push(this.showNutrient('Sugars, total including NLEA', 'Total Sugars', totals));
    html.push(this.showNutrient('Sugars, added', 'Added Sugars', totals));
    html.push(this.showNutrient('Glucose (dextrose)', 'Glucose', totals));
    html.push(this.showNutrient('Sucrose', 'Sucrose', totals));
    html.push(this.showNutrient('Fructose', 'Fructose', totals));
    html.push(this.showNutrient('Lactose', 'Lactose', totals));
    html.push(this.showNutrient('Galactose', 'Galactose', totals));
    html.push(this.showNutrient('Maltose', 'Maltose', totals));
    html.push(this.showNutrient('Ribose', 'Ribose', totals));
    html.push(<tr key={`nut-blank-7`}><span>&nbsp;</span></tr>);
    html.push(<tr><td>Other</td></tr>);
    html.push(this.showNutrient('Total sugar alcohols', 'Total Sugar Alcohols', totals));
    html.push(this.showNutrient('Sorbitol', 'Sorbitol', totals));
    html.push(this.showNutrient('Alcohol, ethyl', 'Ethyl Alcohol', totals));
    html.push(this.showNutrient('Caffeine', 'Caffeine', totals));
    html.push(this.showNutrient('Tocotrienol, alpha', 'Alpha Tocotrienol', totals));
    html.push(this.showNutrient('Tocotrienol, beta', 'Beta Tocotrienol', totals));
    html.push(this.showNutrient('Tocotrienol, delta', 'Delta Tocotrienol', totals));
    html.push(this.showNutrient('Tocotrienol, gamma', 'Gamma Tocotrienol', totals));
    html.push(this.showNutrient('Cholesterol', 'Cholesterol', totals));
    html.push(this.showNutrient('Beta-sitostanol', 'Beta-sitostanol', totals));
    html.push(this.showNutrient('Beta-sitosterol', 'Beta-sitosterol', totals));
    html.push(this.showNutrient('Campestanol', 'Campestanol', totals));
    html.push(this.showNutrient('Phytosterols', 'Phytosterols', totals));
    html.push(this.showNutrient('Campesterol', 'Campesterol', totals));
    html.push(this.showNutrient('Brassicasterol', 'Brassicasterol', totals));
    html.push(this.showNutrient('Stigmasterol', 'Stigmasterol', totals));
    html.push(this.showNutrient('Delta-5-avenasterol', 'Delta-5-avenasterol', totals));
    html.push(this.showNutrient('Xylitol', 'Xylitol', totals));
    html.push(this.showNutrient('Lutein', 'Lutein', totals));
    html.push(this.showNutrient('Zeaxanthin', 'Zeaxanthin', totals));
    html.push(this.showNutrient('Lactic acid', 'Lactic acid', totals));
    html.push(this.showNutrient('Acetic acid', 'Acetic acid', totals));
    html.push(this.showNutrient('Betaine', 'Betaine', totals));
    html.push(this.showNutrient('Carotene, alpha', 'Alpha Carotene', totals));
    html.push(this.showNutrient('Carotene, beta', 'Beta Carotene', totals));
    html.push(this.showNutrient('Cryptoxanthin, alpha', 'Alpha Cryptoxanthin', totals));
    html.push(this.showNutrient('Cryptoxanthin, beta', 'Beta Cryptoxanthin', totals));
    html.push(this.showNutrient('Phytofluene', 'Phytofluene', totals));
    html.push(this.showNutrient('Phytoene', 'Phytoene', totals));
    html.push(this.showNutrient('Lycopene', 'Lycopene', totals));
    html.push(this.showNutrient('Citric acid', 'Citric acid', totals));
    html.push(this.showNutrient('Epigallocatechin-3-gallate', 'Epigallocatechin-3-gallate', totals));
    html.push(this.showNutrient('Hydroxyproline', 'Hydroxyproline', totals));
    html.push(this.showNutrient('Inulin', 'Inulin', totals));
    html.push(this.showNutrient('Malic acid', 'Malic acid', totals));
    html.push(this.showNutrient('Theobromine', 'Theobromine', totals));
    html.push(this.showNutrient('Specific Gravity', 'Specific Gravity', totals));
    return html;
  }

  render() {
    return (
      <div className="grid">
        <MemoryRouter>
          <Switch>
            <Route path='/' exact>
              <div className="header">{this.searchHeader()}</div>
              <div className="content-container">
                <div className="content">{this.ingredientsList()}</div>
                <div className="footer">{this.footer()}</div>
              </div>
            </Route>
            <Route path='/menu' exact>
              <div className="header">{this.menuHeader()}</div>
              <div className="content-container">
                <div className="content">
                  <table>
                    <tbody>
                      {this.state.selectedFoodList.map(item =>
                        <tr key={item.id} className='vertically-centered'>
                          <td>
                            {Data.ingredients.filter(i => i[1] === item.fdcId)[0][0]}
                          </td>
                          <td>
                            <input id={item.id} defaultValue={item.qty} onChange={this.onQuantityChange} />g &nbsp;
                            <img className='minus-icon' alt='' src={minusIcon} onClick={() => { this.onRemoveItem(item.id) }} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="footer">{this.footer()}</div>
            </Route>
            <Route path='/totals' exact>
              <div className="header">{this.totalsHeader()}</div>
              <div className="content-container">
                <div className="content">
                  <table><tbody>{this.showTotals()}</tbody></table>
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