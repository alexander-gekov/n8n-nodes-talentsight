import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
	Icon,
} from 'n8n-workflow';

export class TalentSightApi implements ICredentialType {
	name = 'talentSightApi';
	displayName = 'TalentSight API';
	documentationUrl = 'https://talsight.com/blog/talentsight-n8n-integration';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: { password: true },
		},
		{
			displayName: 'Server',
			name: 'server',
			type: 'string',
			default: 'https://app.talsight.com/api/v1',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				api_key: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: '={{$credentials.server}}/health', // Replace with actual endpoint
		},
	};

	icon: Icon = {
		light: 'file:../nodes/TalentSight/talentsight.svg',
		dark: 'file:../nodes/TalentSight/talentsight.dark.svg',
	};
}
