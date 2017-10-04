const jiraRequest = require('../utils');
const {auth} = require('../jira');
const logger = require('simple-color-logger')();
const {t} = require('../locales');

// postfix charsets in matrix names
// matrix sends "@jira_test:matrix.bingo-boom.ru"
// but i need only "jira_test"
const postfix = 21;

const handler =  async function(event, room, toStartOfTimeline) {
    if (event.getType() !== "m.room.message" || toStartOfTimeline) {
        return;
    }

    // matrixClient
    const self = this;
    
    let sender = event.getSender();
    sender = sender.substring(1, sender.length - postfix);

    try {
        const command = await eventFromMatrix(event, room, sender, self);
        if (command) {
            logger.info(`${command}\n(did ${sender})`);
        }

        return;
    } catch(err) {
        const post = t('errorMatrixCommands');
        self.sendHtmlMessage(room.roomId, post, post);
        logger.error(err);
        return;
    }
}

const eventFromMatrix = async (event, room, sender, self) => {
    const body = event.getContent().body;
    const op = body.match(/!\w*\b/g);

    if (!op) {
        return;
    }

    let roomName = room.getCanonicalAlias();
    roomName = roomName.substring(1, roomName.length - postfix);

    switch (op[0]) {
        case '!comment':
            return await postComment(body, sender, room, roomName, self);
        case '!assign':
            return await appointAssignee(event, room, roomName, self);
        case '!move':
            return await issueMove(body, room, roomName, self);
        default:
            logger.warn(`The command ${op[0]} failed`);
            return;
    }
}

const postComment = async (body, sender, room, roomName, self) => {
    const message = body.substring(8);
    
        // post comment in issue
        const jiraComment = await jiraRequest.fetchPostJSON(
            `https://jira.bingo-boom.ru/jira/rest/api/2/issue/${roomName}/comment`,
            auth(),
            schemaComment(sender, message)
        );

        if (jiraComment.status !== 201) {
            const post = t('errorMatrixComment');
            await self.sendHtmlMessage(room.roomId, post, post);
        }

        const post = t('successMatrixComment');
        await self.sendHtmlMessage(room.roomId, post, post);
        return `Comment from ${sender} for ${roomName}`;
}

const appointAssignee = async (event, room, roomName, self) => {
    const assignee = getAssgnee(event);
    
    // appointed assignee for issue
    const jiraAssign = await jiraRequest.fetchPutJSON(
        `https://jira.bingo-boom.ru/jira/rest/api/2/issue/${roomName}/assignee`,
        auth(),
        schemaAssignee(assignee)
    );

    if (jiraAssign.status !== 204) {
        const post = t('errorMatrixAssign', {assignee});
        await self.sendHtmlMessage(room.roomId, post, post);
        return `User ${assignee} or room ${roomName} don't exist`;
    } 


    const inviteUser = getInviteUser(event, room);
    if (inviteUser) {
        await self.invite(room.roomId, inviteUser);
    }

    // add watcher for issue
    const jiraWatcher = await jiraRequest.fetchPostJSON(
        `https://jira.bingo-boom.ru/jira/rest/api/2/issue/${roomName}/watchers`,
        auth(),
        schemaWatcher(assignee)
    );

    const post = t('successMatrixAssign', {assignee});
    await self.sendHtmlMessage(room.roomId, post, post);
    return `The user ${assignee} now assignee issue ${roomName}`;
}

const issueMove = async (body, room, roomName, self) => {
    const listCommands = await getListCommand(roomName);

    const moveId = listCommands.reduce((res, cur) => {
        // check command
        if (~body.toLowerCase().indexOf(cur.name.toLowerCase())) {
            return cur.id;
        }
        return res;
    }, 0);

    if (!moveId) {
        let postListCommands = listCommands.reduce((res, cur) => {
            return `${res} &nbsp;&nbsp;${cur.name}<br>`;
        }, '');
        postListCommands = `<b>${t('listJiraCommand')}:</b><br>${postListCommands}`
        await self.sendHtmlMessage(room.roomId, 'list commands', postListCommands);
        return;
    }

    // canged status issue
    const jiraMove = await jiraRequest.fetchPostJSON(
        `https://jira.bingo-boom.ru/jira/rest/api/2/issue/${roomName}/transitions`,
        auth(),
        schemaMove(moveId)
    )

    if (jiraMove.status !== 204) {
        const post = t('errorMoveJira');
        await self.sendHtmlMessage(room.roomId, 'ERROR', post);
        return `Issue ${roomName} not changed status`;
    }

    const post = t('successMoveJira');
    await self.sendHtmlMessage(room.roomId, post, post);
    return `Issue ${roomName} changed status`;
}

const getListCommand = async (roomName) => {
    // List of available commands
    const moveOptions = await jiraRequest.fetchJSON(
        `https://jira.bingo-boom.ru/jira/rest/api/2/issue/${roomName}/transitions`,
        auth()
    )

    return moveOptions.transitions.map((move) => {
        return { name: move.name, id: move.id };
    });
}

const getInviteUser = (event, room) => {
    const body = event.getContent().body;
    if (body === '!assign') {
        return;
    }

    // 8 it's length command "!assign"
    let user = body.substring(8, body.length);
    user = `@${user}:matrix.bingo-boom.ru`;

    // 'members' is an array of objects
    const members = room.getJoinedMembers();
    members.forEach((member) => {
        if (member.userId === user) {
            user = undefined;
        }
        return;
    });

    return user;
}

const getAssgnee = (event) => {
    const body = event.getContent().body;
    const postfix = 21;
    if (body === '!assign') {
        const sender = event.getSender();
        return sender.substring(1, sender.length - postfix);
    }

    // 8 it's length command "!assign"
    return body.substring(8, body.length);
}

const schemaComment = (sender, message) => {
    const post = `[~${sender}]:\n${message}`
    return JSON.stringify({
        "body": post
    });
}

const schemaAssignee = (assignee) => {
    return JSON.stringify({
        "name": `${assignee}`
    });
}

const schemaWatcher = (assignee) => {
    return `"${assignee}"`;
}

const schemaMove = (id) => {
    return JSON.stringify({
        "transition": {
            "id": id
        }
    });
}

module.exports = handler;