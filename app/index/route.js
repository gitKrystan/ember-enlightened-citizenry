import Ember from 'ember';

export default Ember.Route.extend({
  minSpent: '10000',
  fecIDs: {
    Trump: 'P80001571',
    Clinton: 'P00003392'
  },
  key: 'a7092ddfbc7c4440af07ad76b485d965',

  model() {
    var modelHash = this.addCandidateResultsToHash();
  },

  addCandidateResultsToHash() {
    let candidates = Object.keys(this.get('fecIDs'));
    let fecIDs = this.get('fecIDs');
    let modelHash = {};
    for (var i = 0; i < candidates.length; i++) {
      let promises = promises || [];
      let candidate = candidates[i];
      let fecID = fecIDs[candidate];
      this.putExpendituresInHash(candidate, fecID).then(function(result) {
        modelHash[candidate] = result;
        promises.push(modelHash);
      });
    }
    Ember.RSVP.all(promises).then(function(values) {
      console.log(values)
    })
  },

  putExpendituresInHash(candidate, fecID) {
    var route = this;
    return Ember.RSVP.hash({
      supportExpenditures: route.getExpenditures('support', fecID),
      oppositionExpenditures: route.getExpenditures('opposition', fecID)
    });
  },

  getExpenditures(type, candidateID) {
    var expenditureType = type.charAt(0).toUpperCase();
    var url = `http://realtime.influenceexplorer.com/api/` +
      `/independent-expenditures/?format=json&page=1&page_size=100` +
      `&support_oppose_checked=${expenditureType}` +
      `&min_spent=${this.get('minSpent')}` +
      `&candidate_id_checked=${candidateID}` +
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

// Ember.RSVP.hash({
//   candidate: Ember.RSVP.hash({
//     supportExpenditures: this.getExpenditures('support'),
//     oppositionExpenditures: this.getExpenditures('opposition')
//   })
// });
