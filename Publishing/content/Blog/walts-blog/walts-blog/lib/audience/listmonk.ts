const LISTMONK_URL = process.env.LISTMONK_URL;
const LISTMONK_API_USER = process.env.LISTMONK_API_USER;
const LISTMONK_API_TOKEN = process.env.LISTMONK_API_TOKEN;
const LISTMONK_LIST_ID = process.env.LISTMONK_LIST_ID || '1';

interface ListmonkSubscriber {
  id: number;
  email: string;
  name: string;
  status: 'enabled' | 'disabled' | 'blocklisted';
  lists: { id: number; name: string }[];
  created_at: string;
  updated_at: string;
}

interface ListmonkResponse<T> {
  data: T;
}

interface ListmonkError {
  message: string;
}

function getAuthHeader(): string {
  if (!LISTMONK_API_USER || !LISTMONK_API_TOKEN) {
    throw new Error('Listmonk credentials not configured');
  }
  const credentials = Buffer.from(
    `${LISTMONK_API_USER}:${LISTMONK_API_TOKEN}`
  ).toString('base64');
  return `Basic ${credentials}`;
}

export async function addSubscriber(
  email: string,
  name?: string,
  listIds?: number[]
): Promise<{ success: boolean; error?: string; subscriber?: ListmonkSubscriber }> {
  if (!LISTMONK_URL) {
    return { success: false, error: 'Listmonk URL not configured' };
  }

  const lists = listIds || [parseInt(LISTMONK_LIST_ID, 10)];

  try {
    const response = await fetch(`${LISTMONK_URL}/api/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        email,
        name: name || '',
        status: 'enabled',
        lists,
        preconfirm_subscriptions: true,
      }),
    });

    if (response.status === 409) {
      // Subscriber already exists - not an error
      return { success: true };
    }

    if (!response.ok) {
      const error = (await response.json()) as ListmonkError;
      return { success: false, error: error.message || 'Failed to subscribe' };
    }

    const result = (await response.json()) as ListmonkResponse<ListmonkSubscriber>;
    return { success: true, subscriber: result.data };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, error: message };
  }
}

export async function getSubscriberByEmail(
  email: string
): Promise<ListmonkSubscriber | null> {
  if (!LISTMONK_URL) return null;

  try {
    const response = await fetch(
      `${LISTMONK_URL}/api/subscribers?query=email='${encodeURIComponent(email)}'`,
      {
        headers: {
          Authorization: getAuthHeader(),
        },
      }
    );

    if (!response.ok) return null;

    const result = (await response.json()) as ListmonkResponse<{ results: ListmonkSubscriber[] }>;
    return result.data.results[0] || null;
  } catch {
    return null;
  }
}
