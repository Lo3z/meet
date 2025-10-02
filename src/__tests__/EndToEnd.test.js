// eslint-disable-next-line no-unused-vars
import { describe, test, beforeEach, afterEach, beforeAll, afterAll, expect } from '@jest/globals';
import * as puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(
    //   {
    //   headless: false,
    //   slowMo: 250,
    //   timeout: 0
    //  }
    );
    page = await browser.newPage();
    await page.goto('http://localhost:5173/')
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event elemnt is collapsed by default', async () => {
    const eventDetails = await page.$('event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.details-btn');
    const eventDetails = await page.$('event-details');
    expect(eventDetails).toBeDefined();
  });

  test ('User can collpase an event to hide details', async () => {
    await page.click('.details-btn');
    const eventDetails = await page.$('event-details');
    expect(eventDetails).toBeNull();
  });
});