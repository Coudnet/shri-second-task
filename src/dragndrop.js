
let sliderElems = document.getElementsByClassName('bar');

Array.prototype.slice.call(sliderElems).forEach(sliderElem => {
    let thumbElem = sliderElem.getElementsByClassName('toggle')[0];

    sliderElem.onmousedown = onMouseDownProto(thumbElem, sliderElem);

    if ( document.getElementsByClassName('app')[0].clientWidth > 768 ) {
        thumbElem.addEventListener("touchstart", handleStartProto(thumbElem, sliderElem), false);
    } else {
        thumbElem.addEventListener("touchstart", handleStartMobileProto(thumbElem, sliderElem), false);
    }
});


function handleStartMobileProto(thumbElem, sliderElem) {
    return function (e) {
        let thumbCoords = getCoords(thumbElem);
        let shiftY = e.changedTouches[0].pageY - thumbCoords.top;
        let sliderCoords = getCoords(sliderElem);

        sliderElem.addEventListener("touchmove", function (e) {
            let newTop = e.changedTouches[0].pageY - shiftY - sliderCoords.top;

            if (newTop < 0) {
                newTop = 0;
            }
            let bottomEdge = sliderElem.offsetHeight - thumbElem.offsetHeight;
            if (newTop > bottomEdge) {
                newTop = bottomEdge;
            }

            thumbElem.style.top = newTop + 'px';
        }, false);
        sliderElem.addEventListener('touchend', function () {
            sliderElem.removeEventListener('touchmove');
            sliderElem.removeEventListener('touchend');
        })
    }
}

function handleStartProto(thumbElem, sliderElem) {
    return function (e) {
        let thumbCoords = getCoords(thumbElem);
        let shiftX = e.changedTouches[0].pageX - thumbCoords.left;
        let sliderCoords = getCoords(sliderElem);

        sliderElem.addEventListener("touchmove", function (e) {
            let newLeft = e.changedTouches[0].pageX - shiftX - sliderCoords.left;

            if (newLeft < 0) {
                newLeft = 0;
            }
            let rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            thumbElem.style.left = newLeft + 'px';
        }, false);
        sliderElem.addEventListener('touchend', function () {
            sliderElem.removeEventListener('touchmove');
            sliderElem.removeEventListener('touchend');
        })
    }
}

function onMouseDownProto(thumbElem, sliderElem) {
    return function (e) {

        let thumbCoords = getCoords(thumbElem);
        let shiftX = e.pageX - thumbCoords.left;

        let sliderCoords = getCoords(sliderElem);

        sliderElem.onmousemove = function (e) {
            let newLeft = e.pageX - shiftX - sliderCoords.left;

            if (newLeft < 0) {
                newLeft = 0;
            }
            let rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            thumbElem.style.left = newLeft + 'px';
        };

        sliderElem.onmouseup = function () {
            sliderElem.onmousemove = sliderElem.onmouseup = null;
        };

        return false;
    }
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}