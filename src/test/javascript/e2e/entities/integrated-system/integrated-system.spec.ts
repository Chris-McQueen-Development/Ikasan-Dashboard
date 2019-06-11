/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IntegratedSystemComponentsPage from './integrated-system.page-object';
import { IntegratedSystemDeleteDialog } from './integrated-system.page-object';
import IntegratedSystemUpdatePage from './integrated-system-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('IntegratedSystem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let integratedSystemUpdatePage: IntegratedSystemUpdatePage;
  let integratedSystemComponentsPage: IntegratedSystemComponentsPage;
  let integratedSystemDeleteDialog: IntegratedSystemDeleteDialog;

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

  it('should load IntegratedSystems', async () => {
    await navBarPage.getEntityPage('integrated-system');
    integratedSystemComponentsPage = new IntegratedSystemComponentsPage();
    expect(await integratedSystemComponentsPage.getTitle().getText()).to.match(/Integrated Systems/);
  });

  it('should load create IntegratedSystem page', async () => {
    await integratedSystemComponentsPage.clickOnCreateButton();
    integratedSystemUpdatePage = new IntegratedSystemUpdatePage();
    expect(await integratedSystemUpdatePage.getPageTitle().getText()).to.match(/Create or edit a IntegratedSystem/);
    await integratedSystemUpdatePage.cancel();
  });

  it('should create and save IntegratedSystems', async () => {
    async function createIntegratedSystem() {
      await integratedSystemComponentsPage.clickOnCreateButton();
      await integratedSystemUpdatePage.setSystemNameInput('systemName');
      expect(await integratedSystemUpdatePage.getSystemNameInput()).to.match(/systemName/);
      await integratedSystemUpdatePage.setSystemLevelInput('5');
      expect(await integratedSystemUpdatePage.getSystemLevelInput()).to.eq('5');
      // integratedSystemUpdatePage.moduleSelectLastOption();
      await waitUntilDisplayed(integratedSystemUpdatePage.getSaveButton());
      await integratedSystemUpdatePage.save();
      await waitUntilHidden(integratedSystemUpdatePage.getSaveButton());
      expect(await integratedSystemUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createIntegratedSystem();
    await integratedSystemComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await integratedSystemComponentsPage.countDeleteButtons();
    await createIntegratedSystem();

    await integratedSystemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await integratedSystemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last IntegratedSystem', async () => {
    await integratedSystemComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await integratedSystemComponentsPage.countDeleteButtons();
    await integratedSystemComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    integratedSystemDeleteDialog = new IntegratedSystemDeleteDialog();
    expect(await integratedSystemDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /dashboardApp.integratedSystem.delete.question/
    );
    await integratedSystemDeleteDialog.clickOnConfirmButton();

    await integratedSystemComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await integratedSystemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
