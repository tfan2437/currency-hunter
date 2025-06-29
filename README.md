# Currency Hunter

## Additional Dependencies

1. Tailwind CSS - Modern CSS framework
2. Tailwind Merge - Conditional styling
3. Prettier - className formatting

## Key Features

1. **Operations Selector**
   - Instead of a dropdown operations selector which adds an extra interaction step for users, I implemented a toggle-based selector.
   - This allows users to directly select operations without opening any dropdown menu, improving usability and efficiency.

2. **Hotkeys Support**
   - Up and Down arrow keys for increment and decrement when the number input is focused.

3. **Theme**
   - The theme color and design references the largest crypto trading platform Binance, also matching the theme color of the AIFT Vulcan product.

4. **Minimized UI Design**
   - For add and subtract operations without currency, the currency selector doesn't appear on both input and output.
   - Currency selectors are placed at the beginning for these two operations for a cleaner interface.

5. **Exchange Rates API**
   - The application fetches exchange rates once when the component mounts using useEffect.
   - All currency conversions are calculated based on these fetched rates.
   - Ideally, a production version would use websockets to maintain real-time communication with the backend for frequent updates to currency exchange rates, especially important for trading applications.
   - An alternative approach without websockets would be polling the rates at short intervals (e.g., 500ms), but this wasn't implemented in this demo due to potential API call limitations.

6. **SEO Optimization**
   - Enhanced index.html with appropriate title, favicon, and description for better search engine optimization.

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Live Demo

[https://currency-hunter.vercel.app/](https://currency-hunter.vercel.app/)

![preview](https://r2.tfan2437.workers.dev/temp/currency-hunter.png)

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Open Exchange Rates API
