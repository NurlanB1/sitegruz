document.addEventListener('DOMContentLoaded', function() {

    let btn = document.querySelector('.burger-btn');

    btn.addEventListener('click', function(e) {
        if(e.target.closest('.burger-btn') === this) {
            this.classList.toggle('_close')
            document.querySelector('.header-menu').classList.toggle('_open')
            let b = document.querySelector('body');
            b.style.overflow = (!b.style.overflow)? 'hidden': '';
        }
    })
    
    //carousel 
    let mySiema = new Siema({
        duration: 400,
        easing: 'ease-out',
    });
    document.querySelector('.slider-prev').addEventListener('click', () => mySiema.prev());
    document.querySelector('.slider-next').addEventListener('click', () => mySiema.next());

    //simpleParallax
    function simpleParallax (id, modifier) {
        let paraId = document.querySelector(id);
        paraId.setAttribute(
        "style",
        "background-repeat: no-repeat; background-size: cover; background-position: center center;"
        );
        let topCoord = paraId.getBoundingClientRect().top + pageYOffset;
        const sp = function(e) {
        if(paraId.getBoundingClientRect().top + paraId.offsetHeight > 0) { 
            let x = paraId.getBoundingClientRect().top / modifier;
            let y = - Math.round(x * 100) / 100 + topCoord / modifier;
            paraId.style.backgroundPosition = "center " + (y - 50)  + "px";
        }
        };
        sp()
        window.addEventListener('scroll', sp, {passive: true})
    };
    simpleParallax("#parallax-1", 5);
    
    //smoothScroll
    var scroll = new SmoothScroll('a[href*="#"]', {
        easing: 'easeOut',
        speed: 400
    });

    //animateNumber countUpJs
    let countJsItems = document.querySelectorAll('[id^=countupjs]');
    function countupInit(element, time = 1) {
        let b = [];
        for (let i = 0; i < element.length; i++) {
            const el = element[i];
            const elid = element[i].id;
            const elcoord = el.getBoundingClientRect().top + pageYOffset - 70 * window.innerHeight / 100 ;
            let demo = new CountUp(elid, 0, +el.innerHTML, 0, time, {
                useGrouping: true,
                separator: '',
            })
            b.push([demo, elcoord]);
        }
        return b;
    }
    let scrollCount = countupInit(countJsItems);
    function scrollcount() {
        for (let i = 0; i < scrollCount.length; i++) {
            if ( pageYOffset >= scrollCount[i][1]) {
                scrollCount[i][0].start();
            }
        }
    }
    document.addEventListener('scroll', scrollcount, {passive: true})

})