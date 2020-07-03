class LangSelect {
    private id: string;
    private info_list: {lang: string, url: string, message: string, btn_message: string}[];    

    public constructor(id: string, info_list: {lang: string, url: string, message: string, btn_message: string}[]) {
        this.id = id;
        this.info_list = info_list;
        if (this.chack_browser_cookiy()==false) {  // ブラウザの第一言語がサイトの対象言語と一致しておらず、かつ、ブラウザにクッキーが埋め込まれていない
            const prop: {lang: string, url: string, message: string, btn_message: string} | null = this.chack_info_list();  // info_listの言語が一致するプロパティを取り出す
            if (prop!=null) {
                this.recommend_site_change(prop);  // サイトの変更を提案するprivateメソッド
            }
        }
    }

    // サイトの変更を提案するhtmlを表示するメソッド
    private recommend_site_change(prop: {lang: string, url: string, message: string, btn_message: string}): void {
        const div_lang_select: HTMLElement | null = document.getElementById(this.id);
        div_lang_select?.classList.add("active");
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
        const div_change_site: HTMLDivElement | undefined = div_lang_select?.getElementsByTagName("div")[2];
        div_change_site?.addEventListener('click', ()=>{this.reject_recomend_event()});
    }   

    // ブラウザの第一言語が一致するプロパティがあるかどうかを探索する
    // 一致するプロパティがあった場合はそのプロパティを、無い場合はnullを返す
    private chack_info_list(): {lang: string, url: string, message: string, btn_message: string} | null {
        for (let i: number = 0; i<this.info_list.length; i++) {
            if (this.info_list[i]["lang"]==navigator.language) {
                return this.info_list[i];
            }
        }
        return null;
    }

    // ブラウザのクッキーの有無を取得するメソッド
    private chack_browser_cookiy(): boolean {
        const cookie: string = document.cookie;
        const cookies: string[] = cookie.split(';');

        for (let i: number = 0; i<cookies.length; i++) {
            if (cookies[i]==" LangSelectRejectRecomend=true") { // Lの前に空白があるが、それはブラウザにより異なるのだろうか？正規表示した方が塩梅？
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
        while (div_lang_select?.firstChild) div_lang_select.removeChild(div_lang_select.firstChild);
    }

    // 提案の消去ボタンが押されたときの処理を行うメソッド
    public reject_recomend_event(): void {
        this.embedding_cookiy();
        this.remove_lang_select();
    }
}