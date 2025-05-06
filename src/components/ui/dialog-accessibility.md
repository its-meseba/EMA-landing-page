# Dialog Accessibility

## DialogContent and DialogTitle

According to Radix UI's accessibility guidelines, every `DialogContent` should contain a `DialogTitle` component to properly label the dialog for screen reader users. This helps users understand the purpose of the dialog.

## Using VisuallyHidden

In cases where you want to provide a title for screen readers but don't want to display it visually, you can use the `VisuallyHidden` component:

```tsx
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { Dialog, DialogContent, DialogTitle } from '@/registry/new-york-v4/ui/dialog';

function MyDialog() {
    return (
        <Dialog>
            <DialogContent>
                {/* This title is accessible to screen readers but invisible visually */}
                <VisuallyHidden>
                    <DialogTitle>Dialog Purpose</DialogTitle>
                </VisuallyHidden>

                {/* Your visible dialog content */}
                <div>
                    <h2>Visual Heading</h2>
                    <p>Content goes here...</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
```

## Complete Example

See `src/components/examples/dialog-with-hidden-title.tsx` for a complete implementation example.

## Additional Resources

For more detailed accessibility guidelines, refer to the Radix UI documentation:
https://radix-ui.com/primitives/docs/components/dialog
