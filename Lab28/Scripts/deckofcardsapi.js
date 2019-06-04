

    var deckId = "";

    $(document).ready(function () {
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            method: 'GET',
            success: function (result) {
                deckId = result.deck_id;
                PullCard(5);
            }
        })
});

function CheckCard(card) {
    console.log(card);
    if ($(card).hasClass('checked-card')) {
        $(card).removeClass('checked-card');
    }
    else {

        $(card).addClass('checked-card');
    }
}



function GetCheckedCards() {
    var els = [];
    $('.card-name').each(function () {
        if ($(this).hasClass('checked-card')) {
            if (els.length === 0) {
                els[0] = this.parentElement;
            } else {
                els[els.length] = this.parentElement;
            }
        }
    });
    return els;
}

function PullCard(count) {
    var els;

    if (count === undefined) {
        els = GetCheckedCards();
        count = 5 - els.length;
    }
        if (deckId !== "" || deckId !== 'undefined') {
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/?count=' + count,
            method: 'GET',
            success: function (result) {
                console.log(result);
                $('#deck').fadeOut(10, 'linear');
                $('#deck').html('');
                
                if (count === 5) {
                    for (i = 0; i < result.cards.length; i++) {
                        $('#deck').append('<div class="col-md-2 col-xs-12"><img src="' +
                            result.cards[i].image + '"><div onclick="CheckCard(this)" id="' + result.cards[i].code + '" class="card-name">' + result.cards[i].value + ' ' +
                            result.cards[i].suit + '</div></div>');
                    }
                }
                else {
                    $('#deck').html(els);

                    for (i = 0; i < result.cards.length; i++) {
                        $('#deck').append('<div class="col-md-2 col-xs-12"><img src="' +
                            result.cards[i].image + '"><div onclick="CheckCard(this)" id="' +
                            result.cards[i].code + '" class="card-name">' + result.cards[i].value +
                            ' ' + result.cards[i].suit + '</div></div>');

                    }
                }

                $('#deck').fadeIn(800, 'swing');
            }
        })
    }
    }

    function Shuffle() {

        if (deckId !== "" || deckId !== 'undefined') {
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/' + deckId + '/shuffle/',
            method: 'GET',
            success: function (result) {
                
                $('#deck').html('');
                PullCard(5);
            }
        });
    }
}

