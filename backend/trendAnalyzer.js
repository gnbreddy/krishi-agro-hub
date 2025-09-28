// Analyze price trends for crops over the last 6 months
// This is a stub. You should replace with real logic once you have time-series data.

export function analyzeTrends(crops) {
  // crops: [{ crop, price }]
  // Simulate 6 months of prices for each crop
  const months = ["Apr 2025", "May 2025", "Jun 2025", "Jul 2025", "Aug 2025", "Sep 2025"];
  return crops.map(({ crop, price }) => {
    // Simulate price changes (random walk)
    let prices = [price];
    for (let i = 1; i < months.length; i++) {
      prices.push(Math.round(prices[i - 1] * (1 + (Math.random() - 0.5) / 10)));
    }
    return { crop, prices, months };
  });
}
