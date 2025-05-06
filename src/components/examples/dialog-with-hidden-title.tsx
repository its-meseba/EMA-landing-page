'use client';

import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/registry/new-york-v4/ui/dialog';

export function DialogWithHiddenTitle() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
                {/* 
          DialogTitle is required for accessibility even if hidden visually.
          VisuallyHidden keeps it accessible to screen readers.
        */}
                <VisuallyHidden>
                    <DialogTitle>Important Information</DialogTitle>
                </VisuallyHidden>

                <DialogHeader>
                    {/* Visual heading that users will see */}
                    <h2 className='text-lg font-semibold'>Content Header</h2>
                    <DialogDescription>
                        This dialog demonstrates using a VisuallyHidden component to provide an accessible title for
                        screen readers while showing different visual content.
                    </DialogDescription>
                </DialogHeader>

                <div className='py-4'>
                    <p>Main content of the dialog goes here.</p>
                </div>

                <DialogFooter>
                    <Button type='button'>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
