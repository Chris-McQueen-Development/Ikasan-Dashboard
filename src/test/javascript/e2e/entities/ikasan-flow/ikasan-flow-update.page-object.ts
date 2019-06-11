import { element, by, ElementFinder } from 'protractor';

export default class IkasanFlowUpdatePage {
  pageTitle: ElementFinder = element(by.id('dashboardApp.ikasanFlow.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  flowNameInput: ElementFinder = element(by.css('input#ikasan-flow-flowName'));
  statusSelect: ElementFinder = element(by.css('select#ikasan-flow-status'));
  moduleSelect: ElementFinder = element(by.css('select#ikasan-flow-module'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setFlowNameInput(flowName) {
    await this.flowNameInput.sendKeys(flowName);
  }

  async getFlowNameInput() {
    return this.flowNameInput.getAttribute('value');
  }

  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
