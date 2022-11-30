$(document).ready(function(){
//     $(window).bind('resize',function(){
//         window.location.href = window.location.href;
//    });
    // change background on every 3s
    // let sliderCountValue = 1;
    // setInterval(function(){
    //     if(sliderCountValue > 3) sliderCountValue = 1;
    //     $video = $('.video-wrapper video');

    //     if(sliderCountValue == 4){
    //         videoSrc = $('source', $video).attr('src', `/assets/videos/video-${sliderCountValue}.mpeg`);
    //         videoSrc = $('source', $video).attr('type', `video/mpeg`);
    //     } else {
    //         videoSrc = $('source', $video).attr('src', `/assets/videos/video-${sliderCountValue}.webm`);
    //     }

    //     $video.fadeOut(500, function(){
    //         $video.fadeIn(500);
    //         $video[0].load();
    //         $video[0].play();
    //         sliderCountValue++;
    //     });
    // }, 5000);

    $

    $('.video-wrapper').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    const radioElems = $('.ms-book .radio-elem-1 .form-radio');
    jQuery.each(radioElems, function(idx, radioElem){
        $(radioElem).change(function(){
            if(idx == 0){
                $('.ms-book .placeholder-one').attr('placeholder', 'Hotel name');
                $('.ms-book .placeholder-two').attr('placeholder', 'Room Number');
            } else if(idx == 1){
                $('.ms-book .placeholder-one').attr('placeholder', 'Villa name');
                $('.ms-book .placeholder-two').attr('placeholder', 'Villa address');
            }
        });
    });

    const locationOpt = $('#locationOpt');
    let isLocSelected = false;
    $(locationOpt).change(function(){
        isLocSelected = true;
        if(isLocSelected == true){
            $('.ms-book .form-btn').text("Go to treatment details >");
            $('.ms-book .form-btn').addClass('change-btn');
        }
    });

    // booking btns and validation
    let name = $('.fname');
    let email = $('.femail');
    let whatsapp = $('.fwhatsapp');
    let bookday = $('.fbook-day');
    let booktime = $('.fbook-time');
    let location = $('.flocation');

    let bookingno = $('.fbooking-no');
    let treatment = $('.ftreatment');
    let MinsOrSteps = $('.fminsOrSteps');

    // #####################################
    const showErrorMsg = (inputContainer) => {
        const formElem = $(inputContainer).parent();
        const msgElem = $("<span class = 'error-msg'>This field is required*</span>");
        $(formElem).append(msgElem);
    }

    const hideErrorMsg = () => {
        $('.error-msg').prev().next().remove();
    }

    const validateText = (inputText) => {
        if(inputText.val().trim().length > 0){
            return true;
        } else {
            showErrorMsg(inputText);
            setTimeout(() => {
                hideErrorMsg(inputText);
            }, 1000);
            return false;
        }
    }

    const validateDropdown = (dropdown) => {
        if($(dropdown).find('option:selected') && $(dropdown).find('option:selected').is(":enabled")){
            return true;
        } else {
            showErrorMsg(dropdown);
            return false;
        }
    }

    // ############################################3

    $('.booking-btn').click(function(){
        $('.ms-types').css('display', 'none');
        $('.ms-book-1').css('display', 'block');
    })

    $('.details-btn').click(function(){
        if(validateText(name) && validateText(email) && validateText(whatsapp) && validateDropdown(bookday) && validateDropdown(booktime) && validateDropdown(location)){
            $('.ms-book-1').css('display', 'none');
            $('.ms-book-2').css('display', 'block');
        }
    });

    $('.submit-btn').click(function(){
        if(validateDropdown(bookingno)){
            let treatmentItemsCount = $('.treatment-item').length;
            let totalSelectionCount = $('.selection-active').length;

            if(totalSelectionCount == (2 * treatmentItemsCount)){
                $('.ms-book-2').css('display', 'none');
                $('.ms-book-3').css('display', 'block');
            }
        }        
    });

    // jquery close btn
    $('.close-form-btn').click(function(){
        $('.ms-book-3').css('display', 'none');
        $('.ms-types').css('display', 'block');
    });

    // no of booking section
    const noOfBooking = $(".ms-book-2 #noOfBooking");
    const treatmentListContainer = $('.treatment-list');
    $(noOfBooking).change(function(){
        let noOfBookingOpt = $(this).children("option:selected").val();
        treatmentListContainer.html("");

        for(let i = 0; i < noOfBookingOpt; i++){
            const tempDiv = $('<div>', { "class" : "treatment-item"});
            $(tempDiv).html(`
                <div class = "treatment-item-l">
                    <select name = "" class = "form-control fcustomer">
                            <option selected disabled>Customer ${i + 1} treatment</option>
                        <optgroup label="CLASSIC EVERYDAY MASSAGE">
                            <option value = "">Traditional Thai Massage</option>
                            <option value="">Aromatherapy Oil Massage</option>
                        </optgroup>
                        <optgroup label="CLASSIC EVERYDAY MASSAGE">
                            <option value = "">Neck, Shoulders and Back Massage</option>
                            <option value="">Aromatherapy Sport Massage</option>
                        </optgroup>
                        <optgroup label="CLASSIC EVERYDAY MASSAGE">
                            <option value="">After Sun Aromatherapy Massage</option>
                            <option value="">Slimming Massage</option>
                            <option value="">Warm Candle Oil Massage</option>
                            <option value = "">Herbal Pack Aromatherapy Massage</option>
                            <option value="">Hot Stones Aromatherapy Massage</option>
                        </optgroup>
                        <optgroup label="OTHER LUXURIOUS TREATMENTS">
                            <option value="">Cannabis (Cannabidiol) Massage</option>
                            <option value="">Aromatherapy Gold Massage</option>
                            <option value="">Four Hands Massage</option>
                            <option value = "" class = "steps-active">Facial Deep Skin Cleansing</option>
                            <option value="">Full-Body Scrubs</option>
                        </optgroup>
                    </select>
                </div>
                
                <div class = "treatment-item-r">
                    <select name = "" class = "form-control fminsOrSteps">
                        <option selected disabled>Mins</option>
                        <option value = "60">60</option>
                        <option value = "90">90</option>
                        <option value = "120">120</option>
                    </select>
                </div>
            `);
            $(treatmentListContainer).append(tempDiv);
        }

        const stepsOptions = $('.steps-active');
        jQuery.each(stepsOptions, function(idx, stepOption){
            // console.log(stepOption);
            $(stepOption).parent().parent().change(function(){
                if($(this).find('option:selected').attr('class') == "steps-active"){
                    let rightOptions = $(stepOption).parent().parent().parent().next();
                    rightOptions.html(`
                        <select name = "" class = "form-control">
                            <option selected disabled>Steps</option>
                            <option value ="8">8</option>
                            <option value = "12">12</option>
                        </select>   
                    `);
                } else {
                    let rightOptions = $(stepOption).parent().parent().parent().next();
                    rightOptions.html(`
                        <select name = "" class = "form-control">
                            <option selected disabled>Mins</option>
                            <option value = "60">60</option>
                            <option value = "90">90</option>
                            <option value = "120">120</option>
                        </select> 
                    `);
                }
            });
        });

        const treatmentItems = $('.treatment-item');
        jQuery.each(treatmentItems, function(idx, treatmentItem){
            let totalSelectionCount = 0;
            $(treatmentItem).find('.treatment-item-l').change(function(){
                $(this).addClass('change-selected');
                $(this).addClass('selection-active');
                totalSelectionCount = $('.selection-active').length;

                if(totalSelectionCount == (2 * Number(noOfBookingOpt))){
                    $('.submit-btn').text("Submit your booking");
                    $('.submit-btn').addClass('change-btn');
                }
            });

            $(treatmentItem).find('.treatment-item-r').change(function(){
                $(this).addClass('change-selected');
                $(this).addClass('selection-active');
                totalSelectionCount = $('.selection-active').length;

                if(totalSelectionCount == (2 * Number(noOfBookingOpt))){
                    $('.submit-btn').text("Submit your booking");
                    $('.submit-btn').addClass('change-btn');
                }
            });
        });
    });
});

$(function() {
    $( "#resizable" ).resizable();
});

$('.grid').imagesLoaded( function() {
    $('.grid').masonry({
        itemSelector: '.grid-item',
        // columnWidth: 200
    });
});






