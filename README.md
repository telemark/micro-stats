[![Build Status](https://travis-ci.org/telemark/micro-stats.svg?branch=master)](https://travis-ci.org/telemark/micro-stats)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/micro-stats.svg)](https://greenkeeper.io/)

# micro-stats

Stats service

## API

### ```POST /stats/:system```

Post stats for given system

```bash
$ curl -v -H "Authorization: INSERT-JWT-TOKEN" http://localhost:3000/stats/minelev -d '{"queue": "10", "done": "42"}'
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

## License

[MIT](LICENSE)

![Robohash image of micro-stats](https://robots.kebabstudios.party/micro-stats.png "Robohash image of micro-stats")
