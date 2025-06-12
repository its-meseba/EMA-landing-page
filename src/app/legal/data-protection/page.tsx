import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Veri Koruma Politikası | EMA',
    description: 'EMA\'nın veri koruma politikaları ve bilgilerinizi nasıl koruduğumuz hakkında bilgi edinin.',
};

export default function DataProtectionPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-24 pb-16">
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                            Kişisel Verilerin Korunması Politikası
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-slate-300">
                            Son Güncelleme: 26 Ekim 2023
                        </p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-6">
                        <p>
                            Solace Teknoloji A.Ş. (bundan sonra "Solace Teknoloji" veya "Şirket" olarak anılacaktır) olarak, Etkileşimli Müşteri Asistanı ("EMA") hizmetimiz aracılığıyla elde edilen kişisel verilerinizin güvenliğine ve gizliliğine büyük önem vermekteyiz. Bu Kişisel Verilerin Korunması Politikası ("Politika"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili diğer mevzuat uyarınca kişisel verilerinizin nasıl toplandığı, işlendiği, paylaşıldığı ve korunduğu hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">1. Veri Sorumlusu</h2>
                        <p>
                            KVKK kapsamında kişisel verilerinizle ilgili olarak veri sorumlusu Solace Teknoloji A.Ş.'dir.
                        </p>
                        <p>
                            Adres: [Şirket Adresiniz Buraya Gelecek]<br />
                            E-posta: info-ema@solace.com.tr<br />
                            Telefon: [Şirket Telefon Numaranız Buraya Gelecek]
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">2. Toplanan Kişisel Veriler</h2>
                        <p>
                            EMA hizmetlerinin sunulması kapsamında aşağıdaki türde kişisel veriler toplanabilmektedir:
                        </p>
                        <ul>
                            <li><strong>Kimlik Bilgileri:</strong> EMA başvuruları veya iletişim formları aracılığıyla sağladığınız ad, soyad gibi bilgiler.</li>
                            <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası gibi iletişim bilgileriniz.</li>
                            <li><strong>Ses Verileri:</strong> EMA ile etkileşimleriniz sırasında işlenen ses kayıtlarınız (hizmetin doğası gereği anonimleştirilerek veya açık rızanız alınarak işlenir).</li>
                            <li><strong>Kullanım Verileri:</strong> EMA platformu ile etkileşimlerinize ilişkin kullanım alışkanlıkları, sorgu içerikleri gibi veriler.</li>
                            <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri, işletim sistemi gibi teknik bilgiler.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
                        <p>
                            Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                        </p>
                        <ul>
                            <li>EMA hizmetlerini sunmak, yönetmek ve geliştirmek.</li>
                            <li>Hizmetlerimiz, güncellemeler ve destek taleplerinizle ilgili sizinle iletişim kurmak.</li>
                            <li>EMA başvurularını değerlendirmek ve yönetmek.</li>
                            <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
                            <li>Platformumuzun güvenliğini ve bütünlüğünü sağlamak.</li>
                            <li>Hizmet kullanımını analiz ederek kullanıcı deneyimini iyileştirmek ve yeni özellikler geliştirmek.</li>
                            <li>Pazarlama ve tanıtım faaliyetlerinde bulunmak (açık rızanız olması halinde).</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">4. Kişisel Veri İşlemenin Hukuki Sebepleri</h2>
                        <p>
                            Kişisel verilerinizin işlenmesinin hukuki sebepleri şunlardır:
                        </p>
                        <ul>
                            <li>Açık rızanızın bulunması (KVKK Madde 5/1).</li>
                            <li>Kanunlarda açıkça öngörülmesi (KVKK Madde 5/2-a).</li>
                            <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması (KVKK Madde 5/2-c).</li>
                            <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması (KVKK Madde 5/2-ç).</li>
                            <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması (KVKK Madde 5/2-f).</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">5. İlgili Kişinin Hakları (KVKK Madde 11)</h2>
                        <p>
                            KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
                        </p>
                        <ul>
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme.</li>
                            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme.</li>
                            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
                            <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme.</li>
                            <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme.</li>
                            <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme.</li>
                            <li>(d) ve (e) bentleri uyarınca yapılan işlemlerin, kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme.</li>
                            <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme.</li>
                            <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
                        </ul>
                        <p>Bu haklarınızı kullanmak için info-ema@solace.com.tr e-posta adresinden veya yukarıda belirtilen posta adresimiz üzerinden bizimle iletişime geçebilirsiniz. Başvurunuzda, kimliğinizi tevsik edici belgeler ve talebinizi içeren açıklamanızla birlikte tarafımıza iletmeniz rica olunur.</p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">6. Kişisel Verilerin Güvenliği</h2>
                        <p>
                            Solace Teknoloji, kişisel verilerinizin hukuka aykırı olarak işlenmesini, erişilmesini önlemek ve muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin etmeye yönelik gerekli her türlü teknik ve idari tedbirleri almaktadır.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">7. Kişisel Verilerin Saklanma Süresi</h2>
                        <p>
                            Kişisel verileriniz, işlenme amaçlarının gerektirdiği süre boyunca veya ilgili yasal mevzuatta öngörülen minimum süreler kadar muhafaza edilecektir. Bu sürenin sonunda, kişisel verileriniz KVKK ve ilgili mevzuata uygun olarak silinecek, yok edilecek veya anonim hale getirilecektir.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">8. Kişisel Verilerin Aktarılması</h2>
                        <p>
                            Kişisel verileriniz, KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde, Şirketimizin hizmetlerini sunabilmesi, yasal yükümlülüklerini yerine getirebilmesi, iş ortaklarımız, tedarikçilerimiz, kanunen yetkili kamu kurumları ve özel kişiler ile paylaşılabilecektir. Yurt dışına veri aktarımı söz konusu olduğunda KVKK'nın ilgili maddeleri uyarınca gerekli önlemler alınacaktır.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">9. Politikada Yapılacak Değişiklikler</h2>
                        <p>
                            Solace Teknoloji, işbu Kişisel Verilerin Korunması Politikası'nda yasal düzenlemelere ve Şirket politikalarına paralel olarak zaman zaman değişiklik yapma hakkını saklı tutar. Yapılan önemli değişiklikler web sitemizde veya diğer iletişim kanalları aracılığıyla tarafınıza bildirilecektir.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">10. İletişim</h2>
                        <p>
                            Bu Politika veya kişisel verilerinizin işlenmesi ile ilgili soru ve talepleriniz için aşağıdaki iletişim bilgilerinden bize ulaşabilirsiniz:
                        </p>
                        <p>
                            Solace Teknoloji A.Ş.<br />
                            E-posta: info-ema@solace.com.tr<br />
                            Adres: [Şirket Adresiniz Buraya Gelecek]
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