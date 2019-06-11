import { element, by, ElementFinder } from 'protractor';

export default class IkasanComponentUpdatePage {
  pageTitle: ElementFinder = element(by.id('dashboardApp.ikasanComponent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  componentNameInput: ElementFinder = element(by.css('input#ikasan-component-componentName'));
  flowSelect: ElementFinder = element(by.css('select#ikasan-component-flow'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setComponentNameInput(componentName) {
    await this.componentNameInput.sendKeys(componentName);
  }

  async getComponentNameInput() {
    return this.componentNameInput.getAttribute('value');
  }

  async flowSelectLastOption() {
    await this.flowSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async flowSelectOption(option) {
    await this.flowSelect.sendKeys(option);
  }

  getFlowSelect() {
    return this.flowSelect;
  }

  async getFlowSelectedOption() {
    return this.flowSelect.element(by.css('option:checked')).getText();
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
