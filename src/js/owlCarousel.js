$(document).ready(function () {

    $("#owl-carousel").owlCarousel({

        dots: false,
        loop: true,
        margin: 30,
        autoplay: true,
        nav: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,
        navigation: true,
        singleItem: true,
        transitionStyle: "backSlide",
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            1: {
                items: 2,
            },
            767: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1200: {
                items: 5,
            }
        }
    });




    $("#owl-event").owlCarousel({

        dots: false,
        loop: true,
        margin: 15,
        autoplay: true,
        nav: true,
        autoplayTimeout: 10000,
        autoplayHoverPause: true,
        navigation: true,
        singleItem: true,
        transitionStyle: "backSlide",
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive: {
            1: {
                items: 1,
            },
            767: {
                items: 2,
            },
            1000: {
                items: 2,
            },
            1200: {
                items: 4,
            }
        }
    });










});