const test = document.querySelectorAll('.form-checkbox');
test.forEach((item, idx) => {
    item.addEventListener('change', function(){
        console.log('clicked');
    });
});

const bookingBtn = $('.booking-btn');
const bookingSection = $('#slideSection');
$(bookingBtn).click(function(){
    console.log('clicked here');
    $(bookingSection).addClass('show-booking');
});

$(document).ready(function(){
    $(window).scroll(function(){
        console.log($(this).scrollTop());
        if($(this).scrollTop() >= 0){
            $('.hdr-banner').css('background', 'url("../../assets/images/banner-img-1.png") center/cover no-repeat');
        }
        if($(this).scrollTop() >= 240){
            $('.hdr-banner').css('background', 'url("../../assets/images/banner-img-2.png") center/cover no-repeat');
        }
        
        if($(this).scrollTop() >= 500){
            console.log("reached here");
            $('.hdr-banner').css('background', 'url("../../assets/images/banner-img-3.png") center/cover no-repeat');
            
            
        }

        if($(this).scrollTop() >= 828){
            $('.header').css('position', 'relative');
        } else {
            $('.header').css('position', 'fixed');
        }
    });
});