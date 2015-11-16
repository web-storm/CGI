function search() {
    var term = $('#term').val();
    if (!term) {
        $('#warning').show();
        return;
    }
    $.ajax({
        //url: 'script/itunes.json',
        url: 'https://itunes.apple.com/search',
        type: 'GET',
        data: {
            term: term
        },
        dataType: 'jsonp',
        crossDomain: true,
        success: displayData
    });
    $('#warning').hide();
}

function displayData(data) {
    data.results.forEach(function(item) {
        item.releaseDate = moment(item.releaseDate).format('MMM Do YYYY');
    });
    $( '#dataList' ).html(
        $( '#dataTemplate' ).render( data.results )
    );
}

$(function() {
   $('#submit_btn').click(search);
});