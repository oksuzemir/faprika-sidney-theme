/**
product-box script
**/
var ProductBox = function () {

    // handle lazy load images
    var handleLazyLoad = function () {

        $(".product-image-wrapper .product-image").Lazy({
            afterLoad: function (element) {
                var $wrapper = element.parent(".product-image-wrapper");
                var $el = $wrapper.find(".swiper-master");

                //add load complete classes
                $wrapper.addClass("lazy-complete");

                if ($el.length) {

                    element.remove();

                    //create swiper
                    ProductBox.createSwiper($el);
                }
            }
        });

    };

    // handle swiper
    var handleSwiper = function (el) {

        //mobile devices
        if (ProductBox.isTouchDevice()) {

            var touchSwiper = new Swiper(el, {
                // Disable preloading of all images
                preloadImages: false,
                // Enable lazy loading
                lazy: true,
                scrollbar: {
                    el: ".swiper-scrollbar"
                }
            });
        }
        //desktop devices
        else {

            var mySwiper = new Swiper(el, {
                // Disable preloading of all images
                preloadImages: false,
                // Enable lazy loading
                lazy: true,
                effect: 'fade',
                speed: 100,
                scrollbar: {
                    el: ".swiper-scrollbar",
                    hide: true
                }
            });

            // Detect mouse move X co-ord
            el.on("mousemove", function (e) {
                // Divide by number of items
                // Round down to whole integer
                var to = Math.floor(e.offsetX / (mySwiper.width / mySwiper.slides.length));
                // Show item with index equal to this
                mySwiper.slideTo(to);
            });
        }
    };

    // handle video
    var handleVideo = function () {

        $(".product .buttons .video-play").on("click", function () {

            var $el = $(this);
            var $product = $el.closest(".product");
            var $video = $product.find(".product-video-wrapper video");

            //pause all played videos
            $(".product.video-active").removeClass("video-active");

            $product.addClass("video-active");
            $video.find("source").attr("src", $video.data("url"));
            $video[0].load();
        });

        $('.product .buttons .video-pause').on("click", function () {

            var $el = $(this);
            var $product = $el.closest(".product");
            var $video = $product.find(".product-video-wrapper video");

            $product.removeClass("video-active");
            $video[0].pause();
            $video[0].currentTime = 0;
        });

        $(".product.video-auto-play").each(function () {

            var $product = $(this);
            var $video = $product.find(".product-video-wrapper video");

            $product.addClass("video-active");
            $video.find("source").attr("src", $video.data("url"));
            $video[0].load();
        });
    };

    return {

        // init class
        init: function () {

            handleLazyLoad();

            handleVideo();
        },

        // create swiper
        createSwiper: function (el) {
            handleSwiper(el);
        },

        // check for device touch support
        isTouchDevice: function () {
            try {
                document.createEvent("TouchEvent");
                return true;
            } catch (e) {
                return false;
            }
        }

    };

}();

jQuery(document).ready(function () {
    ProductBox.init(); // init
});