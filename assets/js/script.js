

// $(document).ready(function(){
//     $(window).scroll(function(){
//         console.log($(this).scrollTop());
//         if($(this).scrollTop() >= 0){
//             $('.hdr-banner').css('background', 'url("../../assets/images/banner-img-1.png") center/cover no-repeat');
//         }
//         if($(this).scrollTop() >= 240){
//             $('.hdr-banner').css('background', 'url("../../assets/images/banner-img-2.png") center/cover no-repeat');
//         }
        
//         if($(this).scrollTop() >= 500){
//             console.log("reached here");
//             $('.hdr-banner').css('background', 'url("../../assets/images/banner-img-3.png") center/cover no-repeat');
//         }

//         if($(this).scrollTop() >= 828){
//             $('.header').css('position', 'relative');
//         } else {
//             $('.header').css('position', 'fixed');
//         }
//     });
// });




$(document).ready(function(){
    const hdrBanner = $('.hdr-banner');
    // const test = document.querySelectorAll('.form-checkbox');
    // test.forEach((item, idx) => {
    //     item.addEventListener('change', function(){
    //         console.log('clicked');
    //     });
    // });
    const bookingBtn = $('.booking-btn');
    const bookingSection = $('#slideSection');

    // slide show of the booking form
    $(bookingBtn).click(function(){
        $(bookingSection).addClass('show-booking');
    });

    // change background on every 3s
    let sliderCountValue = 1;
    setInterval(function(){
        if(sliderCountValue > 3) sliderCountValue = 1;
        $(hdrBanner).css('background', `url("../../assets/images/banner-img-${sliderCountValue}.png") center/cover no-repeat`);
        sliderCountValue++;
    }, 3000);
});

$(function() {
    $( "#resizable" ).resizable();
});