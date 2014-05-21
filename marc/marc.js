var request = require('request');
var fs = require('fs');
var marc = require('marcjs');

request('https://yahara-api.herokuapp.com/catalog/yahara', function (error, response, body) {
  JSON.parse(body).forEach(function(album){
    var record = new marc.Record();
    var writers = [
        new marc.MarcxmlWriter(fs.createWriteStream(album.slug + '.xml')),
        new marc.Iso2709Writer(fs.createWriteStream(album.slug + '.mrc')),
        new marc.JsonWriter(fs.createWriteStream(album.slug + '.json')),
        new marc.TextWriter(fs.createWriteStream(album.slug + '.txt'))
    ];
    record.append(['006','m q h'])
    record.append(['007','sz zunnnnnzneu'])
    record.append(['250','a','[Downloadable music]'])
    record.append(['500', ' ', 'a', 'Downloadable audio file.']);
    record.append(['500', ' ', 'a', 'Title from title details screen.']);

    var tracks = ['505', '00']
    album.tracks.forEach(function(track){
      tracks = tracks.concat(['t', track.title])
    })
    record.append(tracks);

    writers.forEach(function(writer) { writer.write(record);} );
    writers.forEach(function(writer) { writer.end();} );
  })
})
