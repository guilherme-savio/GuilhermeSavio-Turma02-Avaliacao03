import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import ComputerDatabasePage from '../support/pages/ComputerDatabasePage';

test.describe('Computer Database Demo', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let computerDatabasePage: ComputerDatabasePage;
  let BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.computerDatabase')
    .retrieveData();

  if (process.env.QA) {
    BASE_URL = TheConfig.fromFile(CONFIG)
      .andPath('application.computerDatabase')
      .retrieveData();
  }

  test.beforeEach(async ({ page }) => {
    computerDatabasePage = new ComputerDatabasePage(page);
    await page.goto(BASE_URL);
  });

  test('Validação de cadastro de um computador descontinuado', async () => {
    await computerDatabasePage.addNewComputer();
  });

  test('Validação de cadastro de um computador com a data de introdução ao mercado inválida', async () => {
    await computerDatabasePage.checkIntroducedDateFieldErrors();
  });

  test('Validação de cadastro de um computador sem inserir o nome dele', async () => {
    await computerDatabasePage.checkEmptyNameFieldError();
  });
});
