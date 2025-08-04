// This is a mock database. In a real application, you would use a proper database like PostgreSQL.
// We'll use an in-memory Map to store our data for this example.

export type UrlEntry = {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: Date;
};

const urlStore = new Map<string, UrlEntry>();

// Simulate some initial data
const initialShortCode = 'example';
urlStore.set(initialShortCode, {
  id: '1',
  originalUrl: 'https://firebase.google.com/',
  shortCode: initialShortCode,
  clicks: 42,
  createdAt: new Date('2023-10-26T10:00:00Z'),
});

function generateShortCode(length = 7): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function createShortUrl(originalUrl: string): Promise<UrlEntry> {
  await delay(500);
  
  let shortCode = generateShortCode();
  // Ensure short code is unique
  while (urlStore.has(shortCode)) {
    shortCode = generateShortCode();
  }

  const newEntry: UrlEntry = {
    id: (urlStore.size + 1).toString(),
    originalUrl,
    shortCode,
    clicks: 0,
    createdAt: new Date(),
  };

  urlStore.set(shortCode, newEntry);
  return newEntry;
}

export async function getUrlByShortCode(shortCode: string): Promise<UrlEntry | null> {
  await delay(100);
  const entry = urlStore.get(shortCode);
  return entry || null;
}

export async function incrementClickCount(shortCode: string): Promise<void> {
  await delay(50);
  const entry = urlStore.get(shortCode);
  if (entry) {
    entry.clicks += 1;
  }
}

export async function getStats(shortCode: string): Promise<UrlEntry | null> {
  return getUrlByShortCode(shortCode);
}
