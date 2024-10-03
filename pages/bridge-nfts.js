import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function BridgeNFTForm() {
  const [singleTokenId, setSingleTokenId] = useState('');
  const [batchTokenIds, setBatchTokenIds] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
        throw new Error(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const handleBatchBridge = async (e) => {
    e.preventDefault();
    try {
      const tokenIds = batchTokenIds.split(',').map(id => id.trim());
      const response = await fetch('/api/bridge-batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tokenIds,
          apiKey,
          baseUrl
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setError(null);
      } else {
        throw new Error(data.error || 'Une erreur est survenue');
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
          <CardDescription>Enter your API key and Base URL</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="API Key"
            className="mb-2"
          />
          <Input
            type="text"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            placeholder="Base URL"
            className="mb-2"
          />
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Bridge a batch of NFTs</CardTitle>
          <CardDescription>Enter the IDs of the tokens separated by a comma, your API key, and the endpoint URL</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleBatchBridge} className="space-y-4">
            <Input
              type="text"
              value={batchTokenIds}
              onChange={(e) => setBatchTokenIds(e.target.value)}
              placeholder="IDs des tokens (séparés par des virgules)"
            />
            <Input
              type="text"
              value={batchApiKey}
              onChange={(e) => setBatchApiKey(e.target.value)}
              placeholder="Your API Key"
            />
            <Input
              type="text"
              value={batchEndpoint}
              onChange={(e) => setBatchEndpoint(e.target.value)}
              placeholder="Endpoint URL"
            />
            <Button type="submit" disabled={!batchApiKey || !batchEndpoint}>Bridge Batch</Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Result of your request</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}