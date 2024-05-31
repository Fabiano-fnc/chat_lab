const cron = require('node-cron');
const { updateProducts } = require('../services/updateProducts');

const intervalMinutes = process.env.INTERVAL_MINUTES || 60; 

cron.schedule('*/10 * * * * *', async () => {
  try {
    console.log('Executando atualização de preços dos produtos...');
    await updateProducts('iPhone 14');
    await updateProducts('Notebook');
    await updateProducts('Amazfit');

    console.log('Atualização de preços concluída.');
  } catch (error) {
    console.error('Erro ao atualizar preços dos produtos:', error);
  }
});
