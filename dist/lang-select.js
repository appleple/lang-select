"use strict";
var LangSelect = /** @class */ (function () {
    // コンストラクタメソッド
    function LangSelect(info_list) {
        this.info_list = info_list; // Map配列格納
        if (this.check_browser_cookie() == false) { // ブラウザに前回拒否したことを示すクッキーが埋め込まれていない
            var prop = this.check_info_list(); // info_listからユーザの第一言語と一致するプロパティを取り出す
            if (prop != null) { // nullで無ければ
                this.recommend_site_change(prop); // サイトの変更を提案するHTMLを表示する
            }
        }
    }
    // サイトの変更を提案するHTMLを表示するメソッド
    LangSelect.prototype.recommend_site_change = function (prop) {
        var _this = this;
        var body = document.getElementsByTagName("body")[0]; // id名で要素を抽出
        // HTML挿入
        body === null || body === void 0 ? void 0 : body.insertAdjacentHTML("afterbegin", "\n<div class=\"lang-select\">\n    <div class=\"message\">\n        <p>" + prop["message"] + "</p>\n    </div>\n    <div class=\"change-site\">\n        <a href=" + prop["url"] + ">" + prop["btn_message"] + "</a>\n    </div>\n    <div class=\"reject-message\">\n        <button></button>\n    </div>\n</div>");
        // buttonの値とデザインを変えられるようにした方がいいかも
        var div_change_site = body.getElementsByTagName("div")[2]; // reject-messageのDOMを抽出
        div_change_site === null || div_change_site === void 0 ? void 0 : div_change_site.addEventListener('click', function () { _this.reject_recomend_event(); }); // clickイベント this.reject_recomend_eventを追加
    };
    // ブラウザの第一言語が一致するプロパティがあるかどうかを探索する
    // 一致するプロパティがあった場合はそのプロパティを、無い場合はnullを返す
    LangSelect.prototype.check_info_list = function () {
        for (var _i = 0, _a = this.info_list; _i < _a.length; _i++) {
            var info = _a[_i];
            // navigator.language.split("-")[0]は言語コードと国コードが連結されている場合に言語コードのみを取り出す処理
            if (info["lang"] == navigator.language.split("-")[0]) {
                return info;
            }
        }
        return null;
    };
    // ブラウザのクッキーの有無を確認するメソッド
    // クッキー(LangSelectRejectRecomend)があればtrue，無ければfalse
    LangSelect.prototype.check_browser_cookie = function () {
        var cookie_list = document.cookie; // 保存されているクッキー読み出し
        var cookies = cookie_list.split(';'); // ;で分割し配列cookiesに格納
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var cookie = cookies_1[_i];
            if (cookie.replace(/\s+/g, "") == "LangSelectRejectRecomend=true") {
                return true;
            }
        }
        return false;
    };
    // ブラウザにクッキーを埋め込むメソッド
    // 現在は有効期限1分になっています
    LangSelect.prototype.embedding_cookie = function () {
        var now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        document.cookie = "LangSelectRejectRecomend=true;expires=" + now.toUTCString() + ";Path=/"; // クッキーはサイト全体で有効
    };
    // 表示されているhtmlを除去するメソッド
    LangSelect.prototype.remove_lang_select = function () {
        var body = document.getElementsByTagName("body")[0];
        // div class="lang-select"内の子要素を全て削除
        while (body === null || body === void 0 ? void 0 : body.firstChild)
            body.removeChild(body.firstChild);
    };
    // 提案の消去ボタンが押されたとき呼び出されるメソッド
    LangSelect.prototype.reject_recomend_event = function () {
        this.embedding_cookie(); // クッキーを埋め込む
        this.remove_lang_select(); // 提案HTMLを削除
    };
    return LangSelect;
}());
