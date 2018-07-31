let pieElems = document.getElementsByClassName('pie');

Array.prototype.slice.call(pieElems).forEach(pieElem => {

    pieElem.onmousedown = handleMouseDownProto(pieElem);
    pieElem.ondragstart = function() {
        return false;
    };

    pieElem.addEventListener("touchstart", handleTouchStartProto(pieElem), false);
});


function handleMouseDownProto(pie) {
    return function (e) {

        let twister = pie.getElementsByClassName('twister-active-element')[0];
        let pieCoords = getCoords(pie);
        let tempText = pie.getElementsByClassName('twister-temp')[0].getElementsByTagName('span')[0];

        if (e.pageX < pieCoords.left || e.pageX > pieCoords.right) return false;

        document.onmousemove = function (e) {
            if (e.pageX < pieCoords.left || e.pageX > pieCoords.right) return false;

            let degrees = 0;
            let temp = 0;
            let adjCathetus = e.pageX - (pieCoords.left + 110);
            let oppCathetus = -1 * (e.pageY - (pieCoords.top + 110));
            let atan = Math.atan(oppCathetus / adjCathetus);

            if (adjCathetus < 0 && oppCathetus > 0) {
                degrees = 180 + (atan * 180 / Math.PI);
            } else if (adjCathetus < 0 && oppCathetus < 0) {
                degrees = 180 + (atan * 180 / Math.PI);
            } else if (adjCathetus > 0 && oppCathetus < 0) {
                degrees = 360 + (atan * 180 / Math.PI);
            } else {
                degrees = atan * 180 / Math.PI;
            }

            if (degrees < 320 && degrees > 260) return false;

            if (degrees < 360 && degrees > 260) temp = 30 - ((degrees - 320) * 0.1);
            else temp = 30 - (degrees * 0.1 + 4);
            tempText.innerHTML = '+' + Math.floor(temp);

            twister.style.transform = `rotate(${-1 * (degrees + 20)}deg)`;
            if (degrees > 110 && degrees < 310) {
                pie.classList.add('grey-indicator');
                pie.pseudoStyle("before", "transform", `rotate(${-1 * (degrees - 110)}deg)`);
                pie.pseudoStyle("before", "z-index", `1`);
                pie.pseudoStyle("after", "z-index", `2`);

            } else {
                pie.classList.remove('grey-indicator');
                pie.pseudoStyle("after", "transform", `rotate(${-1 * (degrees + 70)}deg)`);
                pie.pseudoStyle("after", "z-index", `1`);
                pie.pseudoStyle("before", "z-index", `2`);
            }
        };

        document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    }
}

function handleTouchStartProto(pie) {
    return function (e) {
        let twister = pie.getElementsByClassName('twister-active-element')[0];
        let pieCoords = getCoords(pie);
        let tempText = pie.getElementsByClassName('twister-temp')[0].getElementsByTagName('span')[0];

        if (e.changedTouches[0].pageX < pieCoords.left || e.changedTouches[0].pageX > pieCoords.right) return false;

        document.addEventListener("touchmove", function (e) {
            if (e.changedTouches[0].pageX < pieCoords.left || e.changedTouches[0].pageX > pieCoords.right) return false;

            let degrees = 0;
            let temp = 0;
            let adjCathetus = e.changedTouches[0].pageX - (pieCoords.left + 110);
            let oppCathetus = -1 * (e.changedTouches[0].pageY - (pieCoords.top + 110));
            let atan = Math.atan(oppCathetus / adjCathetus);

            if (adjCathetus < 0 && oppCathetus > 0) {
                degrees = 180 + (atan * 180 / Math.PI);
            } else if (adjCathetus < 0 && oppCathetus < 0) {
                degrees = 180 + (atan * 180 / Math.PI);
            } else if (adjCathetus > 0 && oppCathetus < 0) {
                degrees = 360 + (atan * 180 / Math.PI);
            } else {
                degrees = atan * 180 / Math.PI;
            }

            if (degrees < 320 && degrees > 260) return false;

            if (degrees < 360 && degrees > 260) temp = 30 - ((degrees - 320) * 0.1);
            else temp = 30 - (degrees * 0.1 + 4);
            tempText.innerHTML = '+' + Math.floor(temp);

            twister.style.transform = `rotate(${-1 * (degrees + 20)}deg)`;
            if (degrees > 110 && degrees < 310) {
                pie.classList.add('grey-indicator');
                pie.pseudoStyle("before", "transform", `rotate(${-1 * (degrees - 110)}deg)`);
                pie.pseudoStyle("before", "z-index", `1`);
                pie.pseudoStyle("after", "z-index", `2`);

            } else {
                pie.classList.remove('grey-indicator');
                pie.pseudoStyle("after", "transform", `rotate(${-1 * (degrees + 70)}deg)`);
                pie.pseudoStyle("after", "z-index", `1`);
                pie.pseudoStyle("before", "z-index", `2`);
            }
        });
    }
}

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        right: box.right + pageXOffset
    };
}


let UID = {
    _current: 0,
    getNew: function(){
        this._current++;
        return this._current;
    }
};

HTMLElement.prototype.pseudoStyle = function(element, prop, value){
    let _this = this;
    let _sheetId = "pseudoStyles";
    let _head = document.head || document.getElementsByTagName('head')[0];
    let _sheet = document.getElementById(_sheetId) || document.createElement('style');
    _sheet.id = _sheetId;
    let className = "pseudoStyle" + UID.getNew();

    _this.className +=  " "+className;

    _sheet.innerHTML += "\n."+className+"::"+element+"{"+prop+":"+value+"}";
    _head.appendChild(_sheet);
    return this;
};