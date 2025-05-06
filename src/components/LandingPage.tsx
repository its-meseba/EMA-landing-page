import React from 'react';

import Image from 'next/image';

// Section components
interface HeroSectionProps {
    tagline: string;
    subheading: string;
    logoSrc: string;
    primaryCTA: string;
}

const HeroSection = ({
    tagline = 'Konuşun, EMA sizi anlasın.',
    subheading = 'Mağazada sorular canlı, cevaplar da öyle olsun.',
    logoSrc,
    primaryCTA = 'Pilot Kuruluma Başvur'
}: HeroSectionProps) => {
    return (
        <section className='flex min-h-screen flex-col bg-gradient-to-br from-[#0e0f1a] to-[#1a2333] px-4 py-16 text-white md:flex-row md:px-12 md:py-24'>
            <div className='flex flex-col justify-center space-y-6 md:w-3/5'>
                <h1 className='text-4xl leading-tight font-bold md:text-6xl lg:text-7xl'>{tagline}</h1>
                <p className='text-xl text-gray-300 md:text-2xl'>{subheading}</p>
                <div>
                    <button className='rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-all hover:bg-blue-600'>
                        {primaryCTA}
                    </button>
                </div>
            </div>
            <div className='mt-10 flex items-center justify-center md:mt-0 md:w-2/5'>
                <div className='relative h-64 w-64 md:h-80 md:w-80'>
                    <Image src={logoSrc} alt='EMA Logo' fill className='object-contain' priority />
                </div>
            </div>
        </section>
    );
};

interface ProblemSectionProps {
    headline?: string;
    problems?: string[];
    empathyQuote?: string;
}

const ProblemSection = ({
    headline = 'Müşteriler arıyor, dokunmatik ekranlar yetmiyor.',
    problems = [
        'Yazmakla uğraşmak istemeyen müşteriler…',
        'Kalabalıkta sesini duyuramayan satış ekibi…',
        'Farklı diller, sınırlı zaman…'
    ],
    empathyQuote = 'Teknoloji konuştuğumu anlayamıyorsa, kimin için var?'
}: ProblemSectionProps) => {
    return (
        <section className='bg-gray-900 px-4 py-16 text-white md:px-12 md:py-24'>
            <div className='mx-auto max-w-5xl'>
                <h2 className='mb-12 text-3xl font-bold md:text-4xl'>{headline}</h2>
                <ul className='mb-12 space-y-6'>
                    {problems.map((problem, index) => (
                        <li key={index} className='flex items-start text-lg md:text-xl'>
                            <span className='mr-3 text-xl text-red-500'>❗</span>
                            <span>{problem}</span>
                        </li>
                    ))}
                </ul>
                <blockquote className='mx-auto max-w-3xl border-l-4 border-red-500 py-2 pl-6 text-center text-2xl italic'>
                    "{empathyQuote}"
                </blockquote>
            </div>
        </section>
    );
};

interface FeatureCard {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

interface GuideSectionProps {
    headline?: string;
    features?: FeatureCard[];
    empathyLine?: string;
}

const GuideSection = ({
    headline = 'Konuşan, dinleyen, anlayan asistan.',
    features = [
        {
            title: '5 Dil',
            description: 'Türkçe, İngilizce, Arapça, Rusça, Almanca'
        },
        {
            title: 'Doğal Konuşma',
            description: 'Yazma yok, dokunma yok'
        },
        {
            title: 'Bağlamsal Zekâ',
            description: 'Tutarlı cevaplar, öneriler'
        }
    ],
    empathyLine = 'Sizi ve müşterinizi anlıyoruz.'
}: GuideSectionProps) => {
    return (
        <section className='bg-gradient-to-r from-orange-400 to-white px-4 py-16 md:px-12 md:py-24'>
            <div className='mx-auto max-w-5xl'>
                <h2 className='mb-12 text-3xl font-bold text-gray-900 md:text-4xl'>{headline}</h2>
                <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
                    {features.map((feature, index) => (
                        <div key={index} className='rounded-xl bg-white p-6 shadow-lg'>
                            <h3 className='mb-2 text-xl font-bold text-gray-900'>{feature.title}</h3>
                            <p className='text-gray-700'>{feature.description}</p>
                        </div>
                    ))}
                </div>
                <p className='text-center text-xl font-medium text-blue-800'>{empathyLine}</p>
            </div>
        </section>
    );
};

interface Step {
    title: string;
    description: string;
}

interface PlanSectionProps {
    steps?: Step[];
    trustNote?: string;
}

const PlanSection = ({
    steps = [
        { title: "EMA'yı Kurun", description: 'Dakikalar içinde aktif.' },
        { title: 'Müşteriniz Konuşsun', description: 'Merhaba, kırmızı mont var mı?' },
        { title: 'Bilgiler Ekrana Gelsin', description: 'Stok, fiyat, yön tarifleri anında.' }
    ],
    trustNote = 'Sade kurulum, eğitim gerekmez.'
}: PlanSectionProps) => {
    return (
        <section className='bg-gray-100 px-4 py-16 md:px-12 md:py-24'>
            <div className='mx-auto max-w-5xl'>
                <h2 className='mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl'>3 Kolay Adım</h2>
                <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
                    {steps.map((step, index) => (
                        <div key={index} className='rounded-xl border-t-4 border-blue-500 bg-white p-6 shadow-md'>
                            <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white'>
                                {index + 1}
                            </div>
                            <h3 className='mb-2 text-xl font-bold text-gray-900'>{step.title}</h3>
                            <p className='text-gray-700'>{step.description}</p>
                        </div>
                    ))}
                </div>
                <p className='flex items-center justify-center text-center text-lg font-medium text-gray-700'>
                    <span className='mr-2'>✓</span>
                    {trustNote}
                </p>
            </div>
        </section>
    );
};

interface CTASectionProps {
    variant?: 'primary' | 'final';
    headline?: string;
    pitchLine?: string;
    cta?: string;
    secondaryLink?: string;
    finePrint?: string;
}

const CTASection = ({
    variant = 'primary',
    headline = variant === 'primary' ? 'Harekete Geçin' : 'Fırsatı Kaçırmayın',
    pitchLine = 'Müşteriniz konuşacak. EMA anlayacak. Siz kazanacaksınız.',
    cta = 'Pilot Kuruluma Başvur',
    secondaryLink,
    finePrint = variant === 'final' ? 'İlk 50 mağazaya özel lansman indirimi.' : undefined
}: CTASectionProps) => {
    const bgColor = variant === 'primary' ? 'bg-blue-500' : 'bg-white';
    const textColor = variant === 'primary' ? 'text-white' : 'text-gray-900';
    const buttonBg = variant === 'primary' ? 'bg-white' : 'bg-blue-500';
    const buttonText = variant === 'primary' ? 'text-blue-500' : 'text-white';

    return (
        <section className={`${bgColor} px-4 py-16 md:px-12 md:py-24`}>
            <div className='mx-auto max-w-4xl text-center'>
                <h2 className={`mb-6 text-3xl font-bold md:text-4xl ${textColor}`}>{headline}</h2>
                {pitchLine && <p className={`mb-8 text-xl font-medium md:text-2xl ${textColor}`}>{pitchLine}</p>}
                <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
                    <button
                        className={`${buttonBg} ${buttonText} rounded-lg px-8 py-3 text-lg font-medium shadow-lg transition-all hover:shadow-xl`}>
                        {cta}
                    </button>
                    {secondaryLink && (
                        <a href='#' className={`${textColor} text-lg underline`}>
                            {secondaryLink}
                        </a>
                    )}
                </div>
                {finePrint && <p className='mt-8 text-sm text-gray-600'>{finePrint}</p>}
            </div>
        </section>
    );
};

interface LossSectionProps {
    headline?: string;
    losses?: string[];
    warningLine?: string;
}

const LossSection = ({
    headline = 'Olmazsa Ne Olur?',
    losses = [
        'Müşteri ürünü bulamadan mağazayı terk eder.',
        'Yabancı müşteriyle iletişim kopar.',
        'Satış potansiyeli boşa gider.'
    ],
    warningLine = 'Her kaybedilen soru, kaybedilen ciro demektir.'
}: LossSectionProps) => {
    return (
        <section className='bg-red-900 px-4 py-16 text-white md:px-12 md:py-24'>
            <div className='mx-auto max-w-5xl'>
                <h2 className='mb-12 text-3xl font-bold md:text-4xl'>{headline}</h2>
                <ul className='mb-12 space-y-6'>
                    {losses.map((loss, index) => (
                        <li key={index} className='flex items-start text-lg md:text-xl'>
                            <span className='mr-3 text-xl text-red-400'>❌</span>
                            <span>{loss}</span>
                        </li>
                    ))}
                </ul>
                <div className='rounded-lg bg-yellow-500 p-4 text-center text-black'>
                    <p className='font-medium'>{warningLine}</p>
                </div>
            </div>
        </section>
    );
};

interface SuccessSectionProps {
    headline?: string;
    gains?: string[];
    summaryLine?: string;
}

const SuccessSection = ({
    headline = 'Olursa Ne Kazanırsınız?',
    gains = [
        'Müşteri memnun, mağaza verimli.',
        'Çalışan huzurlu, sorular azalır.',
        'Her konuşma içgörüye dönüşür.',
        'Satış artışı somutlaşır.'
    ],
    summaryLine = 'Teknoloji artık gerçekten yardımcı.'
}: SuccessSectionProps) => {
    return (
        <section className='bg-green-100 px-4 py-16 md:px-12 md:py-24'>
            <div className='mx-auto max-w-5xl'>
                <h2 className='mb-12 text-3xl font-bold text-gray-900 md:text-4xl'>{headline}</h2>
                <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2'>
                    {gains.map((gain, index) => (
                        <div key={index} className='flex items-start rounded-xl bg-white p-6 shadow-md'>
                            <span className='mr-3 text-xl text-green-500'>🎉</span>
                            <span className='text-lg text-gray-800'>{gain}</span>
                        </div>
                    ))}
                </div>
                <p className='text-center text-xl font-medium text-green-800'>{summaryLine}</p>
            </div>
        </section>
    );
};

interface Testimonial {
    quote: string;
    author: string;
    company: string;
    location: string;
}

interface SocialProofSectionProps {
    headline?: string;
    testimonials?: Testimonial[];
}

const SocialProofSection = ({
    headline = 'Onlar Ne Diyor?',
    testimonials = [
        {
            quote: 'EMA sayesinde yabancı müşterilerle %30 daha fazla satış yaptık.',
            author: 'GiyimMarket',
            company: '',
            location: 'İstanbul'
        },
        {
            quote: 'Ekrana dokunmak yerine konuşmak, özellikle yaşlı müşterilerimizi rahatlattı.',
            author: 'Teknoshop',
            company: '',
            location: 'Ankara'
        },
        {
            quote: 'Kurulum 20 dakika sürdü, ilk gün 120 ürün sorgusu aldık.',
            author: 'Outlet 44',
            company: '',
            location: 'İzmir'
        }
    ]
}: SocialProofSectionProps) => {
    return (
        <section className='bg-cream-100 bg-gradient-to-b from-gray-100 to-white px-4 py-16 md:px-12 md:py-24'>
            <div className='mx-auto max-w-5xl'>
                <h2 className='mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl'>{headline}</h2>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className='rounded-xl border border-gray-200 bg-white p-6 shadow-md'>
                            <p className='mb-4 text-lg text-gray-700'>"{testimonial.quote}"</p>
                            <div className='flex items-center'>
                                <div>
                                    <p className='font-bold text-gray-900'>
                                        {testimonial.author}
                                        {testimonial.company && `, ${testimonial.company}`}
                                    </p>
                                    <p className='text-gray-600'>{testimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

interface LegalLink {
    text: string;
    href: string;
}

interface SocialLink {
    platform: string;
    href: string;
    icon?: React.ReactNode;
}

interface FooterSectionProps {
    logoSrc: string;
    slogan?: string;
    legalLinks?: LegalLink[];
    contact?: {
        email?: string;
        phone?: string;
    };
    socials?: SocialLink[];
}

const FooterSection = ({
    logoSrc,
    slogan = 'Teknolojiyi Konuşma Kolaylığında Sunuyoruz.',
    legalLinks = [
        { text: 'KVKK', href: '#' },
        { text: 'Gizlilik Politikası', href: '#' },
        { text: 'Çerez Politikası', href: '#' }
    ],
    contact = {
        email: 'info@ema.ai',
        phone: '+90 212 000 00 00'
    },
    socials = [
        { platform: 'LinkedIn', href: '#' },
        { platform: 'Instagram', href: '#' },
        { platform: 'YouTube', href: '#' }
    ]
}: FooterSectionProps) => {
    return (
        <footer className='bg-gray-900 px-4 py-12 text-white md:px-12'>
            <div className='mx-auto max-w-6xl'>
                <div className='mb-8 grid grid-cols-1 gap-8 md:grid-cols-3'>
                    <div className='flex flex-col items-start'>
                        <div className='relative mb-4 h-12 w-32'>
                            <Image src={logoSrc} alt='EMA Logo' fill className='object-contain' />
                        </div>
                        <p className='text-gray-300'>{slogan}</p>
                    </div>

                    <div className='flex flex-col'>
                        <h3 className='mb-4 text-lg font-bold'>Yasal</h3>
                        <nav className='flex flex-col space-y-2'>
                            {legalLinks.map((link, index) => (
                                <a key={index} href={link.href} className='text-gray-300 hover:text-white'>
                                    {link.text}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className='flex flex-col'>
                        <h3 className='mb-4 text-lg font-bold'>İletişim</h3>
                        {contact.email && <p className='mb-2 text-gray-300'>{contact.email}</p>}
                        {contact.phone && <p className='mb-4 text-gray-300'>{contact.phone}</p>}
                        <div className='flex space-x-4'>
                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className='text-gray-300 hover:text-white'
                                    aria-label={social.platform}>
                                    {social.platform}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='border-t border-gray-800 pt-6 text-center text-gray-500'>
                    <p>© {new Date().getFullYear()} EMA</p>
                </div>
            </div>
        </footer>
    );
};

interface LandingPageProps {
    logoSrc: string;
}

export function LandingPage({ logoSrc }: LandingPageProps) {
    return (
        <main>
            <HeroSection
                tagline='Konuşun, EMA sizi anlasın.'
                subheading='Mağazada sorular canlı, cevaplar da öyle olsun.'
                logoSrc={logoSrc}
                primaryCTA='Pilot Kuruluma Başvur'
            />
            <ProblemSection />
            <GuideSection />
            <PlanSection />
            <CTASection variant='primary' secondaryLink='Standımıza Uğrayın, Canlı Görün' />
            <LossSection />
            <SuccessSection />
            <SocialProofSection />
            <CTASection variant='final' />
            <FooterSection logoSrc={logoSrc} />
        </main>
    );
}
