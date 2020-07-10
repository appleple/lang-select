# lang-select

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/appleple/document-outliner/master/LICENSE)

A utility to suggest page transition when a visitor is browsing the site written in not his/her first language. 
[http://tajima.appleple.jp/sample/LangSelect/example/en/](http://tajima.appleple.jp/sample/LangSelect/example/en/)

## Usage
```html
<script src="js/lang-select.js"></script>
```

Write "javascript" as below.
```html
<body>

</body>

<script>
    window.addEventListener('DOMContentLoaded', function(){
	new LangSelect([
        {"lang": "language code of ISO 639", "url": "http://example.com", "message": "message", "btn_message": "message on button"},
    ])});
</script>
```

If a visitor is browsing the site written in not his/her first language and LangSelect instance has "url" of his/her first language, "div tag" becomes as below.
```html
<body>
  <div class="lang-select">
    <div class="message">
      <p>message</p>
    </div>
    <div class="change-site">
      <button onclick="http://example.com">message on button</button>
    </div>
    <div class="reject-button">
      <button></button>
    </div>
  </div>

</body>
```

## Example

```html
<body>

</body>

<script>
  window.addEventListener('DOMContentLoaded', function(){
	new LangSelect([
        {"lang": "ja", "url": "../ja/index.html", "message": "日本向けサイトがあります", "btn_message": "クリック"},
    ])});
</script>
```

If a visitor is browsing the site written in not visitor's first language and he/she use Japanease, "div tag" becomes as below.
```html
<body>
  <div class="lang-select">
    <div class="message">
      <p>日本向けサイトがあります</p>
    </div>
    <div class="change-site">
      <button onclick="../ja/index.html">クリック</button>
    </div>
    <div class="reject-button">
      <button></button>
    </div>
  </div>
</body>
```
