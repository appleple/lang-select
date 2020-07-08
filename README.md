# lang-select

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/appleple/document-outliner/master/LICENSE)

A utility to suggest page transition when visitor is browsing the site written in not visitor's first language. 

## Usage
```html
<script src="js/lang-select.js"></script>
```

Write "div tag" and "javascript".
```html
<div id="foge"></div>

<script>
    window.addEventListener('DOMContentLoaded', function(){
	new LangSelect("foo", [
        {"lang": "ja", "url": "../ja/index.html", "message": "日本向けサイトがあります", "btn_message": "クリック"},
    ])});
</script>
```

If visitor is browsing the site written in not visitor's first language, "div tag" become as below.
```html
	<div id="foge">
		<div class="message">
			<p>日本向けサイトがあります</p>
		</div>
		<div class="change-site">
			<button onclick="ユーザが入力した遷移先">クリック</button>
		</div>
		<div class="reject-message">
			<button onclick="../ja/index.html">×</button>
		</div>
    </div>
```

