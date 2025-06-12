'use client';

import { useState } from 'react';

import Image from 'next/image';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/registry/new-york-v4/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from '@/registry/new-york-v4/ui/drawer';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, Mail, User } from 'lucide-react';
import { toast } from 'sonner';

interface ContactModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            toast.error('Lütfen tüm alanları doldurun.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Geçerli bir e-posta adresi girin.');
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/mailchimp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle specific error messages from the API
                toast.error(data.error || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            setIsSuccess(true);
            toast.success('Başvurunuz alındı. Teşekkürler!');

            // Reset form after success
            setTimeout(() => {
                setName('');
                setEmail('');
                setIsSuccess(false);
                onOpenChange(false);
            }, 2000);
        } catch (error) {
            setIsLoading(false);
            toast.error('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setIsSuccess(false);
    };

    // Decorative bubbles for background - more subtle now
    const Bubbles = () => (
        <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className='absolute rounded-full bg-blue-300/5 dark:bg-blue-300/5'
                    style={{
                        width: `${Math.random() * 150 + 80}px`,
                        height: `${Math.random() * 150 + 80}px`,
                        top: `${i % 2 === 0 ? Math.random() * 40 : 50 + Math.random() * 40}%`,
                        left: `${i % 2 === 0 ? 5 + Math.random() * 30 : 65 + Math.random() * 30}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 10 + 15}s`
                    }}
                />
            ))}
        </div>
    );

    // Success animation component
    const SuccessAnimation = () => (
        <motion.div
            className='absolute inset-0 z-10 flex items-center justify-center bg-blue-500'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
                className='flex flex-col items-center text-white'
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}>
                <motion.div
                    className='mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white'
                    initial={{ borderWidth: 0 }}
                    animate={{ borderWidth: 4 }}
                    transition={{ delay: 0.4, duration: 0.4 }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}>
                        <Check className='h-8 w-8' />
                    </motion.div>
                </motion.div>
                <motion.p
                    className='text-xl font-bold'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}>
                    Başvurunuz Alındı
                </motion.p>
                <motion.p
                    className='mt-1 text-sm opacity-90'
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 }}>
                    En kısa sürede sizinle iletişime geçeceğiz
                </motion.p>
            </motion.div>
        </motion.div>
    );

    if (isDesktop || true) {
        return (
            <Dialog
                open={open}
                onOpenChange={(open) => {
                    if (!open) resetForm();
                    onOpenChange(open);
                }}>
                <DialogContent className='overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-lg sm:max-w-[480px] dark:bg-slate-950'>
                    <div className='relative'>
                        {/* Background with a cleaner look */}
                        <div className='absolute inset-0 -z-10 bg-white dark:bg-slate-950' />

                        {/* Logo and header area */}
                        <div className='relative overflow-hidden rounded-t-2xl bg-blue-500 px-8 pt-12 pb-8'>
                            <Bubbles />
                            <div className='relative z-1 flex flex-col items-center'>
                                {/* EMA Logo */}
                                <div className='mb-6 h-20 w-20 overflow-hidden rounded-2xl bg-white p-2'>
                                    <Image
                                        src='/branding/logo.png'
                                        alt='EMA Logo'
                                        width={80}
                                        height={80}
                                        className='h-full w-full object-contain'
                                    />
                                </div>

                                <h2 className='mb-2 text-2xl font-bold text-white'>EMA Program Başvurusu</h2>
                                <p className='max-w-sm text-center text-sm text-blue-100'>
                                    Mağazanızda EMA kullanmak için bilgilerinizi doldurun. En kısa sürede sizinle
                                    iletişime geçeceğiz.
                                </p>
                            </div>
                        </div>

                        {/* Form area */}
                        <form onSubmit={handleSubmit} className='relative px-8 pt-6 pb-6'>
                            <div className='space-y-5'>
                                <div>
                                    <Label
                                        htmlFor='name'
                                        className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                                        <User className='h-4 w-4 text-blue-500' />
                                        Ad Soyad
                                    </Label>
                                    <Input
                                        id='name'
                                        placeholder='Adınız Soyadınız'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={isLoading || isSuccess}
                                        className='mt-2 rounded-xl border-gray-200 bg-gray-50 py-6 pr-3 pl-3 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900'
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor='email'
                                        className='flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                                        <Mail className='h-4 w-4 text-blue-500' />
                                        E-posta
                                    </Label>
                                    <Input
                                        id='email'
                                        type='email'
                                        placeholder='you@example.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading || isSuccess}
                                        className='mt-2 rounded-xl border-gray-200 bg-gray-50 py-6 pr-3 pl-3 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-800 dark:bg-slate-900'
                                    />
                                </div>
                            </div>

                            <div className='mt-8'>
                                <Button
                                    type='submit'
                                    disabled={isLoading || isSuccess}
                                    className='w-full rounded-full border-0 bg-blue-500 py-6 text-white shadow-md transition-all hover:bg-blue-600 focus:ring-4 focus:ring-blue-500/30'>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Gönderiliyor
                                        </>
                                    ) : isSuccess ? (
                                        <>
                                            <Check className='mr-2 h-4 w-4' />
                                            Gönderildi
                                        </>
                                    ) : (
                                        'Gönder'
                                    )}
                                </Button>
                            </div>

                            <AnimatePresence>{isSuccess && <SuccessAnimation />}</AnimatePresence>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

}
