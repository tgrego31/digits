import { test, expect } from './auth-utils';

test.slow();

test('a signed-in user can see the contact pages', async ({ getUserPage }) => {
  const page = await getUserPage('john@foo.com', 'changeme');
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('button', { name: 'john@foo.com' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Contact' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'List Contacts' })).toBeVisible();

  await page.getByRole('link', { name: 'Add Contact' }).click();
  await expect(page.getByRole('heading', { name: 'Add Contact' })).toBeVisible();

  await page.getByRole('link', { name: 'List Contacts' }).click();
  await expect(page.getByRole('heading', { name: 'List Contacts' })).toBeVisible();
  await expect(page.getByText('Philip Johnson')).toBeVisible();
  await expect(page.getByText('Henri Casanova')).toBeVisible();
  await expect(page.getByText('Kim Binsted')).toHaveCount(0);
  await expect(page.getByText('Add Timestamped Note')).toHaveCount(2);
});
