# twitch-chat

![screenshot](https://pbs.twimg.com/media/EKkUB75W4AEKGZR?format=png&name=900x900)

## config and usage

Either edit the `lib.js` file, fill in all your secrets and run `index.js` normally, or run the index.js with some env variables:

```bash
CHANNEL=martinjaniczek \
  CLIENT_ID=1234567890abcdefghijklmnop \
  CLIENT_SECRET=1234567890abcdefghijklmnop \
  STREAMLABS_SECRET_TOKEN=1234567890abcdefghijklmnop \
  SECRET=1234567890abcdefghijklmnop \
  yarn node index.js
```
