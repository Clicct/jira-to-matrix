const nock = require('nock');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = chai;
chai.use(sinonChai);
const translate = require('../../src/locales');
const testUtils = require('../test-utils');
const newgenProject = require('../fixtures/jira-api-requests/project-gens/new-gen/correct.json');
const { getArchiveProject } = require('../../src/bot/settings');
const {
    LAST_ACTIVE_OPTION,
    DEFAULT_MONTH,
    STATUS_OPTION,
} = require('../../src/bot/timeline-handler/commands/archive-project');
const transitionsJSON = require('../fixtures/jira-api-requests/transitions.json');
const searchProject = require('../fixtures/jira-api-requests/project-gens/search-project.json');

const commandHandler = require('../../src/bot/timeline-handler');
const utils = require('../../src/lib/utils');

describe('command project archive test', () => {
    let chatApi;
    let baseOptions;
    const bodyText = 'BBCOM';
    const sender = 'user';
    const roomId = 'roomId';
    const roomName = 'BBCOM-123';
    const commandName = 'projectarchive';
    const lastStatusName = transitionsJSON.transitions[1].to.name;

    beforeEach(() => {
        chatApi = testUtils.getChatApi();
        baseOptions = { roomId, roomName, commandName, sender, chatApi, bodyText };
        const lastIssueKey = searchProject.issues[0].key;
        nock(utils.getRestUrl())
            .get(`/search?jql=project=${bodyText}`)
            .reply(200, searchProject)
            .get(`/issue/${lastIssueKey}/transitions`)
            .reply(200, transitionsJSON)
            .get(`/project/${bodyText}`)
            .reply(200, newgenProject);
    });

    afterEach(async () => {
        nock.cleanAll();
        await testUtils.cleanRedis();
    });

    it('Expect archive return roomNotExistOrPermDen message if no jira project exists', async () => {
        const result = await commandHandler({ ...baseOptions, bodyText: 'olololo' });

        expect(result).to.be.eq(translate('roomNotExistOrPermDen'));
        expect(await getArchiveProject()).to.be.empty;
    });

    it('Expect archive save project key to queue if all is OK', async () => {
        const result = await commandHandler(baseOptions);
        const expected = translate('successProjectAddToArchive', { projectKey: bodyText, activeTime: DEFAULT_MONTH });
        expect(result).to.be.eq(expected);
        const [data] = await getArchiveProject();
        expect(data).to.includes(bodyText);
    });

    it('Expect archive not save project key to queue if body text is empty', async () => {
        const result = await commandHandler({ ...baseOptions, bodyText: null });
        const expected = translate('emptyProject');

        expect(result).to.be.eq(expected);
        expect(await getArchiveProject()).not.to.includes(bodyText);
    });

    it('Expect archive return warning message if body month is not valid', async () => {
        const failedMonth = 'lallalalla';
        const body = `--${LAST_ACTIVE_OPTION}    ${failedMonth}`;
        const result = await commandHandler({ ...baseOptions, bodyText: `${bodyText} ${body}` });
        const expected = translate('notValid', { body: failedMonth });

        expect(result).to.be.eq(expected);
        expect(await getArchiveProject()).to.be.empty;
    });

    it('Expect archive return succcess message if command with limit time options is coorectly added', async () => {
        const activeTime = 1;
        const body = `--${LAST_ACTIVE_OPTION}    ${activeTime}`;
        const result = await commandHandler({ ...baseOptions, bodyText: `${bodyText} ${body}` });
        const expected = translate('successProjectAddToArchive', { projectKey: bodyText, activeTime });

        expect(result).to.be.eq(expected);
        const [data] = await getArchiveProject();
        expect(data).to.includes(bodyText);
    });

    it('Expect archive return succcess message if command with limit time options is coorectly added', async () => {
        const body = `--${STATUS_OPTION}    ${lastStatusName}`;
        const result = await commandHandler({ ...baseOptions, bodyText: `${bodyText} ${body}` });
        const expected = translate('successProjectAddToArchiveWithStatus', {
            projectKey: bodyText,
            activeTime: DEFAULT_MONTH,
            status: lastStatusName,
        });

        expect(result).to.be.eq(expected);
        const [data] = await getArchiveProject();
        expect(data).to.includes(bodyText);
        expect(data).to.includes(lastStatusName);
    });

    it('Expect archive return not correct jira status message if its not found in transitions', async () => {
        const fakeStatus = 'olololol';
        const body = `--${STATUS_OPTION}    ${fakeStatus}`;
        const result = await commandHandler({ ...baseOptions, bodyText: `${bodyText} ${body}` });
        const expected = translate('notValid', { body: fakeStatus });

        expect(result).to.be.eq(expected);
        expect(await getArchiveProject()).to.be.empty;
    });
});
