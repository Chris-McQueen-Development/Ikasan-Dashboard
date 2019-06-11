import { element, by, ElementFinder } from 'protractor';

export default class IkasanModuleUpdatePage {
  pageTitle: ElementFinder = element(by.id('dashboardApp.ikasanModule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  moduleNameInput: ElementFinder = element(by.css('input#ikasan-module-moduleName'));
  moduleDescriptionInput: ElementFinder = element(by.css('input#ikasan-module-moduleDescription'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setModuleNameInput(moduleName) {
    await this.moduleNameInput.sendKeys(moduleName);
  }

  async getModuleNameInput() {
    return this.moduleNameInput.getAttribute('value');
  }

  async setModuleDescriptionInput(moduleDescription) {
    await this.moduleDescriptionInput.sendKeys(moduleDescription);
  }

  async getModuleDescriptionInput() {
    return this.moduleDescriptionInput.getAttribute('value');
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
