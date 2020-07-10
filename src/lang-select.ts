// 型Lang_InfoはユーザがLangSelectインスタンス生成時に渡すMapの型
type Lang_Info ={
    lang: string,
    url: string,
    message: string,
    btn_message: string
}

class LangSelect {
    private info_list: Lang_Info[];   // インスタンス生成時に渡されたMapの配列を格納する変数

    // コンストラクタメソッド
    public constructor(info_list: Lang_Info[]) {
        this.info_list = info_list; // Map配列格納
        if (this.check_browser_cookie()==false) {                   // ブラウザに前回拒否したことを示すクッキーが埋め込まれていない
            const prop: Lang_Info | null = this.check_info_list();  // info_listからユーザの第一言語と一致するプロパティを取り出す
            if (prop!=null) {                      // nullで無ければ
                this.recommend_site_change(prop);  // サイトの変更を提案するHTMLを表示する
            }
        }
    }

    // サイトの変更を提案するHTMLを表示するメソッド
    private recommend_site_change(prop: Lang_Info): void {
        const body: HTMLElement | null = document.getElementsByTagName("body")[0];  // id名で要素を抽出

        // HTML挿入
        body?.insertAdjacentHTML("beforeend", 
`
<div class="lang-select">
    <div class=\"message\">
        <p>${prop["message"]}</p>
    </div>
    <div class=\"change-site\">
        <a href=${prop["url"]}>${prop["btn_message"]}</a>
    </div>
    <div class=\"reject-button\">
        <button></button>
    </div>
</div>`);

        const lang_select: Element | null = document.getElementsByClassName("lang-select")[0];

        const div_change_site: HTMLDivElement | undefined = lang_select.getElementsByTagName("div")[2]; // reject-buttonのDOMを抽出
        div_change_site?.addEventListener('click', ()=>{this.reject_recomend_event()}); // clickイベント this.reject_recomend_eventを追加
    }   

    // ブラウザの第一言語が一致するプロパティがあるかどうかを探索する
    // 一致するプロパティがあった場合はそのプロパティを、無い場合はnullを返す
    private check_info_list(): Lang_Info | null {
        for (let info of this.info_list) {
            // navigator.language.split("-")[0]は言語コードと国コードが連結されている場合に言語コードのみを取り出す処理
            if (info["lang"]==navigator.language.split("-")[0]) {
                return info;
            }
        }
        return null;
    }

    // ブラウザのクッキーの有無を確認するメソッド
    // クッキー(LangSelectRejectRecomend)があればtrue，無ければfalse
    private check_browser_cookie(): boolean {
        const cookie_list: string = document.cookie;      // 保存されているクッキー読み出し
        const cookies: string[] = cookie_list.split(';'); // ;で分割し配列cookiesに格納

        for (let cookie of cookies) {
            if (cookie.replace(/\s+/g, "")=="LangSelectRejectRecomend=true") {
                return true;
            }
        }
        return false;
    }

    // ブラウザにクッキーを埋め込むメソッド
    // 現在は有効期限1分になっています
    private embedding_cookie(): void {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        document.cookie = "LangSelectRejectRecomend=true;expires="+now.toUTCString()+";Path=/"; // クッキーはサイト全体で有効
    }

    // 表示されているhtmlを除去するメソッド
    private remove_lang_select(): void {
        const lang_select: Element | null = document.getElementsByClassName("lang-select")[0];

        // 作成した<div class="lang-select">要素を全て削除
        lang_select?.parentNode?.removeChild(lang_select);
    }

    // 提案の消去ボタンが押されたとき呼び出されるメソッド
    public reject_recomend_event(): void {
        this.embedding_cookie();   // クッキーを埋め込む
        this.remove_lang_select(); // 提案HTMLを削除
    }
}