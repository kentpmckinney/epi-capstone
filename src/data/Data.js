import _ingredients from './dst/ingredients.json';
import _nutrients from './dst/nutrients.json';

export default class Data {

  static get ingredients() { return _ingredients };
  static get nutrients() { return _nutrients }

  static calculateTotals = list => {
    const header = _nutrients[0];
    let output = [];
    for (let i = 1; i < header.length; i++) {
      let nutrientTotal = 0;
      list.forEach(item => {
        nutrientTotal += item.qty * this.amount(item.fdcId, header[i]) / 100;
      })
      output.push([header[i], nutrientTotal])
    }
    return output;
  }

  static grams = (qty, unit) => {
    // convert to grams
    // TODO
    return qty;
  }

  static amount = (fdcId, nutrientName) => {
    const nutrients = _nutrients.filter(i => i[0] === fdcId)[0];
    return nutrients[this.getNutrientIndex(nutrientName)]
  }

  static getNutrientIndex = nutrientName => {
    const header = _nutrients[0];
    for (let i = 0; i < header.length; i++) {
      if (header[i] === nutrientName) { return i }
    }
  }

  static getUnit = nutrientName => {
    const units = _nutrients[1].filter(name => name !== 'units');
    const index = this.getNutrientIndex(nutrientName) - 1;
    const unit = units[index];
    return this.parseUnitName(unit);
  }


  static parseUnitName = unitName => {
    switch (unitName) {
      case 'IU': return 'IU';
      case 'kJ': return 'kJ';
      default: return unitName ? unitName.toLowerCase() : unitName;
    }
  }

}