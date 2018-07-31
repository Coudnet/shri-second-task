import './scss/app.scss'
import './dragndrop.js'
import './twister.js'
import { DevicePagination, ScriptsPagination } from './pagination';

document.addEventListener("DOMContentLoaded", ready);

let devicePagination;
let scriptPagination;
let controlGlobal;
let mainDevicesNum;
let mainDevices;
let currentDelta = 0;

function ready() {
    if(document.getElementsByClassName('app')[0].clientWidth > 1200) {

        let leftArrow = deviceArrows.getElementsByClassName('arrow')[0];
        let rightArrow = deviceArrows.getElementsByClassName('arrow')[1];

        devicePagination = new DevicePagination(leftArrow, rightArrow);

        leftArrow.addEventListener('click', devicePrevPage);
        rightArrow.addEventListener('click', deviceNextPage);

        leftArrow = scriptArrows.getElementsByClassName('arrow')[0];
        rightArrow = scriptArrows.getElementsByClassName('arrow')[1];

        scriptPagination = new ScriptsPagination(leftArrow, rightArrow);

        leftArrow.addEventListener('click', scriptsPrevPage);
        rightArrow.addEventListener('click', scriptsNextPage);

        mainDevices = Array.prototype.slice.call(mainBoardScripts.getElementsByClassName('device-script'));
        mainDevicesNum = mainDevices.length - 2;
        if( mainDevicesNum > 0 ) {
            mainBoardScripts.classList.add('more');
            mainBoardScripts.addEventListener('wheel', onwheel);
        }


    }

    Array.prototype.slice.call(document.getElementsByClassName('device-item')).forEach(elem => {
        elem.addEventListener('click', openScenarioDeviceInfo);
        elem.translatex = 0;
    });

    Array.prototype.slice.call(categories.getElementsByClassName('favorite-devices-categories-item')).forEach(elem => {
        elem.addEventListener('click', categoryChecked);
    });

    deviceControlClose.addEventListener('click', closeScenarioDeviceInfo);
    hamburger.addEventListener('click', menuToggle);
    category.addEventListener('click', categoryToggle);
}

function onwheel(e) {
    if(e.deltaY < 0) {
        currentDelta += e.deltaY > -40 ? -100 : e.deltaY;
    } else {
        currentDelta += e.deltaY < 40 ? 100 : e.deltaY;
    }

    if(currentDelta > 0) {
        mainBoardScripts.classList.remove('more');
        if(currentDelta <= mainDevicesNum * 215) {
            mainDevices.forEach(elem => {
                elem.style.transform = `translateY(-${currentDelta}px)`
            })
        }
    } else {
        currentDelta = 0;
        mainBoardScripts.classList.add('more');
        mainDevices.forEach(elem => {
            elem.style.transform = `translateY(0px)`
        })
    }
}

function scriptsNextPage() {
    scriptPagination.nextPage();
}

function scriptsPrevPage() {
    scriptPagination.prevPage();
}

function deviceNextPage() {
    devicePagination.nextPage();
}

function devicePrevPage() {
    devicePagination.prevPage();
}

function menuToggle() {
    document.getElementsByTagName('nav')[0].classList.toggle('show-menu');
}

function categoryToggle() {
    document.getElementsByClassName('favorite-devices-categories')[0].classList.toggle('show-all-categories');
}

function findParent(elem, className) {
    if(elem.classList.contains(className)) return elem;
    return findParent(elem.parentElement, className);
}

function openScenarioDeviceInfo(event) {
    let target = findParent(event.target, 'device-item');
    let deviceID = target.getAttribute('deviceID');

    document.body.classList.add('hidden-content');
    Array.prototype.slice.call(document.getElementsByClassName('device-control-panel')).forEach(control => {
        if( control.getAttribute('deviceID') === deviceID ) {
            control.style.display = 'block';
            controlGlobal = control;
        }
    });
}

function closeScenarioDeviceInfo() {
    document.body.classList.remove('hidden-content');
    controlGlobal.style.display = 'none';
}

function categoryChecked(event) {
    let target = findParent(event.target, 'favorite-devices-categories-item');
    target.classList.toggle('favorite-devices-categories-item-checked');
}
