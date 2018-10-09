
export default function BackendURI(uri) {
  const backed = 'http://localhost:9600';
  // const backed = 'https://wavebackend.now.sh';
  return backed + uri;
}
