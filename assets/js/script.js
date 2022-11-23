const test = document.querySelectorAll('.form-checkbox');test.forEach((item, idx) => {
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