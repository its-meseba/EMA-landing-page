# EMA Mailchimp Integration Documentation

## Overview

The EMA landing page uses Mailchimp API to manage pilot program submissions. This integrates directly with your Mailchimp audience for email marketing and lead management.

## How It Works

### Mailchimp Integration

- Submissions are added directly to your Mailchimp audience
- Each submission includes the subscriber's name and email
- Duplicate emails are automatically handled by Mailchimp
- Provides detailed error handling for various Mailchimp scenarios

### API Endpoints

#### POST /api/mailchimp

Submits a new pilot program application to Mailchimp.

**Request Body:**

```json
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

**Success Response:**

```json
{
    "message": "Başvuru başarılı",
    "subscriberId": "mailchimp-subscriber-id"
}
```

**Error Responses:**

- `400` - Missing fields, invalid email, duplicate email, or unsubscribed email
- `500` - Server error or Mailchimp configuration issues

#### GET /api/mailchimp

Retrieves Mailchimp audience statistics (admin only).

**Headers:**

```
Authorization: Bearer YOUR_ADMIN_API_KEY
```

**Response:**

```json
{
    "audienceName": "EMA Pilot Program",
    "totalMembers": 150,
    "subscribedMembers": 145,
    "unsubscribeRate": 5,
    "lastUpdated": "2025-01-01T12:00:00Z"
}
```

## Environment Variables (Required)

### Mailchimp Configuration

These are required for the system to work:

```env
MAILCHIMP_API_KEY=your-mailchimp-api-key-us1
MAILCHIMP_AUDIENCE_ID=your-audience-id
```

### Admin Access (Optional)

To access the GET endpoint for audience statistics:

```env
ADMIN_API_KEY=your-secure-random-string
```

## Setting Up Mailchimp

### 1. Get Your API Key

1. Log in to your Mailchimp account
2. Go to **Account & Billing** → **Extras** → **API keys**
3. Create a new API key or use an existing one
4. Note the datacenter suffix (e.g., `us1`, `us2`, `eu1`)

### 2. Get Your Audience ID

1. Go to **Audience** → **All contacts**
2. Click **Settings** → **Audience name and defaults**
3. Find the **Audience ID** in the right sidebar

### 3. Set Environment Variables

Add to your `.env.local` file:

```env
MAILCHIMP_API_KEY=your-api-key-here-us1
MAILCHIMP_AUDIENCE_ID=your-audience-id-here
ADMIN_API_KEY=your-secure-admin-key
```

## Features

✅ **Direct Mailchimp Integration** - Seamlessly adds subscribers to your audience  
✅ **Duplicate Prevention** - Mailchimp handles duplicate emails automatically  
✅ **Email Validation** - Validates email format on both client and server  
✅ **Specific Error Handling** - Handles various Mailchimp error scenarios  
✅ **Unsubscribe Detection** - Alerts when someone tries to resubscribe after unsubscribing  
✅ **Admin Statistics** - API endpoint to get audience stats  
✅ **Automatic Datacenter Detection** - Extracts datacenter from API key  
✅ **Comprehensive Logging** - Detailed console logs for debugging

## Error Handling

The system handles specific Mailchimp errors with user-friendly Turkish messages:

- **Member Exists**: "Bu e-posta adresi zaten kayıtlı"
- **Invalid Resource**: "Geçersiz e-posta adresi"
- **Forgotten Email Not Subscribed**: "Bu e-posta adresi daha önce abonelikten çıkmış"
- **Generic Errors**: Returns Mailchimp's error message

## Security Notes

- API keys are validated and datacenter is extracted automatically
- Admin API requires authentication via `ADMIN_API_KEY`
- Email addresses are normalized (lowercase, trimmed)
- Comprehensive error logging for debugging

## Mailchimp Audience Setup

### Recommended Fields

Set up these merge fields in your Mailchimp audience:

- **FNAME** (First Name) - Already included
- **LNAME** (Last Name) - Optional
- **COMPANY** (Company) - Optional for future use
- **PHONE** (Phone) - Optional for future use

### Tags and Segments

Consider setting up:

- **EMA Pilot** tag for easy filtering
- **Landing Page** source tag
- Date-based segments for campaign analysis

## Testing

### Test with Invalid Emails

- Try submitting invalid email formats
- Test with already subscribed emails
- Test with unsubscribed emails

### Verify in Mailchimp

1. Check your audience for new subscribers
2. Verify the name field is populated correctly
3. Check activity logs for API calls

## Troubleshooting

### Common Issues

**"Mailchimp yapılandırılmadı"**

- Check that `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` are set
- Verify environment variables are loaded correctly

**"Mailchimp API anahtarı hatalı"**

- Ensure API key includes datacenter suffix (e.g., `-us1`)
- Check API key is valid in Mailchimp

**"Bu e-posta adresi zaten kayıtlı"**

- Email is already in your audience
- This is normal behavior for duplicate prevention

### Debug Mode

Check browser console and server logs for detailed error information including Mailchimp API responses.
