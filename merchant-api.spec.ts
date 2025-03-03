import { test, expect } from '@playwright/test';
import MerchantGroupClient from '../api/MerchantGroupClient';
import MerchantClient from '../api/MerchantClient';
import config from '../config/env.local.json';

test.describe('Merchant API Tests', () => {
  let merchantGroupClient: MerchantGroupClient;
  let merchantClient: MerchantClient;
  let merchantGroupId: string;

  test.beforeEach(async ({ request }) => {
    merchantGroupClient = new MerchantGroupClient(request, config.baseURL);
    merchantClient = new MerchantClient(request, config.baseURL);
  });

  test('Create Merchant Group and Merchant', async () => {
    // Create Merchant Group
    const groupResponse = await merchantGroupClient.createMerchantGroup(Date.now().toString());
    console.log('Merchant Group Response:', {
      status: groupResponse.status,
      data: groupResponse.data
    });
    if (groupResponse.status !== 200) {
      throw new Error(`Merchant Group creation failed with status ${groupResponse.status}\nResponse: ${JSON.stringify(groupResponse.data, null, 2)}`);
    }
    expect(groupResponse.data.id).toMatch(/^mg_\d{8}$/);
    merchantGroupId = groupResponse.data.id;

    // Create Merchant
    const merchantResponse = await merchantClient.createMerchant(merchantGroupId);
    
    console.log('Merchant Response:', {
      status: merchantResponse.status,
      data: merchantResponse.data
    });
    if (merchantResponse.status !== 200) {
      throw new Error(`Merchant creation failed with status ${merchantResponse.status}\nResponse: ${JSON.stringify(merchantResponse.data, null, 2)}`);
    }
    expect(merchantResponse.data.merchantGroupId).toBe(merchantGroupId);
    expect(merchantResponse.data.id).toMatch(/^m_\d{8}$/);
  });
});