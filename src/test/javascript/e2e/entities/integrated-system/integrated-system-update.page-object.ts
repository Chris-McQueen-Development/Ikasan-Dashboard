import { element, by, ElementFinder } from 'protractor';

export default class IntegratedSystemUpdatePage {
  pageTitle: ElementFinder = element(by.id('dashboardApp.integratedSystem.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  systemNameInput: ElementFinder = element(by.css('input#integrated-system-systemName'));
  systemLevelInput: ElementFinder = element(by.css('input#integrated-system-systemLevel'));
  moduleSelect: ElementFinder = element(by.css('select#integrated-system-module'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSystemNameInput(systemName) {
    await this.systemNameInput.sendKeys(systemName);
  }

  async getSystemNameInput() {
    return this.systemNameInput.getAttribute('value');
  }

  async setSystemLevelInput(systemLevel) {
    await this.systemLevelInput.sendKeys(systemLevel);
  }

  async getSystemLevelInput() {
    return this.systemLevelInput.getAttribute('value');
  }

  async moduleSelectLastOption() {
    await this.moduleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async moduleSelectOption(option) {
    await this.moduleSelect.sendKeys(option);
  }

  getModuleSelect() {
    return this.moduleSelect;
  }

  async getModuleSelectedOption() {
    return this.moduleSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
