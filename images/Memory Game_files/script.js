//---------------------------------- Document Ready ----------------------------------
        $(document).ready(function(){
            console.log('document.ready is good!');

            $('.card').click(card_clicked);

            $('.reset').click(function () {
                gamesPlayed++;
                reset_stats();
                $('.card').find('.back').show();
            });
            display_stats();
        });

//---------------------------------- Variables for project ----------------------------------
        var first_card_clicked = null;
        var second_card_clicked = null;
        var total_possible_matches = 9;
        var match_counter = 0;

        var matches = 0; //should increment by 1
        var attempts = 0; // every attempt should go + 1
        var accuracy = 0; // defined as a percentage of matches / attempts.
        var gamesPlayed = 0;

//---------------------------------- Checking for cards being clicked ----------------------------------
        function card_clicked (){
            $(this).find('.back').hide();

            if (first_card_clicked === null){
                first_card_clicked = this;
            }else {
                second_card_clicked = this;
                attempts++;
                accuracy = (Math.floor((matches/ attempts) * 100)) + '%';
                display_stats();

                var card1_img = $(first_card_clicked).find('.front').find('img').attr('src');
                var card2_img = $(second_card_clicked).find('.front').find('img').attr('src');

                console.log('This is card 1 ', card1_img);
                console.log('This is card 2 ', card2_img);

                if (card1_img === card2_img){
                    console.log('They were a match!');
                    match_counter = match_counter + 1;
                    first_card_clicked = null;
                    second_card_clicked = null;

                    matches++;

                    accuracy = (Math.floor((matches/ attempts) * 100)) + '%';

                    display_stats();

                    if (match_counter === total_possible_matches){

                        $('.card').hide();
                        var youWin =$('<h1>').addClass('youWin2').text('You are the ruler of Hyrule!');
                        $(youWin).appendTo('#game-area');
                    }
                }
                else{
                    $('.card').off();
                    setTimeout(cardsGoFaceDown, 2000);
                }
            }
        }

//---------------------------------- function for facing cards down ----------------------------------
        function cardsGoFaceDown(){
            $(first_card_clicked).find('.back').show();
            $(second_card_clicked).find('.back').show();

            $('.card').click(card_clicked);

            first_card_clicked = null;
            second_card_clicked = null;

            accuracy = matches/attempts;
        }
//---------------------------------- Display Game Statistics ----------------------------------
        function display_stats() {
            $('.games-played1 .value').text(gamesPlayed);
            $('.attempts .value').text(attempts);
            $('.accuracy .value').text(accuracy);
        }
//---------------------------------- Reset Statistics and restart game ----------------------------------
        function reset_stats() {
            accuracy = 0;
            matches = 0;
            attempts = 0;
            match_counter = 0;
            display_stats();

            $('.youWin2').remove();
            $('.card').show().find('.back').show();
        }