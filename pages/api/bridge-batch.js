export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { tokenIds, apiKey, baseUrl } = req.body;
  
      if (!tokenIds || !apiKey || !baseUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      try {
        const results = await Promise.all(tokenIds.map(async (tokenId) => { // traitement en parrallèle (asynchronous using promise)
          const response = await fetch(`${baseUrl}/certificate/recoverAndTransferCertificateToBridgeAddress`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-API-Key': apiKey
            },
            body: JSON.stringify({ tokenId })
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          return { tokenId, status: 'success', response: data };
        }));
  
        res.status(200).json(results);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }