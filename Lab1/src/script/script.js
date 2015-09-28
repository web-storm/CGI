function search() {
    var singer = $('#singer').val();
    $.ajax({
        url: 'script/itunes.json',
        //url: 'https://itunes.apple.com/search',
        type: 'GET',
        /*data: {
            term: singer,
            limit: 25
        },
        dataType: 'jsonp',
        crossDomain: true,*/
        success: displayData
    });
}

function displayData(data) {
    console.log(data);
    moment().format('MMM Do YYYY');
    data.results.each(function(item) {
        item.releaseDate = moment(item.releaseDate);
    });
    $( "#dataList" ).html(
        $( "#dataTemplate" ).render( data.results )
    );
}