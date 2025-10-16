import { useEffect, useState, type ChangeEvent } from 'react';
import { toDataURL } from 'qrcode';

type QrResult = {
  text: string;
  dataUrl: string;
};

const DEFAULT_TEXT = 'Hello from QR frontend';

async function buildQr(text: string): Promise<QrResult> {
  const trimmed = text.trim();

  if (!trimmed) {
    throw new Error('Digite um texto para gerar o QR');
  }

  const dataUrl = await toDataURL(trimmed, {
    width: 256,
    margin: 2,
    errorCorrectionLevel: 'medium'
  });

  return { text: trimmed, dataUrl };
}

export default function App() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [qr, setQr] = useState<QrResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void handleGenerate(DEFAULT_TEXT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGenerate(newText: string) {
    setLoading(true);
    setError(null);

    try {
      const result = await buildQr(newText);
      setQr(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      setQr(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        backgroundColor: '#0f172a',
        color: '#e2e8f0',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      }}
    >
      <section
        style={{
          width: 'min(520px, 95vw)',
          backgroundColor: '#111827',
          borderRadius: '1.25rem',
          padding: '2.5rem',
          boxShadow: '0 30px 80px rgba(2, 6, 23, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.1)'
        }}
      >
        <h1
          style={{
            marginBottom: '1.5rem',
            fontSize: '2rem',
            textAlign: 'center',
            color: '#f8fafc',
            letterSpacing: '0.03em'
          }}
        >
          Gerador de QR Code
        </h1>

        <p style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.95rem' }}>
          Digite qualquer texto ou URL e gere um QR instantâneo sem depender do backend.
        </p>

        <label
          style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#cbd5f5' }}
          htmlFor="qr-input"
        >
          Texto
        </label>

        <input
          id="qr-input"
          value={text}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
          placeholder="Digite o texto do QR"
          style={{
            width: '100%',
            padding: '0.85rem 1.1rem',
            borderRadius: '0.9rem',
            border: '1px solid rgba(148, 163, 184, 0.35)',
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            color: '#e2e8f0',
            marginBottom: '1.25rem',
            fontSize: '1rem',
            outline: 'none',
            boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)',
            transition: 'border-color 120ms ease, box-shadow 120ms ease'
          }}
          onFocus={(event) => {
            event.currentTarget.style.borderColor = '#3b82f6';
            event.currentTarget.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.25)';
          }}
          onBlur={(event) => {
            event.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.35)';
            event.currentTarget.style.boxShadow = '0 0 0 0 rgba(59, 130, 246, 0)';
          }}
        />

        <button
          type="button"
          onClick={() => void handleGenerate(text)}
          disabled={loading || text.trim().length === 0}
          style={{
            width: '100%',
            padding: '0.95rem 1rem',
            borderRadius: '0.9rem',
            border: 'none',
            backgroundImage: loading
              ? 'linear-gradient(120deg, #334155, #1e293b)'
              : 'linear-gradient(120deg, #2563eb, #7c3aed)',
            color: '#f8fafc',
            fontWeight: 600,
            fontSize: '1.05rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 150ms ease, box-shadow 150ms ease',
            boxShadow: loading ? 'none' : '0 15px 40px rgba(59, 130, 246, 0.35)'
          }}
          onMouseEnter={(event) => {
            if (!loading) {
              event.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {loading ? 'Gerando…' : 'Gerar QR Code'}
        </button>

        {error && (
          <p style={{ color: '#f87171', marginTop: '1.25rem', textAlign: 'center' }}>{error}</p>
        )}

        {qr && !error && (
          <figure
            style={{
              marginTop: '2rem',
              textAlign: 'center',
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid rgba(148, 163, 184, 0.1)'
            }}
          >
            <img
              src={qr.dataUrl}
              alt={`QR code for ${qr.text}`}
              style={{
                width: '256px',
                height: '256px',
                margin: '0 auto',
                borderRadius: '0.75rem',
                backgroundColor: '#fff'
              }}
            />
            <figcaption style={{ marginTop: '0.9rem', fontSize: '0.95rem', color: '#cbd5f5' }}>
              {qr.text}
            </figcaption>
          </figure>
        )}
      </section>
    </main>
  );
}
