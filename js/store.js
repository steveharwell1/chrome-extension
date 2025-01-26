export const Store = class Store {
  _data = undefined;
  _subscribers = [];
  _preRenderFilters = [];

  constructor(initialData = undefined) {
    this.setValue(initialData);
  }

  getValue() {
    return this._data;
  }

  beforeUpdate(func) {
    this._preRenderFilters.push(func);
  }

  onUpdate(func) {
    this._subscribers.push(func);
  }

  transformValue(func) {
    this._data = func(this._data);

    for (const filter of this._preRenderFilters) {
      this._data = filter(this._data);
    }

    for (const subscriber of this._subscribers) {
      subscriber(this._data);
    }
  }

  // Replace with compose() if using an fp library
  transformValueHOF(func) {
    return () => this.transformValue(func);
  }
  setValue(value) {
    this.transformValue(() => value);
  }
  setValueHOF(value) {
    return () => this.setValue(value);
  }
};
