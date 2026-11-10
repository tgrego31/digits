import { test, expect } from './auth-utils';

test.slow();

test('an administrator can see all contacts', async ({ getUserPage }) => {
  const page = await getUserPage('admin@foo.com', 'changeme');
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('button', { name: 'admin@foo.com' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'digits' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Contact' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'List Contacts' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

  await page.getByRole('link', { name: 'Add Contact' }).click();
  await expect(page.getByRole('heading', { name: 'Add Contact' })).toBeVisible();

  await page.getByRole('link', { name: 'List Contacts' }).click();
  await expect(page.getByRole('heading', { name: 'List Contacts' })).toBeVisible();
  await expect(page.getByText('Kim Binsted')).toBeVisible();

  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('heading', { name: 'List Contacts (Admin)' })).toBeVisible();
  await expect(page.getByText('Philip Johnson')).toBeVisible();
  await expect(page.getByText('Henri Casanova')).toBeVisible();
  await expect(page.getByText('Kim Binsted')).toBeVisible();
});
