import Ember from 'ember';

export default Ember.Route.extend({
  minSpent: '10000',
  fecID: 'P80001571',
  key: 'a7092ddfbc7c4440af07ad76b485d965',

  model() {
    return Ember.RSVP.hash({
      supportExpenditures: this.getExpenditures('support'),
      oppositionExpenditures: this.getExpenditures('opposition')
    });
  },

  getExpenditures(type) {
    var expenditureType = type.charAt(0).toUpperCase();
    var url = `http://realtime.influenceexplorer.com/api/` +
      `/independent-expenditures/?format=json&page=1&page_size=100` +
      `&support_oppose_checked=${expenditureType}` +
      `&min_spent=${this.get('minSpent')}` +
      `&candidate_id_checked=${this.get('fecID')}` +
      `&apikey=${this.get('key')}`;
    return Ember.$.getJSON(url)
      .then(function(responseJSON) {
        var data = {};
        responseJSON.results.forEach(function(result) {
          var expenditureAmount = parseFloat(result.expenditure_amount);
          if (expenditureType === "O") {
            expenditureAmount = expenditureAmount * -1
          }
          data[result.committee_name] = expenditureAmount;
        });
        return data;
      }
    );
  }
});
