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
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl =
		'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			typeOptions: { password: true },
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
