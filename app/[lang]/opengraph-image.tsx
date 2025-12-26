import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
// Image metadata
export const alt = 'FirstSpawn - Find your forever server';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
export default async function Image() {
  // Using standard fonts available in Edge runtime or loading them if necessary.
  // For simplicity in this iteration, we'll use system fonts but style them to look retro/terminal-like.
  // In a real production setup, we would load the specific font file (Press Start 2P) here.

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Decorative Grid Background */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.2,
            }}
        />

        {/* Outer Border */}
        <div
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                border: '4px solid #22d3ee',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(34, 211, 238, 0.2)',
            }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', zIndex: 10 }}>
            {/* Logo / Brand */}
            <div
                style={{
                    fontSize: 80,
                    fontWeight: 900,
                    color: '#fff',
                    textShadow: '4px 4px 0px #22d3ee', // Cyan shadow
                    letterSpacing: '-2px',
                }}
            >
                FIRST_SPAWN
            </div>

            {/* Tagline */}
            <div
                style={{
                    fontSize: 40,
                    color: '#a1a1aa', // Zinc-400
                    marginTop: '20px',
                    textAlign: 'center',
                    maxWidth: '800px',
                }}
            >
                Find your forever server.
            </div>

            {/* Decorative "Status" */}
            <div
                style={{
                    marginTop: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '10px 20px',
                    border: '2px solid #333',
                    backgroundColor: '#111',
                    borderRadius: '8px',
                }}
            >
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#4ade80' }} />
                <div style={{ fontSize: '24px', color: '#fff' }}>SYSTEMS: ONLINE</div>
            </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
