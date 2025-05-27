import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();
        if (!name || !email) {
            return NextResponse.json({ error: 'Eksik alanlar' }, { status: 400 });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Geçerli bir e-posta adresi girin' }, { status: 400 });
        }

        const API_KEY = process.env.MAILCHIMP_API_KEY;
        const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

        if (!API_KEY || !AUDIENCE_ID) {
            console.error('Mailchimp configuration missing:', {
                hasApiKey: !!API_KEY,
                hasAudienceId: !!AUDIENCE_ID
            });
            return NextResponse.json({ error: 'Mailchimp yapılandırılmadı' }, { status: 500 });
        }

        // Enhanced API key validation
        const DATACENTER = API_KEY.split('-')[1];
        if (!DATACENTER) {
            console.error('Invalid Mailchimp API key format. Expected format: key-datacenter (e.g., abc123-us1)');
            return NextResponse.json({ error: 'Mailchimp API anahtarı hatalı format' }, { status: 500 });
        }

        // Log configuration for debugging (without exposing sensitive data)
        console.log('Mailchimp Configuration:', {
            datacenter: DATACENTER,
            audienceIdLength: AUDIENCE_ID.length,
            apiKeyPrefix: API_KEY.substring(0, 8) + '...',
            email: email
        });

        // First, let's test the API key by getting account info
        console.log('Testing Mailchimp API key...');
        const testResponse = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/`, {
            method: 'GET',
            headers: {
                Authorization: `apikey ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!testResponse.ok) {
            const testError = await testResponse.json();
            console.error('Mailchimp API key test failed:', {
                status: testResponse.status,
                error: testError
            });
            return NextResponse.json(
                {
                    error: 'Mailchimp API anahtarı geçersiz'
                },
                { status: 500 }
            );
        }

        console.log('API key is valid. Testing audience ID...');

        // Test if the audience exists
        const audienceTestResponse = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}`, {
            method: 'GET',
            headers: {
                Authorization: `apikey ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!audienceTestResponse.ok) {
            const audienceError = await audienceTestResponse.json();
            console.error('Audience ID test failed:', {
                status: audienceTestResponse.status,
                error: audienceError,
                audienceId: AUDIENCE_ID
            });

            if (audienceTestResponse.status === 404) {
                return NextResponse.json(
                    {
                        error: "Mailchimp Audience ID bulunamadı. Lütfen doğru Audience ID'yi kontrol edin."
                    },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                {
                    error: 'Mailchimp Audience erişim hatası'
                },
                { status: 500 }
            );
        }

        const audienceInfo = await audienceTestResponse.json();
        console.log('Audience found:', {
            name: audienceInfo.name,
            memberCount: audienceInfo.stats.member_count
        });

        const data = {
            email_address: email.toLowerCase().trim(),
            status: 'subscribed',
            merge_fields: {
                FNAME: name.trim()
            }
        };

        console.log(`Adding subscriber to Mailchimp audience: ${audienceInfo.name}`);

        const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
            method: 'POST',
            headers: {
                Authorization: `apikey ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.status >= 400) {
            console.error('Mailchimp API error:', {
                status: response.status,
                statusText: response.statusText,
                error: responseData
            });

            // Handle specific Mailchimp errors
            if (responseData.title === 'Member Exists') {
                return NextResponse.json(
                    {
                        error: 'Bu e-posta adresi zaten kayıtlı'
                    },
                    { status: 400 }
                );
            }

            if (responseData.title === 'Invalid Resource') {
                return NextResponse.json(
                    {
                        error: 'Geçersiz e-posta adresi'
                    },
                    { status: 400 }
                );
            }

            if (responseData.title === 'Forgotten Email Not Subscribed') {
                return NextResponse.json(
                    {
                        error: 'Bu e-posta adresi daha önce abonelikten çıkmış'
                    },
                    { status: 400 }
                );
            }

            // Generic error for other cases
            return NextResponse.json(
                {
                    error: responseData.detail || responseData.title || 'Mailchimp hatası'
                },
                { status: 400 }
            );
        }

        console.log('Successfully added subscriber to Mailchimp:', responseData.email_address);

        return NextResponse.json(
            {
                message: 'Başvuru başarılı',
                subscriberId: responseData.id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Server error in Mailchimp route:', error);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

// GET endpoint to retrieve basic stats (optional)
export async function GET(req: NextRequest) {
    try {
        // Simple authentication check
        const authHeader = req.headers.get('authorization');
        const adminKey = process.env.ADMIN_API_KEY;

        if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
            return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
        }

        const API_KEY = process.env.MAILCHIMP_API_KEY;
        const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

        if (!API_KEY || !AUDIENCE_ID) {
            return NextResponse.json({ error: 'Mailchimp yapılandırılmadı' }, { status: 500 });
        }

        const DATACENTER = API_KEY.split('-')[1];
        if (!DATACENTER) {
            return NextResponse.json({ error: 'Mailchimp API anahtarı hatalı' }, { status: 500 });
        }

        // Get audience stats
        const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}`, {
            method: 'GET',
            headers: {
                Authorization: `apikey ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json(
                {
                    error: error.detail || 'Mailchimp API hatası'
                },
                { status: response.status }
            );
        }

        const audienceData = await response.json();

        return NextResponse.json({
            audienceName: audienceData.name,
            totalMembers: audienceData.stats.member_count,
            subscribedMembers: audienceData.stats.member_count_since_send,
            unsubscribeRate: audienceData.stats.unsubscribe_count,
            lastUpdated: audienceData.date_created
        });
    } catch (error) {
        console.error('Error retrieving Mailchimp stats:', error);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}
