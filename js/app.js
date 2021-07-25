$(document).ready(function(){
    $('.js-up_down-indicator').click(function(){
        $(this).parent().parent().find('.js-expandable').slideToggle();
        if($(this).find('i').hasClass('fa-caret-up')){
            $(this).find('i').removeClass('fa-caret-up');
            $(this).find('i').addClass('fa-caret-down');
        }else if ($(this).find('i').hasClass('fa-caret-down')){
            $(this).find('i').removeClass('fa-caret-down');
            $(this).find('i').addClass('fa-caret-up');
        }
        //alert("Show");
    });

    $('.js-plus_minus-indicator').click(function(){
        $(this).parent().parent().find('.js-expandable-item').slideToggle();
        if($(this).find('i').hasClass('fa-plus')){
            $(this).find('i').removeClass('fa-plus').addClass('fa-minus');
            $(this).find('span').text("Hide Details ");
        }else if ($(this).find('i').hasClass('fa-minus')){
            $(this).find('i').removeClass('fa-minus').addClass('fa-plus');
            $(this).find('span').text("View Details ");
        }
    });
});