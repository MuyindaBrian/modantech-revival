#!/usr/bin/env node
import child_process from 'child_process';
import https from 'https';
import crypto from 'crypto';

(async () => {
  try {
    const execSync = child_process.execSync;
    const projRef = 'ggythvrukbudqilavpew';
    const keysJson = execSync(`npx supabase projects api-keys list --project-ref ${projRef} -o json`, { encoding: 'utf8' });
    // debug: ensure we received some output
    if (!keysJson || keysJson.trim().length < 2) throw new Error('No keys JSON returned from supabase CLI');
    const keys = JSON.parse(keysJson);
    const srObj = keys.find(k => k.id === 'service_role');
    if (!srObj || !srObj.api_key) throw new Error('service_role key not found');
    const sr = srObj.api_key;
    console.error('Got service_role key (hidden) and proceeding...');

    // Generate a URL-safe temporary password
    const raw = crypto.randomBytes(12).toString('base64');
    const pw = raw.replace(/[^a-zA-Z0-9]/g, 'A').slice(0, 16);

    const body = JSON.stringify({ email: 'muyindabrian@gmail.com', password: pw, email_confirm: true, user_metadata: { role: 'admin' } });

    const options = {
      hostname: 'ggythvrukbudqilavpew.supabase.co',
      path: '/auth/v1/admin/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'apikey': sr,
        'Authorization': `Bearer ${sr}`
      }
    };

    const resp = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, statusMessage: res.statusMessage, headers: res.headers, body: data }));
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    });

    if (resp.statusCode >= 200 && resp.statusCode < 300) {
      console.log('CREATED');
      console.log(pw);
      try {
        const parsed = JSON.parse(resp.body);
        console.log(JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.log(resp.body);
      }
    } else {
      console.error('ERROR', resp.statusCode, resp.statusMessage);
      console.error(resp.body);
      process.exit(1);
    }
  } catch (err) {
    console.error('FAILED', err.message);
    process.exit(1);
  }
})();
