import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class TalentSight implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'TalentSight',
		name: 'talentSight',
		icon: 'file:talentsight.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from TalentSight API',
		defaults: {
			name: 'TalentSight',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'talentSightApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.talsight.com/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Candidate',
						value: 'candidate',
					},
					{
						name: 'Message',
						value: 'message',
					},
					{
						name: 'Webhook',
						value: 'webhook',
					},
				],
				default: 'campaign',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
					},
				},
				options: [
					{
						name: 'Add To Campaign By Public Identifier',
						value: 'addRecipientsByPublicIdentifier',
						action: 'Add recipients by linked in public identifier',
						description:
							'Add recipients to a campaign using LinkedIn public identifiers. Creates talent records if they do not exist.',
						routing: {
							request: {
								method: 'POST',
								url: '=/campaigns/{{String($parameter.campaignId)}}/recipients/by-public-identifier',
								body: {
									public_identifier: '={{$parameter.publicIdentifier}}',
									firstNameOverride: '={{$parameter.firstNameOverride}}',
								},
							},
						},
					},
					{
						name: 'Add To Campaign By TalentSight ID',
						value: 'addRecipientsById',
						action: 'Add recipients by talent sight id',
						description: 'Add recipients to a campaign using TalentSight recipient IDs',
						routing: {
							request: {
								method: 'POST',
								url: '=/campaigns/{{String($parameter.campaignId)}}/recipients/by-id',
								body: {
									recipient_id: '={{$parameter.recipientId}}',
									firstNameOverride: '={{$parameter.firstNameOverride}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a campaign',
						description: 'Delete a campaign by ID',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/campaigns/{{String($parameter.campaignId)}}',
								body: {
									deleteAssociatedData: '={{$parameter.deleteAssociatedData}}',
								},
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Retrieve a campaign',
						description: 'Retrieve a campaign by ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/campaigns/{{String($parameter.campaignId)}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Retrieve many campaigns',
						description: 'Retrieve many campaigns',
						routing: {
							request: {
								method: 'GET',
								url: '/campaigns',
							},
						},
					},
					{
						name: 'Get Recipients',
						value: 'getRecipients',
						action: 'Get campaign recipients',
						description: 'Get recipients for a campaign',
						routing: {
							request: {
								method: 'GET',
								url: '=/campaigns/{{String($parameter.campaignId)}}/recipients',
							},
						},
					},
					{
						name: 'Pause',
						value: 'pause',
						action: 'Pause a campaign',
						description: 'Pause a campaign by ID',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/campaigns/{{String($parameter.campaignId)}}/pause',
							},
						},
					},
					{
						name: 'Resume',
						value: 'resume',
						action: 'Resume a campaign',
						description: 'Resume a campaign by ID',
						routing: {
							request: {
								method: 'PATCH',
								url: '=/campaigns/{{String($parameter.campaignId)}}/resume',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'Campaign ID',
				name: 'campaignId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: [
							'get',
							'delete',
							'pause',
							'resume',
							'getRecipients',
							'addRecipientsById',
							'addRecipientsByPublicIdentifier',
						],
					},
				},
			},
			{
				displayName: 'Delete Associated Data',
				name: 'deleteAssociatedData',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['delete'],
					},
				},
			},
			{
				displayName: 'Recipient ID',
				name: 'recipientId',
				type: 'string',
				required: true,
				description: 'TalentSight recipient ID',
				default: '',
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['addRecipientsById'],
					},
				},
			},
			{
				displayName: 'Public Identifier',
				name: 'publicIdentifier',
				type: 'string',
				required: true,
				description: 'LinkedIn public identifier (e.g., "todor-ranchev-it")',
				default: '',
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['addRecipientsByPublicIdentifier'],
					},
				},
			},
			{
				displayName: 'First Name Override',
				name: 'firstNameOverride',
				type: 'string',
				description: "Optional override for the recipient's first name",
				default: '',
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['addRecipientsById', 'addRecipientsByPublicIdentifier'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['candidate'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Retrieve a candidate',
						description: 'Retrieve a candidate by ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/candidates/{{String($parameter.candidateId)}}',
							},
						},
					},
					{
						name: 'Search',
						value: 'search',
						action: 'Search candidates',
						description: 'Search for candidates',
						routing: {
							request: {
								method: 'GET',
								url: '/candidates/search',
								qs: {
									q: '={{$parameter.searchQuery}}',
									limit: '={{$parameter.limit}}',
									page: '={{$parameter.page}}',
									company: '={{$parameter.company}}',
									location: '={{$parameter.location}}',
									title: '={{$parameter.title}}',
								},
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Candidate ID',
				name: 'candidateId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['candidate'],
						operation: ['get'],
					},
				},
			},
			{
				displayName: 'Search Query',
				name: 'searchQuery',
				type: 'string',
				default: '*',
				displayOptions: {
					show: {
						resource: ['candidate'],
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				description: 'Max number of results to return',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				default: 50,
				displayOptions: {
					show: {
						resource: ['candidate'],
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 1,
				displayOptions: {
					show: {
						resource: ['candidate'],
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['candidate'],
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Location',
				name: 'location',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['candidate'],
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['candidate'],
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['message'],
					},
				},
				options: [
					{
						name: 'Get Pending',
						value: 'getPending',
						action: 'Get pending messages',
						description: 'Get pending messages',
						routing: {
							request: {
								method: 'GET',
								url: '/messages/pending',
								qs: {
									campaignId: '={{$parameter.campaignId}}',
								},
							},
						},
					},
					{
						name: 'Approve',
						value: 'approve',
						action: 'Approve a message',
						description: 'Approve a message by ID',
						routing: {
							request: {
								method: 'POST',
								url: '=/messages/{{String($parameter.messageId)}}/approve',
							},
						},
					},
				],
				default: 'getPending',
			},
			{
				displayName: 'Campaign ID',
				name: 'campaignId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['getPending'],
					},
				},
			},
			{
				displayName: 'Message ID',
				name: 'messageId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['message'],
						operation: ['approve'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['webhook'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Retrieve many webhooks',
						description: 'Retrieve many webhooks',
						routing: {
							request: {
								method: 'GET',
								url: '/webhooks',
							},
						},
					},
					{
						name: 'Create',
						value: 'create',
						action: 'Create a webhook',
						description: 'Create a new webhook',
						routing: {
							request: {
								method: 'POST',
								url: '/webhooks',
								body: {
									url: '={{$parameter.url}}',
									events: '={{$parameter.events}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a webhook',
						description: 'Delete a webhook by ID',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/webhooks/{{String($parameter.webhookId)}}',
							},
						},
					},
				],
				default: 'getAll',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Events',
				name: 'events',
				type: 'json',
				required: true,
				default: '[]',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['create'],
					},
				},
			},
			{
				displayName: 'Webhook ID',
				name: 'webhookId',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['webhook'],
						operation: ['delete'],
					},
				},
			},
		],
		usableAsTool: true,
	};
}
