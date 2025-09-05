'use client'

export default function TestPage() {
  return (
    <html>
      <body>
        <div style={{
          background: 'red',
          color: 'white',
          padding: '50px',
          fontSize: '48px',
          textAlign: 'center',
          minHeight: '100vh',
          fontFamily: 'Arial'
        }}>
          <h1>🚨 EMERGENCY TEST PAGE 🚨</h1>
          <p>Wenn du das siehst, funktioniert Claude Code!</p>
          <p>Port: 3300</p>
          <p>Zeit: {new Date().toLocaleString()}</p>
          <hr />
          <p style={{fontSize: '24px'}}>Gehe zurück zu http://localhost:3300/</p>
        </div>
      </body>
    </html>
  )
}