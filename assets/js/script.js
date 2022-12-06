$(document).ready(function(){

    
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
        if($(location).find('option:selected') && $(location).find('option:selected').is(":enabled")){
            if(validateText(name) && validateText(email) && validateText(whatsapp) && validateDropdown(bookday) && validateDropdown(booktime)){
                $('.ms-book-1').css('display', 'none');
                $('.ms-book-2').css('display', 'block');
            }
        } else {
            alert("donwload pdf");
        }
    });

    // $('.details-btn').click(function(){
    //     if(validateText(name) && validateText(email) && validateText(whatsapp) && validateDropdown(bookday) && validateDropdown(booktime) && validateDropdown(location)){
    //         $('.ms-book-1').css('display', 'none');
    //         $('.ms-book-2').css('display', 'block');
    //     }
    // });

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

        // 
        let selectedValue = $('.test-val');
        // 

        for(let i = 0; i < noOfBookingOpt; i++){
            const tempDiv = $('<div>', { "class" : "treatment-item"});
            $(tempDiv).html(`
                <div class = "treatment-item-l">
                    <select name = "" class = "form-control fcustomer">
                            <option selected disabled>Customer ${i + 1} treatment</option>
                        <optgroup label="CLASSIC EVERYDAY MASSAGE">
                            <option value = "" >Traditional Thai Massage</option>
                            <option value="">Aromatherapy Oil Massage</option>
                        </optgroup>
                        <optgroup label="CLASSIC EVERYDAY MASSAGE">
                            <option value = "" class = "vals-60-90">Neck, Shoulders and Back Massage</option>
                            <option value="">Aromatherapy Sport Massage</option>
                        </optgroup>
                        <optgroup label="CLASSIC EVERYDAY MASSAGE">
                            <option value="">After Sun Aromatherapy Massage</option>
                            <option value="">Slimming Massage</option>
                            <option value="">Warm Candle Oil Massage</option>
                            <option value = "" class = "vals-90-120">Herbal Pack Aromatherapy Massage</option>
                            <option value="" class = "vals-90-120 hot-stone">Hot Stones Aromatherapy Massage</option>
                        </optgroup>
                        <optgroup label="OTHER LUXURIOUS TREATMENTS">
                            <option value="">Cannabis (Cannabidiol) Massage</option>
                            <option value="">Aromatherapy Gold Massage</option>
                            <option value="">Four Hands Massage</option>
                            <option value = "" class = "steps-active">Facial Deep Skin Cleansing</option>
                            <option value="" class = "vals-60-90">Full-Body Scrubs</option>
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

        selectFunction(selectedValue.val());

        const stepsOptions = $('.steps-active');
        jQuery.each(stepsOptions, function(idx, stepOption){
            // console.log(stepOption);
            $(stepOption).parent().parent().change(function(){
                // show steps instead of mins
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

        jQuery.each($('.treatment-list .treatment-item-l select'), function(idx, selectItem){
            if($(selectItem).change(function(){
                // show only 60 and 90 mins options
                if($(selectItem).find('option:selected').hasClass("vals-60-90")) { 
                    findSixtyNinty($(selectItem)); 
                }
                // show only 90 and 120 mins options
                if($(selectItem).find('option:selected').hasClass("vals-90-120"))
                {
                    findNintyOneTwenty(selectItem);
                } 
            }));
        });
    });
});

function findSixtyNinty(selectItem){
    let rightOptions = $(selectItem).parent().next();
    rightOptions.html(`
        <select name = "" class = "form-control fminsOrSteps">
            <option selected disabled>Mins</option>
            <option value = "60">60</option>
            <option value = "90">90</option>
        </select>  
    `);
}

function findNintyOneTwenty(selectItem){
    let rightOptions = $(selectItem).parent().next();
    rightOptions.html(`
        <select name = "" class = "form-control fminsOrSteps">
            <option selected disabled>Mins</option>
            <option value = "90">90</option>
            <option value = "120">120</option>
        </select>  
    `);
}

const selectFunction = (selectedValue) => {
    jQuery.each($('.treatment-list .treatment-item-l option'), function(idx, optionItem){
        if($(optionItem).hasClass(selectedValue)){
            $(optionItem).attr('selected', true);
            findSixtyNinty($(optionItem).parent().parent());
            findNintyOneTwenty($(optionItem).parent().parent());
        }
    });
}

$(function() {
    $( "#resizable" ).resizable();
});







