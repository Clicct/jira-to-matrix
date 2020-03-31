const info = require('./raw-events-data');

/* eslint-disable id-length */
module.exports = [
    {
        type: 'm.sticker',
        room_id: '!FvlvzjbOzNhrCRcAjB:matrix.example.com',
        sender: '@ii_ivanov:matrix.example.com',
        content: {
            url: info.blobUrl,
            info: {
                h: 200,
                mimetype: 'image/png',
                size: 28154,
                thumbnail_info: {
                    h: 200,
                    mimetype: 'image/png',
                    size: 28154,
                    w: 106,
                },
                thumbnail_url: info.blobUrl,
                w: 106,
            },
            body: info.blobName,
        },
        origin_server_ts: 1582797303168,
        unsigned: {},
        event_id: '$h0wInOvSgSFfuolAX6TIvsErrtVrjm_roEeYPttuU1o',
        user_id: '@ii_ivanov:matrix.example.com',
    },
    {
        type: 'm.room.avatar',
        room_id: '!FvlvzjbOzNhrCRcAjB:matrix.example.com',
        sender: '@jira_test_bot:matrix.example.com',
        content: {
            url: info.avatarUrl,
        },
        state_key: '',
        origin_server_ts: 1582797196562,
        unsigned: {},
        event_id: '$O5D1Nqj5D55h0TwPDYz31_Lg_CPDWiUMyBaBRv6csj4',
        user_id: '@jira_test_bot:matrix.example.com',
    },
    // Edited message
    {
        type: 'm.room.redaction',
        room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
        sender: '@user_test:matrix.example.com',
        content: {},
        redacts: '$158315537141217hidwE:matrix.example.com',
        event_id: '$158315538141223Yellz:matrix.example.com',
        origin_server_ts: 1583155381531,
        unsigned: {
            age: 30425,
        },
        user_id: '@user_test:matrix.example.com',
        age: 30425,
    },
    {
        type: 'm.room.message',
        room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
        sender: '@user_test:matrix.example.com',
        content: {},
        event_id: '$158315537141217hidwE:matrix.example.com',
        origin_server_ts: info.maxTs,
        unsigned: {
            redacted_by: '$158315538141223Yellz:matrix.example.com',
            redacted_because: {
                type: 'm.room.redaction',
                room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
                sender: '@user_test:matrix.example.com',
                content: {},
                redacts: '$158315537141217hidwE:matrix.example.com',
                event_id: '$158315538141223Yellz:matrix.example.com',
                origin_server_ts: 1583155381531,
                unsigned: {
                    age: 30425,
                },
                user_id: '@user_test:matrix.example.com',
                age: 30425,
            },
            age: 40421,
        },
        user_id: '@user_test:matrix.example.com',
        age: 40421,
        redacted_because: {
            type: 'm.room.redaction',
            room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
            sender: '@user_test:matrix.example.com',
            content: {},
            redacts: '$158315537141217hidwE:matrix.example.com',
            event_id: '$158315538141223Yellz:matrix.example.com',
            origin_server_ts: 1583155381531,
            unsigned: {
                age: 30425,
            },
            user_id: '@user_test:matrix.example.com',
            age: 30425,
        },
    },
    {
        type: 'm.room.message',
        room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
        sender: '@user_test:matrix.example.com',
        content: {
            'm.new_content': {
                msgtype: 'm.text',
                body: 'llalala12345',
            },
            'm.relates_to': {
                rel_type: 'm.replace',
                event_id: '$158315535341208MdBlF:matrix.example.com',
            },
            msgtype: 'm.text',
            body: ' * llalala12345',
        },
        event_id: '$158315536641215XCYxT:matrix.example.com',
        origin_server_ts: info.maxTs - 10,
        unsigned: {
            age: 45718,
        },
        user_id: '@user_test:matrix.example.com',
        age: 45718,
    },
    // before editting
    {
        type: 'm.room.message',
        room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
        sender: '@user_test:matrix.example.com',
        content: {
            msgtype: 'm.text',
            body: 'llalala12345',
        },
        event_id: '$158315535341208MdBlF:matrix.example.com',
        origin_server_ts: info.maxTs - 20,
        unsigned: {
            age: 58394,
            'm.relations': {
                'm.replace': {
                    event_id: '$158315536641215XCYxT:matrix.example.com',
                    origin_server_ts: 1583155366238,
                    sender: '@user_test:matrix.example.com',
                },
            },
        },
        user_id: '@user_test:matrix.example.com',
        age: 58394,
    },
    {
        type: 'm.room.message',
        sender: '@test_user:matrix.example.com',
        content: {
            msgtype: 'm.text',
            format: 'org.matrix.custom.html',
            body: 'lalalal00000',
            formatted_body: '<p>lalalal00000<br /></p>\n',
        },
        event_id: '$158315135640617JeoRb:matrix.example.com',
        origin_server_ts: info.maxTs - 30,
        unsigned: {
            age: 1301,
            transaction_id: 'm1583151356574.67',
        },
        room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
    },
    // Picture
    {
        type: 'm.room.message',
        sender: '@ii_ivanov:example.com',
        content: {
            body: info.mediaName,
            info: {
                size: 164417,
                mimetype: 'image/jpeg',
                thumbnail_info: {
                    w: 800,
                    h: 600,
                    mimetype: 'image/jpeg',
                    size: 160136,
                },
                w: 1024,
                h: 768,
                thumbnail_url: 'mxc://example.com/DordVdYYQFGQBEjWLLPnfxcb',
            },
            msgtype: 'm.image',
            url: info.imgUrl,
        },
        event_id: '$158314842240236RCJdh:example.com',
        origin_server_ts: info.maxTs - 40,
        unsigned: {
            age: 1274,
        },
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
    },
    {
        content: {
            avatar_url: 'mxc://example.com/kGRbNAnZyGzcoqBHBXepmCOZ',
            displayname: 'Иванов Иван Иванович',
            membership: 'join',
        },
        event_id: '$1581432389810513yJOiY:example.com',
        origin_server_ts: info.maxTs - 50,
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@test_user:example.com',
        state_key: '@test_user:example.com',
        type: 'm.room.member',
        unsigned: {
            replaces_state: '$1581432373810499oGQPw:example.com',
            prev_content: {
                avatar_url: 'mxc://example.com/kGRbNAnZyGzcoqBHBXepmCOZ',
                displayname: 'Иванов Иван Иванович',
                membership: 'invite',
            },
            prev_sender: '@health_check_bot:example.com',
            age: 1721955571,
        },
        user_id: '@test_user:example.com',
        age: 1721955571,
        replaces_state: '$1581432373810499oGQPw:example.com',
        prev_content: {
            avatar_url: 'mxc://example.com/kGRbNAnZyGzcoqBHBXepmCOZ',
            displayname: 'Иванов Иван Иванович',
            membership: 'invite',
        },
    },
    {
        type: 'm.room.join_rules',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            join_rule: 'public',
        },
        state_key: '',
        event_id: '$158143237577004Wrljh:example.com',
        origin_server_ts: 1581432375033,
        unsigned: {
            replaces_state: '$158143236276998wHdil:example.com',
            prev_content: {
                join_rule: 'invite',
            },
            prev_sender: '@health_check_bot:example.com',
            age: 1721969883,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721969883,
        replaces_state: '$158143236276998wHdil:example.com',
        prev_content: {
            join_rule: 'invite',
        },
    },
    {
        type: 'm.room.aliases',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            aliases: ['#INFO10:example.com'],
        },
        state_key: 'example.com',
        event_id: '$158143237477003JFLaG:example.com',
        origin_server_ts: 1581432374571,
        unsigned: {
            age: 1721970345,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721970345,
    },
    {
        type: 'm.room.name',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            name: 'INFO10',
        },
        state_key: '',
        event_id: '$158143237377001VmMOd:example.com',
        origin_server_ts: 1581432373918,
        unsigned: {
            age: 1721970998,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721970998,
    },
    {
        type: 'm.room.guest_access',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            guest_access: 'can_join',
        },
        state_key: '',
        event_id: '$158143237377000enpxI:example.com',
        origin_server_ts: 1581432373350,
        unsigned: {
            age: 1721971566,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721971566,
    },
    {
        content: {
            avatar_url: 'mxc://example.com/kGRbNAnZyGzcoqBHBXepmCOZ',
            displayname: 'Иванов Иван Иванович',
            membership: 'invite',
        },
        event_id: '$1581432373810499oGQPw:example.com',
        origin_server_ts: 1581432373033,
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        state_key: '@test_user:example.com',
        type: 'm.room.member',
        unsigned: {
            age: 1721971883,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721971883,
    },
    {
        type: 'm.room.history_visibility',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            history_visibility: 'shared',
        },
        state_key: '',
        event_id: '$158143237276999bWcgi:example.com',
        origin_server_ts: 1581432372531,
        unsigned: {
            age: 1721972385,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721972385,
    },
    {
        type: 'm.room.join_rules',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            join_rule: 'invite',
        },
        state_key: '',
        event_id: '$158143236276998wHdil:example.com',
        origin_server_ts: 1581432362088,
        unsigned: {
            age: 1721982828,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721982828,
    },
    {
        type: 'm.room.canonical_alias',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            alias: '#INFO10:example.com',
        },
        state_key: '',
        event_id: '$158143236176997Ecakj:example.com',
        origin_server_ts: 1581432361252,
        unsigned: {
            age: 1721983664,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721983664,
    },
    {
        type: 'm.room.power_levels',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            users: {
                '@health_check_bot:example.com': 100,
            },
            users_default: 0,
            events: {
                'm.room.name': 50,
                'm.room.power_levels': 100,
                'm.room.history_visibility': 100,
                'm.room.canonical_alias': 50,
                'm.room.avatar': 50,
            },
            events_default: 0,
            state_default: 50,
            ban: 50,
            kick: 50,
            redact: 50,
            invite: 0,
        },
        state_key: '',
        event_id: '$158143236076996kgBaU:example.com',
        origin_server_ts: 1581432360716,
        unsigned: {
            age: 1721984200,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721984200,
    },
    {
        type: 'm.room.member',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            membership: 'join',
            displayname: 'health_check_bot',
            avatar_url: null,
        },
        state_key: '@health_check_bot:example.com',
        event_id: '$158143235976995tBdYG:example.com',
        origin_server_ts: 1581432359972,
        unsigned: {
            age: 1721984944,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721984944,
    },
    {
        type: 'm.room.create',
        room_id: '!XIFEkULwPGYFFmcRZo:example.com',
        sender: '@health_check_bot:example.com',
        content: {
            room_version: '1',
            creator: '@health_check_bot:example.com',
        },
        state_key: '',
        event_id: '$158143235976994jAMAX:example.com',
        origin_server_ts: 1581432359414,
        unsigned: {
            age: 1721985502,
        },
        user_id: '@health_check_bot:example.com',
        age: 1721985502,
    },
    {
        type: 'm.room.message',
        sender: '@test_user:matrix.example.com',
        content: {
            msgtype: 'm.text',
            format: 'org.matrix.custom.html',
            body: '```not closed',
            formatted_body: '<p>lalalal00000<br /></p>\n',
        },
        event_id: '$1020305135640617JeoRb:matrix.example.com',
        origin_server_ts: info.maxTs - 100,
        unsigned: {
            age: 1301,
            transaction_id: 'm1583151356574.67',
        },
        room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
    },
    {
        type: 'm.room.message',
        sender: '@test_user:matrix.example.com',
        content: {
            msgtype: 'm.text',
            format: 'org.matrix.custom.html',
            body: '```closed```\n```\nnew line\n```',
            formatted_body: '<p>lalalal00000<br /></p>\n',
        },
        event_id: '$2030405135640617JeoRb:matrix.example.com',
        origin_server_ts: info.maxTs - 200,
        unsigned: {
            age: 1301,
            transaction_id: 'm1583151356574.67',
        },
        room_id: '!XIFEkULwPGYFFmcRZo:matrix.example.com',
    },
];
