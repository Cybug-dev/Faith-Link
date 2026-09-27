export type ContactMessage = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(payload: ContactMessage): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL as string | undefined;

  if (!endpoint) {
    // Keeps the UI workflow testable until the backend endpoint is connected.
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    return;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Your message could not be delivered. Please try again.');
  }
}
