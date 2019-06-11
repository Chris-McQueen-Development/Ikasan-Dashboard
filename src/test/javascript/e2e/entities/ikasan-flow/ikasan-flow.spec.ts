/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IkasanFlowComponentsPage from './ikasan-flow.page-object';
import { IkasanFlowDeleteDialog } from './ikasan-flow.page-object';
import IkasanFlowUpdatePage from './ikasan-flow-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('IkasanFlow e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ikasanFlowUpdatePage: IkasanFlowUpdatePage;
  let ikasanFlowComponentsPage: IkasanFlowComponentsPage;
  let ikasanFlowDeleteDialog: IkasanFlowDeleteDialog;

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

  it('should load IkasanFlows', async () => {
    await navBarPage.getEntityPage('ikasan-flow');
    ikasanFlowComponentsPage = new IkasanFlowComponentsPage();
    expect(await ikasanFlowComponentsPage.getTitle().getText()).to.match(/Ikasan Flows/);
  });

  it('should load create IkasanFlow page', async () => {
    await ikasanFlowComponentsPage.clickOnCreateButton();
    ikasanFlowUpdatePage = new IkasanFlowUpdatePage();
    expect(await ikasanFlowUpdatePage.getPageTitle().getText()).to.match(/Create or edit a IkasanFlow/);
    await ikasanFlowUpdatePage.cancel();
  });

  it('should create and save IkasanFlows', async () => {
    async function createIkasanFlow() {
      await ikasanFlowComponentsPage.clickOnCreateButton();
      await ikasanFlowUpdatePage.setFlowNameInput('flowName');
      expect(await ikasanFlowUpdatePage.getFlowNameInput()).to.match(/flowName/);
      await ikasanFlowUpdatePage.statusSelectLastOption();
      await ikasanFlowUpdatePage.moduleSelectLastOption();
      await waitUntilDisplayed(ikasanFlowUpdatePage.getSaveButton());
      await ikasanFlowUpdatePage.save();
      await waitUntilHidden(ikasanFlowUpdatePage.getSaveButton());
      expect(await ikasanFlowUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createIkasanFlow();
    await ikasanFlowComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await ikasanFlowComponentsPage.countDeleteButtons();
    await createIkasanFlow();

    await ikasanFlowComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await ikasanFlowComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last IkasanFlow', async () => {
    await ikasanFlowComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await ikasanFlowComponentsPage.countDeleteButtons();
    await ikasanFlowComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    ikasanFlowDeleteDialog = new IkasanFlowDeleteDialog();
    expect(await ikasanFlowDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dashboardApp.ikasanFlow.delete.question/);
    await ikasanFlowDeleteDialog.clickOnConfirmButton();

    await ikasanFlowComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await ikasanFlowComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
