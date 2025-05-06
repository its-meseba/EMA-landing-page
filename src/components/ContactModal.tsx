'use client';

import { useState } from 'react';

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

import { Check, Loader2, X } from 'lucide-react';
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
            // Check if Mailchimp API keys are configured
            const mailchimpEnabled = process.env.NEXT_PUBLIC_MAILCHIMP_ENABLED === 'true';

            if (!mailchimpEnabled) {
                // Fallback if Mailchimp isn't configured
                setTimeout(() => {
                    toast.info('Pilot program başvuruları henüz aktif değil. Çok yakında!');
                    setIsLoading(false);
                }, 1000);
                return;
            }

            // Here we would implement actual Mailchimp integration
            // For now, simulate a successful API call
            setTimeout(() => {
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
            }, 1500);
        } catch (error) {
            setIsLoading(false);
            toast.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setIsSuccess(false);
    };

    if (isDesktop) {
        return (
            <Dialog
                open={open}
                onOpenChange={(open) => {
                    if (!open) resetForm();
                    onOpenChange(open);
                }}>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Pilot Program Başvurusu</DialogTitle>
                        <DialogDescription>
                            Mağazanızda EMA kullanmak için bilgilerinizi doldurun. En kısa sürede sizinle iletişime
                            geçeceğiz.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='name'>Ad Soyad</Label>
                                <Input
                                    id='name'
                                    placeholder='Adınız Soyadınız'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading || isSuccess}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='email'>E-posta</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='you@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading || isSuccess}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type='submit' disabled={isLoading || isSuccess}>
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
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={open}
            onOpenChange={(open) => {
                if (!open) resetForm();
                onOpenChange(open);
            }}>
            <DrawerContent>
                <DrawerHeader className='text-left'>
                    <DrawerTitle>Pilot Program Başvurusu</DrawerTitle>
                    <DrawerDescription>
                        Mağazanızda EMA kullanmak için bilgilerinizi doldurun. En kısa sürede sizinle iletişime
                        geçeceğiz.
                    </DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleSubmit}>
                    <div className='px-4'>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='name-mobile'>Ad Soyad</Label>
                                <Input
                                    id='name-mobile'
                                    placeholder='Adınız Soyadınız'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isLoading || isSuccess}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor='email-mobile'>E-posta</Label>
                                <Input
                                    id='email-mobile'
                                    type='email'
                                    placeholder='you@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading || isSuccess}
                                />
                            </div>
                        </div>
                    </div>
                    <DrawerFooter className='pt-2'>
                        <Button type='submit' disabled={isLoading || isSuccess}>
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
                        <DrawerClose asChild>
                            <Button variant='outline'>İptal</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}
