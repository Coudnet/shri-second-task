class Pagination {
    constructor(leftArrow, rightArrow) {
        this.currentPage = 0;
        this.currentTransform = 0;
        this.leftArrow = leftArrow;
        this.rightArrow = rightArrow;
    }

    prevPage() {
        if(this.currentPage > 0) {
            this.currentTransform += this.pageWidth;
            this.currentPage--;
            this.rightArrow.classList.add('active-arrow');
            if( !this.currentPage ) this.leftArrow.classList.remove('active-arrow');
            this.render();
        }
    }
    nextPage() {
        if(this.currentPage < this.pages) {
            this.currentTransform -= this.pageWidth;
            this.currentPage++;
            this.leftArrow.classList.add('active-arrow');
            if( this.currentPage == this.pages ) this.rightArrow.classList.remove('active-arrow');
            this.render();
        }
    }

    render() {
        this.elements.forEach((elem) => {
            elem.style.transform = `translateX(${this.currentTransform}px)`;
            elem.translatex = this.currentTransform;
        })
    }
}

class DevicePagination extends Pagination {

    constructor(leftArrow, rightArrow) {

        super(leftArrow, rightArrow);

        let itemsCollection = document.getElementsByClassName('device-item');
        this.elements = Array.prototype.slice.call(itemsCollection);
        let appWidth = document.getElementsByClassName('app')[0].clientWidth;
        let l = appWidth - 215 * this.elements.length;

        this.pages = l > 0 ? 0 : Math.ceil((-1 * l) / appWidth);

        this.pageWidth = 5 * 215;

        if ( this.pages > 0 ) this.rightArrow.classList.add('active-arrow');
    }
}

class ScriptsPagination  extends Pagination {

    constructor(leftArrow, rightArrow) {

        super(leftArrow, rightArrow);

        let itemsCollection = document.getElementsByClassName('script-item');
        this.elements = Array.prototype.slice.call(itemsCollection);
        this.pages = Math.floor((this.elements.length - 1) / 9);
        this.pageWidth = 345;

        if ( this.pages > 0 ) this.rightArrow.classList.add('active-arrow');
    }

    render() {
        this.elements.forEach((elem) => {
            elem.style.transform = `translateY(${this.currentTransform}px)`;
        })
    }
}
export {DevicePagination, ScriptsPagination}