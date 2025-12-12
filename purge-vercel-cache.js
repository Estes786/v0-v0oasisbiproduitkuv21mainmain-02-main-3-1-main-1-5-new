const axios = require('axios');

const VERCEL_TOKEN = '8tBgFPFWrf6HD8LNUtrer4ql';
const PROJECT_ID = 'prj_ASRwaIZOLsLozMUi95ucbxZow0VQ';

async function purgeCDNCache() {
  try {
    console.log('🧹 Purging Vercel CDN Cache...\n');
    
    // Purge production deployment
    const response = await axios.post(
      `https://api.vercel.com/v1/purge`,
      {
        projectId: PROJECT_ID
      },
      {
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Cache purged successfully!');
    console.log('   Status:', response.status);
    console.log('\n⏳ Wait 1-2 minutes for cache to clear globally');
    console.log('   Then test website in incognito mode');
    
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('⚠️  Purge API endpoint not available');
      console.log('   Alternative: Use Vercel Dashboard to purge cache');
      console.log('   Go to: Settings → Caching → Purge Cache');
    } else {
      console.error('❌ Error:', error.response?.data || error.message);
    }
  }
}

purgeCDNCache();
