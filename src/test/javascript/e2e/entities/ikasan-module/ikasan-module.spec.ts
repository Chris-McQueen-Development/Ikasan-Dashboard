/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IkasanModuleComponentsPage from './ikasan-module.page-object';
import { IkasanModuleDeleteDialog } from './ikasan-module.page-object';
import IkasanModuleUpdatePage from './ikasan-module-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('IkasanModule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ikasanModuleUpdatePage: IkasanModuleUpdatePage;
  let ikasanModuleComponentsPage: IkasanModuleComponentsPage;
  let ikasanModuleDeleteDialog: IkasanModuleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load IkasanModules', async () => {
    await navBarPage.getEntityPage('ikasan-module');
    ikasanModuleComponentsPage = new IkasanModuleComponentsPage();
    expect(await ikasanModuleComponentsPage.getTitle().getText()).to.match(/Ikasan Modules/);
  });

  it('should load create IkasanModule page', async () => {
    await ikasanModuleComponentsPage.clickOnCreateButton();
    ikasanModuleUpdatePage = new IkasanModuleUpdatePage();
    expect(await ikasanModuleUpdatePage.getPageTitle().getText()).to.match(/Create or edit a IkasanModule/);
    await ikasanModuleUpdatePage.cancel();
  });

  it('should create and save IkasanModules', async () => {
    async function createIkasanModule() {
      await ikasanModuleComponentsPage.clickOnCreateButton();
      await ikasanModuleUpdatePage.setModuleNameInput('moduleName');
      expect(await ikasanModuleUpdatePage.getModuleNameInput()).to.match(/moduleName/);
      await ikasanModuleUpdatePage.setModuleDescriptionInput('moduleDescription');
      expect(await ikasanModuleUpdatePage.getModuleDescriptionInput()).to.match(/moduleDescription/);
      await waitUntilDisplayed(ikasanModuleUpdatePage.getSaveButton());
      await ikasanModuleUpdatePage.save();
      await waitUntilHidden(ikasanModuleUpdatePage.getSaveButton());
      expect(await ikasanModuleUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createIkasanModule();
    await ikasanModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await ikasanModuleComponentsPage.countDeleteButtons();
    await createIkasanModule();

    await ikasanModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await ikasanModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last IkasanModule', async () => {
    await ikasanModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await ikasanModuleComponentsPage.countDeleteButtons();
    await ikasanModuleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    ikasanModuleDeleteDialog = new IkasanModuleDeleteDialog();
    expect(await ikasanModuleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dashboardApp.ikasanModule.delete.question/);
    await ikasanModuleDeleteDialog.clickOnConfirmButton();

    await ikasanModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await ikasanModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
