import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class ComputerDatabaseElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  addNewComputerPage(): Locator {
    return this.page.locator('#add');
  }

  setComputerName(): Locator {
    return this.page.locator('#name');
  }

  setIntroducedDate(): Locator {
    return this.page.locator('#introduced');
  }

  setDiscontinuedDate(): Locator {
    return this.page.locator('#discontinued');
  }

  setCompany(): Locator {
    return this.page.locator('#company');
  }

  addNewComputerButton(): Locator {
    return this.page.locator('#main > form > div > input');
  }

  newComputerAddedSuccessMessage(): Locator {
    return this.page.locator('#main > div.alert-message.warning');
  }

  introducedDateErrorMessage(): Locator {
    return this.page.locator(
      '#main > form > fieldset > div.clearfix.error > div > span'
    );
  }

  computerEmptyNameErrorMessage(): Locator {
    return this.page.locator(
      '#main > form > fieldset > div.clearfix.error > div > span'
    );
  }
}
