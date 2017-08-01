/**
 * Created by liujian on 2017/7/10.
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛
 * 　　　　┃　　　┃神兽保佑
 * 　　　　┃　　　┃代码无BUG！
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　　　┣┓
 * 　　　　┃　　　　　　　┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 * ━━━━━━神兽出没━━━━━━
 */
(function ($) {
    window.buyMi = {
        timer: null,
        buy: function () {
            $("#J_buyBtnBox").find(".btn").html('<a href="javascript:void(0);"  class="btn btn-primary btn-biglarge J_proBuyBtn add" id="J_proAddcart"  data-type="bigtap">加入购物车</a>');
            $("#J_buyBtnBox").find(".btn").trigger("click");
            $(".modal-backdrop").remove();
        },
        clear: function () {
            $(".modal-backdrop").remove();
            clearInterval(this.timer);
        },
        init: function (config) {
            $("html").prepend("<style>.modal-bigtap-soldout{display: none !important;}</style>");
            this.timer = setInterval(function () {
                buyMi.buy();
            }, config.step ? config.step : 1000);
        }
    };
})(jQuery);