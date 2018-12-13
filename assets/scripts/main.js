/**
 * Touch device test
 */

let isTouchDevice = function () {
    return (
        !!(typeof window !== 'undefined' &&
            ('ontouchstart' in window ||
                (window.DocumentTouch &&
                    typeof document !== 'undefined' &&
                    document instanceof window.DocumentTouch))) ||
        !!(typeof navigator !== 'undefined' &&
            (navigator.maxTouchPoints || navigator.msMaxTouchPoints))
    );
};


function init() {   
    document.body.setAttribute("data-touch", isTouchDevice());
    
    console.log('init');
}

/**
 * Wait for document ready to fire dom dependent stuf
 */

window.addEventListener('load', function () {
    init();
    document.body.setAttribute('data-loaded', 'true');
    
});