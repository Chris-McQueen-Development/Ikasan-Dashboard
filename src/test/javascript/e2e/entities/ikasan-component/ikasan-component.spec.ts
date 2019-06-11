/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import IkasanComponentComponentsPage from './ikasan-component.page-object';
import { IkasanComponentDeleteDialog } from './ikasan-component.page-object';
import IkasanComponentUpdatePage from './ikasan-component-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('IkasanComponent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ikasanComponentUpdatePage: IkasanComponentUpdatePage;
  let ikasanComponentComponentsPage: IkasanComponentComponentsPage;
  let ikasanComponentDeleteDialog: IkasanComponentDeleteDialog;

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

  it('should load IkasanComponents', async () => {
    await navBarPage.getEntityPage('ikasan-component');
    ikasanComponentComponentsPage = new IkasanComponentComponentsPage();
    expect(await ikasanComponentComponentsPage.getTitle().getText()).to.match(/Ikasan Components/);
  });

  it('should load create IkasanComponent page', async () => {
    await ikasanComponentComponentsPage.clickOnCreateButton();
    ikasanComponentUpdatePage = new IkasanComponentUpdatePage();
    expect(await ikasanComponentUpdatePage.getPageTitle().getText()).to.match(/Create or edit a IkasanComponent/);
    await ikasanComponentUpdatePage.cancel();
  });

  it('should create and save IkasanComponents', async () => {
    async function createIkasanComponent() {
      await ikasanComponentComponentsPage.clickOnCreateButton();
      await ikasanComponentUpdatePage.setComponentNameInput('componentName');
      expect(await ikasanComponentUpdatePage.getComponentNameInput()).to.match(/componentName/);
      await ikasanComponentUpdatePage.flowSelectLastOption();
      await waitUntilDisplayed(ikasanComponentUpdatePage.getSaveButton());
      await ikasanComponentUpdatePage.save();
      await waitUntilHidden(ikasanComponentUpdatePage.getSaveButton());
      expect(await ikasanComponentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createIkasanComponent();
    await ikasanComponentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await ikasanComponentComponentsPage.countDeleteButtons();
    await createIkasanComponent();

    await ikasanComponentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await ikasanComponentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last IkasanComponent', async () => {
    await ikasanComponentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await ikasanComponentComponentsPage.countDeleteButtons();
    await ikasanComponentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    ikasanComponentDeleteDialog = new IkasanComponentDeleteDialog();
    expect(await ikasanComponentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/dashboardApp.ikasanComponent.delete.question/);
    await ikasanComponentDeleteDialog.clickOnConfirmButton();

    await ikasanComponentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await ikasanComponentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
