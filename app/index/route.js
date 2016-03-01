import Ember from 'ember';

export default Ember.Route.extend({
  fecID: 'P80001571',
  key: 'a7092ddfbc7c4440af07ad76b485d965',
  model() {
    var url = `http://realtime.influenceexplorer.com/api//candidates/` +
      `?format=json&page=1&page_size=10&fec_id=${this.get('fecID')}` +
      `&apikey=${this.get('key')}`;
    return Ember.$.getJSON(url)
      .then(function(responseJSON) {
        var candidateResponse = responseJSON.results[0];
        var candidateData = {
          name: candidateResponse.name,
          totalExpenditures: candidateResponse.total_expenditures,
          expendituresSupporting: candidateResponse.expenditures_supporting,
          expendituresOpposing: candidateResponse.expenditures_opposing,
          totalReceipts: candidateResponse.total_receipts,
          totalContributions: candidateResponse.total_contributions,
          totalDisbursements: candidateResponse.total_disbursements,
          cashOnHand: candidateResponse.cash_on_hand,
        };
        return candidateData;
      }
    );
  }
});
