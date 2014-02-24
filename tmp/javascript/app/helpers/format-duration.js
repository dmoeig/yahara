export default Ember.Handlebars.makeBoundHelper(function(seconds) {
  var h, m, s;
  h = Math.floor(seconds / 3600);
  m = Math.floor(seconds % 3600 / 60);
  s = Math.floor(seconds % 3600 % 60);
  return (h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s;
});
