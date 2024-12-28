const az = {
  Home: {
    movies: "Filmlər",
    recentlyAdded: "Ən Son Əlavə Olunanlar",
    cta: "Axtardığın bütün filmlər",
    ctaUrl: "{url}-da",
  },
  MetaData: {
    Home: {
      title: "Ana Səhifə",
      description:
        "FilmIsBest.com YusifAliyevPro tərəfindən yaradılmışdır. İstədiyiniz bütün filmləri İngiliscə, Türkçə və hər iki dildə altyazı seçimləri ilə izləyə bilərsiz. Həmçinin Film Fraqmanlarınada baxmaq mümkündür.",
    },
    Movies: {
      title: "Filmlər",
      description:
        "FilmIsBest.com YusifAliyevPro tərəfindən yaradılmışdır. İstədiyiniz bütün filmləri İngiliscə, Türkçə və hər iki dildə altyazı seçimləri ilə izləyə bilərsiz. Həmçinin Film Fraqmanlarınada baxmaq mümkündür.",
    },
    About: {
      title: "Haqqımda",
      description:
        "Bu vebsayt bir ehtiyac səbəbindən yaranıb. 2022-ci ilin Mart ayında dostlarımızla birlikdə keçirdiyimiz həftəlik film klubuna film gətirmə növbəsi məndə idi. Lakin yaddaş kartım işləmədiyindən, filmləri yükləmək üçün 3-4 saat ərzində bu vebsaytı yaratdım.",
    },
    NotFound: {
      title: "404 Tapılmadı",
      description: "Axtardığınız səhifə tapılmadı",
    },
  },
  About: {
    aboutTheProject: "Layihə Haqqında",
    toolsIUsed: "İstiafadə etdiyim alətlər:",
    text1:
      "Bu vebsayt bir ehtiyac səbəbindən yaranıb. 2022-ci ilin Mart ayında dostlarımızla birlikdə keçirdiyimiz həftəlik film klubuna film gətirmə növbəsi məndə idi. Lakin yaddaş kartım işləmədiyindən, filmləri yükləmək üçün 3-4 saat ərzində bu vebsaytı yaratdım.",
    text2:
      "İlk aylarda vebsayt çox statik idi və yalnız HTML-dən ibarət idi. Lakin sonrakı bir il ərzində öz bacarıqlarımı inkişaf etdirdim və vebsayt üzərində işləməyə davam etdim. Bu il yeni öyrəndiyim NextJS Framework-ü ilə vebsaytı yenidən yazdım.",
    text3:
      "Hal-hazırda vebsaytın aktiv inkişafını dayandırmış olsam da, bəzən kiçik dəyişikliklər edirəm.",
    buyACoffee:
      "Layihələrimə dəstək olmaq üçün mənə bir dənə kofe ala bilərsən😊:",
    myCodes: "Kodlarım GitHub hesabımdadır😺:",
  },
  Header: {
    homePage: "Ana Səhifə",
    movies: "Filmlər",
    about: "Haqqımda",
    signIn: "Daxil ol",
    thisFeatureIsUnderDevelopment: "Bu özəllik hazırlanma mərhələsindədir",
    LanguageSwitcher: {},
  },
  Footer: {
    FormSubmit: {
      movieRequest: "Film İstəyi",
      name: "Ad",
      email: "Email",
      movieName: "Filmin Adı",
      submit: "Göndər",
      emailPrivacy: "E-poçtunuzu heç vaxt başqası ilə paylaşmayacağıq",
      emailError: "Daxil etdiyiniz email düzgün deyil",
      movieNameError: "Film Adı boş qoyula bilməz",
      newMovieRequest: "Yeni Film Istəyi!",
      sending: "Göndərilir...",
      sent: "Göndərildi!",
      failedToSend: "Göndərilə bilmədi",
    },
  },
  Movies: {
    Search: {
      placeholder: "Film adı və ya IMDb ID'si ilə axtarın",
      noResultMessage: "Axtarışınıza uyğun film tapılmadı",
    },
  },
  Movie: {
    movieName: "Filmin Adı:",
    stars: "Ulduzlar:",
    category: "Kateqoriya:",
    director: "Rejissor(lar):",
    imdbScore: "IMDb xalı:",
    Sequels: {
      name: "Seriyası",
    },
    MovieBar: {
      english: "İngiliscə",
      englishSubtitle: "İngiliscə Altyazılı",
      turkish: "Türkçə",
      turkishSubtitle: "Türkçə Altyazılı",
      trailer: "Fraqman",
    },
    Share: {
      share: "Paylaş",
      imageBeingPrepared: "Şəkil hazırlanır...",
      pictureIsReady: "Şəkil hazırdır!",
      anErrorOccurred: "Xəta baş verdi",
      copied: "Kopyalandı!",
      inProgress: "Hazırlanır...",
      ctaText: "Fraqmanı və ya filmi izləmək üçün linkə keçid edin",
      other: "Digər",
    },
    MovieInfo: {
      movieDescription: "Filmin Təsviri:",
      time: "Vaxt",
      hour: "s",
      min: "d",
      year: "İl",
      country: "Ölkə",
      createdByChatGPT: "ChatGPT tərəfindən yazılmışdır",
    },
    Genres: {
      action: "Aksiyon",
      adventure: "Macəra",
      drama: "Dram",
      thriller: "Triller",
      animation: "Animasiya",
      comedy: "Komediya",
      family: "Ailə",
      "sci-fi": "Sci-Fi",
      fantasy: "Fantaziya",
      horror: "Qorxu",
      mystery: "Sirli",
      documentary: "Belgesel",
      war: "Müharibə",
      crime: "Cinayət",
      historical: "Tarixi",
    },
  },
  NotFound: {
    errorMessage: "Axtardığınız səhifə tapılmadı",
  },
} as const;
export default az;
