// Dummy.js
const nodes = [];

// Create 10 clusters with random centers
const clusters = Array.from({ length: 10 }, () => ({
  centerX: Math.floor(Math.random() * 700),
  centerY: Math.floor(Math.random() * 500),
}));

// Generate 30 points per cluster with small deviations
clusters.forEach(({ centerX, centerY }) => {
  for (let i = 0; i < 1000; i++) {
    nodes.push({
      id: nodes.length + 1,
      x: centerX + Math.floor(Math.random() * 4000 - 2000), // spread ±20
      y: centerY + Math.floor(Math.random() * 4000 - 2000),
      temperature: Math.floor(Math.random() * 20) + 20, // Random temperature 20-39
    });
  }
});

// Add a few scattered points that are not near clusters
for (let i = 0; i < 10; i++) {
  nodes.push({
    id: nodes.length + 1,
    x: Math.floor(Math.random() * 700),
    y: Math.floor(Math.random() * 500),
    temperature: Math.floor(Math.random() * 20) + 20,
  });
};

export default nodes;
