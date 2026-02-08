import child_process from 'child_process';
import https from 'https';

const projRef = 'ggythvrukbudqilavpew';
try {
  const keysJson = child_process.execSync(`npx supabase projects api-keys list --project-ref ${projRef} -o json`, { encoding: 'utf8' });
  const keys = JSON.parse(keysJson);
  const srObj = keys.find(k => k.id === 'service_role');
  if (!srObj || !srObj.api_key) throw new Error('service_role key not found');
  const sr = srObj.api_key;

  const options = {
    hostname: `${projRef}.supabase.co`,
    path: `/auth/v1/admin/users?email=eq.muyindabrian@gmail.com`,
    method: 'GET',
    headers: {
      'apikey': sr,
      'Authorization': `Bearer ${sr}`
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log('STATUS', res.statusCode, res.statusMessage);
      try { console.log(JSON.parse(data)); } catch(e) { console.log(data); }
    });
  });
  req.on('error', (err) => {
    console.error('REQUEST ERROR', err.message);
  });
  req.end();
} catch (err) {
  console.error('ERROR', err.message);
  process.exit(1);
}
