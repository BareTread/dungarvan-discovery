# Dungarvan Discovery

An interactive card-based adventure game that helps visitors discover hidden gems, local secrets, and unforgettable experiences in Dungarvan, Ireland's Ancient East.

## 🎴 Features

- **Interactive Card Game**: Choose from 5 randomly dealt adventure cards
- **60+ Activities**: Curated experiences across 6 categories (Adventure, Coastal, Foodie, Heritage, Hidden Gems, Culture)
- **Smooth Animations**: Built with Framer Motion for delightful user interactions
- **Responsive Design**: Works beautifully on all devices
- **Accessibility First**: Full keyboard navigation and screen reader support
- **Dark Mode**: Elegant dark theme optimized for readability

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Zustand
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚀 Deployment

### Quick Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BareTread/dungarvan-discovery)

### Manual Deployment

1. **Vercel** (Recommended):
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Netlify**:
   ```bash
   npm run build
   # Upload the .next folder to Netlify
   ```

3. **GitHub Pages** (Static Export):
   ```bash
   npm run build
   npm run export
   # Deploy the out/ folder
   ```

### Environment Variables

No environment variables are required for basic functionality.

## 📱 Recent Updates

### v1.2.0 - Text Overlap Fix & Layout Optimization
- 🔧 **Fixed critical text overlap issue** between selected cards and success message
- 📐 **Dramatically increased spacing** with responsive clamp() functions for all screen sizes
- 🎴 **Reduced card height** from 20rem to 18rem to prevent content overflow
- 🏷️ **Constrained local secret sections** with max-height and overflow protection
- 📱 **Enhanced mobile responsiveness** with optimized padding and margins
- 🎨 **Improved typography** with smaller, more compact text sizing
- 🛡️ **Added multiple safety layers** to prevent future overlap issues
- ⚡ **Performance optimizations** with better container management

### v1.1.0 - Text Layout & Space Optimization
- ✨ Improved text layout and space utilization
- 📱 Enhanced responsive text sizing with clamp() functions
- 🔧 Expandable descriptions and local secrets
- 🎨 Better typography with optimized line heights
- 📐 Compact layout classes for mobile optimization
- 🏷️ Improved badge and header spacing
- 📜 Enhanced scrollable content areas

## 🐛 Bug Fixes & Improvements

### Text Overlap Resolution (v1.2.0)
**Problem**: The "🎉 Your Adventure Awaits!" text was overlapping with the selected card's local secret section, particularly on mobile devices.

**Root Cause Analysis**:
- Selected cards had scaling and y-offset animations extending beyond container boundaries
- Insufficient spacing between card content and success message
- Local secret sections were not properly constrained within card boundaries
- Card content was overflowing the defined card height limits

**Comprehensive Solution**:

#### 1. Spacing & Layout Improvements
- **Selected card margin**: Increased to `clamp(3rem, 10vw, 6rem)`
- **Success message margin-top**: Enhanced to `clamp(4rem, 12vw, 8rem)`
- **Additional padding layers**: Added `clamp(2rem, 6vw, 4rem)` for extra protection
- **Container overflow**: Set to `visible` with proper z-index management

#### 2. Card Dimension Optimization
- **Card height reduction**: From `clamp(17rem, 42vw, 20rem)` to `clamp(15rem, 38vw, 18rem)`
- **Local secret max-height**: Limited to `clamp(4rem, 15vw, 6rem)`
- **Content padding**: Optimized to `clamp(0.5rem, 2vw, 0.75rem)`

#### 3. Animation Constraints
- **Removed problematic scaling**: Changed from `scale: 1.02` to `scale: 1.0`
- **Eliminated y-offset**: Changed from `y: -8` to `y: 0`
- **Enhanced container management**: Added overflow protection

#### 4. Typography Refinements
- **Font size optimization**: Reduced to `clamp(0.8rem, 2.5vw, 0.9rem)`
- **Line height improvement**: Adjusted from `1.6` to `1.4`
- **Text overflow handling**: Added `text-overflow: ellipsis`

#### 5. Multi-Layer Protection System
1. **Card height constraint** - Physical limit on card growth
2. **Local secret height constraint** - Content section boundaries
3. **Massive spacing gaps** - Buffer zones between elements
4. **Overflow hidden** - Content clipping as final safety net

**Result**: Complete elimination of text overlap across all device sizes with generous spacing that maintains visual appeal while ensuring proper content boundaries.

## 🔧 Technical Implementation Details

### Key Files Modified

#### `src/components/CardHand.tsx`
- **Selected card container**: Enhanced spacing with `clamp(3rem, 10vw, 6rem)` margin
- **Success message positioning**: Added responsive margin-top and padding-top
- **Layout transitions**: Improved with proper overflow handling

#### `src/components/GameCard.tsx`
- **Animation constraints**: Removed scaling and y-offset animations
- **Container management**: Added overflow protection and z-index handling
- **Content padding**: Optimized with responsive clamp() functions

#### `src/app/globals.css`
- **Card dimensions**: Reduced max heights for better content fit
- **Local secret styling**: Added max-height constraints and overflow protection
- **Typography optimization**: Improved font sizes and line heights
- **Spacing utilities**: Enhanced with mobile-optimized gap classes

### CSS Custom Properties Used
```css
--card-height-md: clamp(15rem, 38vw, 18rem);
--spacing-section-gap: clamp(0.75rem, 3vw, 1.5rem);
--spacing-card-padding: clamp(0.75rem, 3vw, 1rem);
```

### Responsive Design Strategy
- **Mobile-first approach**: Base styles optimized for small screens
- **Clamp() functions**: Fluid scaling between minimum and maximum values
- **Viewport-relative units**: Using `vw` for responsive scaling
- **Breakpoint considerations**: Tailwind's responsive prefixes for larger screens

### Performance Optimizations
- **Transform-gpu classes**: Hardware acceleration for smooth animations
- **Overflow management**: Prevents unnecessary repaints and reflows
- **Z-index optimization**: Proper stacking context management
- **Content constraints**: Prevents layout thrashing from dynamic content

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
