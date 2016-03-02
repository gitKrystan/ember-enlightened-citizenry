import Ember from 'ember';

export default Ember.Component.extend({
  modelHash: Ember.inject.service('info-data'),
  chartData: Ember.computed(function() {
    var route = this;
    setTimeout(function() {
      var chartParams = {
        type: 'bar',
        columns: [],
        groups: [[]]
      };
      var support = route.get('modelHash').modelHash.Trump.supportExpenditures;
      for (var key in support) {
        chartParams.columns.push([key, support[key]]);
        chartParams.groups[0].push(key);
      }
      var opposition =  route.get('modelHash').modelHash.Trump.oppositionExpenditures;
      for (var key in opposition) {
        chartParams.columns.push([key, opposition[key]]);
        chartParams.groups[0].push(key);
      }
      console.log(chartParams);
      return chartParams;
    }, 5000)
  }),

  grid: {
    y: {
      lines: [{value:0}]
    }
  },

  axis: {
    x: {
      type: 'category',
      categories: ['Trump', 'Hillary']
    },
    rotated: true,
  },
});
