var unfindedPokeList;
var findedPokeList;

var ymap = new Y.Map("map");

window.onload = function() {
  initMap();
  requestUnfinded();
}

function movepoint(lat, lng) {
  // console.log(lat)
  // console.log(lng)
  ymap.panTo(new Y.LatLng(lat, lng), true);
}

function requestUpdate(pokemon) {
  pokemon['finded'] = 'true'
  console.log(pokemon);

  $.ajax({
    type: 'POST',
    url: 'https://9l80qquq46.execute-api.us-east-1.amazonaws.com/prod/PokeMapFunction',
    headers: {
      "Origin": "http://localhost:8080",
      "Access-Control-Allow-Origin" : ""
    },
    data: JSON.stringify(pokemon),
  });
}

function requestUnfinded() {
  // 未発見ポケモン
  $.ajax({
    type: 'GET',
    url: 'https://9l80qquq46.execute-api.us-east-1.amazonaws.com/prod/PokeMapGet?finded=false',
    dataType: 'jsonp',
    contentType: 'application/json',
    jsonpCallback: 'callback',
    success: function(json) {
      console.log(json);
      unfindedPokeList = json.Items;
      setUnfindedPokemon();
      requestFinded();
    }
  });
}

function requestFinded() {
  // 発見済みポケモン
  $.ajax({
    type: 'GET',
    url: 'https://9l80qquq46.execute-api.us-east-1.amazonaws.com/prod/PokeMapGet?finded=true',
    dataType: 'jsonp',
    contentType: 'application/json',
    jsonpCallback: 'callback',
    success: function(json) {
      console.log(json);
      findedPokeList = json.Items;
      setFindedPokemon();
    }
  });
}




function setFindedPokemon() {
  for (var no in findedPokeList) {
    var pokemon = findedPokeList[no];
    console.log(pokemon);

    var label = new Y.Label(new Y.LatLng(parseFloat(pokemon['lat']), parseFloat(pokemon['lng'])), pokemon['name']);
    ymap.addFeature(label);

    var icon = new Y.Icon('http://www.pokemon.jp/zukan/images/m/' + pokemon['img']);
    var marker = new Y.Marker(new Y.LatLng(parseFloat(pokemon['lat']), parseFloat(pokemon['lng'])), {
      icon: icon
    });
    ymap.addFeature(marker);

    $("#finded-pokemon").append('<div id="modal-poke-text" onclick="movepoint(' + pokemon['lat'] + ', ' + pokemon['lng'] + ')"><a class="button-link">' + pokemon['name'] + '</a></div>');

  }
}

function setUnfindedPokemon() {
  for (var no in unfindedPokeList) {
    var pokemon = unfindedPokeList[no];
    console.log(pokemon);

    var label = new Y.Label(new Y.LatLng(parseFloat(pokemon['lat']), parseFloat(pokemon['lng'])), pokemon['station']);
    label.pokemon = pokemon;
    label.bind('click', function(latlng) {
      console.log(latlng);
      console.log(this.pokemon);

      var icon = new Y.Icon('http://www.pokemon.jp/zukan/images/m/' + this.pokemon['img']);
      var marker = new Y.Marker(new Y.LatLng(this.latlng.Lat, this.latlng.Lon), {
        icon: icon
      });
      ymap.addFeature(marker);

      ymap.removeFeature(this);
      ymap.addFeature(new Y.Label(new Y.LatLng(this.latlng.Lat, this.latlng.Lon), this.pokemon['name']));

      $("#finded-pokemon").append('<div id="modal-poke-text" onclick="movepoint(' + this.latlng.Lat + ', ' + this.latlng.Lon + ')"><a class="button-link">' + this.pokemon['name'] + '</a></div>');

      // 発見済みの更新
      requestUpdate(this.pokemon);
    });
    ymap.addFeature(label);
  }
}

function initMap() {
  ymap.drawMap(new Y.LatLng(34.702398, 135.495188), 17, Y.LayerSetId.NORMAL);
}
