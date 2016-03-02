import Ember from 'ember';

export default Ember.Service.extend({
  modelHash: {butt: 'butt'},

  addKeyValuePair(key, value) {
    this.get('modelHash')[key] = value;
  }
});
