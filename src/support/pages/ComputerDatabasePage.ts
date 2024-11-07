import { Page, expect } from '@playwright/test';
import BasePage from './BasePage';
import ComputerDatabaseElements from '../elements/ComputerDatabaseElements';

export default class ComputerDatabasePage extends BasePage {
  readonly computerDatabaseElements: ComputerDatabaseElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.computerDatabaseElements = new ComputerDatabaseElements(page);
  }

  async addNewComputer(): Promise<void> {
    await this.computerDatabaseElements.addNewComputerPage().click();

    await this.computerDatabaseElements
      .setComputerName()
      .fill('IBM Unisatc Computer');

    await this.computerDatabaseElements.setIntroducedDate().fill('1999-06-01');
    await this.computerDatabaseElements
      .setDiscontinuedDate()
      .fill('2000-06-01');
    await this.computerDatabaseElements.setCompany().selectOption('IBM');

    await this.computerDatabaseElements.addNewComputerButton().click();

    const successMessage = await this.computerDatabaseElements
      .newComputerAddedSuccessMessage()
      .textContent();
    expect(successMessage).toContain(
      'Done !  Computer IBM Unisatc Computer has been created'
    );
  }

  async checkIntroducedDateFieldErrors(): Promise<void> {
    await this.computerDatabaseElements.addNewComputerPage().click();

    await this.computerDatabaseElements
      .setComputerName()
      .fill('IBM Unisatc Computer');

    await this.computerDatabaseElements.setIntroducedDate().fill('1999-02-31');
    await this.computerDatabaseElements
      .setDiscontinuedDate()
      .fill('2000-06-01');
    await this.computerDatabaseElements.setCompany().selectOption('IBM');

    await this.computerDatabaseElements.addNewComputerButton().click();
    const errorMessage = await this.computerDatabaseElements
      .introducedDateErrorMessage()
      .textContent();
    expect(errorMessage).toContain(
      "Failed to decode date : java.time.format.DateTimeParseException: Text '1999-02-31' could not be parsed: Invalid date 'FEBRUARY 31'"
    );
  }

  async checkEmptyNameFieldError(): Promise<void> {
    await this.computerDatabaseElements.addNewComputerPage().click();

    await this.computerDatabaseElements.setComputerName().fill('');

    await this.computerDatabaseElements.setIntroducedDate().fill('1999-02-12');
    await this.computerDatabaseElements
      .setDiscontinuedDate()
      .fill('2002-10-31');
    await this.computerDatabaseElements.setCompany().selectOption('IBM');

    await this.computerDatabaseElements.addNewComputerButton().click();
    const errorMessage = await this.computerDatabaseElements
      .introducedDateErrorMessage()
      .textContent();
    expect(errorMessage).toContain(
      'Failed to refine type : Predicate isEmpty() did not fail.'
    );
  }
}
