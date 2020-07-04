// 型Lang_InfoはユーザがLangSelectインスタンス生成時に渡すMapの型
type Lang_Info ={
    lang: string,
    url: string,
    message: string,
    btn_message: string
}

class LangSelect {
    private id: string;               // 生成されたインスタンスが対象とするDOMのidを格納する変数
    private info_list: Lang_Info[];   // インスタンス生成時に渡されたMapの配列を格納する変数

    // コンストラクタメソッド
    public constructor(id: string, info_list: Lang_Info[]) {
        this.id = id;               // id格納
        this.info_list = info_list; // Map配列格納
        if (this.chack_browser_cookiy()==false) {                   // ブラウザに前回拒否したことを示すクッキーが埋め込まれていない
            const prop: Lang_Info | null = this.chack_info_list();  // info_listからユーザの第一言語と一致するプロパティを取り出す
            if (prop!=null) {                      // nullで無ければ
                this.recommend_site_change(prop);  // サイトの変更を提案するHTMLを表示する
            }
        }
    }

    // サイトの変更を提案するHTMLを表示するメソッド
    private recommend_site_change(prop: Lang_Info): void {
        const div_lang_select: HTMLElement | null = document.getElementById(this.id);  // id名で要素を抽出
        div_lang_select?.classList.add("active");   // 抽出したdivにactive属性を追加

        // HTML挿入
        div_lang_select?.insertAdjacentHTML("afterbegin", 
`<div class=\"message\">
    <p>${prop["message"]}</p>
</div>
<div class=\"change-site\">
    <a href=${prop["url"]}>${prop["btn_message"]}</a>
</div>
<div class=\"reject-message\">
    <button>×</button>
</div>`);

        const div_change_site: HTMLDivElement | undefined = div_lang_select?.getElementsByTagName("div")[2]; // reject-messageのDOMを抽出
        div_change_site?.addEventListener('click', ()=>{this.reject_recomend_event()}); // clickイベント this.reject_recomend_eventを追加
    }   

    // ブラウザの第一言語が一致するプロパティがあるかどうかを探索する
    // 一致するプロパティがあった場合はそのプロパティを、無い場合はnullを返す
    private chack_info_list(): Lang_Info | null {
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
    private chack_browser_cookiy(): boolean {
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
    // 現在は有効期限5分になっています
    private embedding_cookiy(): void {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        document.cookie = "LangSelectRejectRecomend=true;expires="+now.toUTCString();
    }

    // 表示されているhtmlを除去するメソッド
    private remove_lang_select(): void {
        const div_lang_select: HTMLElement | null = document.getElementById(this.id);
        div_lang_select?.classList.remove("active");

        // div class="lang-select"内の子要素を全て削除
        while (div_lang_select?.firstChild) div_lang_select.removeChild(div_lang_select.firstChild);
    }

    // 提案の消去ボタンが押されたとき呼び出されるメソッド
    public reject_recomend_event(): void {
        this.embedding_cookiy();   // クッキーを埋め込む
        this.remove_lang_select(); // 提案HTMLを削除
    }
}