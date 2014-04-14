Yahara.Adapter = Ember.Adapter.extend({
  find: function(record, id) {
    var url = this.buildURL(record.constructor, id),
        self = this;

    return this.ajax(url).then(function(data) {
      self.didFind(record, id, data);
      return record;
    });
  },

  didFind: function(record, id, data) {
    var rootKey = Ember.get(record.constructor, 'rootKey'),
        dataToLoad = rootKey ? data[rootKey] : data;

    record.load(id, dataToLoad);
  },

  findAll: function(klass, records) {
    var url = this.buildURL(klass),
        self = this;

    return this.ajax(url).then(function(data) {
      self.didFindAll(klass, records, data);
      return records;
    });
  },

  didFindAll: function(klass, records, data) {
    var collectionKey = Ember.get(klass, 'collectionKey'),
        dataToLoad = collectionKey ? data[collectionKey] : data;

    // HACK to massage JSON into something loadable by ember with relationships. Generalize this.
    dataToLoad.map( function(album){
      album.id = album.mprint.active;
      album.tracks.map(function(track){
        track.album_id = album.id;
      });
    });

    records.load(klass, dataToLoad);
  },

  ajax: function(url, params, method, settings) {
    return this._ajax(url, params, (method || "GET"), settings);
  },

  buildURL: function(klass, id) {
    var urlRoot = ENV.HOST + Ember.get(klass, 'url');
    var urlSuffix = Ember.get(klass, 'urlSuffix') || '';
    if (!urlRoot) { throw new Error('Ember.RESTAdapter requires a `url` property to be specified'); }

    if (!Ember.isEmpty(id)) {
      return urlRoot + "/" + id + urlSuffix;
    } else {
      return urlRoot + urlSuffix;
    }
  },

  _ajax: function(url, params, method, settings) {
    return ic.ajax.request({
      url: url,
      method: method
    });
  }
});
