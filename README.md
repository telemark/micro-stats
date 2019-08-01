[![Build Status](https://travis-ci.org/telemark/micro-stats.svg?branch=master)](https://travis-ci.org/telemark/micro-stats)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# micro-stats

Stats service

## API

### ```POST /stats/:system```

Post stats for given system

```bash
$ curl -v -H "Authorization: INSERT-JWT-TOKEN" --header "Content-Type: application/json" http://localhost:3000/stats/minelev -d '{"queue": "10", "done": "42"}'
```

### ```GET /stats/:system```

Get stats for given system

```bash
$ curl -v http://localhost:3000/stats/minelev
```

### Response

```JavaScript
[
  {
    "_id": "5936af1637fcfde27cf42a75",
    "system": "minelev",
    "queue": "0",
    "done": "897"
  }
]
```

## Development

Add local `.env`

```
MONGODB_CONNECTION=mongodb-connection-string
MONGODB_COLLECTION=mongodb-collection-name
MONGODB_NAME=mngodb-name
JWT_SECRET=jwt-secret
```

Start development environment

```
$ npm run dev
```

## Deploy to ZEIT/Now - Manual

Configure [now.json](now.json)

Run the deployment script

```
$ npm run deploy
```

## Deploy to ZEIT/Now - Automatic

Do a tagged release

## License

[MIT](LICENSE)
