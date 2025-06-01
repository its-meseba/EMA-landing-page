# Changelog

All notable changes to the EMA Landing Page project will be documented in this file.

## [1.0.0] - 2024-11-13

### Added
- Initial project setup with Next.js and shadcn UI
- Hero section with animated title and floating elements
- Problem section highlighting challenges that EMA solves
- Guide section showcasing EMA's key features
- Plan section with a 3-step process
- Primary CTA section with call-to-action
- Loss section showing what happens without EMA
- Success section highlighting benefits
- Social proof with testimonials
- Final CTA section with special offer
- Footer with contact information

## [1.1.0] - 2024-11-14

### Added
- Interactive Language Demo Scene with floating bubbles
- Parallax Feature component with depth effects
- Interactive Demo showing EMA in action with multilingual support
- Feature Showcase with auto-playing tabs
- Comparison Table component comparing EMA to traditional solutions
- Animated FAQ section with search and filtering
- Custom animations and transitions throughout the site
- Enhanced styling with custom scrollbars
- Gradient and glow effects for visual appeal

### Changed
- Enhanced hero section with interactive language bubbles
- Improved layout and spacing for better visual hierarchy
- Updated typography for improved readability

### Fixed
- Mobile responsiveness issues
- Accessibility improvements

## [1.2.0] - 2024-11-15

### Added
- Custom VideoShowcase component with professional player controls
- AnimatedMetrics component with counting animations and visual stats
- IntegrationTimeline component showing the implementation process
- Enhanced TestimonialCarousel with smooth animations and visual elements
- Updated meta tags and SEO optimization
- Improved page layout with additional sections
- Placeholder handling for media content

### Changed
- Replaced interactive demo with professional video player
- Restructured page flow for improved storytelling
- Enhanced visual hierarchy with metrics section
- Added social proof with enhanced testimonial display

### Fixed
- Video playback issues with error handling
- Layout consistency across different screen sizes
- Navigation and scrolling behavior

## [Unreleased]

### Added
- Created new Navbar component with EMA logo and "Uygulamayı Kullan" button
- Added persistent navigation bar that redirects to app.ema.solace.com.tr
- Integrated navbar into the main application layout
- `VisuallyHidden` component for accessibility needs
- Documentation and example for Dialog accessibility requirements
- Example component demonstrating Dialog with visually hidden title
- Enhanced RotatingWords component with Turkish language support featuring 10 different action words
- Dynamic color assignment for each rotating word to create visual variety and engagement
- Language attribute support for better accessibility and SEO
- Expanded vocabulary showcasing EMA's various capabilities in Turkish
- Created legal pages: Data Protection, Privacy Policy, and Cookie Policy under /legal/ route
- Added placeholder content for each legal page with appropriate titles and metadata
- Updated footer links to point to the new legal pages (data-protection, privacy-policy, cookie-policy)
- Ensured consistent styling and layout for the new legal pages

### Changed
- Updated Navbar to use the contact modal instead of linking to a contact page
- Enhanced user experience with proper form state management
- Added accessibility documentation to Dialog component
- Updated hero section mobile title to use flexbox for better text alignment
- Simplified RotatingWords component with fixed minimum width for consistent spacing
- Made RotatingWords component props optional to support internal multilingual configuration
- Updated testimonial content in `TestimonialCarousel.tsx` to match SB7 framework.
- Improved `TestimonialCarousel.tsx` transition animation to prevent UI disruption by adding `mode="popLayout"` to `AnimatePresence` and making testimonial fields optional to accommodate new data structure.

## 2023-10-14

### Enhanced Hero Section
- Completely reimagined the language bubble background for a smoother UI experience
- Reduced the number of language bubbles to 5 strategically placed ones (3 on mobile)
- Added subtle floating animations that respond to user interaction
- Implemented mouse proximity effect where bubbles respond to cursor movement
- Added subtle particle background effects for visual depth
- Improved accessibility with properly labeled decorative elements
- Enhanced performance by optimizing animations
- Added subtle light effects to create depth in the hero background 

## 2023-10-15

### Redesigned Language Bubbles Demo Scene
- Completely rebuilt the language demonstration experience with a modern interface
- Created strategically positioned language bubbles in a circular arrangement
- Added visual connection lines to show EMA's language processing capabilities
- Implemented mouse interaction effects with subtle scale and hover states
- Added language flags and identifiers for better visual understanding
- Created satisfying selection and recognition animations
- Added a success state overlay with completion message
- Improved progress indication with animated counters
- Enhanced the scene with ambient lighting effects and depth
- Added translations to demonstrate EMA's language capabilities 

## [0.2.2] - 2023-09-30

### Enhanced
- Completely redesigned ContactModal to match the design shown in the screenshot:
  - Replaced the decorative background with a solid blue header area
  - Added a friendly emoji face icon instead of the logo
  - Redesigned the form with better contrast and readability 
  - Made background circles more subtle to prevent contrast issues
  - Simplified the success animation with a cleaner blue background
  - Updated mobile drawer to match the desktop dialog style
  - Used rounded-full buttons for better touch targets
  - Added light gray backgrounds to form inputs for better visibility

## [0.2.1] - 2023-09-29

### Enhanced
- Completely redesigned ContactModal with beautiful visuals:
  - Added animated decorative bubbles for background
  - Improved typography with gradient headings
  - Added EMA logo with pulsing animation effect
  - Enhanced form controls with custom styling and icons
  - Created fancy separator with wave design
  - Implemented fluid gradients for better visual appeal
  - Added elegant success animation with sequenced motion
  - Improved mobile bottom drawer with consistent styling
  - Enhanced button styles with gradients and hover effects

## [0.2.0] - 2023-09-28

### Added
- Contact Modal component for pilot program signup
  - Responsive design with desktop dialog and mobile bottom drawer
  - Form validation for name and email fields
  - Integration placeholder for Mailchimp API
  - Success/error handling with toast notifications
- useMediaQuery hook for responsive component rendering
- Connected all CTA buttons to the contact modal
- Added toast notifications using sonner

### Changed
- Updated Navbar to use the contact modal instead of linking to a contact page
- Enhanced user experience with proper form state management

## [0.1.0] - 2023-09-15

### Added
- Initial landing page with responsive design
- Hero section with animated elements
- Problem and solution sections
- Feature showcase components
- Testimonials section
- Integration timeline
- Comparison table
- FAQ section 

### Fixed
- Fixed mobile responsive alignment issue in hero section title where rotating words were not properly aligned with "EMA" text
- Improved RotatingWords component baseline alignment by using flexbox layout and removing problematic invisible spacer
- Enhanced mobile title layout with better spacing and proper text alignment

### Changed
- Updated hero section mobile title to use flexbox for better text alignment
- Simplified RotatingWords component with fixed minimum width for consistent spacing 