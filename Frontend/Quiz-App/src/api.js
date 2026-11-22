export async function api(path, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('token');
  let response;
  try {
    response = await fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
  } catch {
    throw new Error('Cannot reach the server. Start the backend services, then try again.');
  }

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message = (data && (data.detail || data.message)) || 'Request failed.';
    throw new Error(message);
  }
  return data;
}

export function saveResult(result) {
  const existing = JSON.parse(localStorage.getItem('quizbattleResults') || '[]');
  existing.unshift(result);
  localStorage.setItem('quizbattleResults', JSON.stringify(existing.slice(0, 30)));
}

export function loadResults() {
  try {
    return JSON.parse(localStorage.getItem('quizbattleResults') || '[]');
  } catch {
    return [];
  }
}
