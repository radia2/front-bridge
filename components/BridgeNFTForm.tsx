import React, { useState, useRef } from 'react';
import Papa from 'papaparse';

const BridgeNFTForm = () => {
  const [singleTokenId, setSingleTokenId] = useState('');
  const [batchTokenIds, setBatchTokenIds] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleSingleBridge = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bridge-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tokenId: singleTokenId,
          apiKey,
          baseUrl
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setError(null);
      } else {
        console.error('Response not OK:', response.status, data);
        throw new Error(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setResult(null);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (results) => {
        const tokenIds = results.data
        .map((row: any) => row[0])
        .filter((id): id is string => typeof id === 'string' && id.trim() !== '');
      setBatchTokenIds(tokenIds);
        console.log('Token IDs extraits du CSV:', tokenIds);
      }
    });
  };

  const handleBatchBridge = async (e) => {
    e.preventDefault();
    console.log('Starting batch bridge process');
    try {
      console.log('Token IDs to process:', batchTokenIds);
      const response = await fetch('/api/bridge-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tokenIds: batchTokenIds,
          apiKey,
          baseUrl
        }),
      });
      const data = await response.json();
      console.log('Response from server:', data);
      if (response.ok) {
        setResult(data);
        setError(null);
        console.log('Batch bridge successful');
      } else {
        console.error('Server responded with an error:', data);
        throw new Error(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      console.error('Error in batch bridge:', err);
      setError(err.message);
      setResult(null);
    }
  };
  
  return (
    <div>
      <h1>Bridge NFT</h1>
      
      <div>
        <h2>Configuration</h2>
        <p>Enter your API key and Base URL</p>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="API Key"
        />
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          placeholder="Base URL"
        />
      </div>
      
      <div>
        <h2>Bridge single NFT</h2>
        <p>Enter the ID of your NFT</p>
        <form onSubmit={handleSingleBridge}>
          <input
            type="text"
            value={singleTokenId}
            onChange={(e) => setSingleTokenId(e.target.value)}
            placeholder="id du token"
          />
          <button type="submit" disabled={!apiKey || !baseUrl}>Bridge NFT</button>
        </form>
      </div>

      <div>
        <h2>Bridge a batch of NFTs</h2>
        <p>Upload a CSV file with token IDs in column A.</p>
        <form onSubmit={handleBatchBridge}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
          <button type="submit" disabled={!apiKey || !baseUrl || batchTokenIds.length === 0}>
            Bridge Batch
          </button>
        </form>
      </div>

      {error && (
        <div style={{color: 'red'}}>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div>
          <h2>Result of your request</h2>
          <pre style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px'}}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BridgeNFTForm;