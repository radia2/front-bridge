// pages/api/bridge-single.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { tokenId, apiKey, baseUrl } = req.body;
  
      if (!tokenId || !apiKey || !baseUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      try {
        const response = await fetch(`${baseUrl}/certificate/recoverAndTransferCertificateToBridgeAddress`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
          },
          body: JSON.stringify({ tokenId })
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.error || 'An error occurred while bridging');
        }
  
        res.status(200).json(data);
      } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }