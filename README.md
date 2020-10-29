# View Mode 1.1.1
View mode web sayfalarınızın tema değişimlerini kolayca ve kontrollü yapabilmenizi sağlar.

1. [Başlangıç](#Başlangıç)
2. [Giriş](#Giriş)

<br>

>## Başlangıç
npm e yüklenmediği için github üzerinde indirebilir güncellemeleri pull edebilirsiniz.  
View mode u kullanabilmek için view-mode.js yi web sayfanıza
``` import viewMode from './view-mode.js' ``` edebilir veya  
``` <script src="./view-mode.js"></script> ``` diyerek de bağlayabilirsiniz.
View mode kütüphanelerde, vanilla javascript dosyalarında ve sade HTML dosyalarında
kullanılabilir. Eğer kütüphanesiz projenizde modül hatasını çözemiyor iseniz export default u silip
``` <script src="./view-mode.js"></script> ``` diyerek bağlayıp kullanabilirsiniz.

<br>

## Giriş
Öncelikle bir viewMode oluşturuyoruz.  
> viewMode u bir değişkene atamanız önerilir
```javascript
const darkMode = viewMode({})
```

 Bir viewMode oluşturduk, şimdi içerisine parametre girelim.
viewMode içerisine bir obje alır ve mode u o obje üzerinden manipüle eder.
obje 4 değer alır
``` name ```: name viewMode un default değeridir girmek zorunda değilsiniz.
```javascript
const darkMode = viewMode({
    name: 'dark-mode'
})
```

``` animation ```: animationda bir objedir ve 2 değer alır bunlar ``` mode ``` ve ``` time ``` dır.
mode değeri animasyon olacakmı gecikme olacakmı onu belirler,
time ise bu animasyonun ne kadar süreceğini belirtir.
mode true ise animasyon olur, eğer mode false ise animasyon olmaz
ve mode false girildiyse time değerinin gönderilmesine gerek yoktur.
animation özünde transition kullanır
```javascript
const darkMode = viewMode({
    name: 'dark-mode',
    animation: { mode: true, time: '1s' }
})
```

``` layers ```: layers ise web sayfanızda hangi class ve id lere
hangi modda ne tür css değerleri verilecek bunları tutar. layers bir array dir 
ve içerisinde layer bilgilerinin tutulduğu objeler bulundurur.
Her layer in ``` name ``` ve ``` css ``` değerleri vardır.
name class veya id ismini temsil eder, css ise o id veya class ın
hangi css değerlerini alacağını barındırır.

```javascript
const darkMode = viewMode({
    name: 'dark-mode',
    animation: { mode: true, time: '1s' },
    layers: [
        {name: ".first-layer", css: {backgroundColor: "black", color: "white"}}
        {name: ".last-layer", css: {
            backgroundColor: "white", color: "black", boxShadow: "0 0 20px #343434"
        }}
    ]
})
```
bildiğimiz gibi css yazarken her anahtar kelime arasına "-" işareti gelir
``` background-color: red; ``` gibi ancak Javascript içerisinde bunları
yazmamız mümkün değildir bu yüzden anahtar kelimelerin ilki hariç diğerlerinin baş harfini büyük yapmanız gerekmektedir örneğin
```
backgroundColor, "background-color"
texDecoration, "text-decoration"
boxShadow, "box-shadow"
textAlign, "text-align"
borderBottomLeftRadius, "border-bottom-left-radius"
```
Şeklinde yazılmalıdır. Name değeri ise HTML etiketlerinin kullandığı
class veya id değerini temsil eder eğer viewMode un değişiklik yapacağı etikete class verilmiş ise
name başına ``` . ``` koyulmalıdır eğer id ise ``` # ``` koyulmalıdır
```
name: ".first-layer"
name: "#last-layer"
```


``` startFunctionName ```: startFunctionName ise tanımladğınız bu modun hangi
method adı ile çalışacağını belirler.  
değer tipi string olmalıdır.

```javascript
const darkMode = viewMode({
    name: 'dark-mode',
    animation: { mode: true, time: '1s' },
    layers: [
        {name: ".first-layer", css: {backgroundColor: "black", color: "white"}}
        {name: ".last-layer", css: {
            backgroundColor: "white", color: "black", boxShadow: "0 0 20px #343434"
        }}
    ],
    startFunctionName: 'goDarkMode'
})
```
Tüm gereksinimleri tamamladıktan sonra **goDarkMode()** methodunu darkMode dan almamız gerek

```javascript
const darkMode = viewMode({
    name: 'dark-mode',
    animation: { mode: true, time: '1s' },
    layers: [
        {name: ".first-layer", css: {backgroundColor: "black", color: "white"}}
        {name: ".last-layer", css: {
            backgroundColor: "white", color: "black", boxShadow: "0 0 20px #343434"
        }}
    ],
    startFunctionName: 'goDarkMode'
})
const { goDarkMode } = darkMode
```
methodu da çıkarığımıza göre bir button a atayabilir ve kullanabiliriz.

```html
<button onclick="goDarkMode()">
    ! Dark Mode
</button>
```

Bir viewMode oluşturup onu çalıştırdık ve kullandık aynı şekilde birde lightMode yazark birden fazla
theme oluşturabilirsiniz.