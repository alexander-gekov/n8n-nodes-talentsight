# n8n-nodes-talentsight

This is an n8n community node. It lets you use TalentSight in your n8n workflows.

TalentSight is a talent outreach and campaign management platform that helps you automate LinkedIn outreach campaigns, manage candidates, and track message interactions.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)

[Operations](#operations)

[Credentials](#credentials)

[Compatibility](#compatibility)

[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Campaign

- **Add To Campaign By Public Identifier** - Add a recipient to a campaign using a LinkedIn public identifier. Creates talent records if they do not exist.
- **Add To Campaign By TalentSight ID** - Add a recipient to a campaign using a TalentSight recipient ID.
- **Delete** - Delete a campaign by ID.
- **Get** - Retrieve a campaign by ID.
- **Get Many** - Retrieve multiple campaigns.
- **Get Recipients** - Get recipients for a campaign.
- **Pause** - Pause a campaign by ID.
- **Resume** - Resume a campaign by ID.

### Candidate

- **Get** - Retrieve a candidate by ID.
- **Search** - Search for candidates with filters (query, limit, page, company, location, title).

### Message

- **Get Pending** - Get pending messages for a campaign.
- **Approve** - Approve a message by ID.

### Webhook

- **Get Many** - Retrieve multiple webhooks.
- **Create** - Create a new webhook.
- **Delete** - Delete a webhook by ID.

## Credentials

To use this node, you need a TalentSight API key.

1. Sign up for a TalentSight account at [https://app.talsight.com](https://app.talsight.com).
2. Navigate to your account settings to generate an API key.
3. In n8n, create a new TalentSight credential and enter your API key.
4. The default server URL is `https://app.talsight.com/api/v1`, but you can customize it if needed.

The API key is sent as a query parameter (`api_key`) with each request.

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Tested with**: n8n 1.0.0+

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [TalentSight Documentation](https://talsight.com/blog/talentsight-n8n-integration)
