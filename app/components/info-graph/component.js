import Ember from 'ember';

export default Ember.Component.extend({
  chartData: Ember.computed(function() {
    var chartParams = {
      type: 'bar',
      columns: [],
      groups: [[]]
    };
    var support = this.get('rawData').Trump.supportExpenditures;
    for (var key in support) {
      chartParams.columns.push([key, support[key]]);
      chartParams.groups[0].push(key);
    }
    var opposition =  this.get('rawData').Trump.oppositionExpenditures;
    for (var key in opposition) {
      chartParams.columns.push([key, opposition[key]]);
      chartParams.groups[0].push(key);
    }
    return chartParams;
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
