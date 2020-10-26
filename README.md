# View mode engine 1.0.0
view-mode.js web sayfalarınızda light mode, dark mode gibi görüntü değişimlerini kolayca yapmanızı sağlar. view-mode.js function tabanlı yazılmştır.   
Objeler üzerinden çalışan view-mode.js de layer lar vardır ve her layer ın kendine
özgü css kodlar bulunur  
Ve bu görüntü motoru bir fonksiyon ile çalışır bu fonksiyonun ismini siz belirlersiniz.
view-mode.js yi örnek bir React.js freamework ünün App.js dosyasında anlatacağım.

## Başlangıç
view-mode.js yi github üzerinden indirebilirsiniz.  
Önce view-mode.js yi dosyamıza import ediyoruz.
> düz javascript dosyalarında html dosyanıza view-mode.js yi bağlayarak da kullanabilirsiniz.
```javascript
import viewMode from './lib/view-mode.js'
```
viewMode içerisine bir obje alır ve bu objenin içerisinde
3 değer bulunur ``` name ``` ``` layers ``` ``` startFunctionName ```  
**name** view-mode.js nin kendi içerisinde tanım yapmasını sağlar.  
**layers** katmanları belirtir. layers içerisindeki her obje bir layer dır.  
her katmanın bir class veya id ismi vardır
bunları name e veririz. layers ın içerisindeki her layer ın bir name olduğu gibi
bu name i kullanan etiketlere verilmesi gerekn css değerleride vardır. buda css e verilir.  
**css** değeride bir objedir ve içerisinde şu şekilde yazılmış
css kodları bulunur;
```javascript
{name: '.layer-2', css: {background: 'rgb(46, 46, 46)', border: '1px solid grey'}}
```
**!!! name değişkenine değer verirken mutlaka, class olarak kullancaksanız başına ``` . ```
id olarak kullancaksanız başına ``` # ``` işaretini koymayı unutmayın.**  
**startFunctionName** ise bu tanımladığınız modun hangi fonksiyon adı ile çalışacağını belirtir.

<br>

## Tutorial
>Bir dark mode yazalım.
```javascript
const darkMode = viewMode({
    name: 'dark-mode',
    layers: [
        {name: '.layer-1', css: {background: 'black', color: 'white'}},
        {name: '.layer-2', css: {background: 'rgb(46, 46, 46)', border: '1px solid grey'}}
    ],
    startFunctionName: 'goDarkMode'
})
```

<br>

Bu yazdığımız dark modu kullanabilmek için **startFunctionName** e verdiğimiz değeri kullanıyoruz.
**viewMode()** bize tanımladığımız modu çalıştırabilmemiz için bir fonksiyon return eder.
Bu fonksiyonun ismi ise **startFunctionName** e verdiğimiz değerdir.

> Bir React projesindeki App.js dosyası

```javascript
const App = _ => {
    const darkMode = viewMode({
        name: 'dark-mode',
        layers: [
            {name: '.layer-1', css: {background: 'black', color: 'white'}},
            {name: '.layer-2', css: {background: 'rgb(46, 46, 46)', border: '1px solid grey'}}
        ],
        startFunctionName: 'goDarkMode'
    })
    const { goDarkMode } = darkMode

    return (
        <div id="App">
            <div className="layer-1" style={{padding: "2em"}}>
                <h1 className="layer-2">
                    text
                </h1>
            </div>

            <button onClick={() => goDarkMode()}>
                !Dark Mode
            </button>
        </div>
    )
}
```
Bir dark mode oluşturup bunu çalıştırdık ufak bir div parçasını ve içerisindeki html i
dark mode tarzına dönüştürdük. Birde light mode yazalım ve bunuda çalıştıralım.
Yine aynı şekilde bir viewMode açıyoruz.

```javascript
const lightMode = viewMode({
    name: 'light-mode',
    layers: [
        {name: '.layer-1', css: {background: 'white', color: 'black', border: '1px solid black'}},
        {name: '.layer-2', css: {background: 'grey'}}
    ],
    startFunctionName: 'goLightMode'
})
const { goLightMode } = lightMode
```
light modumuzu oluşturduk yinde aynı layerları kullandık, fakat css kodları farklı.
Şimdi bu light modu da bir butona tıklandığında açılmasını sağlayalım.

```javascript
const App = _ => {
    const darkMode = viewMode({
        name: 'dark-mode', // modun ismi
        layers: [ // modun katmanları
            {name: '.layer-1', css: {background: 'black', color: 'white'}},
            {name: '.layer-2', css: {background: 'rgb(46, 46, 46)', border: '1px solid grey'}}
        ], // modun ateşlenme çağırısında kullanılacak isim
        startFunctionName: 'goDarkMode'
    })
    const { goDarkMode } = darkMode // moddan çıkartılan ateşlenme fonksiyonunun çıkartılması

    const lightMode = viewMode({
        name: 'light-mode',
        layers: [
            {name: '.layer-1', css: {background: 'white', color: 'black', border: '1px solid black'}},
            {name: '.layer-2', css: {background: 'grey'}}
        ],
        startFunctionName: 'goLightMode'
    })
    const { goLightMode } = lightMode

    return (
        <div id="App">
            {/* modda tanımlanan layer isimlerinin kullanımı */}
            <div className="layer-1" style={{padding: "2em"}}>
                <h1 className="layer-2">
                    text
                </h1>
            </div>

            {/* ateşleme fonksiyonlarının çalıştırılması */}
            <button onClick={() => goDarkMode()}>
                !Dark Mode
            </button>

            <button onClick={() => goLightMode()}>
                !Light Mode
            </button>
        </div>
    )
}
```
Bir light modda tanımladık ve bunuda çalıştırdık bu sayede çok rhatca view mode değişimleri yapabiliriz.

<br>

Eğer web sayfanız açılır açılmaz bir modun çalışmasını istiyorsanız
bir kütüphane veya vanilla js uygulaması dahi olsa direk olarak **darkMode()** diye çalıştırmayınız.
DOM üzerinden css verdiği için DOM yüklanmeden viewMode çalışma olasılığı vardır, bu ise bir hataya veya çalışmayan bir viewMode ortaya çıkartır. bu sorunu ortan kaldırmak için;
```javascript
window.onload = darkMode()
```
DOM yüklendikten sonra çalışmasını sağlayarak yapmalısınız.