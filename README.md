# NODE-JS, TypeScript and PostgreSQL with Kafka

//TODO: add instructions how to configure the docker, and set both kafka and postgres

## Getting Started 🚀

```bash
git clone <THIS_REPO>
npm install
```

## Development 🤓

```bash
npm run dev-server
```

```

### Build Artifacts 🛠

```bash
npm build
```

### Sample REST Calls:

# add new academy item

POST http://localhost:9090/academy

```bash
{
    "name":"Eran Peled",
    "ID" : 30203023,
    "projects": [
        {
            "name":"mongodb",
            "type":"lecture"
        },
        {
            "name":"nodejs",
            "type":"lecture"
        }
    ]
}
```

# delete academy item
DELETE http://localhost:9090/academy/delete/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

# Un-delete academy item
PUT http://localhost:9090/academy/restore/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

# GET academy item
GET http://localhost:9090/academy/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

# UPDATE academy item
PUT http://localhost:9090/academy/60fbd4a5c0e6850ef3951874
where 60fbd4a5c0e6850ef3951874 is the ID of the document.

BODY: 

```bash
{
    "name":"Eran Peled - 2",
    "ID" : 6782872,
    "projects": [
        {
            "name":"mongodb",
            "type":"lecture"
        },
        {
            "name":"nodejs",
            "type":"lecture"
        }
    ]
}
```
