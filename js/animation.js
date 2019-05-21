/*******************************************************************************
*
*                               FUNCTIONS
*
*******************************************************************************/
/*******************************************************************************
*
* Using JS to create typewriter animation effect.
* Work for any array string input.
*
*******************************************************************************/
let i = 0;
let textArray = ["Want a cool logo, video, website or app?", "Let's build something wonderful! ❤️."];

function typeWriter(id, inputArray, elementIndex) {
    let idInput = document.getElementById(id);
    let firstline = idInput.querySelector('.firstline');
    let txt = inputArray[elementIndex];


    // If full string hasn't yet been typed out, continue typing.
    if (i < txt.length) {
        firstline.innerText += txt.charAt(i);
        i++;
        setTimeout(typeWriter, 100, id, inputArray, elementIndex);
    }
}

/*******************************************************************************
*
* It depends on the cookie,
* CTA text will show or
* the text in number 6 shows.
*
******************************************************************************/
function txtAppear() {
    let emailForm = document.getElementById('emailForm');

    // Number 6
    // After the user hits send, the page redirect to Formspree reCAPTCHA page.
    // When users are not a robot, redirect back to the original page.
    // Here the text entry field animates out (animate to a point) and
    // the following text appears: Let's build something wonderful! ❤️.
    if (getCookie('sent') >= 1) {
        setTimeout(typeWriter, 0, 'txtIn6', textArray, 1);
    } else {
        // Number 2
        // Animated call to action (CTA) text: Want a cool logo, video, website, or app?
        // Text animation begins 0.5s after page loads. Animation style: typewriter.
        // Run the loop after 0.5s delay.
        setTimeout(typeWriter, 500, 'ctaTxtWrapper', textArray, 0);
    }
}

/*******************************************************************************
*
* cookies handling
*
******************************************************************************/
function setCookies(cname, value) { document.cookie = cname + "=" + value; }
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*******************************************************************************
*
* Button animates to view 0.25s after CTA text animation is complete.
*
******************************************************************************/
function btnAppear() {
    // Number 3
    // Animated CTA button below CTA text.
    // Button animates to view 0.25s after CTA text animation is complete
    // Run the addCtaBtn function after 0.25s delay.
    let ctaBtn = document.getElementById('ctaBtn');
    ctaBtn.style.display = 'block';
}

function btnChangeColorandTxt() {
    // Number 7
    // About 1s after the text in 6 appears,
    // the link with text ‘re-send form’, appears below the text.

    let ctaBtn = document.getElementById('ctaBtn');
    ctaBtn.innerText = 'Re-send form';
    ctaBtn.style.display = 'block';
    ctaBtn.style.backgroundColor = '#108AF3';

}

function showBtn() {
    if (getCookie('sent') >= 1) {
        setTimeout(btnChangeColorandTxt, 4600);
    } else {
        setTimeout(btnAppear, 4250);
    }
}

function hideBtn() {
    let ctaBtn = document.getElementById('ctaBtn');
    ctaBtn.style.display = 'none';
}


/*******************************************************************************
* This is used for the onclick ctaBtn event.
* When users click on the CTA button.
* The CTA text fades out (Text in 6 also fade outs if users hit the Re-send form).
* The CTA button is also faded out.
*
* Then the form will be displayed.
******************************************************************************/
function formAppear() {
    let ctaTxtWrapper   = document.getElementById('ctaTxtWrapper');
    let txtIn6          = document.getElementById('txtIn6');
    let ctaBtnWrapper   = document.getElementById('ctaBtnWrapper');
    let ctaBtn          = document.getElementById('ctaBtn');

    let emailForm       = document.getElementById('emailForm');



    // Initially, form are not shown, so show it for the first time When
    // users on click CTA button.
    ctaBtn.addEventListener('click', function() {
        ctaTxtWrapper.classList.add('fadeOut');
        ctaBtnWrapper.classList.add('fadeOut');
        txtIn6.classList.add('fadeOut');

        emailForm.style.display = 'flex';
    }, false);

}

/*******************************************************************************
 * After the user types their email,
 * the send button appears below the text entry field, to the right.
 ******************************************************************************/
function userTypeEmail() {
    let txtEntryFieldWrapper = document.getElementById('txtEntryFieldWrapper');
    let txtEntryField = document.getElementById('txtEntryField');
    let sendBtn = document.getElementById('sendBtn');
    txtEntryField.addEventListener('keyup', function() {
        if (txtEntryField.value !== "") {
            txtEntryFieldWrapper.classList.add('txtEntryFieldWrapper');
            txtEntryField.classList.add('txtEntryField');
            sendBtn.style.display = 'block';
        } else {
            txtEntryFieldWrapper.classList.remove('txtEntryFieldWrapper');
            txtEntryField.classList.remove('txtEntryField');
            sendBtn.style.display = 'none';
        }
    }, false);
}








/*******************************************************************************
*
*                          JavaScript FUNCTION CALLS
*
*******************************************************************************/
// Number 2 or number 6
txtAppear();

// Number 3 or number 7
/*
            Handle for changing between big and mobile screen.
------------------------------------------------------------------------------*/
let windowInnerWidth = window.innerWidth;
if (windowInnerWidth > 480) {
    showBtn();
} else {
    hideBtn();
}

// window.resize callback function.
function getDimensionsAndShoworHighBtn() {
    windowInnerWidth = window.innerWidth;

    if (windowInnerWidth > 480) {
        showBtn();
    } else {
        hideBtn();
    }
}



// Debouncing.
// Function will only be called once the resizing is “complete.”
let timeOut = false;
window.addEventListener('resize', function() {
    // Clear the time out.
    clearTimeout(timeOut);

    // Start timing for event "completion".
    timeOut = setTimeout(getDimensionsAndShoworHighBtn, 250);
});







// Submit form handling.
let emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', function() {
    if (typeof(localStorage.sent) == "undefined") {
        localStorage.sent = 1;

        let value = localStorage.sent;
        setCookies('sent', value);
    } else {
        localStorage.sent++

        let value = localStorage.sent;
        setCookies('sent', value);
    }
}, false);


// Number 4
formAppear();

// Number 5
userTypeEmail();
