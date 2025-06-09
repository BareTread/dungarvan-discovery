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

### v1.1.0 - Text Layout & Space Optimization
- ✨ Improved text layout and space utilization
- 📱 Enhanced responsive text sizing with clamp() functions
- 🔧 Expandable descriptions and local secrets
- 🎨 Better typography with optimized line heights
- 📐 Compact layout classes for mobile optimization
- 🏷️ Improved badge and header spacing
- 📜 Enhanced scrollable content areas

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
