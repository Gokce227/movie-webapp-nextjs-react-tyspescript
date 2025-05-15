#  Movie & TV Series WebApp

**Next.js (v14+) + React + TypeScript + Redux Toolkit**

Bu proje, **filmler** ve **TV dizileri** için detaylı bilgi sunan bir medya platformudur. Kullanıcılar popüler içerikleri görüntüleyebilir, detay sayfalarını inceleyebilir, arama yapabilir ve diledikleri içeriği favori listelerine ekleyebilir.

---

## 🚀 Kullanılan Teknolojiler

| Teknoloji           | Açıklama                                                 |
| ------------------- | -------------------------------------------------------- |
| **Next.js v14+**     | Uygulama yapısı ve sayfa yönlendirme (App Router yapısı) |
| **React**           | Bileşen tabanlı kullanıcı arayüzü                        |
| **TypeScript**      | Tip güvenliği ve ölçeklenebilirlik                       |
| **Redux Toolkit**   | Global state yönetimi (favoriler, veriler vs.)           |
| **Axios**           | API veri çekimi için HTTP istemcisi                      |
| **Tailwind CSS**    | Responsive ve modern tasarım                             |
| **TMDb API**        | Film & TV dizi verileri                                  |
| **OpenWeather API** | Hava durumu verisi (isteğe bağlı)                        |

---

## 🎯 Uygulama Özellikleri

### 🎬 Filmler

* Popüler filmleri listeleme
* Film detay sayfası (afiş, açıklama, puan, çıkış tarihi vs.)
* Film türlerine göre filtreleme
* Arama çubuğuyla film bulma
* Favorilere film ekleyip çıkarma

### 💼 TV Dizileri

* Popüler dizileri listeleme
* TV dizi detay sayfası
* Dizi türlerine göre filtreleme
* Arama çubuğuyla dizi arama
* Favorilere dizi ekleyip çıkarma

### 💡 Ortak Özellikler

* Responsive tasarım (mobil, tablet, masaüstü uyumlu)
* Reusable bileşen yapısı
* Lazy loading & hata yönetimi
* Redux Toolkit ile gelişmiş global state
* `localStorage` ile favori listesi kalıcılığı
* Ayrı `/favorites` ve `/saved` sayfaları
* Karanlık tema (Dark mode) desteklenebilir

---

## 🔍 Arama Özelliği

* `SearchBar.tsx` bileşeni üzerinden hem film hem dizi aranabilir.
* Arama sonuçları ilgili kategoriye göre ayrılarak gösterilir.
* Arama sayfası kullanıcı odaklıdır ve anında filtreleme sağlar.

---

## ⭐ Favori ve Kaydetme Özelliği

* Her içerikte "Favorilere Ekle" ve "Kaydet" butonları mevcuttur.
* Redux ile yönetilen favori ve kaydetme listeleri vardır.
* `localStorage` senkronizasyonu sayesinde veri kalıcıdır.
* `/favorites` ve `/saved` sayfalarında ayrı ayrı görüntülenir.

---

## 📂 Redux Toolkit Yapısı

Veri grupları ayrı `slice` yapılarında tanımlanmıştır:

* `movieSlice.ts` → Filmlerle ilgili async veri çekme, listeleme
* `tvSlice.ts` → TV dizileri veri akışı
* `favoritesSlice.ts` → Favori içerikler
* `savedSlice.ts` → Kaydedilen içerikler

Veri çekme işlemleri `createAsyncThunk` ile yapılır. Her slice içerisinde `loading`, `data`, `error` gibi state'ler yönetilir.

---

## 🖼️ Ekran Görselleri

Ana Sayfa
![Ana Sayfa](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/MovieHome.png)

TV Ana Sayfa
![Ana Sayfa TV](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/TvHomeShow.png)

Film Kategori
![Film Kategori](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/filmgenres.png)

Film Detay
![Film Detay](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/MovieDetail.png)

TV Kategori
![TV Kategori](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/TvSriesGenres.png)

TV Dizi Detay
![Dizi Detay](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/TvSeriesPage.png)

Arama Sayfası
![Arama](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/Search.png)

Kaydedilenler Sayfası
![Kaydedilenler](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/Saved.png)

Favoriler Sayfası
![Favoriler](https://raw.githubusercontent.com/Gokce227/movie-webapp-nextjs-react-tyspescript/main/public/Favoriler.png)

---

## ⚙️ Kurulum ve Çalıştırma

### 1. Projeyi Klonla

```bash
git clone https://github.com/Gokce227/movie-webapp-nextjs-react-tyspescript.git
cd movie-webapp-nextjs-react-tyspescript
npm install
```

### 2. `.env.local` Dosyasını Oluştur

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_API_KEY=your_openweather_api_key
```

> `NEXT_PUBLIC_TMDB_API_KEY`: TMDb'den alacağınız API anahtarı
> `REACT_APP_API_KEY`: OpenWeather API anahtarınız (isteğe bağlı kullanım)

### 3. Uygulamayı Başlat

```bash
npm run dev
```

Uygulama tarayıcıda şu adreste çalışır: [http://localhost:3000](http://localhost:3000)

---

