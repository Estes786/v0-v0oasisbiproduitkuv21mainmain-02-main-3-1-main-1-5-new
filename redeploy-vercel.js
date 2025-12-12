const axios = require('axios');

const VERCEL_TOKEN = '8tBgFPFWrf6HD8LNUtrer4ql';
const PROJECT_ID = 'prj_ASRwaIZOLsLozMUi95ucbxZow0VQ';

async function triggerDeployment() {
  try {
    console.log('🚀 Triggering Vercel redeploy...\n');
    
    const response = await axios.post(
      `https://api.vercel.com/v13/deployments`,
      {
        name: 'v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new',
        project: PROJECT_ID,
        target: 'production',
        gitSource: {
          type: 'github',
          ref: 'main',
          repoId: 900765033,
          repo: 'Estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Deployment triggered!');
    console.log('   Deployment ID:', response.data.id);
    console.log('   URL:', response.data.url);
    console.log('   Status:', response.data.readyState);
    console.log('\n📝 View deployment:');
    console.log(`   https://vercel.com/estes786/v0-v0oasisbiproduitkuv21mainmain-02-main-3-1-main-1-5-new/${response.data.id}`);
    console.log('\n⏳ Deployment in progress... This may take 1-2 minutes');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.response?.data || error.message);
  }
}

triggerDeployment();
