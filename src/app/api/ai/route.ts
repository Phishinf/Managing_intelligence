import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { provider, messages, apiKey } = await request.json();
  
  try {
    let response;
    
    switch (provider) {
      case 'openai':
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages,
            max_tokens: 1000
          })
        });
        break;
      // Add other providers...
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
