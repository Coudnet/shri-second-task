
let sliderElems = document.getElementsByClassName('bar');

Array.prototype.slice.call(sliderElems).forEach(sliderElem => {
    let thumbElem = sliderElem.getElementsByClassName('toggle')[0];

    sliderElem.onmousedown = onMouseDownProto(thumbElem, sliderElem);
    sliderElem.ondragstart = function() {
        return false;
    };

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

        document.addEventListener("touchmove", function (e) {
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
    }
}

function handleStartProto(thumbElem, sliderElem) {
    return function (e) {
        let thumbCoords = getCoords(thumbElem);
        let shiftX = e.changedTouches[0].pageX - thumbCoords.left;
        let sliderCoords = getCoords(sliderElem);

        document.addEventListener("touchmove", function (e) {
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
    }
}

function onMouseDownProto(thumbElem, sliderElem) {
    return function (e) {

        let thumbCoords = getCoords(thumbElem);
        let shiftX = e.pageX - thumbCoords.left;

        let sliderCoords = getCoords(sliderElem);

        document.onmousemove = function (e) {
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

        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
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