const axios = require('axios');

const VERCEL_TOKEN = '8tBgFPFWrf6HD8LNUtrer4ql';
const PROJECT_ID = 'prj_ASRwaIZOLsLozMUi95ucbxZow0VQ';

async function getDeployments() {
  try {
    console.log('📊 Fetching recent deployments...\n');
    
    const response = await axios.get(
      `https://api.vercel.com/v6/deployments?projectId=${PROJECT_ID}&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`
        }
      }
    );
    
    console.log('Recent deployments:');
    response.data.deployments.forEach((dep, idx) => {
      console.log(`\n${idx + 1}. ${dep.name}`);
      console.log(`   ID: ${dep.uid}`);
      console.log(`   URL: https://${dep.url}`);
      console.log(`   State: ${dep.readyState}`);
      console.log(`   Created: ${new Date(dep.created).toLocaleString()}`);
      console.log(`   Git: ${dep.meta?.githubCommitRef || 'N/A'}`);
    });
    
    console.log('\n\n💡 To redeploy, you can:');
    console.log('   1. Push new commit to GitHub (Vercel auto-deploys)');
    console.log('   2. Use Vercel dashboard to redeploy');
    console.log('   3. Wait - deployment may already be in progress');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

getDeployments();
