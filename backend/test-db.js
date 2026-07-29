const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_c0jripgPORA7@ep-frosty-heart-ale13sbj-pooler.c-3.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => { console.log('✅ Connexion Neon OK !'); client.end(); })
  .catch(err => console.error('❌ Erreur:', err.message));