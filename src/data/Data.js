import _ingredients from './dst/ingredients.json';
import _nutrients from './dst/nutrients.json';

export default class Data {

  static get ingredients() { return _ingredients };
  static get nutrients() { return _nutrients }

  static calculateTotals = list => {
    if (list && list.length > 0) {

      list = list.map(item => {
        return { fdcId: item.fdcId, qty: item.qty, unit: item.unit, factor: this.grams(item.qty, item.unit) / 100 }
      })

      const header = _nutrients[0];
      return header.map(nutrient => {
        return { [nutrient]: list.reduce((a, c) => a + c.factor * this.amount(c.fdcId, nutrient), 0) }
      })

    }
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
    const units = _nutrients[1].filter(name => name != 'units');
    const index = this.getNutrientIndex(nutrientName);
    const unit = units[index];
    return this.parseUnitName(unit);
  }

  static getAllUnits = () => {
    const units = _nutrients[1];
    return [...new Set(units.map(unit => Data.parseUnitName(unit)))]
  }

  static parseUnitName = unitName => {
    switch (unitName) {
      case 'G': return 'g';
      case 'MG': return 'mg';
      case 'UG': return 'μg';
      case 'KCAL': return 'kcal';
      case 'IU': return 'IU';
      case 'kJ': return 'kJ';
      default: return unitName ? unitName.toLowerCase() : unitName;
    }
  }

}