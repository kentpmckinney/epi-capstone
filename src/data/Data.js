import _ingredients from './dst/ingredients.json';
import _nutrients from './dst/nutrients.json';

class Data {
  static get ingredients() { return _ingredients };
  static get nutrients() { return _nutrients }
}

export default Data;