/// <reference path="../../tools/typings/tsd.d.ts" />

interface MusicInfo {
    artistName: string;
    trackName: string;
    artworkUrl100?: string;
    collectionCensoredName?: string;
    releaseDate?: string;
    date?: string;
    primaryGenreName?: string;
    previewUrl: string;
}

class iTunesService
{
    requestUrl: string = "https://itunes.apple.com/search";

    private serverRequest(request: string): JQueryPromise<MusicInfo[]> {
        var ajaxSettings = {
            type: 'GET',
            data: {
                term: request
            },
            dataType: 'jsonp',
            crossDomain: true
        };
        return $.ajax(this.requestUrl, ajaxSettings)
            .then(musicJSON => {return musicJSON.results;});
    }

    private changeWarningStatus(isEmpty: boolean) {
        isEmpty ? $('#warning').show() : $('#warning').hide();
    }

    private musicSearch() {
        var request = $("#term").val();
        var isEmpty = request == "";
        this.changeWarningStatus(isEmpty);
        if (!isEmpty) {
            this.serverRequest(request)
                .then(music => this.displayData(music));
        }
    }

    private displayData(data: MusicInfo[]) {
        data.forEach(function (item) {
            item.date = moment(item.releaseDate).format('MMM Do YYYY');
        });
        $('#dataList').html(
            $('#dataTemplate').render(data)
        );
    }

    constructor() {
        $( '#submit_btn' ).bind('click', () => this.musicSearch());
    }
}

$(function() {
    var ui = new iTunesService();
});