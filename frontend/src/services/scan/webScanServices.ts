import api from '../apiServices';


export function runSSRFScan(url: string, cookie?: string) {
  return api.post('/scan/ssrf', { url, cookie: cookie || null });
}
