import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası | EMA',
    description: 'EMA\'nın gizlilik politikasını okuyarak kişisel bilgilerinizi nasıl işlediğimizi anlayın.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white pt-24 pb-16">
            <div className="container mx-auto px-5 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center">
                        <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                            Gizlilik Politikası
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-slate-300">
                            Son Güncelleme: 26 Ekim 2023
                        </p>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-6">
                        <p>
                            Solace Teknoloji A.Ş. (bundan sonra "Solace Teknoloji", "biz", "bize" veya "bizim" olarak anılacaktır) olarak, Etkileşimli Müşteri Asistanı (EMA) hizmetlerimizi ve web sitemizi (topluca "Hizmetler") kullandığınızda gizliliğinizi korumayı taahhüt ediyoruz. Bu Gizlilik Politikası, Hizmetlerimizi kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı, ifşa ettiğimizi ve koruduğumuzu açıklamaktadır.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">1. Topladığımız Bilgiler</h2>
                        <p>
                            Bize gönüllü olarak sağladığınız kişisel bilgileri (örneğin, EMA programımıza kaydolduğunuzda veya sorularınız için bizimle iletişime geçtiğinizde adınız, e-posta adresiniz ve diğer iletişim bilgileriniz gibi) toplayabiliriz. Ek olarak, EMA'yı kullandığınızda, taleplerinizi işlemek için ses verilerini toplayabiliriz. Ayrıca, web sitemizi ziyaret ettiğinizde IP adresiniz, tarayıcı türünüz, işletim sisteminiz ve çerezler ve benzer teknolojiler aracılığıyla kullanım alışkanlıklarınız gibi belirli bilgileri otomatik olarak toplarız.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">2. Bilgilerinizi Nasıl Kullanıyoruz?</h2>
                        <p>
                            Topladığımız bilgileri şu amaçlarla kullanırız:
                        </p>
                        <ul>
                            <li>Hizmetlerimizi sağlamak, işletmek ve sürdürmek.</li>
                            <li>Hizmetlerimizi iyileştirmek, kişiselleştirmek ve genişletmek.</li>
                            <li>Hizmetlerimizi nasıl kullandığınızı anlamak ve analiz etmek.</li>
                            <li>Yeni ürünler, hizmetler, özellikler ve işlevler geliştirmek.</li>
                            <li>Müşteri hizmetleri, Hizmetle ilgili güncellemeler ve diğer bilgiler sağlamak ve pazarlama ve tanıtım amaçları dahil olmak üzere doğrudan veya ortaklarımızdan biri aracılığıyla sizinle iletişim kurmak.</li>
                            <li>İşlemlerinizi işlemek ve EMA program katılımınızı yönetmek.</li>
                            <li>Dolandırıcılığı bulmak ve önlemek.</li>
                            <li>Yasal yükümlülüklere uymak.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">3. Bilgilerinizi Paylaşma</h2>
                        <p>
                            Kişisel bilgilerinizi satmıyoruz. Bilgilerinizi aşağıdaki durumlarda paylaşabiliriz:
                        </p>
                        <ul>
                            <li><strong>Hizmet Sağlayıcılarla:</strong> Bilgilerinizi, veri analizi, ödeme işleme, müşteri hizmetleri ve pazarlama yardımı gibi bizim için veya bizim adımıza hizmetler gerçekleştiren üçüncü taraf satıcılar ve hizmet sağlayıcılarla paylaşabiliriz.</li>
                            <li><strong>Yasal Nedenlerle:</strong> Yasalar gereği veya kamu makamlarının (örneğin, bir mahkeme veya devlet kurumu) geçerli taleplerine yanıt olarak bilgilerinizi ifşa edebiliriz.</li>
                            <li><strong>Haklarımızı Korumak İçin:</strong> Politikalarımızın potansiyel ihlallerini, şüpheli dolandırıcılığı, herhangi bir kişinin güvenliğine yönelik potansiyel tehditleri ve yasa dışı faaliyetleri araştırmak, önlemek veya bunlarla ilgili işlem yapmak için veya dahil olduğumuz davalarda kanıt olarak gerekli olduğuna inandığımız durumlarda bilgilerinizi ifşa edebiliriz.</li>
                            <li><strong>Rızanızla:</strong> Kişisel bilgilerinizi sizin rızanızla başka herhangi bir amaçla ifşa edebiliriz.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">4. Veri Güvenliği</h2>
                        <p>
                            Kişisel bilgilerinizi korumaya yardımcı olmak için idari, teknik ve fiziksel güvenlik önlemleri kullanıyoruz. Bize sağladığınız kişisel bilgileri güvence altına almak için makul adımlar atmış olsak da, çabalarımıza rağmen hiçbir güvenlik önleminin mükemmel veya aşılmaz olmadığını ve hiçbir veri aktarım yönteminin herhangi bir müdahale veya başka türden kötüye kullanıma karşı garanti edilemeyeceğini lütfen unutmayın.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">5. Veri Koruma Haklarınız</h2>
                        <p>
                            Bulunduğunuz yere bağlı olarak, bilgilerinize erişme, bunları düzeltme, güncelleme veya silme hakkı gibi kişisel bilgilerinizle ilgili belirli haklara sahip olabilirsiniz. Bu haklardan herhangi birini kullanmak isterseniz, lütfen info-ema@solace.com.tr adresinden bizimle iletişime geçin. Kişisel Verilerin Korunması Politikamızda bu haklarla ilgili daha detaylı bilgi bulabilirsiniz.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">6. Çerezler ve Takip Teknolojileri</h2>
                        <p>
                            Hizmetimizdeki etkinliği izlemek ve belirli bilgileri tutmak için çerezler ve benzer takip teknolojileri kullanıyoruz. Çerezleri nasıl kullandığımız hakkında daha fazla bilgi için lütfen <Link href="/legal/cookie-policy" className="text-blue-400 hover:text-blue-300">Çerez Politikamıza</Link> bakın.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">7. Çocukların Gizliliği</h2>
                        <p>
                            Hizmetlerimiz 13 yaşın altındaki çocuklar tarafından kullanılmak üzere tasarlanmamıştır. 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamıyoruz. 13 yaşın altındaki bir çocuktan kişisel bilgi topladığımızı fark edersek, bu tür bilgileri silmek için adımlar atacağız.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">8. Bu Gizlilik Politikasındaki Değişiklikler</h2>
                        <p>
                            Gizlilik Politikamızı zaman zaman güncelleyebiliriz. Herhangi bir değişikliği bu sayfada yeni Gizlilik Politikasını yayınlayarak ve "Son Güncelleme" tarihini güncelleyerek size bildireceğiz. Herhangi bir değişiklik için bu Gizlilik Politikasını periyodik olarak gözden geçirmeniz önerilir.
                        </p>

                        <h2 className="text-2xl font-bold text-blue-300 mt-8 mb-4">9. Bize Ulaşın</h2>
                        <p>
                            Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:
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