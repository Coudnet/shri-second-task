import './scss/app.scss'
import './dragndrop.js'
import './twister.js'
import { DevicePagination, ScriptsPagination } from './pagination';

document.addEventListener("DOMContentLoaded", ready);

let devicePagination;
let scriptPagination;
let targetDevice;

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
    document.body.classList.add('hidden-content');

    let parentList = document.getElementById('device-list');
    let target = findParent(event.target, 'device-item');
    let coords = target.getBoundingClientRect();

    targetDevice = target.cloneNode(true);

    targetDevice.style.top = coords.top + "px";
    targetDevice.style.left = coords.left + ( -1 * target.translatex ) -15 + "px";
    targetDevice.style.position = 'fixed';
    targetDevice.classList.add('device-script-selected');

    parentList.appendChild(targetDevice);

    setTimeout(() => {
        targetDevice.style.animationPlayState = 'paused'
    }, 500);
}

function closeScenarioDeviceInfo() {
    document.body.classList.remove('hidden-content');

    targetDevice.style.animationPlayState = 'running';
    setTimeout(() => {
        targetDevice.classList.remove('device-script-selected');
    }, 300);
}

function categoryChecked(event) {
    let target = findParent(event.target, 'favorite-devices-categories-item');
    target.classList.toggle('favorite-devices-categories-item-checked');
}
