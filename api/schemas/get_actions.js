exports.GET = {
    description: 'get actions based on notified account. this endpoint also accepts generic filters based on indexed fields' +
        ' (e.g. act.authorization.actor=eosio or act.name=delegatebw), if included they will be combined with a AND operator',
    summary: 'get root actions',
    tags: ['history'],
    querystring: {
        type: 'object',
        properties: {
            "account": {
                description: 'notified account',
                type: 'string',
                minLength: 1,
                maxLength: 12
            },
            "track": {
                description: 'total results to track (count) [number or true]',
                type: 'string'
            },
            "filter": {
                description: 'code:name filter',
                type: 'string',
                minLength: 3
            },
            "skip": {
                description: 'skip [n] actions (pagination)',
                type: 'integer',
                minimum: 0
            },
            "limit": {
                description: 'limit of [n] actions per page',
                type: 'integer',
                minimum: 1
            },
            "sort": {
                description: 'sort direction',
                enum: ['desc', 'asc', '1', '-1'],
                type: 'string'
            },
            "after": {
                description: 'filter after specified date (ISO8601)',
                type: 'string'
            },
            "before": {
                description: 'filter before specified date (ISO8601)',
                type: 'string'
            },
            "parent": {
                description: 'filter by parent global sequence',
                type: 'integer',
                minimum: 0
            }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                "query_time": {
                    type: "number"
                },
                "cached": {type: "boolean"},
                "lib": {
                    type: "number"
                },
                "total": {
                    type: "object",
                    properties: {
                        "value": {type: "number"},
                        "relation": {type: "string"}
                    }
                },
                "actions": {
                    type: "array",
                    items: {
                        type: 'object',
                        properties: {
                            "act": {
                                type: 'object',
                                properties: {
                                    "account": {type: "string"},
                                    "name": {type: "string"}
                                },
                                additionalProperties: true
                            },
                            "cpu_usage_us": {type: "number"},
                            "net_usage_words": {type: "number"},
                            "global_sequence": {type: "number"},
                            "receiver": {type: 'string'},
                            "@timestamp": {type: "string"},
                            "block_num": {type: "number"},
                            "producer": {type: "string"},
                            "trx_id": {type: "string"},
                            "parent": {type: "number"},
                            "action_ordinal": {type: 'number'},
                            "creator_action_ordinal": {type: 'number'},
                            "notified": {type: "array", items: {type: "string"}}
                        }
                    }
                }
            }
        }
    }
};
