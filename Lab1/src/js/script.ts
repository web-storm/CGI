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

    private searchMusic(request: string): JQueryPromise<MusicInfo[]> {
        var ajaxSettings = {
            type: 'GET',
            data: {
                term: request
            },
            dataType: 'jsonp',
            crossDomain: true
            //success: this.displayData
        };
        return $.ajax(this.requestUrl, ajaxSettings)
            .then(musicJSON => {return musicJSON.results;});
    }

    private test(request: string) {
        var test1 = this.searchMusic(request)
            .then(music => this.displayData(music));
    }

    private displayData(data: MusicInfo[]) {
        data.forEach(function (item) {
            //item.date = moment(item.date).format('MMM Do YYYY');
        });
        $('#dataList').html(
            $('#dataTemplate').render(data)
        );
    }

    constructor() {
        $( '#submit_btn' ).click(() => this.test("Nightwish"));
    }
}


$(function() {
    var ui = new iTunesService();
});