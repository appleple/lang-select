"use strict";
var LangSelect = /** @class */ (function () {
    function LangSelect(id, info_list) {
        this.id = id;
        this.info_list = info_list;
        if (this.chack_browser_cookiy() == false) { // ブラウザの第一言語がサイトの対象言語と一致しておらず、かつ、ブラウザにクッキーが埋め込まれていない
            var prop = this.chack_info_list(); // info_listの言語が一致するプロパティを取り出す
            if (prop != null) {
                this.recommend_site_change(prop); // サイトの変更を提案するprivateメソッド
            }
        }
    }
    // サイトの変更を提案するhtmlを表示するメソッド
    LangSelect.prototype.recommend_site_change = function (prop) {
        var _this = this;
        var div_lang_select = document.getElementById(this.id);
        div_lang_select === null || div_lang_select === void 0 ? void 0 : div_lang_select.classList.add("active");
        div_lang_select === null || div_lang_select === void 0 ? void 0 : div_lang_select.insertAdjacentHTML("afterbegin", "<div class=\"message\">\n    <p>" + prop["message"] + "</p>\n</div>\n<div class=\"change-site\">\n    <a href=" + prop["url"] + ">" + prop["btn_message"] + "</a>\n</div>\n<div class=\"reject-message\">\n    <button>\u00D7</button>\n</div>");
        var div_change_site = div_lang_select === null || div_lang_select === void 0 ? void 0 : div_lang_select.getElementsByTagName("div")[2];
        div_change_site === null || div_change_site === void 0 ? void 0 : div_change_site.addEventListener('click', function () { _this.reject_recomend_event(); });
    };
    // ブラウザの第一言語が一致するプロパティがあるかどうかを探索する
    // 一致するプロパティがあった場合はそのプロパティを、無い場合はnullを返す
    LangSelect.prototype.chack_info_list = function () {
        for (var i = 0; i < this.info_list.length; i++) {
            if (this.info_list[i]["lang"] == navigator.language) {
                return this.info_list[i];
            }
        }
        return null;
    };
    // ブラウザのクッキーの有無を取得するメソッド
    LangSelect.prototype.chack_browser_cookiy = function () {
        var cookie = document.cookie;
        var cookies = cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i] == " LangSelectRejectRecomend=true") { // Lの前に空白があるが、それはブラウザにより異なるのだろうか？正規表示した方が塩梅？
                return true;
            }
        }
        return false;
    };
    // ブラウザにクッキーを埋め込むメソッド
    // 現在は有効期限5分になっています
    LangSelect.prototype.embedding_cookiy = function () {
        var now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        document.cookie = "LangSelectRejectRecomend=true;expires=" + now.toUTCString();
    };
    // 表示されているhtmlを除去するメソッド
    LangSelect.prototype.remove_lang_select = function () {
        var div_lang_select = document.getElementById(this.id);
        div_lang_select === null || div_lang_select === void 0 ? void 0 : div_lang_select.classList.remove("active");
        while (div_lang_select === null || div_lang_select === void 0 ? void 0 : div_lang_select.firstChild)
            div_lang_select.removeChild(div_lang_select.firstChild);
    };
    // 提案の消去ボタンが押されたときの処理を行うメソッド
    LangSelect.prototype.reject_recomend_event = function () {
        this.embedding_cookiy();
        this.remove_lang_select();
    };
    return LangSelect;
}());
