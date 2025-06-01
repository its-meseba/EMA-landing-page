import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Çerez Politikası | EMA',
    description: 'EMA\'nın web sitesinde çerezleri ve benzer teknolojileri nasıl kullandığını anlayın.',
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-24 pb-16">
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                            Çerez Politikası
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-slate-300">
                            Son Güncelleme: 26 Ekim 2023
                        </p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-6">
                        <p>
                            Bu Çerez Politikası, Solace Teknoloji A.Ş. (bundan sonra "Solace Teknoloji", "biz", "bize" veya "bizim" olarak anılacaktır) olarak Etkileşimli Müşteri Asistanı (EMA) web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda çerezleri ve benzer takip teknolojilerini nasıl kullandığımızı açıklamaktadır. Bu politika, <Link href="/legal/privacy-policy" className="text-blue-400 hover:text-blue-300">Gizlilik Politikamız</Link> ile birlikte okunmalıdır.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">1. Çerez Nedir?</h2>
                        <p>
                            Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza veya mobil cihazınıza yerleştirilen küçük metin dosyalarıdır. Web sitelerinin çalışmasını veya daha verimli çalışmasını sağlamanın yanı sıra site sahiplerine bilgi sağlamak için yaygın olarak kullanılırlar.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">2. Çerezleri Nasıl Kullanıyoruz?</h2>
                        <p>
                            Çerezleri aşağıda ayrıntıları verilen çeşitli nedenlerle kullanıyoruz. Maalesef çoğu durumda, çerezleri devre dışı bırakmak için bu siteye ekledikleri işlevselliği ve özellikleri tamamen devre dışı bırakmadan endüstri standardı seçenekler bulunmamaktadır. Kullandığınız bir hizmeti sağlamak için kullanılmaları durumunda ihtiyaç duyup duymadığınızdan emin değilseniz tüm çerezleri açık bırakmanız önerilir.
                        </p>
                        <p>Çerezleri şu amaçlarla kullanırız:</p>
                        <ul>
                            <li>Web sitemizin temel işlevlerini sağlamak.</li>
                            <li>Anonim istatistiksel veriler toplayarak web sitemizin nasıl kullanıldığını anlamak.</li>
                            <li>Kullanıcı deneyiminizi geliştirmek için tercihlerinizi hatırlamak.</li>
                            <li>Pazarlama çabalarımızı desteklemek.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">3. Kullandığımız Çerez Türleri</h2>
                        <ul>
                            <li>
                                <strong>Kesinlikle Gerekli Çerezler:</strong> Bu çerezler, web sitesinde gezinmeniz ve sitenin güvenli alanlarına erişim gibi özelliklerini kullanmanız için gereklidir. Bu çerezler olmadan kullanıcı hesapları gibi hizmetler sağlanamaz.
                            </li>
                            <li>
                                <strong>Performans Çerezleri:</strong> Bu çerezler, hangi sayfaları ziyaret ettiğiniz ve hangi bağlantılara tıkladığınız gibi web sitemizi nasıl kullandığınız hakkında bilgi toplar. Bu bilgilerin hiçbiri sizi tanımlamak için kullanılamaz. Tümü birleştirilir ve bu nedenle anonimleştirilir. Tek amaçları web sitesi işlevlerini iyileştirmektir.
                            </li>
                            <li>
                                <strong>İşlevsellik Çerezleri:</strong> Bu çerezler, web sitemizin geçmişte yaptığınız tercihleri (hangi dili tercih ettiğiniz veya kullanıcı adınız ve şifreniz gibi, böylece otomatik olarak giriş yapabilirsiniz) hatırlamasını sağlar.
                            </li>
                            <li>
                                <strong>Pazarlama Çerezleri:</strong> Bu çerezler, reklamverenlerin daha alakalı reklamlar sunmasına veya bir reklamı kaç kez gördüğünüzü sınırlamasına yardımcı olmak için çevrimiçi etkinliğinizi izler. Bu çerezler bu bilgileri diğer kuruluşlar veya reklamverenlerle paylaşabilir.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">4. Üçüncü Taraf Çerezleri</h2>
                        <p>
                            Bazı özel durumlarda, güvenilir üçüncü taraflarca sağlanan çerezleri de kullanırız. Aşağıdaki bölüm, bu site aracılığıyla karşılaşabileceğiniz üçüncü taraf çerezlerini ayrıntılı olarak açıklamaktadır.
                        </p>
                        <ul>
                            <li>
                                Siteyi nasıl kullandığınızı ve deneyiminizi nasıl iyileştirebileceğimizi anlamamıza yardımcı olmak için web'deki en yaygın ve güvenilir analiz çözümlerinden biri olan Google Analytics'i kullanıyoruz. Bu çerezler, sitede ne kadar zaman geçirdiğiniz ve ziyaret ettiğiniz sayfalar gibi şeyleri izleyebilir, böylece ilgi çekici içerik üretmeye devam edebiliriz. Google Analytics çerezleri hakkında daha fazla bilgi için resmi Google Analytics sayfasına bakın.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">5. Çerezleri Yönetme</h2>
                        <p>
                            Çerezleri kabul etme veya reddetme hakkına sahipsiniz. Çerez tercihlerinizi, web tarayıcınızın denetimlerini çerezleri kabul edecek veya reddedecek şekilde ayarlayarak veya değiştirerek kullanabilirsiniz. Çerezleri reddetmeyi seçerseniz, web sitemizin bazı işlevlerine ve alanlarına erişiminiz kısıtlanabilse de web sitemizi kullanmaya devam edebilirsiniz.
                        </p>
                        <p>
                            Çoğu web tarayıcısı, tarayıcı ayarları aracılığıyla çoğu çerezin bir miktar kontrolüne izin verir. Hangi çerezlerin ayarlandığını görmek de dahil olmak üzere çerezler hakkında daha fazla bilgi edinmek için <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">www.aboutcookies.org</a> veya <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">www.allaboutcookies.org</a> adreslerini ziyaret edin.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">6. Bu Çerez Politikasındaki Değişiklikler</h2>
                        <p>
                            Bu Çerez Politikasını, örneğin kullandığımız çerezlerdeki değişiklikleri veya diğer operasyonel, yasal veya düzenleyici nedenleri yansıtmak için zaman zaman güncelleyebiliriz. Bu nedenle, çerezleri ve ilgili teknolojileri kullanımımız hakkında bilgi sahibi olmak için lütfen bu Çerez Politikasını düzenli olarak yeniden ziyaret edin.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">7. Bize Ulaşın</h2>
                        <p>
                            Çerezleri veya diğer teknolojileri kullanımımız hakkında herhangi bir sorunuz varsa, lütfen bize info-ema@solace.com.tr adresinden e-posta gönderin.
                        </p>
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
                            &larr; Anasayfaya Dön
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
} 