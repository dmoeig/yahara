var request = require('request');
var fs = require('fs');
var marc = require('marcjs');
var xmlfile = fs.createWriteStream('records.xml')
var txtfile = fs.createWriteStream('records.txt')

var writers = [
    new marc.MarcxmlWriter(xmlfile),
    new marc.TextWriter(txtfile)
];

request('https://yahara-api.herokuapp.com/catalog/yahara', function (error, response, body) {
  JSON.parse(body).forEach(function(album){
    var record = new marc.Record();

    record.append(['006', 'm q h'])
    record.append(['007', 'sz zunnnnnzneu'])
    record.append(['100', '1 ', 'a', album.artist_name])
    record.append(['245', '10', 'a', album.title, 'c', album.artist_name ])
    record.append(['250', '  ', 'a','[Downloadable music]'])
    record.append(['260', '  ', 'b', album.record_label, 'c', album.release_date]);
    record.append(['500', '  ', 'a', 'Downloadable audio file.']);
    record.append(['500', '  ', 'a', 'Title from digitaly encoded metadata.']);
    record.append(['538', '  ', 'a', 'Mode of access: World Wide Web.']);
    record.append(['599', '  ', 'a', 'YAHARA MUSIC LIBRARY']);
    record.append(['856', '40', 'u', 'http://www.yaharamusic.org/album/'+album.slug]);

    var tracks = ['505', '00']
    album.tracks.forEach(function(track){
      tracks = tracks.concat(['t', track.title +' -- '])
    })
    record.append(tracks);

    writers.forEach(function(writer) { writer.write(record);} );
  })
})

writers.forEach(function(writer) { writer.end();} );
