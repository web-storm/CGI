/// <reference path="../../tools/typings/tsd.d.ts" />

interface MusicInfo {
    artistName: string;
    trackName: string;
    picUrl?: string;
    album?: string;
    date?: string;
    genre?: string;
    previewUrl: string;
}

class iTunesService
{
    requestUrl: string = "https://itunes.apple.com/search";

    searchMusic(request: string): JQueryPromise<MusicInfo[]> {
        return $.ajax(this.requestUrl,
            {
                type: 'GET',
                data: {
                    term: request
                },
                dataType: 'jsonp',
                crossDomain: true
            }).then(musicJSON => {return musicJSON.results;});
    }
    displayData(data: any) {
    /*data.forEach(function(item) {
        item.releaseDate = moment(item.releaseDate).format('MMM Do YYYY');
    });*/
    $( '#dataList' ).html(
        $( '#dataTemplate' ).render( data.results )
    );
}

    constructor() {
        $("#submit_btn").click(() => this.searchMusic("Nightwish"));
    }
}


$(function() {
    var ui = new iTunesService();
});