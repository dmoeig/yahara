define("appkit/adapters/yahara", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var get = Ember.get;

    var Adapter = Ember.Adapter.extend({
      find: function(record, id) {
        var url = this.buildURL(record.constructor, id),
            self = this;

        return this.ajax(url).then(function(data) {
          self.didFind(record, id, data);
          return record;
        });
      },

      didFind: function(record, id, data) {
        var rootKey = get(record.constructor, 'rootKey'),
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
        var collectionKey = get(klass, 'collectionKey'),
            dataToLoad = collectionKey ? data[collectionKey] : data;
        records.load(klass, dataToLoad);
      },

      findQuery: function(klass, records, params) {
        var url = this.buildURL(klass),
            self = this;

        return this.ajax(url, params).then(function(data) {
          self.didFindQuery(klass, records, params, data);
          return records;
        });
      },

      didFindQuery: function(klass, records, params, data) {
          var collectionKey = get(klass, 'collectionKey'),
              dataToLoad = collectionKey ? data[collectionKey] : data;

          records.load(klass, dataToLoad);
      },

      createRecord: function(record) {
        var url = this.buildURL(record.constructor),
            self = this;

        return this.ajax(url, record.toJSON(), "POST").then(function(data) {
          self.didCreateRecord(record, data);
          return record;
        });
      },

      didCreateRecord: function(record, data) {
        var rootKey = get(record.constructor, 'rootKey'),
            primaryKey = get(record.constructor, 'primaryKey'),
            dataToLoad = rootKey ? data[rootKey] : data;
        record.load(dataToLoad[primaryKey], dataToLoad);
        record.didCreateRecord();
      },

      saveRecord: function(record) {
        var primaryKey = get(record.constructor, 'primaryKey'),
            url = this.buildURL(record.constructor, get(record, primaryKey)),
            self = this;

        return this.ajax(url, record.toJSON(), "PUT").then(function(data) {  // TODO: Some APIs may or may not return data
          self.didSaveRecord(record, data);
          return record;
        });
      },

      didSaveRecord: function(record, data) {
        record.didSaveRecord();
      },

      deleteRecord: function(record) {
        var primaryKey = get(record.constructor, 'primaryKey'),
            url = this.buildURL(record.constructor, get(record, primaryKey)),
            self = this;

        return this.ajax(url, record.toJSON(), "DELETE").then(function(data) {  // TODO: Some APIs may or may not return data
          self.didDeleteRecord(record, data);
        });
      },

      didDeleteRecord: function(record, data) {
        record.didDeleteRecord();
      },

      ajax: function(url, params, method, settings) {
        return this._ajax(url, params, (method || "GET"), settings);
      },

      buildURL: function(klass, id) {
        var urlRoot = get(klass, 'url');
        var urlSuffix = get(klass, 'urlSuffix') || '';
        if (!urlRoot) { throw new Error('Ember.RESTAdapter requires a `url` property to be specified'); }

        if (!Ember.isEmpty(id)) {
          return urlRoot + "/" + id + urlSuffix;
        } else {
          return urlRoot + urlSuffix;
        }
      },

      ajaxSettings: function(url, method) {
        return {
          url: url,
          type: method
        };
      },

      _ajax: function(url, params, method, settings) {
        if (!settings) {
          settings = this.ajaxSettings(url, method);
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {
          if (params) {
            if (method === "GET") {
              settings.data = params;
            } else {
              settings.contentType = "application/json; charset=utf-8";
              settings.data = JSON.stringify(params);
            }
          }

          settings.success = function(json) {
            Ember.run(null, resolve, json);
          };

          settings.error = function(jqXHR, textStatus, errorThrown) {
            // https://github.com/ebryn/ember-model/issues/202
            if (jqXHR) {
              jqXHR.then = null;
            }

            Ember.run(null, reject, jqXHR);
          };


          Ember.$.ajax(settings);
       });
      }
    });

    __exports__["default"] = Adapter;
  });
define("appkit/app", 
  ["resolver","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];

    var App = Ember.Application.extend({
      LOG_ACTIVE_GENERATION: true,
      LOG_MODULE_RESOLVER: true,
      LOG_TRANSITIONS: true,
      LOG_TRANSITIONS_INTERNAL: true,
      LOG_VIEW_LOOKUPS: true,
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver['default']
    });

    App.initializer({
      name: "soundmanager",
      initialize: function() {
        soundManager.setup({
          url: '/swf'
        });
      }
    });

    __exports__["default"] = App;
  });
define("appkit/components/y-block", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['y-block'],

      expanded: false,
      title: null,

      actions: {
        toggle: function(){
          this.toggleProperty('expanded');
        }
      }
    });
  });
define("appkit/controllers/albums/show", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ObjectController.extend({
      needs: ['player'],
      player: Ember.computed.alias("controllers.player"),

      actions: {
        playPause: function (album, track){
          if (track.get('playing')) {
            this.get('player').send('pause');
          }
          else {
            this.get('player').send('play', album, track);
          }
        }
      }
    });
  });
define("appkit/controllers/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ObjectController.extend({
      token: null,
      cardNumber: null
    });
  });
define("appkit/controllers/modal", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ObjectController.extend({

      previousTransition: null,

      actions: {
        open: function() {
          $('#modal').show();
        },

        close: function() {
          $('#modal').hide();
        },
        submit: function() {
        }
      }
    });
  });
define("appkit/controllers/player", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ObjectController.extend({

      album: null,
      track: null,

      nextTrack: (function(){
        if (this.get('album')) {
          return this.get('album.tracks').findBy('position', this.get('track.position') + 1)
        }
      }).property('track'),

      previousTrack: (function(){
        if (this.get('album')) {
          return this.get('album.tracks').findBy('position', this.get('track.position') - 1)
        }
      }).property('track'),

      actions: {
        pause: function(){
          this.get('track').pause();
        },

        toggle: function(){
          if (this.get('track.playing')) {
            this.get('track').pause();
          }
          else {
            this.get('track').resume();
          }
        },

        play: function(album, track){
          if (this.get('track')) {
            this.get('track').stop();
          }
          this.setProperties({'album': album, 'track': track});
          track.play();
        }
      }
    });
  });
define("appkit/helpers/format-duration", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function(seconds) {
      var h, m, s;
      h = Math.floor(seconds / 3600);
      m = Math.floor(seconds % 3600 / 60);
      s = Math.floor(seconds % 3600 % 60);
      return (h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s;
    });
  });
define("appkit/models/album", 
  ["appkit/adapters/yahara","appkit/models/track","appkit/models/artist","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Adapter = __dependency1__["default"];
    var Track = __dependency2__["default"];
    var Artist = __dependency3__["default"];

    var Album = Ember.Model.extend({
      id: Ember.attr(),
      title: Ember.attr(),
      art: Ember.attr(),
      tracks: Ember.hasMany(Track, {key: 'tracks', embedded: true}),
      main_artist: Ember.belongsTo(Artist, {key: 'main_artist', embedded: true}),
      artists: Ember.hasMany(Artist, {key: 'artists', embedded: true})
    });

    Album.url = "/api/catalog";
    Album.collectionKey = "albums";
    Album.adapter = Adapter.create();

    __exports__["default"] = Album;
  });
define("appkit/models/artist", 
  ["appkit/adapters/yahara","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Adapter = __dependency1__["default"];

    var Artist = Ember.Model.extend({
      id: Ember.attr(),
      name: Ember.attr()
    });

    // Artist.url = "/api/catalog";
    // Artist.collectionKey = "artists";
    Artist.adapter = Adapter.create();

    __exports__["default"] = Artist;
  });
define("appkit/models/track", 
  ["appkit/adapters/yahara","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Adapter = __dependency1__["default"];

    var Track = Ember.Model.extend({
      id: Ember.attr(),
      title: Ember.attr(),
      position: Ember.attr(Number),
      duration: Ember.attr(Number),
      media_uri: Ember.attr(),

      playing: false,
      sound: null,
      currentPosition: 0,

      pct: function(){
        debugger
      }.property('currentPosition'),

      play: function (){
        var track = this;
        track.loadSound().then(function() {
          track.get('sound').play();
          track.set('playing', true);
        });
      },

      pause: function(){
        this.set('playing', false);
        this.get('sound').pause();
      },

      stop: function(){
        this.set('playing', false);
        this.get('sound').stop();
      },

      resume: function(){
        this.set('playing', true);
        this.get('sound').play();
      },

      loadSound: function(){
        var track = this;
        return ic.ajax(this.get('media_uri')).then(function(data){
          track.set('sound', soundManager.createSound({
            url: data.url,
            whileplaying: function(){ track.updatePosition();}
          }));
        });
      },

      updatePosition: function(){
        this.set('currentPosition', this.get('sound').position)
      }

    });

    Track.url = "/api/catalog";
    Track.collectionKey = "albums";
    Track.adapter = Adapter.create();

    __exports__["default"] = Track;
  });
define("appkit/router", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

    Router.map(function() {
      this.resource('albums', { path: '/' }, function () {
        this.route('show', {path: ':id'});
      });
      this.resource('artist', { path: '/artist/:id'});
      this.route('catalog');
      this.route('collection');
      this.route('profile');
    });

    __exports__["default"] = Router;
  });
define("appkit/routes/albums", 
  ["appkit/models/album","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Album = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return Album.fetch();
      }
    });
  });
define("appkit/routes/albums/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return this.modelFor('albums');
      }
    });
  });
define("appkit/routes/albums/show", 
  ["appkit/models/album","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Album = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function(params) {
        return Album.find(params.id);
      }
    });
  });
define("appkit/routes/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      actions: {
          openModal: function() {
            return this.render('modal', {
              into: 'application',
              outlet: 'modal'
            });
          },
          
          closeModal: function() {
            return this.disconnectOutlet({
              outlet: 'modal',
              parentView: 'application'
            });
          }
        }
    });
  });
define("appkit/routes/profile", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      beforeModel: function(transition) {
        if (this.controllerFor('application').get('currentUser')) {

        }
        else {
          transition.abort();
          this.controllerFor('modal').send('open');
          this.controllerFor('modal').set('previousTransition', transition);
        }
      },

      model: function() {
        return {};
      }
    });
  });
define("appkit/utils/ajax", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /* global ic */
    __exports__["default"] = function ajax(){
      return ic.ajax.apply(null, arguments);
    }
  });
//# sourceMappingURL=app.js.map