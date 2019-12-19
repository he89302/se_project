import fetch from 'node-fetch';
import { expect } from 'chai';

it('asynchronous fetch promise', function() {
  return fetch('http://hapi.fhir.org/baseR4/Procedure?patient=99409')
    .then(function(response) { return response.json() })
    .then(function(json) { 
      expect(json).to.be.an('object');
    });
});