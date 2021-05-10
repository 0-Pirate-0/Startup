$(function () {
    // Scroll
    $('[href^="#"]').on('click', function(event){
        if ($(this).attr('hash') !== "") {
        event.preventDefault();
        let hash = $(this).prop('hash');
        let scroll = $(hash).offset().top
        
        if($(window).height() <= 1024) {
            scroll -= 30
         } //else if ($(window).height() <= 768) {
        //     scroll 
        // }

        $('html, body').animate({
          scrollTop: scroll
        }, 800, function(){
        });
      }
    });

    // Fixed header + Nav toggle colors
    const header = $('.header'),
        headerLogo = $('.header__logo'),
        introHeight = $('.intro').height(),
        nav = $('.nav'),
        navToggle = $('#nav_toggle')

    function switchWhite() {
        headerLogo.css('color', '#fff')
        $('.nav_toggle span').css('background', '#fff')
        navToggle.addClass('nav_t--bgw')
        navToggle.removeClass('nav_t--bgg')
    }

    function switchGrey() {
        headerLogo.css('color', '#000')
        $('.nav_toggle span').css('background', '#000')
        navToggle.addClass('nav_t--bgg')
        navToggle.removeClass('nav_t--bgw')
    }

    $(window).on('scroll', function () {
        setInterval(function () {
            if ($(window).scrollTop() > introHeight - 50 && !nav.hasClass('active')) {
                switchGrey()
                header.addClass('fixed-top')
            } else if (nav.hasClass('active')) {
                header.addClass('fixed-top')
                switchWhite()
            } else {
                switchWhite()
                header.removeClass('fixed-top')
            }
        }, 1)
    })

    // Nav Toggle
    $('.nav_toggle').click(function () {
        $('.nav_toggle, .nav').toggleClass('active');
    });

    // Slider Horizotnal
    let position = 0

    let slidesToShow = 4
    if ($(window).width() <= 1179) {
        slidesToShow = 3
    }
    if ($(window).width() <= 799) {
        slidesToShow = 2
    }
    if ($(window).width() <= 499) {
        slidesToShow = 1
    }

    const slidesToScroll = 1

    const container = $('.slider__horizontal'),
        track = $('.slider__horizontal--inner'),
        items = $('.slider__horizontal--item'),
        itemsCount = items.length,
        btnPrev = $('.slider__horizontal--prev'),
        btnNext = $('.slider__horizontal--next'),
        itemWidth = container.innerWidth() / slidesToShow,
        movePosition = slidesToScroll * itemWidth

    $(items).each(function () {
        $(this).css('min-width', `${itemWidth}px`)
    })

    $(btnPrev).on("click", function () {
        const itemsLeft = Math.abs(position) / itemWidth

        position += itemsLeft > slidesToScroll ? movePosition : itemsLeft * itemWidth
        setPosition()
        checkBtns()
    })
    $(btnNext).on('click', function () {
        const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth

        position -= itemsLeft > slidesToScroll ? movePosition : itemsLeft * itemWidth

        setPosition()
        checkBtns()
    });

    const setPosition = () => {
        track.css('transform', `translateX(${position}px)`)
    }

    const checkBtns = () => {
        if (position === 0) {
            btnPrev.disabled
            btnPrev.css('backgroundColor', 'rgba(0, 0, 0, 0.75)')
        } else {
            btnPrev.css('backgroundColor', '')
        }

        if (position <= -(itemsCount - slidesToShow) * itemWidth) {
            btnNext.disabled
            btnNext.css('backgroundColor', 'rgba(0, 0, 0, 0.75)')
        } else {
            btnNext.css('backgroundColor', '')
        }
    }
    checkBtns()

    // Works
    $(".works__list a").click(function () {
        $('.works__list .works__switch').removeClass('active');
        $(this).addClass('active');
        var dc = $(this).attr('data-filter');
        if (dc == "all") {
            $('.works__item').show();
            return;
        }
        $('.works__item').each(function () {
            if ($(this).attr('data-filter').indexOf(dc) < 0) {
                $(this).hide()
            } else {
                $(this).show()
            }
        });
    });

    // Slider
    const slides = $('.slider__item'),
        dots = $('.dot')

    let index = 0

    const activeSlide = (n) => {
        slides.removeClass('active')
        $(slides[n]).addClass('active')
    }

    const activeDot = (n) => {
        $(dots).removeClass('active')
        $(dots[n]).addClass('active')
    }

    const preparateCurrentSlide = (ind) => {
        activeSlide(ind)
        activeDot(ind)
    }

    const nextSlide = () => {
        if (index == slides.length - 1) {
            index = 0
            preparateCurrentSlide(index)
        } else {
            index++
            preparateCurrentSlide(index)
        }
    }

    dots.each(function (indexDot) {
        $(this).on('click', function () {
            index = indexDot
            preparateCurrentSlide(index)
        })
    })

    slides.on('click', function () {
        nextSlide()
        clearInterval(sliderInterval)
        sliderInterval = setInterval(nextSlide, 5000)
    })

    $(slides).mouseover(function () {
        clearInterval(sliderInterval)
    });

    $(slides).mouseout(function () {
        sliderInterval = setInterval(nextSlide, 5000)
    });

    let sliderInterval = setInterval(nextSlide, 5000)
})