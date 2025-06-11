AI Agent Instructions: Enhancing the 'Dungarvan Discovery' Application

## Project Description

This project is a Next.js application built with TypeScript. It utilizes Tailwind CSS for utility-first styling and global CSS variables for theming. Framer Motion is employed for animations. The application, "Dungarvan Discovery," is a card game where users are dealt cards representing local activities or adventures. Users select one card, which is then revealed.

## Primary Goal

The primary goal of these instructions is to improve the overall user interface (UI) and user experience (UX) of the "Dungarvan Discovery" application. This involves:

*   Fixing styling inconsistencies to make the application look more polished and professional.
*   Smoothing out and enhancing animations, removing any "jankiness."
*   Achieving a final result that is a visually appealing and engaging application.

## General Note

Please apply the following changes precisely as described. Each section will specify the target file and the modifications needed. Pay close attention to class names, CSS properties, and animation parameters.

## File: `src/app/globals.css`

### 1. Responsive Typography
*   **Instruction:** "Replace existing heading and body font size definitions (if any specific ones exist beyond Tailwind's defaults) with responsive font sizes using `clamp()` for better scalability across devices. Ensure base body font size is also responsive."
*   **Example (to be adapted based on existing CSS variables or new ones):**
    ```css
    /* Add to :root or update if similar variables exist */
    :root {
      --font-size-base: clamp(1rem, 0.9vw + 0.5rem, 1.125rem); /* Approx 16px to 18px */
      --font-size-h1: clamp(2.5rem, 4vw + 1rem, 4rem);      /* Approx 40px to 64px */
      --font-size-h2: clamp(2rem, 3vw + 0.8rem, 3rem);       /* Approx 32px to 48px */
      --font-size-h3: clamp(1.5rem, 2vw + 0.7rem, 2.25rem);  /* Approx 24px to 36px */
      /* Add more as needed for h4, p, etc. */
    }

    body {
      font-size: var(--font-size-base);
      /* ... existing body styles ... */
    }

    /* Suggest updating specific heading classes if not using semantic HTML for sizing */
    /* e.g., h1, .text-4xl, .text-6xl might need to use these variables or similar clamps */
    ```
*   **Note:** "Tailwind's typography utilities (e.g., `text-lg`, `text-xl`) are already responsive to some extent. The goal here is to establish a more fluid global baseline, especially for key elements like `body` or if custom font size variables are in use. Analyze existing code to see if `--card-width` or other dimension variables could also benefit from `clamp()`."

### 2. Enhanced Body Background
*   **Instruction:** "The current `body` background has radial gradients and an SVG pattern. We'll refine this for a more dynamic and polished feel. The goal is to make it subtly more engaging without being distracting."
*   **Modification for `body` background-image and add a subtle animation:**
    ```css
    body {
      /* ... existing color, font-family, etc. ... */
      background-color: hsl(var(--background)); /* Fallback */
      background-image:
        radial-gradient(ellipse 80% 80% at 50% -20%, hsl(var(--primary) / 0.15), transparent 70%), /* Adjusted alpha and spread */
        radial-gradient(ellipse 60% 100% at 50% 120%, hsl(316 73% 52% / 0.12), transparent 70%), /* Adjusted alpha, spread and position */
        url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="M0 58.59l2.83-2.83 1.41 1.41L1.41 60H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM58.59 60l-2.83-2.83 1.41-1.41L60 58.59V60h-1.41zM60 1.41l-2.83 2.83-1.41-1.41L58.59 0H60v1.41zM30 28.6l2.83-2.83 1.41 1.41L31.41 30l2.83 2.83-1.41 1.41L30 31.41l-2.83 2.83-1.41-1.41L28.59 30l-2.83-2.83 1.41-1.41L30 28.59z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E'); /* Slightly larger, more subtle pattern */
      animation: subtleBackgroundShift 20s linear infinite alternate;
      overflow: hidden; /* Already present, ensure it's intended */
    }

    @keyframes subtleBackgroundShift {
      0% { background-position: 0% 0%, 0% 0%, 0% 0%; }
      100% { background-position: 0% 0%, 0% 0%, 10% 10%; } /* Shift only the SVG pattern */
    }
    ```
*   **Note:** "The animation subtly shifts the SVG pattern. Ensure this is not performance-intensive. The gradient values have been slightly tweaked for a softer effect."

### 3. Improved Focus States
*   **Instruction:** "The existing focus state is good (`outline: 2px solid hsl(var(--primary))`). We can refine it slightly for a softer, more modern feel, perhaps using a combination of box-shadow and outline, and ensuring it's consistent across interactive elements."
*   **CSS to update/replace existing `*:focus-visible`:**
    ```css
    *:focus-visible {
      outline: 2px solid transparent; /* Make outline transparent */
      outline-offset: 2px;
      box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--primary) / 0.8); /* Softer, layered shadow */
      border-radius: var(--radius); /* Ensure this matches the element's radius if possible */
    }
    /* Ensure *:focus:not(:focus-visible) remains to hide non-keyboard focus outlines */
    ```

### 4. Card Hover/Focus Effects (`.game-card`)
*   **Instruction:** "The `.game-card` already has a pseudo-element for hover glow. Let's enhance this and ensure it's consistent for focus states as well, and perhaps add a subtle lift effect."
*   **CSS to update/replace existing `.game-card::before` and related styles:**
    ```css
    .game-card {
      /* ... existing styles ... */
      transition: transform 0.3s ease, box-shadow 0.3s ease; /* Add transform and shadow to transition */
    }

    .game-card:hover, .game-card:focus-visible { /* Apply hover effects on focus-visible too */
      transform: translateY(-4px) scale(1.02); /* Subtle lift and scale */
      box-shadow: 0 15px 35px -10px hsl(0 0% 0% / 0.5), 0 5px 15px -5px hsl(0 0% 0% / 0.3); /* Enhanced shadow */
    }

    .game-card::before {
      content: "";
      position: absolute;
      inset: -2px; /* Slightly larger to create a border-like glow */
      border-radius: calc(var(--radius) + 2px); /* Adjust radius accordingly */
      background: radial-gradient(600px circle at var(--x) var(--y), hsl(var(--primary) / 0.25), transparent 50%); /* Adjusted gradient */
      opacity: 0;
      transition: opacity 0.4s ease;
      z-index: -1; /* Ensure it's behind the card content */
    }

    .game-card:hover::before, .game-card:focus-visible::before {
      opacity: 1;
    }
    ```
*   **Note for `GameCard.tsx`:** "The JavaScript `onMouseMove` in `GameCard.tsx` that sets `--x` and `--y` CSS variables for the glow is good and should be kept. These CSS changes will utilize those variables."

## File: `src/components/CardDealer.tsx`

### 1. Responsive Main Container
*   **Instruction:** "The main `div` in `CardDealer.tsx` uses `p-4`. We should enhance padding for different screen sizes to ensure content isn't too close to the edges on larger screens and has enough space on smaller ones. The `justify-between` might also need refinement based on content flow, consider `justify-start` if the footer shouldn't always be pushed to the bottom, or ensure main content area grows appropriately."
*   **Locate:** The main `div`: `<div className="min-h-screen w-full flex flex-col items-center justify-between p-4 relative text-center overflow-hidden">`
*   **Suggested Change:**
    ```html
    <div className="min-h-screen w-full flex flex-col items-center justify-start sm:justify-between p-4 sm:p-6 md:p-8 relative text-center overflow-hidden">
    ```
*   **Explanation:** "Adds responsive padding (`p-4 sm:p-6 md:p-8`) and changes `justify-between` to `justify-start` on small screens if the content height is not enough, otherwise `sm:justify-between` will keep the footer at the bottom on larger screens where content typically fills more space. The `flex-1` on the `main` element should handle expansion."

### 2. Header Styling and Responsiveness
*   **Instruction:** "The header's top padding `pt-8` should also be responsive. The title and paragraph text sizes should adapt smoothly."
*   **Locate:** The `motion.header` element.
*   **Suggested Change (className):**
    ```html
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative z-10 w-full max-w-4xl mx-auto pt-8 sm:pt-12 md:pt-16"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-gold mb-4">
        Dungarvan Discovery
      </h1>
      <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
        Discover hidden gems, local secrets, and unforgettable experiences in Ireland&apos;s Ancient East.
      </p>
    </motion.header>
    ```
*   **Explanation:** "Introduces responsive top padding (`pt-8 sm:pt-12 md:pt-16`) for the header and adjusts text sizes (`sm:text-5xl` for `h1`, `sm:text-xl` for `p`) for better scaling. The existing `text-gradient-gold` and `text-slate-300` are good but ensure their definition in `globals.css` (if any custom classes beyond Tailwind defaults are used for these) supports these sizes well."

### 3. Welcome Screen Polish (`gameState.gamePhase === 'welcome'`)
*   **Instruction:** "The welcome screen elements (icon, title, paragraph, button) can be animated for a more dynamic entry. The `glass-morphism` class should be reviewed or enhanced in `globals.css` if not already providing a satisfactory effect."
*   **Locate:** The `motion.div` with `key="welcome"`.
*   **Suggested Enhancements (adding individual `motion` components and refining styles):**
    ```tsx
    // Inside the AnimatePresence for !hasCards && gameState.gamePhase === 'welcome'
    <motion.div
      key="welcome"
      initial="hidden" // Use variants for staggered animations
      animate="visible"
      exit={{ opacity: 0, scale: 0.9 }}
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
      }}
      className="flex flex-col items-center p-6 sm:p-8 rounded-xl bg-black/30 backdrop-blur-lg shadow-2xl border border-white/10" // Enhanced glass morphism
    >
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-6xl sm:text-7xl mb-6">🎴</motion.div>
      <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready for an Adventure?</motion.h2>
      <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-slate-200 mb-8 max-w-md mx-auto text-lg sm:text-xl">
        We&apos;ll deal you 5 cards. Choose one and let serendipity guide your day!
      </motion.p>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
        <Button
          onClick={dealNewHand}
          disabled={isDealing}
          size="lg"
          className="font-semibold text-lg px-8 py-3" // Ensure button padding is generous
        >
          <Shuffle className={`mr-2 h-5 w-5 ${isDealing ? 'motion-safe:animate-spin' : ''}`} />
          {isDealing ? 'Dealing...' : 'Deal the Cards'}
        </Button>
      </motion.div>
    </motion.div>
    ```
*   **Explanation:**
    *   "Introduces `variants` for staggered animations on the welcome screen elements for a smoother, more professional appearance."
    *   "Enhances the `glass-morphism` effect directly on the `className` with `bg-black/30 backdrop-blur-lg shadow-2xl border border-white/10`. If a global `.glass-morphism` class is preferred, define these properties there."
    *   "Adjusted text sizes for better readability and impact."
    *   "Added `px-8 py-3` to the button for a more prominent call to action, assuming `size='lg'` from `button.tsx` might need this explicit override or adjustment in its definition."

### 4. Action Buttons Footer
*   **Instruction:** "The footer buttons appear when `isComplete` is true. Ensure their layout (`flex-col sm:flex-row`) works well and buttons have appropriate styling."
*   **Locate:** The `footer` element and its `motion.div`.
*   **Suggested Check:** "The current classes `flex flex-col sm:flex-row gap-4` are generally good. Ensure the `Button` components themselves (from `button.tsx`) have refined styling (covered in a later step) for optimal appearance here. The `bg-background/50` on the 'Start Over' button provides a nice distinction."
*   **Consideration:** "If the footer feels too cramped on very small screens when buttons are stacked, adjust padding or button size specifically for that breakpoint if necessary."

## File: `src/components/CardHand.tsx`

### 1. Responsive Card Container
*   **Instruction:** "The most significant change here is making the card container responsive. The fixed size `h-[450px] w-[800px]` will not work on smaller screens. We need to make it dynamic, possibly by using percentages for width and `vw` or `vh` units, or by adjusting its size based on the card dimensions which are already responsive (`--card-width: clamp(260px, 20vw, 300px)`)."
*   **Locate:** The main `motion.div` for the card hand: `<motion.div className="relative h-[450px] w-[800px] flex items-center justify-center" ...>`
*   **Suggested Change (this is a conceptual change, exact values might need testing):**
    ```tsx
    // In CardHand.tsx
    // Option 1: Percentage-based width and maintain aspect ratio or use viewport units for height
    <motion.div
      className="relative w-[90%] max-w-[800px] h-[60vh] max-h-[450px] flex items-center justify-center"
      // Or, calculate height based on card aspect ratio + buffer (more complex)
      // style={{ height: `calc(var(--card-width) * ${aspectRatioVariable} + ${bufferVariable}px)` }}
      variants={handContainerVariants} initial="initial" animate="animate"
      onAnimationComplete={onDealingComplete}
    >
    ```
*   **Explanation:** "Replaces fixed width and height with responsive units (`w-[90%] max-w-[800px] h-[60vh] max-h-[450px]`). This allows the container to shrink on smaller screens while having a maximum size on larger ones. The `max-w` ensures it doesn't become overly wide. The `h-[60vh]` makes height relative to viewport height, with `max-h` as a cap. Fine-tuning these values will be important during implementation. The card positioning logic below will also need to adapt."

### 2. Dynamic Card Fanning, Positioning, and Hover Animation
*   **Instruction:** "The card positioning (`x: (index - 2) * 100`, `rotate: (index - 2) * 8`) needs to be dynamic based on the new responsive container and card widths. The hover effect also needs refinement for a smoother experience."
*   **Locate:** The `motion.div` for each card inside the `.map` function.
*   **Suggested Changes to `animate` prop within the card's `motion.div`:**
    ```tsx
    // Inside the cards.map((card, index) => { ... })
    // ...
    // Define base card width and gap, possibly outside the map for efficiency if they don't change per card
    const cardWidthVW = 20; // From --card-width: clamp(260px, 20vw, 300px) - using the vw part
    const gap = -cardWidthVW / 2; // Example: Negative gap for overlap, adjust as needed

    // ...
    animate={{ // This is the 'animate' prop for the individual card's motion.div
      ...cardMotionProps.animate, // Keep existing entry animation properties
      ...(isRevealing
        ? { y: -50, scale: 1.15, rotate: 0, zIndex: 20 } // Slightly more pronounced reveal
        : {
            x: (index - (cards.length - 1) / 2) * (cardWidthVW * 0.6 + gap), // Dynamic X based on card width and desired overlap
            y: isHovered ? -60 : Math.abs(index - (cards.length - 1) / 2) * 15, // Adjusted y, more lift on hover
            scale: isHovered ? 1.15 : 1, // More scale on hover
            rotate: isHovered ? 0 : (index - (cards.length - 1) / 2) * 5, // Softer rotation, adjusted for dynamic center
            zIndex: isHovered ? 10 : 5 - Math.abs(index - (cards.length - 1) / 2),
            transition: { type: 'spring', stiffness: 120, damping: 15 } // Fine-tuned spring
          }
      ),
    }}
    ```
*   **Explanation:**
    *   "The `x` position now calculates the center of the hand `(cards.length - 1) / 2` and distributes cards based on a fraction of `cardWidthVW` (derived from your `--card-width` variable) and a `gap`. This makes the fan responsive to the number of cards and their width."
    *   "The `y` offset for non-hovered cards is softened, and the hover `y` is increased (`-60`)."
    *   "Hover `scale` is increased to `1.15` for better feedback."
    *   "Rotation is softened (`* 5` degrees) and also centers dynamically."
    *   "The `transition` is slightly adjusted. The goal is a smoother, more fluid interaction."
    *   "**Important Note:** The `cardWidthVW` and `gap` values are illustrative. The actual implementation will need to calculate or retrieve the current rendered width of a card (e.g., using `ref.current.offsetWidth` if necessary, though CSS variables are preferred) if `vw` unit is not directly translatable here. Or, use a fixed pixel value for `gap` if `vw` for gap is too complex. The key is to make `x` positioning relative to the number of cards and their widths rather than fixed pixels."

### 3. Entry/Exit Animations for Cards (`cardMotionProps`):**
*   **Instruction:** "The `cardMotionProps` can be refined for a more dynamic entry."
*   **Locate:** The `cardMotionProps` constant.
*   **Suggested Change:**
    ```tsx
    const cardMotionProps = {
      initial: { opacity: 0, y: 150, scale: 0.6, rotate: Math.random() * 20 - 10 }, // Added slight random rotation
      animate: { opacity: 1, y: 0, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 150, damping: 20, mass: 1 } },
      exit: { opacity: 0, y: -120, scale: 0.6, rotate: Math.random() * -20 + 10, transition: { duration: 0.4, ease: 'anticipate' } }, // Adjusted exit
    };
    ```
*   **Explanation:** "Adds a slight random rotation to `initial` for a more playful dealing effect. Adjusts `y` and `rotate` for `initial` and `exit` states. Uses 'anticipate' ease for exit which can give a nice effect for UI elements disappearing."

### 4. "Choose Your Adventure" Prompt Styling:**
*   **Instruction:** "The prompt above the cards needs better styling and integration."
*   **Locate:** The `motion.div` with `key="header"` inside `CardHand.tsx`.
*   **Suggested Change (className and motion props):**
    ```tsx
    <motion.div
      key="header"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0, transition: { delay: isSelecting ? 0.8 : 0.2, duration: 0.6, ease: "easeOut" } }} // Adjust delay based on phase
      exit={{ opacity: 0, y: -20 }}
      className="mb-12 sm:mb-16 md:mb-20 text-center px-4" // Increased bottom margin and padding
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient-gold mb-3 sm:mb-4">Choose Your Adventure</h2>
      <p className="text-slate-300 text-base sm:text-lg">Hover a card to inspect, click to choose your path.</p>
    </motion.div>
    ```
*   **Explanation:** "Adds entry animation, increases bottom margin for better spacing, adds horizontal padding, and makes text sizes responsive. The transition delay is made conditional for a smoother appearance depending on the game phase."

### 5. "Your Adventure Awaits!" Header:**
*   **Instruction:** "The 'complete' phase header can also have its animation and style refined."
*   **Locate:** The `motion.h3` with `key="complete-header"`.
*   **Suggested Change:**
    ```tsx
    <motion.h3
      key="complete-header"
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.2, type: 'spring', stiffness: 100, damping: 12 } }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-celebrate mb-8 sm:mb-12 px-4" // Responsive text and margin
    >
      🎉 Your Adventure Awaits!
    </motion.h3>
    ```
*   **Explanation:** "Refines the animation to be a bit more bouncy and celebratory. Makes text size and bottom margin responsive."

## File: `src/components/GameCard.tsx`

### 1. Card Front Styling (`CardFront` component):**
*   **Instruction:** "Refine the `shine-effect` for smoothness and visual appeal. Ensure text elements are crisp."
*   **Locate:** The `CardFront` component and its inline `<style jsx>`.
*   **Suggested Change for `<style jsx>` inside `CardFront`:**
    ```jsx
    <style jsx>{`
      .shine-effect {
        position: absolute;
        top: -150%; /* Adjusted starting position */
        left: -250%; /* Adjusted starting position */
        width: 250%; /* Wider shine */
        height: 250%; /* Taller shine */
        opacity: 0;
        transform: rotate(30deg);
        background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.08) 30%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.08) 70%, rgba(255, 255, 255, 0) 100%); /* Softer, more spread out gradient */
        transition: opacity 0.5s ease-in-out, left 0.8s ease-in-out, top 0.8s ease-in-out; /* Smoother transition */
      }
      .group:hover .shine-effect {
        opacity: 0.7; /* Slightly more subtle max opacity */
        left: -10%; /* Adjusted end position */
        top: -40%;  /* Adjusted end position */
      }
    `}</style>
    ```
*   **And for the content of `CardFront`:**
    ```tsx
    <div className="text-6xl sm:text-7xl mb-4 transform group-hover:scale-110 transition-transform duration-300 ease-out">🎴</div>
    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 z-10">Mystery Adventure</h3>
    <p className="text-sm sm:text-base text-slate-300 z-10 px-2">Click to reveal your card</p> {/* Added padding and slightly larger text */}
    ```
*   **Explanation:** "The shine effect is made wider, softer, and its animation is adjusted for a smoother, more subtle appearance. Text sizes are made responsive and a slight copy change for clarity."
*   **Alternative for Shine:** "Consider moving the shine effect to Framer Motion for potentially better performance and consistency if CSS transitions prove insufficient or janky on some browsers, though the current CSS approach is often fine for this."

### 2. Card Back Styling (`CardBack` component):**
*   **Instruction:** "Improve typography, readability, and visual hierarchy on the revealed card. Ensure content adapts well to the card's size."
*   **Locate:** The `CardBack` component.
*   **Suggested Changes for `CardBack`'s content:**
    ```tsx
    // Inside CardBack component
    <div
        className="w-full h-full flex flex-col revealed-card-content text-white p-4 sm:p-5" // Adjusted padding
        style={{ '--gradient': getCategoryGradient(activity.category) } as React.CSSProperties}
    >
        <div className="flex justify-between items-start mb-3 sm:mb-4">
            <span className="text-4xl sm:text-5xl drop-shadow-lg">{activity.emoji}</span>
            <div className="flex flex-col gap-1.5 text-xs sm:text-sm font-semibold items-end">
                <span className="bg-black/30 rounded-full px-3 py-1 capitalize shadow-md">{activity.category}</span> {/* Enhanced styling */}
                <span className="bg-black/30 rounded-full px-3 py-1 shadow-md">{getTimeEmoji(activity.bestTime)}</span> {/* Enhanced styling */}
            </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold leading-tight mb-2 sm:mb-3" style={{textShadow: '0 1px 4px rgba(0,0,0,0.4)'}}>{activity.title}</h3>
        <div className="text-xs sm:text-sm opacity-90 space-y-1.5 mb-2 sm:mb-3 font-medium"> {/* Adjusted font size and margins */}
            <div className="flex items-center gap-2"><MapPin size={14} /> <span>{activity.location}</span></div>
            <div className="flex items-center gap-2"><Clock size={14} /> <span>{formatDuration(activity.duration)}</span></div>
        </div>
        <p className="text-sm sm:text-[15px] opacity-95 leading-relaxed flex-1 overflow-y-auto scrollbar-hide my-2 sm:my-3"> {/* Adjusted leading, margins */}
            {activity.description}
        </p>
        <div className="local-secret mt-auto p-3 sm:p-4 rounded-lg bg-white/10 backdrop-blur-sm border-t border-white/20"> {/* Enhanced local-secret styling, removed hardcoded radius */}
            <h3 className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs sm:text-sm text-yellow-300 mb-1"> {/* Adjusted text style */}
                <Lightbulb size={14}/> Local Secret
            </h3>
            <p className="text-xs sm:text-sm font-medium leading-snug text-yellow-100">{activity.localSecret}</p> {/* Adjusted text style */}
        </div>
    </div>
    ```
*   **Explanation:**
    *   "Adjusts padding, font sizes, and margins within `CardBack` to be responsive (`sm:` prefixes) and improve readability."
    *   "Enhances styling for category/time badges and the 'Local Secret' box for better visual appeal and hierarchy (e.g. `bg-black/30`, `text-yellow-300`)."
    *   "Changed `leading-snug` to `leading-relaxed` for the description for better readability of longer text."
    *   "The `local-secret` div has its styling updated to be more integrated with a glassmorphism feel and uses `mt-auto` to stick to the bottom if content above is short."
*   **CSS for `.revealed-card-content` in `globals.css` (if it's being modified there, or ensure these are Tailwind classes):**
    *   **Instruction:** "The `padding: 1.25rem` in `.revealed-card-content` from `globals.css` should be removed if we're applying responsive padding directly in the `CardBack` component via Tailwind classes like `p-4 sm:p-5`."
    *   **Change in `globals.css`:**
        ```css
        /* In globals.css, if .revealed-card-content is defined: */
        .revealed-card-content {
          /* padding: 1.25rem; */ /* Remove this line if applying padding with Tailwind in the component */
          background: var(--gradient);
        }
        ```

### 3. Card Flip Animation:**
*   **Instruction:** "The flip animation itself (`rotateY`) is standard. Ensure `perspective` is well-applied on the parent. We can add a slight scale change during the flip to give it more depth or a subtle overshoot."
*   **Locate:** The `motion.div` that wraps `AnimatePresence` for flipping (the one with `className="game-card group"`).
*   **And the `transition` props for `CardFront` and `CardBack` `motion.div`s.**
*   **Suggested Change for `CardFront` and `CardBack` transitions:**
    ```tsx
    // For both CardFront and CardBack motion.div:
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }} // Custom cubic-bezier for a smoother, more refined flip
    // Or, for a slightly bouncy flip:
    // transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.6 }}
    ```
*   **And for the parent `game-card` `motion.div`:**
    ```tsx
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="game-card group" // Keep existing class
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }} // Increased perspective
      // Add whileTap for a little interaction during click before flip
      whileTap={{ scale: 0.97, transition: { duration: 0.15, ease: "easeOut" } }}
    >
      <AnimatePresence initial={false} onExitComplete={() => { /* existing onExitComplete logic if any */ }}>
          {isFlipped ? <CardBack activity={activity} onFlipComplete={onFlipComplete} /> : <CardFront />}
      </AnimatePresence>
    </motion.div>
    ```
*   **Explanation:** "Increases `perspective` on the main `game-card` for a more pronounced 3D effect. Suggests a custom cubic-bezier easing function or a spring for the flip animation itself for a more polished feel. Adds `whileTap` for immediate feedback on click."

### 4. Mouse Move Glow Effect (`onMouseMove`):**
*   **Instruction:** "The existing `onMouseMove` for setting `--x` and `--y` for the radial gradient glow (defined in `globals.css` for `.game-card::before`) is good. Ensure it interacts well with the updated hover/focus effects."
*   **Check:** "No direct code change here, but confirm that the `--x` and `--y` variables are still effectively creating the interactive glow with the updated CSS for `.game-card::before` in `globals.css` (from Step 2.4)."

## File: `src/components/ui/button.tsx`

### 1. Enhanced Hover/Focus States:
*   **Instruction:** "The existing `buttonVariants` use `hover:bg-primary/90` etc. We can enhance this by ensuring smooth transitions and perhaps adding a subtle scale or shadow change for more tactile feedback, especially for the default and secondary variants. The focus state is primarily handled by global `*:focus-visible` styles, but we ensure consistency here."
*   **Locate:** The `buttonVariants` cva definition.
*   **Suggested Changes to `buttonVariants` (modifying existing variant definitions):**
    ```ts
    const buttonVariants = cva(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", // Added duration-200, ease-out, increased disabled opacity, ring-offset for focus
      {
        variants: {
          variant: {
            default:
              "bg-primary text-primary-foreground shadow-md hover:bg-primary/85 hover:shadow-lg active:bg-primary/75 active:scale-[0.98]", // Darker hover, added shadow-lg, active state
            destructive:
              "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/85 hover:shadow-md active:bg-destructive/75 active:scale-[0.98]", // Darker hover, active state
            outline:
              "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/80 active:scale-[0.98]", // Kept bg-transparent for true outline, active state
            secondary:
              "bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/85 hover:shadow-lg active:bg-secondary/75 active:scale-[0.98]", // Darker hover, added shadow-lg, active state
            ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80", // Active state
            link: "text-primary underline-offset-4 hover:underline active:opacity-80", // Active state
          },
          size: {
            default: "h-10 px-5 py-2.5", // Slightly larger default
            sm: "h-9 rounded-md px-3",   // Adjusted sm
            lg: "h-12 rounded-md px-8 text-base", // Adjusted lg, larger text
            icon: "h-10 w-10", // Adjusted icon
          },
        },
        defaultVariants: {
          variant: "default",
          size: "default",
        },
      }
    )
    ```
*   **Explanation:**
    *   "Added `transition-all duration-200 ease-out` to the base for smoother transitions on all properties."
    *   "For `default` and `secondary` variants:
        *   Made hover backgrounds slightly darker (`/85` instead of `/90` or `/80`).
        *   Added `hover:shadow-lg` for a subtle lift effect.
        *   Added `active:` states (e.g., `active:bg-primary/75 active:scale-[0.98]`) for feedback when the button is pressed."
    *   "For `outline` variant, ensured `bg-transparent` for a true outline feel, added active state."
    *   "Adjusted `disabled:opacity-50` to `disabled:opacity-60` for slightly better visibility of disabled text, if needed (could be 50 or 60, based on preference)."
    *   "Added `focus-visible:ring-offset-2` for better visibility of the focus ring against the button's own background."
    *   "Slightly adjusted padding and height values for `size` variants (`default`, `sm`, `lg`, `icon`) for better tap targets and visual balance. Increased text size for `lg` buttons."

### 2. Consistency with Global Focus Styles:
*   **Instruction:** "The `focus-visible:ring-1 focus-visible:ring-ring` is good. Ensure the `ring-offset` and other properties align with the global `*:focus-visible` style defined in `globals.css` for consistency. The suggestion above adds `ring-offset-2`."
*   **Check:** "The global `*:focus-visible` style was defined as `box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--primary) / 0.8); outline: 2px solid transparent;`. The `ring-2 ring-ring ring-offset-2` provided by Tailwind's utilities is a common and effective way to achieve a similar visual. If the global style is strictly preferred, the button's focus style might need to be overridden to use `box-shadow` instead of `ring`. For simplicity, using Tailwind's ring utilities is often fine and was suggested here."

## File: `src/components/ui/card.tsx`

### 1. Refined Base Card Styling:
*   **Instruction:** "The base `Card` component currently has `rounded-xl border bg-card text-card-foreground shadow`. We should ensure these defaults provide a modern, clean look. The `GameCard` component has its own more prominent shadow (`box-shadow: 0 10px 30px -10px hsl(0 0% 0% / 0.4)` in `globals.css` and hover enhancements). This base `Card` is likely used for other UI elements if any, or as a fallback. We'll suggest a slightly softer default shadow and ensure the border is subtle."
*   **Locate:** The `Card` component definition:
    ```tsx
    const Card = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
    >(({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border bg-card text-card-foreground shadow", // Current
          className
        )}
        {...props}
      />
    ))
    ```
*   **Suggested Change to `className` in the `Card` component:**
    ```tsx
    // In src/components/ui/card.tsx for the main Card component
    className={cn(
      "rounded-lg border border-white/10 bg-card text-card-foreground shadow-lg shadow-black/20", // Adjusted: softer radius, explicit border color, more defined shadow
      // Or, if a very subtle card is needed by default:
      // "rounded-lg border border-border/50 bg-card text-card-foreground shadow-md",
      className
    )}
    ```
*   **Explanation:**
    *   "Changed `rounded-xl` to `rounded-lg` (value of `--radius` is `1rem`, which is `16px`. `rounded-lg` is typically `0.5rem` or `8px`, `rounded-xl` is `0.75rem` or `12px`. This change makes it slightly less rounded, adjust based on desired aesthetic. If `--radius` should be the source of truth, ensure `rounded-[var(--radius)]` is used or that Tailwind's theme is configured). For this suggestion, `rounded-lg` is used for a slightly tighter look for generic cards."
    *   "Updated `border` to `border-white/10` for a subtle border that complements the dark theme. This assumes `--border` (currently `222 70% 15%`) might be too strong for a generic card background if not explicitly overridden."
    *   "Changed `shadow` to `shadow-lg shadow-black/20`. Tailwind's default `shadow` is quite light. `shadow-lg` is more substantial, and `shadow-black/20` gives it a bit more depth and color hinting for a dark theme. The exact shadow can be tuned (e.g., `shadow-xl`, or a custom shadow defined in `tailwind.config.js`)."
    *   "**Note:** This base `Card` styling should be generic enough. Specific card implementations like `GameCard` already have more specialized styling (e.g., through `.game-card` class) which will override or compose with these base styles. If this `Card` component is *only* used as a wrapper that gets immediately restyled by other components (like `GameCard`), these default changes might be less critical, but it's good practice for a UI component to have sensible defaults."

### 2. Card Header, Footer, Title, Description, Content Styling:
*   **Instruction:** "Review the padding and typography for `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, and `CardContent`. Ensure they provide good structure and readability."
*   **Locate:** The respective component definitions in `src/components/ui/card.tsx`.
*   **Suggested Minor Adjustments (if needed, defaults are often fine):**
    *   **CardHeader:** `className={cn("flex flex-col space-y-1.5 p-5 sm:p-6", className)}` (Slightly adjust padding, make responsive)
    *   **CardTitle:** `className={cn("text-lg sm:text-xl font-semibold leading-none tracking-tight", className)}` (Ensure it's appropriately sized, responsive)
    *   **CardDescription:** `className={cn("text-sm text-muted-foreground", className)}` (This is usually fine, ensure `text-muted-foreground` has good contrast)
    *   **CardContent:** `className={cn("p-5 sm:p-6 pt-0", className)}` (Adjust padding, make responsive)
    *   **CardFooter:** `className={cn("flex items-center p-5 sm:p-6 pt-0", className)}` (Adjust padding, make responsive)
*   **Explanation:** "Suggests making padding in `CardHeader`, `CardContent`, and `CardFooter` responsive (`p-5 sm:p-6`). Ensures `CardTitle` is also responsive. These are minor tweaks; the existing `shadcn/ui` defaults are generally well-thought-out. The key is to ensure consistency with the overall responsive design language being applied elsewhere."

## General Animation Review and Best Practices

### 1. Performance Considerations:
*   **Instruction:** "While implementing the animation changes suggested in previous sections (using Framer Motion and CSS transitions), it's crucial to keep performance in mind, especially on less powerful devices or larger screens."
*   **Key Points:**
    *   "**Prefer `transform` and `opacity`:** These properties are typically GPU-accelerated and lead to smoother animations. Avoid animating properties like `width`, `height`, `margin`, `padding`, or `top/left/bottom/right` directly for dynamic positional changes, as they can cause layout recalculations (reflows) and repaint issues, leading to 'jank'."
    *   "**Hardware Acceleration:** Framer Motion often handles this well by using `translate` for movement (which maps to `transform: translate()`). Ensure custom CSS animations also leverage `transform: translateX()`, `translateY()`, `scale()`, `rotate()`."
    *   "**Will-Change Property:** For elements with complex or persistent animations, consider applying the CSS `will-change: transform, opacity;` property. However, use it sparingly as overuse can consume more resources. Framer Motion might apply similar optimizations under the hood."
    *   "**Testing with Browser DevTools:** After changes are applied, use browser developer tools (especially the Performance tab and 'Animations' inspector in Chrome/Edge, or similar in Firefox) to:
        *   Check if animations are running smoothly (aim for 60 FPS).
        *   Identify any long frames or forced synchronous layouts caused by animations.
        *   Ensure animations are primarily handled by the compositor thread."
    *   "**Reduce Complexity:** If multiple complex elements are animating simultaneously, look for opportunities to simplify animations or stagger their start times more effectively."

### 2. Easing Functions and Timing:
*   **Instruction:** "The choice of easing functions and animation durations significantly impacts the perceived quality and feel of the UI. The suggestions provided specific easings (e.g., `ease: 'easeOut'`, `type: 'spring'`), but these can be fine-tuned."
*   **Key Points:**
    *   "**Natural Feel:** Aim for animations that feel natural and responsive. Spring physics (`type: 'spring'`) in Framer Motion often provides a more organic feel than traditional duration-based easings for interactive elements. Adjust `stiffness`, `damping`, and `mass` parameters to get the desired effect."
    *   "**Cubic Bezier Curves:** For `ease` properties, standard keywords like `ease-in`, `ease-out`, `ease-in-out` are good starting points. For more control, custom cubic bezier curves (e.g., `ease: [0.4, 0, 0.2, 1]`) can create very specific acceleration and deceleration patterns. Websites like `cubic-bezier.com` can help visualize and choose these."
    *   "**Duration:** Animation durations should generally be quick enough not to frustrate the user but long enough to be clearly perceived. Typical UI animation durations range from 150ms to 500ms. Interactive feedback (like button presses) should be faster, while transitions between states or views can be slightly longer."
    *   "**Consistency:** Use similar easing functions and durations for similar types of interactions across the application to create a cohesive experience."
    *   "**`anticipate` Easing:** Framer Motion's `anticipate` easing (e.g., `ease: "anticipate"`) can be effective for exit animations, where an element might slightly move in the opposite direction before disappearing, adding a touch of character."

### 3. Staggering and Orchestration:
*   **Instruction:** "For elements appearing or disappearing in groups (like cards being dealt or menu items appearing), use Framer Motion's `staggerChildren` and `delayChildren` properties on parent `motion` components."
*   **Key Points:**
    *   "**Subtlety:** Staggering effects should usually be subtle. A delay of `0.05`s to `0.2`s between items often works well."
    *   "**Orchestration with `transition` on Variants:** When using variants (`initial`, `animate`, `exit`), the `transition` prop within a variant can control `delayChildren` and `staggerChildren`, allowing complex sequences."

### 4. Accessibility Considerations for Animations:
*   **Instruction:** "While animations enhance UX, they can be problematic for users with motion sensitivities or vestibular disorders."
*   **Key Points:**
    *   "**`prefers-reduced-motion`:** Implement support for the `prefers-reduced-motion` media query. Animations should be significantly reduced or disabled if the user has this preference set in their operating system."
        ```css
        /* Example in CSS */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        ```
    *   "**Framer Motion Support:** Framer Motion has built-in ways to respect `prefers-reduced-motion`. Check its documentation for the best way to integrate this (e.g., by conditionally setting animation props or using `useReducedMotion()` hook)."
    *   "**Avoid Excessive Flashing or Strobing:** Ensure no animations create rapid flashing or strobing effects that could trigger seizures."
---
End of Instructions. Please apply these changes carefully. Good luck!
---
