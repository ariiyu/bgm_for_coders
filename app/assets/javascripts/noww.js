//使うかどうか検討

$(function() {



    SC.initialize({
        client_id: "13124d7eeeada74e2296f4088a6dff13"
    });

    var widget;

    //ランダムトラックを定義する
    function getRandomTrack(aTag) {
        this.randomTrack = containsAllUris[aTag][Math.floor(Math.random()*containsAllUris[aTag].length)];
        this.whatTag = aTag;
        return randomTrack;
    }
    //ランダムトラックをロードして次の曲を再生する
    function playNextTrack(widget) {
        widget.load(getRandomTrack(this.whatTag).uri, {
            auto_play: true
        });
        setTimeout(waitGetCurrent, 3000);
    }
    //SC.oEmbedしてウィジェットを定義する
    function play(track) {
        var currentTrack = null;
        SC.oEmbed(track.uri, {auto_play: true, maxwidth: "612px"}, function(oembed) {
            $(".music").html(oembed.html);
            widget = SC.Widget($(".music iframe")[0]);
            widget.bind(SC.Widget.Events.READY, function (e) {
                $(".next").click(function() {
                    playNextTrack(widget);
                });
                widget.bind(SC.Widget.Events.FINISH, function () {
                    playNextTrack(widget);
                });
                widget.getCurrentSound(function(currentTrack) {
                    console.log(currentTrack);
                    console.log("Sound Title: " + currentTrack.title);
                    console.log(currentTrack.user.username);
                    console.log(currentTrack.permalink_url);
                    $favorited_sound_id = currentTrack.id;
                    $favorited_sound_title = currentTrack.title;
                    $favorited_sound_username = currentTrack.user.username;
                    $favorited_sound_url = currentTrack.permalink_url;
                });
                /**    		    widget.setVolume(100);
                 widget.getVolume(function(volume) {
    	          console.log('current volume value is ' + volume);
	      		});
                 **/
            });
        });
    }


    //タグに基づいてトラックを取得する
    var containsAllUris = {};
    var countCheck = 0;
    var tagCount = $(".subNav li").length;


    function getTrack(tag) {
        SC.get("/tracks?filter=public&q=" + tag, {limit: 50}, function(tracks) {
            containsAllUris[tag] = tracks;
            counts();
        });
    };

    //カウントアップする
    function counts() {
        countCheck++;
        if ( countCheck < tagCount ) {

        }  else  {
            play(getRandomTrack($clickedWord));
        };
    };



    //↓ブラウザのロード時に実行↓
    var widget;
    var $clickedWord;
    var $initialWord = new Array('Coffee', 'Ambient', 'ELECTROHOUSE', 'EDM', '作業用');  //$(".subNav li")に入っているワード
    $clickedWord = $initialWord[Math.floor(Math.random() * $initialWord.length)];


    //liごとにトラックをプリロード
    $(".subNav li").each( function() {
        getTrack($(this).text());
    });




/*
    //FBボタンの表示を調整
    $("#modalLink").click(function() {
        $("div.fb-like").css("width", "73px");
        $("iframe.fb_ltr").css("width", "73px");

    });
  */
});