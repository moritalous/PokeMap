var pokeList = {
  '35.66582': {
    '139.7311': {
      'name': 'ヤヤコマ',
      'img': 'ff08ec6198db300abc91e69605469427.png'
    }
  }
};

var findedPokeList = {
  '35.66592': {
    '139.7321': {
      'name': 'ピカチュウ',
      'img': 'e5be30e8a3f8dba0657a9e8220aaae30.png'
    }
  }
};

var ymap = new Y.Map("map");

window.onload = function() {


  ymap.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);

  // ズームしちゃうと、画像を小さくしないといけない
  // var control = new Y.SliderZoomControlVertical();
  // ymap.addControl(control);

  // 未発見ポケモンの表示
  for (var pokeLat in pokeList) {
    for (var pokeLng in pokeList[pokeLat]) {
      var label = new Y.Label(new Y.LatLng(pokeLat, pokeLng), "ぽけもん!!");
      label.bind('click', function(latlng) {

        var poke = pokeList[this.latlng.Lat][this.latlng.Lon];
        var name = poke['name'];
        var img = poke['img'];

        // /////
        // //キーボード操作などにより、オーバーレイが多重起動するのを防止する
        // $(this).blur(); //ボタンからフォーカスを外す
        // if ($("#modal-overlay")[0]) return false; //新しくモーダルウィンドウを起動しない (防止策1)
        // //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)
        //
        // //オーバーレイを出現させる
        // $("body").append('<div id="modal-overlay"></div>');
        // $("#modal-overlay").fadeIn("slow");
        //
        // //コンテンツをセンタリングする
        // //画面(ウィンドウ)の幅、高さを取得
        // var w = $(window).width();
        // var h = $(window).height();
        //
        // // コンテンツ(#modal-content)の幅、高さを取得
        // // jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
        // //		var cw = $( "#modal-content" ).outerWidth( {margin:true} );
        // //		var ch = $( "#modal-content" ).outerHeight( {margin:true} );
        // var cw = $("#modal-content").outerWidth();
        // var ch = $("#modal-content").outerHeight();
        //
        // //センタリングを実行する
        // $("#modal-content").css({
        //   "left": ((w - cw) / 2) + "px",
        //   "top": ((h - ch) / 2) + "px"
        // });
        //
        // $("#modal-content").append('<div id="modal-poke-text">' + name + 'をみつけた！！</div>');
        // $("#modal-content").append('<div id="modal-poke-image"><img src="http://www.pokemon.jp/zukan/images/m/' + img + '"></div>');
        //
        // //コンテンツをフェードインする
        // $("#modal-content").fadeIn("slow");
        //
        // //[#modal-overlay]、または[#modal-close]をクリックしたら…
        // $("#modal-overlay,#modal-close").unbind().click(function() {
        //
        //   //[#modal-content]と[#modal-overlay]をフェードアウトした後に…
        //   $("#modal-content,#modal-overlay").fadeOut("slow", function() {
        //
        //     //[#modal-overlay]を削除する
        //     $('#modal-overlay').remove();
        //     $('#modal-poke-text').remove();
        //     $('#modal-poke-image').remove();
        //
        //   });
        //
        // });
        // /////

        var icon = new Y.Icon('http://www.pokemon.jp/zukan/images/m/' + img);
        var marker = new Y.Marker(new Y.LatLng(this.latlng.Lat, this.latlng.Lon), {
          icon: icon
        });
        ymap.addFeature(marker);

        ymap.removeFeature(this);
        ymap.addFeature(new Y.Label(new Y.LatLng(this.latlng.Lat, this.latlng.Lon), name));

        $("#finded-pokemon").append('<div id="modal-poke-text" onclick="movepoint('+this.latlng.Lat+', '+this.latlng.Lon+')"><a class="button-link">' + name + '</a></div>');

      });
      ymap.addFeature(label);
    }
  }

  // 発見済みポケモンの表示
  for (var pokeLat in findedPokeList) {
    for (var pokeLng in findedPokeList[pokeLat]) {
      var poke = findedPokeList[pokeLat][pokeLng];
      var name = poke['name'];
      var img = poke['img'];

      var label = new Y.Label(new Y.LatLng(pokeLat, pokeLng), name);
      ymap.addFeature(label);

      var icon = new Y.Icon('http://www.pokemon.jp/zukan/images/m/' + img);
      var marker = new Y.Marker(new Y.LatLng(pokeLat, pokeLng), {
        icon: icon
      });
      ymap.addFeature(marker);

      $("#finded-pokemon").append('<div id="modal-poke-text" onclick="movepoint('+pokeLat+', '+pokeLng+')"><a class="button-link">' + name + '</a></div>');

    }
  }

}

// $(function() {
//
//   //モーダルウィンドウを出現させるクリックイベント
//   $("#modal-open").click(function() {
//
//     //キーボード操作などにより、オーバーレイが多重起動するのを防止する
//     $(this).blur(); //ボタンからフォーカスを外す
//     if ($("#modal-overlay")[0]) return false; //新しくモーダルウィンドウを起動しない (防止策1)
//     //if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)
//
//     //オーバーレイを出現させる
//     $("body").append('<div id="modal-overlay"></div>');
//     $("#modal-overlay").fadeIn("slow");
//
//     //コンテンツをセンタリングする
//     centeringModalSyncer();
//
//     //コンテンツをフェードインする
//     $("#modal-content").fadeIn("slow");
//
//     //[#modal-overlay]、または[#modal-close]をクリックしたら…
//     $("#modal-overlay,#modal-close").unbind().click(function() {
//
//       //[#modal-content]と[#modal-overlay]をフェードアウトした後に…
//       $("#modal-content,#modal-overlay").fadeOut("slow", function() {
//
//         //[#modal-overlay]を削除する
//         $('#modal-overlay').remove();
//
//       });
//
//     });
//
//   });
//
//   //リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
//   $(window).resize(centeringModalSyncer);
//
//   //センタリングを実行する関数
//   function centeringModalSyncer() {
//
//     //画面(ウィンドウ)の幅、高さを取得
//     var w = $(window).width();
//     var h = $(window).height();
//
//     // コンテンツ(#modal-content)の幅、高さを取得
//     // jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
//     //		var cw = $( "#modal-content" ).outerWidth( {margin:true} );
//     //		var ch = $( "#modal-content" ).outerHeight( {margin:true} );
//     var cw = $("#modal-content").outerWidth();
//     var ch = $("#modal-content").outerHeight();
//
//     //センタリングを実行する
//     $("#modal-content").css({
//       "left": ((w - cw) / 2) + "px",
//       "top": ((h - ch) / 2) + "px"
//     });
//   }
// });

function movepoint(lat, lng) {
  // console.log(lat)
  // console.log(lng)
  ymap.panTo(new Y.LatLng(lat, lng), true);
}
