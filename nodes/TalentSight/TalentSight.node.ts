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
				// eslint-disable-next-line @n8n/community-nodes/no-credential-reuse
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
						name: 'Get',
						value: 'get',
						action: 'Retrieve a campaign',
						description: 'Retrieve a campaign',
						routing: {
							request: {
								method: 'GET',
								url: '/campaigns/{{$parameter.campaignId}}',
							},
						},
					},
				],
				default: 'get',
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
					},
				},
			},
			{
				displayName: 'Campaign Name',
				name: 'campaignName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: {
						resource: ['campaign'],
					},
				},
				routing: {
					request: {
						url: '/campaigns/{{$parameter.campaignId}}',
					},
				},
			},
		],
		usableAsTool: true,
	};
}
