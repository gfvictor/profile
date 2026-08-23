declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

export function sendGAEvent(...args: unknown[]) {
  if (typeof window === 'undefined' || !window.dataLayer) return
  window.dataLayer.push(args)
}

export function buildGAInitScript(gaId: string) {
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', {
      transport_url: window.location.origin + '/ga',
      first_party_collection: true,
    });
  `
}
